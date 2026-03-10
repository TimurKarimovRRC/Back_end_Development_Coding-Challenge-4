import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { sendError } from "../errors/errors";
import { Role } from "../models/interfaces";

export function authorize(allowedRoles: Role[]) {
  return (_request: Request, response: Response, next: NextFunction): void => {
    const role: Role | undefined = response.locals.role as Role | undefined;

    if (!role) {
      sendError(response, HTTP_STATUS.FORBIDDEN, "Forbidden: No role assigned", "ROLE_NOT_FOUND");
      return;
    }

    if (!allowedRoles.includes(role)) {
      sendError(response, HTTP_STATUS.FORBIDDEN, "Forbidden: Insufficient role", "INSUFFICIENT_ROLE");
      return;
    }

    next();
  };
}