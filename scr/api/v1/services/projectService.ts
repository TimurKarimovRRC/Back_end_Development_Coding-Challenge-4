import { Project } from "../models/interfaces";

const projects: Project[] = [
  { id: 1, name: "Website Redesign", status: "active", createdAt: "2025-01-10T10:00:00.000Z" },
  { id: 2, name: "Mobile App v2", status: "planning", createdAt: "2025-01-08T10:00:00.000Z" },
  { id: 3, name: "API Migration", status: "active", createdAt: "2025-01-05T10:00:00.000Z" },
  { id: 4, name: "Security Audit", status: "completed", createdAt: "2025-01-03T10:00:00.000Z" }
];

let nextProjectId: number = 5;

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectById(projectId: number): Project | undefined {
  return projects.find((project: Project) => project.id === projectId);
}

export function createProject(name: string, status: string): Project {
  const newProject: Project = {
    id: nextProjectId,
    name,
    status,
    createdAt: new Date().toISOString()
  };

  nextProjectId += 1;
  projects.push(newProject);
  return newProject;
}

export function updateProject(projectId: number, updates: Partial<Omit<Project, "id" | "createdAt">>): Project | undefined {
  const project: Project | undefined = getProjectById(projectId);
  if (!project) return undefined;

  if (updates.name !== undefined) project.name = updates.name;
  if (updates.status !== undefined) project.status = updates.status;

  return project;
}

export function deleteProject(projectId: number): boolean {
  const index: number = projects.findIndex((project: Project) => project.id === projectId);
  if (index === -1) return false;

  projects.splice(index, 1);
  return true;
}