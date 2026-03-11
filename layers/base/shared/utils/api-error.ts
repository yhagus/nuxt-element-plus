export function sanitizeApiErrorMessage(errorData: unknown, fallback: string = 'Terjadi kesalahan'): string {
  if (typeof errorData === 'object' && errorData && 'message' in errorData) {
    const message = (errorData as { message?: unknown }).message;
    if (typeof message === 'string' && message.trim().length > 0) {
      return message;
    }
  }

  if (typeof errorData === 'string' && errorData.trim().length > 0) {
    return errorData;
  }

  return fallback;
}
