import resend from '../../integrations/resend';
import getEnvConfig from '../../config/env';
import logger from '../../utils/logger';

const { resendApiKey, resendFromEmail } = getEnvConfig();

const canSendEmail = resend && !!resendApiKey && !!resendFromEmail;

const sendEmail = async (subject: string, html: string, to: string) => {
  if (!canSendEmail) {
    logger.warn({ subject, to }, 'Skipping email send because Resend is not configured');
    return;
  }

  await resend.emails.send({
    from: resendFromEmail,
    to,
    subject,
    html,
  });
};

export const sendOrderConfirmationEmail = async (params: {
  email: string;
  firstName?: string | null;
  orderPublicId: string;
  orderUrl: string;
}) => {
  const displayName = params.firstName?.trim() || 'there';

  await sendEmail(
    `Order confirmed: ${params.orderPublicId}`,
    `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h1 style="font-size: 22px;">Order confirmed</h1>
        <p>Hi ${displayName},</p>
        <p>Thanks for your order. You can view your order details and kuji tickets using the secure link below.</p>
        <p><a href="${params.orderUrl}" style="display: inline-block; background: #111827; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 8px;">View your order</a></p>
        <p>Order reference: <strong>${params.orderPublicId}</strong></p>
        <p>All sales are final.</p>
      </div>
    `,
    params.email,
  );
};

export const sendShipmentEmail = async (params: {
  email: string;
  firstName?: string | null;
  orderPublicId: string;
  orderUrl: string;
  carrierName?: string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
}) => {
  const displayName = params.firstName?.trim() || 'there';
  const trackingBlock =
    params.trackingNumber || params.trackingUrl
      ? `
        <p><strong>Carrier:</strong> ${params.carrierName ?? 'Carrier update available'}</p>
        <p><strong>Tracking:</strong> ${
          params.trackingUrl
            ? `<a href="${params.trackingUrl}">${params.trackingNumber ?? params.trackingUrl}</a>`
            : (params.trackingNumber ?? 'Tracking pending')
        }</p>
      `
      : '';

  await sendEmail(
    `Your order has shipped: ${params.orderPublicId}`,
    `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h1 style="font-size: 22px;">Your order has shipped</h1>
        <p>Hi ${displayName},</p>
        <p>Your order is on the way.</p>
        ${trackingBlock}
        <p><a href="${params.orderUrl}" style="display: inline-block; background: #111827; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 8px;">View your order</a></p>
      </div>
    `,
    params.email,
  );
};
