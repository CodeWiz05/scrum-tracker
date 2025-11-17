const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;
const DB_FILE = "./db.json";

app.use(cors());
app.use(express.json());

// Load tasks
const readTasks = () => JSON.parse(fs.readFileSync(DB_FILE));
const writeTasks = (tasks) =>
  fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2));

// GET all tasks
app.get("/api/tasks", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// POST new task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  const tasks = readTasks();
  const newTask = { id: Date.now(), title, status: "todo" };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const tasks = readTasks();

  const taskIndex = tasks.findIndex((t) => t.id == id);
  if (taskIndex === -1)
    return res.status(404).json({ message: "Task not found" });

  tasks[taskIndex].status = status;
  writeTasks(tasks);
  res.json(newTask);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
