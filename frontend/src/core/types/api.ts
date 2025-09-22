export interface ApiResponse<T> {
  success: true;
  data: T;
  metadata?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
}
