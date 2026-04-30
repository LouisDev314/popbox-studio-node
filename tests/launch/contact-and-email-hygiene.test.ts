import express from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { importFresh } from '../helpers/launch-test-kit';

const buildContactPayload = () => ({
  firstName: ' Ada ',
  lastName: ' Lovelace ',
  email: 'ada@example.com',
  inquiryType: 'general',
  message: '   Hello from a customer asking about the launch.   ',
});

describe('launch: contact and email hygiene', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.doUnmock('../../src/services/contact');
    vi.doUnmock('../../src/integrations/resend');
  });

  it('passes the normalized validated contact body to the contact service', async () => {
    const sendContactEmailMock = vi.fn().mockResolvedValue(undefined);
    vi.doMock('../../src/services/contact', () => ({
      sendContactEmail: sendContactEmailMock,
    }));

    const [{ default: responseInterceptor }, { default: exceptionHandler }, { default: contactRouter }] =
      await Promise.all([
        import('../../src/middleware/response-interceptor'),
        import('../../src/middleware/exception-handler'),
        import('../../src/routes/v1/contact-router'),
      ]);
    const app = express();

    responseInterceptor();
    app.use(express.json());
    app.use('/contact', contactRouter);
    app.use(exceptionHandler);

    await request(app).post('/contact').send(buildContactPayload()).expect(200);

    expect(sendContactEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: 'Ada',
        lastName: 'Lovelace',
        message: 'Hello from a customer asking about the launch.',
      }),
    );
  });

  it('maps contact provider failures to the typed bad gateway error path', async () => {
    vi.doMock('../../src/integrations/resend', () => ({
      default: {
        emails: {
          send: vi.fn().mockResolvedValue({
            data: null,
            error: { message: 'provider unavailable' },
          }),
        },
      },
    }));

    const { sendContactEmail } = await importFresh(() => import('../../src/services/contact'));

    await expect(sendContactEmail(buildContactPayload())).rejects.toMatchObject({
      code: 502,
      msg: 'Unable to send contact email',
    });
  });

  it('escapes dynamic transactional email HTML values before sending through Resend', async () => {
    const sendMock = vi.fn().mockResolvedValue({
      data: { id: 'email_1' },
      error: null,
    });
    vi.doMock('../../src/integrations/resend', () => ({
      default: {
        emails: {
          send: sendMock,
        },
      },
    }));

    const { sendShipmentEmail } = await importFresh(() => import('../../src/services/notifications'));

    await sendShipmentEmail({
      email: 'customer@example.com',
      firstName: '<Ada>',
      orderPublicId: 'PBX-LAUNCH',
      orderUrl: 'https://client.example.com/orders/PBX-LAUNCH?token=<secret>&next=1',
      carrierName: '<Carrier>',
      trackingNumber: 'TRACK<script>',
      trackingUrl: 'https://carrier.example.com/track?code=<TRACK>&lang=en',
    });

    const sentHtml = sendMock.mock.calls[0]?.[0]?.html as string;

    expect(sentHtml).toContain('Hi &lt;Ada&gt;');
    expect(sentHtml).toContain('&lt;Carrier&gt;');
    expect(sentHtml).toContain('TRACK&lt;script&gt;');
    expect(sentHtml).toContain('token=&lt;secret&gt;&amp;next=1');
    expect(sentHtml).toContain('code=&lt;TRACK&gt;&amp;lang=en');
    expect(sentHtml).not.toContain('Hi <Ada>');
    expect(sentHtml).not.toContain('TRACK<script>');
  });
});
