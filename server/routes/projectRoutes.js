const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Asegúrate de que las funciones del controlador existan
// Verifica que estén correctamente exportadas en el controlador

// Rutas para proyectos
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProjectById);
router.post('/projects', projectController.createProject);
// Comentamos esta ruta si updateProject no existe
// router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);
router.put('/projects/order', projectController.updateProjectOrder);
router.put('/projects/:id/move-up', projectController.moveProjectUp);
router.put('/projects/:id/move-down', projectController.moveProjectDown);

module.exports = router; 