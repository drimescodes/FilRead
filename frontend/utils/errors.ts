export class CustomError extends Error {
  constructor(
    message: string,
    code: string,
    originalError?: Error
  ) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
    this.originalError = originalError;

    // Ensure proper stack trace
    Error.captureStackTrace(this, CustomError);
  }

  readonly code: string;
  readonly originalError?: Error;
}
