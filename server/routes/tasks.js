// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

console.log('Loaded tasks router'); // <-- helps confirm this file was required

// GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll({ order: [['createdAt', 'DESC']] });
    res.json(tasks);
  } catch (err) {
    console.error('GET /api/tasks error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const { title, description, assigneeId, dueDate } = req.body;
    const task = await Task.create({ title, description, assigneeId, dueDate });
    res.status(201).json(task);
  } catch (err) {
    console.error('POST /api/tasks error:', err);
    res.status(400).json({ msg: 'Error creating task', error: err.message });
  }
});

// GET /api/tasks/:id
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Not found' });
    res.json(task);
  } catch (err) {
    console.error('GET /api/tasks/:id error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// PATCH /api/tasks/:id
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Not found' });

    const allowed = ['title', 'description', 'assigneeId', 'status', 'dueDate'];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) task[field] = req.body[field];
    });

    await task.save();
    res.json(task);
  } catch (err) {
    console.error('PATCH /api/tasks/:id error:', err);
    res.status(400).json({ msg: 'Error updating task', error: err.message });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Task.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ msg: 'Not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error('DELETE /api/tasks/:id error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
