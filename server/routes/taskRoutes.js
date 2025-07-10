const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../middleware/authMiddleware');


const {updateTaskDetails, getTaskById, deleteTask, markTaskCompleted} = require('../controller/taskController');

router.put('/:id', protect, updateTaskDetails);
router.delete('/:id', protect, restrictTo(['Manager']), deleteTask);
router.get('/:id', protect, getTaskById)
router.put('/:id/complete', protect, restrictTo(['Employee']), markTaskCompleted);

module.exports = router;