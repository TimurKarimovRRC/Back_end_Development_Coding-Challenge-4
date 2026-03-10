import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from "../services/projectService";

export function getAllProjectsController(_request: Request, response: Response): void {
  const projects = getAllProjects();
  response.status(HTTP_STATUS.OK).json({ count: projects.length, projects });
}

export function getProjectByIdController(request: Request, response: Response): void {
  const projectId = Number(request.params.id);

  if (Number.isNaN(projectId)) {
    response.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Project id must be a number." });
    return;
  }

  const project = getProjectById(projectId);

  if (!project) {
    response.status(HTTP_STATUS.NOT_FOUND).json({ error: "Project not found." });
    return;
  }

  response.status(HTTP_STATUS.OK).json(project);
}

export function createProjectController(request: Request, response: Response): void {
  const name = request.body?.name;
  const status = request.body?.status;

  if (!name || !status) {
    response.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Missing required fields: name, status." });
    return;
  }

  const created = createProject(String(name), String(status));
  response.status(HTTP_STATUS.CREATED).json(created);
}

export function updateProjectController(request: Request, response: Response): void {
  const projectId = Number(request.params.id);

  if (Number.isNaN(projectId)) {
    response.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Project id must be a number." });
    return;
  }

  const updated = updateProject(projectId, request.body ?? {});

  if (!updated) {
    response.status(HTTP_STATUS.NOT_FOUND).json({ error: "Project not found." });
    return;
  }

  response.status(HTTP_STATUS.OK).json(updated);
}

export function deleteProjectController(request: Request, response: Response): void {
  const projectId = Number(request.params.id);

  if (Number.isNaN(projectId)) {
    response.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Project id must be a number." });
    return;
  }

  const ok = deleteProject(projectId);

  if (!ok) {
    response.status(HTTP_STATUS.NOT_FOUND).json({ error: "Project not found." });
    return;
  }

  response.status(HTTP_STATUS.OK).json({ message: "Project deleted." });
}