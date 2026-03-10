import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import {
  createProjectController,
  deleteProjectController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectController
} from "../controllers/projectController";

export const projectRoutes: Router = Router();

projectRoutes.get("/projects", authenticate, authorize(["admin", "lead", "developer"]), getAllProjectsController);
projectRoutes.get("/projects/:id", authenticate, authorize(["admin", "lead", "developer"]), getProjectByIdController);
projectRoutes.post("/projects", authenticate, authorize(["admin", "lead"]), createProjectController);
projectRoutes.put("/projects/:id", authenticate, authorize(["admin", "lead"]), updateProjectController);
projectRoutes.delete("/projects/:id", authenticate, authorize(["admin"]), deleteProjectController);