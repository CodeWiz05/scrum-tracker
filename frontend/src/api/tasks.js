import { request } from "./client";

// GET /api/tasks -> [{ id, title, status }]
export const getTasks = () => request("/api/tasks");

// POST /api/tasks  body: { title }
export const createTask = (title) =>
  request("/api/tasks", {
    method: "POST",
    body: JSON.stringify({ title }),
  });

// PUT /api/tasks/:id  body: { status }
export const updateTask = (id, status) =>
  request(`/api/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
