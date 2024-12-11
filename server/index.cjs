
// server/index.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const DB_PATH = path.join(__dirname, '../mock/db.json');

// Middleware to parse JSON
app.use(express.json());

// Helper function to read and write JSON
const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// Routes

// GET all tasks
app.get('/tasks', (req, res) => {
  const data = readDB();
  res.json(data.tasks);
});

// GET task by ID
app.get('/tasks/:id', (req, res) => {
  const data = readDB();
  const task = data.tasks.find(t => t.id === req.params.id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send({ message: 'Task not found' });
  }
});

// POST create a new task
app.post('/tasks', (req, res) => {
  const data = readDB();
  const newTask = { id: Date.now().toString(), ...req.body };
  data.tasks.push(newTask);
  writeDB(data);
  res.status(201).json(newTask);
});

// PUT update a task
app.put('/tasks/:id', (req, res) => {
  const data = readDB();
  const taskIndex = data.tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex > -1) {
    data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...req.body };
    writeDB(data);
    res.json(data.tasks[taskIndex]);
  } else {
    res.status(404).send({ message: 'Task not found' });
  }
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
  const data = readDB();
  const taskIndex = data.tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex > -1) {
    const removedTask = data.tasks.splice(taskIndex, 1);
    writeDB(data);
    res.json(removedTask);
  } else {
    res.status(404).send({ message: 'Task not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
