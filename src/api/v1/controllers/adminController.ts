import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export async function setCustomClaimsController(request: Request, response: Response): Promise<void> {
  const email: string | undefined = request.body?.email;
  const role: string | undefined = request.body?.role;

  if (!email || !role) {
    response.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Missing required fields: email, role." });
    return;
  }

  const auth = getAuth();

  const userRecord = await auth.getUserByEmail(email);
  await auth.setCustomUserClaims(userRecord.uid, { role });

  response.status(HTTP_STATUS.OK).json({ message: "Custom claims updated." });
}