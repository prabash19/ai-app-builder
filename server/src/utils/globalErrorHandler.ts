export default class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4")
      ? "user error"
      : "server error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
