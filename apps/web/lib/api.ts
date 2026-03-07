type ApiEnvelope<T> = {
  code: number;
  success: boolean;
  message: string;
  requestId?: string;
  data?: T;
  errors?: unknown;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(buildUrl(path), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: init?.cache ?? 'no-store',
  });

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !payload?.success) {
    const message = payload?.message ?? 'Request failed';
    throw new Error(message);
  }

  return payload.data as T;
}

export async function authorizedApiFetch<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  return apiFetch<T>(path, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {}),
    },
  });
}

export async function apiUpload<T>(path: string, formData: FormData, token: string): Promise<T> {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !payload?.success) {
    throw new Error(payload?.message ?? 'Upload failed');
  }

  return payload.data as T;
}

export const apiBaseUrl = API_BASE_URL;
