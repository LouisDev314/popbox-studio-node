import resend from '../../integrations/resend';
import getEnvConfig from '../../config/env';
import logger from '../../utils/logger';
import Exception from '../../utils/Exception';
import HttpStatusCode from '../../constants/http-status-code';
import type { OrderDetailView } from '../../types/order';

const { resendApiKey, resendFromEmail, orderNotificationEmail } = getEnvConfig();

const canSendEmail = resend && !!resendApiKey && !!resendFromEmail;

const formatMoney = (amountCents: number, currency: string) => {
  try {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency,
    }).format(amountCents / 100);
  } catch {
    return `${(amountCents / 100).toFixed(2)} ${currency}`;
  }
};

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#39;');

const formatDateTime = (value: Date | null) => {
  if (!value) {
    return 'N/A';
  }

  try {
    return new Intl.DateTimeFormat('en-CA', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'America/Edmonton',
    }).format(value);
  } catch {
    return value.toISOString();
  }
};

const formatAddressSummary = (address: Record<string, unknown> | null) => {
  if (!address) {
    return 'N/A';
  }

  const fields = ['fullName', 'line1', 'line2', 'city', 'province', 'postalCode', 'countryCode'] as const;
  const parts = fields
    .map((field) => address[field])
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0);

  return parts.length > 0 ? parts.join(', ') : 'N/A';
};

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
          <strong>Order Number:</strong> ${params.orderPublicId}
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

const buildShipmentTrackingBlock = (params: {
  carrierName?: string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
}) =>
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
  const trackingBlock = buildShipmentTrackingBlock(params);

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

export const sendShipmentUpdateEmail = async (params: {
  email: string;
  firstName?: string | null;
  orderPublicId: string;
  orderUrl: string;
  carrierName?: string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
}) => {
  const displayName = params.firstName?.trim() || 'there';
  const trackingBlock = buildShipmentTrackingBlock(params);

  await sendEmail({
    emailType: 'shipment_update',
    subject: `Shipment updated: ${params.orderPublicId}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h1 style="font-size: 22px;">Your shipment details were updated</h1>
        <p>Hi ${displayName},</p>
        <p>We updated the shipping details for your order.</p>
        ${trackingBlock}
        <p><a href="${params.orderUrl}" style="display: inline-block; background: #111827; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 8px;">View your order</a></p>
      </div>
    `,
    to: params.email,
  });
};

export const sendRefundEmail = async (params: {
  email: string;
  firstName?: string | null;
  orderPublicId: string;
  orderUrl: string;
  amountCents: number;
  currency: string;
  isFullyRefunded: boolean;
}) => {
  const displayName = params.firstName?.trim() || 'there';
  const refundAmount = formatMoney(params.amountCents, params.currency);
  const refundLabel = params.isFullyRefunded ? 'full refund' : 'refund';

  await sendEmail({
    emailType: 'order_refund',
    subject: `Refund processed: ${params.orderPublicId}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h1 style="font-size: 22px;">Your ${refundLabel} has been processed</h1>
        <p>Hi ${displayName},</p>
        <p>We’ve processed a refund for your order.</p>
        <p><strong>Order Number:</strong> ${params.orderPublicId}</p>
        <p><strong>Refund Amount:</strong> ${refundAmount}</p>
        <p><a href="${params.orderUrl}" style="display: inline-block; background: #111827; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 8px;">View your order</a></p>
      </div>
    `,
    to: params.email,
  });
};

export const sendOrderNotificationEmail = async (detail: OrderDetailView) => {
  const customerName = [detail.customer.firstName, detail.customer.lastName].filter(Boolean).join(' ').trim() || 'N/A';
  const itemSummary =
    detail.items.length > 0
      ? detail.items
          .map((item) => {
            const quantity = `${item.quantity}x`;
            const name = escapeHtml(item.productName);
            const lineTotal = escapeHtml(formatMoney(item.lineTotalCents, detail.currency));
            return `<li>${quantity} ${name} (${lineTotal})</li>`;
          })
          .join('')
      : '<li>No order items recorded</li>';

  await sendEmail({
    emailType: 'order_notification',
    subject: `New paid order: ${detail.publicId}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h1 style="font-size: 22px;">New paid order received</h1>
        <p><strong>Order Number:</strong> ${escapeHtml(detail.publicId)}</p>
        <p><strong>Status:</strong> ${escapeHtml(detail.status)}</p>
        <p><strong>Paid At:</strong> ${escapeHtml(formatDateTime(detail.paidAt))}</p>
        <p><strong>Placed At:</strong> ${escapeHtml(formatDateTime(detail.placedAt))}</p>
        <p><strong>Customer:</strong> ${escapeHtml(customerName)}</p>
        <p><strong>Customer Email:</strong> ${escapeHtml(detail.customer.email)}</p>
        <p><strong>Total:</strong> ${escapeHtml(formatMoney(detail.totalCents, detail.currency))}</p>
        <p><strong>Shipping:</strong> ${escapeHtml(formatAddressSummary(detail.shippingAddress))}</p>
        <p><strong>Items:</strong></p>
        <ul>${itemSummary}</ul>
      </div>
    `,
    to: orderNotificationEmail,
  });
};
