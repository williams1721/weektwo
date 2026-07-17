require('dotenv').config();
const express = require('express');
const path = require('path');
const requestLogger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// ----- Middleware -----
app.use(express.json());        // JSON body parsing
app.use(requestLogger);         // custom request logging (bonus)
app.use(express.static(path.join(__dirname, 'public'))); // serves index.html at GET /

// ----- In-memory "database" for demo purposes -----
const users = {"KELLY WILIAM":"kellyvictor1721@gmail.com"}; // id -> { name, email }
let nextId = 1;

// ----- Routes -----

// GET /api -> simple confirmation message
app.get('/api', (req, res) => {
  res.send('My Week 2 API!');
});

// POST /user -> accepts { name, email }, responds "Hello, [name]!"
app.post('/user', (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Both "name" and "email" are required.' });
  }

  const id = nextId++;
  users[id] = { name, email };

  res.status(201).json({ message: `Hello, ${name}!`, id });
});

// GET /user/:id -> "User [id] profile"
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const user = users[id];

  if (!user) {
    return res.status(404).json({ error: `User ${id} not found.` });
  }

  res.json({
    message: `User ${id} profile`,
    id,
    name: user.name,
    email: user.email
  });
});

// ----- 404 handler for unmatched routes -----
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ----- Central error-handling middleware -----
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
