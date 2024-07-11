const express = require('express');
const { createProject, getProjects, getProjectById, deleteProject } = require('../controllers/projectController.js');

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.delete('/:id', deleteProject);

module.exports = router;
