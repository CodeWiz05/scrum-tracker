const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());
const tasks = [{ id: 1, title: "Sample Task", status: "To Do" }];

app.get("/api/tasks", (req, res) => res.json(tasks));

test("GET /api/tasks returns all tasks", async () => {
  const res = await request(app).get("/api/tasks");
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual(tasks);
});
