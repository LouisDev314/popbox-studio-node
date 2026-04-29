import { RequestHandler, Request } from 'express';
import HttpStatusCode from '../../constants/http-status-code';
import multer from 'multer';
import {
  PRODUCT_IMAGE_ALLOWED_MIME_TYPES,
  PRODUCT_IMAGE_MAX_FILE_SIZE_BYTES,
  PRODUCT_IMAGE_UPLOAD_FIELD_NAMES,
} from '../../constants/product';
import Exception from '../../utils/Exception';
import { productImages } from '../../db/schema';
import logger from '../../utils/logger';
import { buildImageUrl } from '../../utils/product';
import { supabaseAdmin } from '../../integrations/supabase';
import getEnvConfig from '../../config/env';

const PRODUCT_IMAGE_MAX_FILES_PER_REQUEST = 10;
const PRODUCT_IMAGE_MAX_FIELDS_PER_REQUEST = 20;
const PRODUCT_IMAGE_MAX_PARTS_PER_REQUEST = PRODUCT_IMAGE_MAX_FILES_PER_REQUEST + PRODUCT_IMAGE_MAX_FIELDS_PER_REQUEST;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: PRODUCT_IMAGE_MAX_FILE_SIZE_BYTES,
    files: PRODUCT_IMAGE_MAX_FILES_PER_REQUEST,
    fields: PRODUCT_IMAGE_MAX_FIELDS_PER_REQUEST,
    parts: PRODUCT_IMAGE_MAX_PARTS_PER_REQUEST,
  },
  fileFilter: (_req, file, callback) => {
    if (
      !PRODUCT_IMAGE_ALLOWED_MIME_TYPES.includes(file.mimetype as (typeof PRODUCT_IMAGE_ALLOWED_MIME_TYPES)[number])
    ) {
      return callback(new Exception(HttpStatusCode.UNPROCESSABLE_ENTITY, 'Unsupported image file type'));
    }

    callback(null, true);
  },
});

export const parseProductImageUpload: RequestHandler = (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (!err) {
      return next();
    }

    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new Exception(HttpStatusCode.UNPROCESSABLE_ENTITY, 'Image must be 5MB or smaller'));
      }

      if (err.code === 'LIMIT_FILE_COUNT') {
        return next(
          new Exception(
            HttpStatusCode.UNPROCESSABLE_ENTITY,
            `No more than ${PRODUCT_IMAGE_MAX_FILES_PER_REQUEST} images may be uploaded per request`,
          ),
        );
      }

      if (err.code === 'LIMIT_PART_COUNT' || err.code === 'LIMIT_FIELD_COUNT') {
        return next(new Exception(HttpStatusCode.BAD_REQUEST, 'Multipart upload contains too many form parts'));
      }

      return next(new Exception(HttpStatusCode.BAD_REQUEST, 'Invalid multipart form-data upload', { data: err.code }));
    }

    return next(err);
  });
};

export const readMultipartStringValues = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }

  return typeof value === 'string' ? [value] : [];
};

export const readProductImageFiles = (
  req: Request,
  options?: {
    allowedFieldNames?: ReadonlySet<string>;
    expectedFieldName?: string;
    usageLabel?: string;
  },
) => {
  const uploadedFiles = Array.isArray(req.files) ? req.files : [];
  const allowedFieldNames = options?.allowedFieldNames ?? PRODUCT_IMAGE_UPLOAD_FIELD_NAMES;
  const unexpectedFile = uploadedFiles.find((file) => !allowedFieldNames.has(file.fieldname));

  if (unexpectedFile) {
    throw new Exception(
      HttpStatusCode.BAD_REQUEST,
      `Unexpected file field "${unexpectedFile.fieldname}". Use "${options?.expectedFieldName ?? 'files'}" for ${options?.usageLabel ?? 'product image uploads'}`,
    );
  }

  return uploadedFiles;
};

export const readSingleProductImageFile = (
  req: Request,
  options?: {
    allowedFieldNames?: ReadonlySet<string>;
    expectedFieldName?: string;
    usageLabel?: string;
  },
) => {
  const files = readProductImageFiles(req, options);

  if (!files.length) {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'An image file is required');
  }

  if (files.length > 1) {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'Only one image file is allowed');
  }

  const [file] = files;

  if (!file) {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'An image file is required');
  }

  return file;
};

export const readProductImageUploadMetadata = (req: Request, fileCount: number) => {
  const altTexts = readMultipartStringValues(req.body.altTexts);
  const legacyAltTexts = readMultipartStringValues(req.body.altText);

  if (altTexts.length > 0 && legacyAltTexts.length > 0) {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'Provide either "altTexts" or legacy "altText", not both');
  }

  const normalizedAltTexts = altTexts.length > 0 ? altTexts : legacyAltTexts;
  if (normalizedAltTexts.length > 0 && normalizedAltTexts.length !== fileCount) {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'altTexts must match the number of uploaded files');
  }

  return {
    altTexts: normalizedAltTexts,
  };
};

export const mapProductImage = (image: typeof productImages.$inferSelect) => ({
  ...image,
  url: buildImageUrl(image.storageKey),
});

export const validateProductImageFiles = (files: Express.Multer.File[]) => {
  if (!files.length) {
    throw new Exception(HttpStatusCode.BAD_REQUEST, 'At least one image file is required');
  }

  for (const file of files) {
    if (
      !PRODUCT_IMAGE_ALLOWED_MIME_TYPES.includes(file.mimetype as (typeof PRODUCT_IMAGE_ALLOWED_MIME_TYPES)[number])
    ) {
      throw new Exception(HttpStatusCode.UNPROCESSABLE_ENTITY, 'Unsupported image file type');
    }

    if (file.size > PRODUCT_IMAGE_MAX_FILE_SIZE_BYTES) {
      throw new Exception(HttpStatusCode.UNPROCESSABLE_ENTITY, 'Image must be 5MB or smaller');
    }
  }
};

export const rollbackUploadedProductImages = async (productId: string, storageKeys: string[], cause: unknown) => {
  if (!storageKeys.length) return;

  const { error } = await supabaseAdmin.storage.from(getEnvConfig().supabaseStorageBucket).remove(storageKeys);

  if (!error) return;

  logger.error(
    {
      productId,
      storageKeys,
      rollbackError: error,
      cause,
    },
    'Product image upload rollback failed',
  );

  throw new Exception(HttpStatusCode.BAD_GATEWAY, 'Product image upload failed and rollback was incomplete', {
    data: {
      productId,
      storageKeys,
      rollbackError: error,
    },
    cause,
  });
};
