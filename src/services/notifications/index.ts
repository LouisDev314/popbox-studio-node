import resend from '../../integrations/resend';
import getEnvConfig from '../../config/env';
import logger from '../../utils/logger';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';

const { resendApiKey, resendFromEmail } = getEnvConfig();

const canSendEmail = resend && !!resendApiKey && !!resendFromEmail;

const sendEmail = async (params: { emailType: string; subject: string; html: string; to: string }) => {
  if (!canSendEmail) {
    logger.warn(
      { emailType: params.emailType, subject: params.subject, to: params.to },
      'Skipping email send because Resend is not configured',
    );
    return;
  }

  try {
    const response = await resend.emails.send({
      from: `PopBox Studio <${resendFromEmail}>`,
      to: params.to,
      subject: params.subject,
      html: params.html,
    });

    if (response.error) {
      logger.error(
        { error: response.error, emailType: params.emailType, subject: params.subject, to: params.to },
        'Resend email send failed',
      );
      throw new Exception(HttpStatusCode.BAD_GATEWAY, 'Unable to send transactional email');
    }
  } catch (error) {
    logger.error(
      { error, emailType: params.emailType, subject: params.subject, to: params.to },
      'Unexpected email delivery failure',
    );
    throw new Exception(HttpStatusCode.BAD_GATEWAY, 'Unable to send transactional email');
  }
};

export const sendOrderConfirmationEmail = async (params: {
  email: string;
  firstName?: string | null;
  orderPublicId: string;
  orderUrl: string;
}) => {
  const displayName = params.firstName?.trim() || 'there';

  await sendEmail({
    emailType: 'order_confirmation',
    subject: `Order confirmed: ${params.orderPublicId}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h1 style="font-size: 22px;">🎉 Your order is confirmed!</h1>
    
        <p>Hi ${displayName},</p>
    
        <p>
          Thank you for your order — your PopBox journey begins now.
        </p>
    
        <p>
          You can view your order details and access your tickets using the secure link below:
        </p>
    
        <p>
          <a href="${params.orderUrl}" 
             style="display: inline-block; background: #F8A5D1; color: #000000; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: 600;">
            View order & tickets
          </a>
        </p>
    
        <p>
          <strong>Order reference:</strong> ${params.orderPublicId}
        </p>
    
        <p>
          We’ll keep you updated as your order progresses.
        </p>
    
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #E5E7EB;" />
    
        <p style="font-size: 14px; color: #6B7280;">
          This is a secure, private link. You can use it anytime to access your order.
        </p>
    
        <p style="font-size: 14px; color: #6B7280;">
          All sales are final.
        </p>
      </div>
    `,
    to: params.email,
  });
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

  await sendEmail({
    emailType: 'shipment',
    subject: `Your order has shipped: ${params.orderPublicId}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h1 style="font-size: 22px;">Your order has shipped</h1>
        <p>Hi ${displayName},</p>
        <p>Your order is on the way.</p>
        ${trackingBlock}
        <p><a href="${params.orderUrl}" style="display: inline-block; background: #111827; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 8px;">View your order</a></p>
      </div>
    `,
    to: params.email,
  });
};
