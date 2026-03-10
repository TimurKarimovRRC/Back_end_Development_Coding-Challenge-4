import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { setCustomClaimsController } from "../controllers/adminController";

export const adminRoutes: Router = Router();

adminRoutes.post("/admin/setCustomClaims", authenticate, authorize(["admin"]), setCustomClaimsController);