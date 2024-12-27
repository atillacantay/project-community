export type ActionResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

export function createResponse<T>(data: T): ActionResponse<T> {
  return { success: true, data };
}

export function createErrorResponse(message: string): ActionResponse {
  return { success: false, error: message };
}
