// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db'); // ensure this exists

const app = express();
app.use(cors());
app.use(express.json());

// simple request logger to catch hidden chars, paths, etc.
app.use((req, res, next) => {
  console.log('Incoming:', req.method, req.url);
  next();
});

// quick ping route to confirm server is alive
app.get('/ping', (req, res) => res.json({ ok: true }));

// try to connect DB (logs success/failure)
connectDB().catch(err => {
  console.error('DB connect failed (index.js):', err && err.message ? err.message : err);
  // do not exit here so routes can still be tested; but you can exit in production
});

// load and mount tasks router
const tasksModule = require(path.join(__dirname, 'routes', 'tasks'));
console.log('tasksModule type:', typeof tasksModule);
console.log('isRouter? has "stack"?', tasksModule && !!tasksModule.stack);

app.use('/api/tasks', tasksModule);

// catch-all 404 handler for undefined routes (helps debugging)
app.use((req, res) => {
  res.status(404).send(`Cannot ${req.method} ${req.path}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
