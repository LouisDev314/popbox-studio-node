export type CursorPayload = Record<string, string | number>;

export const encodeCursor = (payload: CursorPayload): string => {
  if (!payload || Object.keys(payload).length === 0) {
    throw new Error('Cursor payload cannot be empty');
  }

  return Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
};

export const decodeCursor = <T extends CursorPayload>(cursor?: string): T | null => {
  if (!cursor) return null;

  try {
    const decoded = Buffer.from(cursor, 'base64url').toString('utf8');
    const parsed = JSON.parse(decoded);

    if (typeof parsed !== 'object' || parsed === null) {
      return null;
    }

    return parsed as T;
  } catch {
    return null;
  }
};
