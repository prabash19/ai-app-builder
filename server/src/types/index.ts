export interface ErrorWithStatus {
  message: string;
  statusCode?: number;
  status?: string;
  stack?: string;
}
