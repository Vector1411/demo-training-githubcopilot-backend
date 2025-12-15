export class ApiError extends Error {
  code: string;
  status: number;
  details?: any;
  constructor(status: number, code: string, message: string, details?: any) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export const mapError = (err: any) => {
  if (err instanceof ApiError) return err;
  return new ApiError(500, 'INTERNAL_ERROR', err.message || 'Internal error');
};
