const express = require('express');
const router = express.Router();

const {createProject, getAllProjects, getProjectById, updateProject, deleteProject} = require('../controller/projectController');
const {createTask, getAllTasks} = require('../controller/taskController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

router.post('/', protect, restrictTo(['Manager']),  createProject);
router.get('/', protect, getAllProjects);
router.get('/:id', protect, getProjectById);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

router.post('/:id/tasks',protect, restrictTo(['Manager']), createTask);
router.get('/:id/tasks', protect, getAllTasks);


module.exports = router;