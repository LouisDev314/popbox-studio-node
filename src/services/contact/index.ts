import { ContactBody } from '../../schemas/contact';
import resend from '../../integrations/resend';
import getEnvConfig from '../../config/env';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';

const inquiryTypeLabelMap: Record<ContactBody['inquiryType'], string> = {
  'product-request': 'Product / Series Request',
  'order-support': 'Order Support',
  'shipping-support': 'Shipping Support',
  'ticket-support': 'Kuji / Ticket Support',
  general: 'General Inquiry',
};

const escapeHtml = (value: string): string => {
  return (
    value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      // eslint-disable-next-line quotes
      .replaceAll("'", '&#39;')
  );
};

const formatOptionalValue = (value?: string): string => {
  const trimmed = value?.trim();

  if (!trimmed) {
    return '—';
  }

  return trimmed;
};

export const sendContactEmail = async (payload: ContactBody): Promise<void> => {
  const inquiryTypeLabel = inquiryTypeLabelMap[payload.inquiryType];
  const fullName = `${payload.firstName} ${payload.lastName}`.trim();
  const orderNumber = formatOptionalValue(payload.orderNumber);
  const requestedSeries = formatOptionalValue(payload.requestedSeries);

  const subject = `[Contact] ${inquiryTypeLabel} - ${fullName}`;

  const text = [
    'New contact form submission',
    '',
    `Name: ${fullName}`,
    `Email: ${payload.email}`,
    `Inquiry Type: ${inquiryTypeLabel}`,
    `Order Number: ${orderNumber}`,
    `Requested Series / Product: ${requestedSeries}`,
    '',
    'Message:',
    payload.message,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111827; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New contact form submission</h2>

      <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
        <tbody>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; width: 220px;">Name</td>
            <td style="padding: 8px 0;">${escapeHtml(fullName)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Email</td>
            <td style="padding: 8px 0;">${escapeHtml(payload.email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Inquiry Type</td>
            <td style="padding: 8px 0;">${escapeHtml(inquiryTypeLabel)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Order Number</td>
            <td style="padding: 8px 0;">${escapeHtml(orderNumber)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600;">Requested Series / Product</td>
            <td style="padding: 8px 0;">${escapeHtml(requestedSeries)}</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 24px;">
        <p style="margin: 0 0 8px; font-weight: 600;">Message</p>
        <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 12px; white-space: pre-wrap;">
          ${escapeHtml(payload.message)}
        </div>
      </div>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from: `PopBox Studio <${getEnvConfig().resendFromEmail}>`,
      to: getEnvConfig().contactEmail,
      replyTo: payload.email,
      subject,
      text,
      html,
    });

    if (!result.error) {
      return;
    }
  } catch {
    throw new Exception(HttpStatusCode.BAD_GATEWAY, 'Unable to send contact email');
  }

  throw new Exception(HttpStatusCode.BAD_GATEWAY, 'Unable to send contact email');
};
