interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: Record<string, unknown>;
}

interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

export const successResponse = <T>(data: T, metadata?: Record<string, unknown>): SuccessResponse<T> => ({
  success: true,
  data,
  metadata,
});

export const errorResponse = (message: string, code?: string, details?: unknown): ErrorResponse => ({
  success: false,
  error: {
    message,
    code,
    details,
  },
});
