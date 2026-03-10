import { Response } from "express";

export type ErrorCode =
  | "TOKEN_NOT_FOUND"
  | "TOKEN_INVALID"
  | "ROLE_NOT_FOUND"
  | "INSUFFICIENT_ROLE";

export function sendError(
  response: Response,
  statusCode: number,
  message: string,
  code: ErrorCode
): void {
  response.status(statusCode).json({
    success: false,
    error: { message, code },
    timestamp: new Date().toISOString()
  });
}