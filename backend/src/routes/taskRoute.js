const express = require('express');
const router = express.Router();
const {
  getTasksByClient,
  createTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
  getClientStats,
} = require('../controllers/taskController');

router.get('/client/:clientId', getTasksByClient);
router.get('/client/:clientId/stats', getClientStats);
router.post('/', createTask);
router.patch('/:id/status', updateTaskStatus);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;