type CursorPayload = Record<string, string | number | null>;

export const encodeCursor = (payload: CursorPayload) => {
  return Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
};

export const decodeCursor = <T extends CursorPayload>(cursor: string | undefined) => {
  if (!cursor) return null;

  try {
    return JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8')) as T;
  } catch {
    return null;
  }
};
