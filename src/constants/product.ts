export const PRODUCT_IMAGE_ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] as const;
export const PRODUCT_IMAGE_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
export const PRODUCT_IMAGE_UPLOAD_FIELD_NAMES = new Set(['files', 'file']);
