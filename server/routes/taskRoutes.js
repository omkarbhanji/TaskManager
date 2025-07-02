const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../middleware/authMiddleware');


const {updateTaskDetails, getTaskById, deleteTask} = require('../controller/taskController');

router.put('/:id', protect, updateTaskDetails);
router.delete('/:id', protect, restrictTo(['Manager']), deleteTask);
router.get('/:id', protect, getTaskById)

module.exports = router;