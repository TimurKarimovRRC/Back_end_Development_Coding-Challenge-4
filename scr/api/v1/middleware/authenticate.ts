import { NextFunction, Request, Response } from "express";
import { firebaseAuth } from "../../../config/firebaseConfig";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { sendError } from "../errors/errors";
import { Role } from "../models/interfaces";

type TokenClaims = {
  uid: string;
  role?: Role;
  [key: string]: unknown;
};

function extractHolderToken(authorizationHeaderValue: string | undefined): string | null {
  if (!authorizationHeaderValue) return null;

  const parts = authorizationHeaderValue.split(" ");
  if (parts.length !== 2) return null;

  const prefix = parts[0];
  const token = parts[1];

  if (prefix !== "Holder" || !token) return null;
  return token;
}

export async function authenticate(request: Request, response: Response, next: NextFunction): Promise<void> {
  const token: string | null = extractHolderToken(request.header("Authorization"));

  if (!token) {
    sendError(response, HTTP_STATUS.UNAUTHORIZED, "Unauthorized: No token provided", "TOKEN_NOT_FOUND");
    return;
  }

  try {
    const decoded = (await firebaseAuth.verifyIdToken(token)) as TokenClaims;
    response.locals.uid = decoded.uid;
    response.locals.role = decoded.role;
    next();
  } catch (_error: unknown) {
    sendError(response, HTTP_STATUS.UNAUTHORIZED, "Unauthorized: Invalid token", "TOKEN_INVALID");
  }
}