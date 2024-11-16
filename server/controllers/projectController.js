const { createNewProject, fetchAllProjects, fetchProjectById, removeProject } = require('../services/projectService.js');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const getProjects = async (req, res) => {
    try {
        const projects = await fetchAllProjects();
        res.json(projects);
    } catch (error) {
        console.log("un error: " + error)
        res.status(500).json({ error: error.message });
    }
};


const getProjectById = async (req, res) => {
    try {
        const project = await fetchProjectById(req.params.id);
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProject = async (req, res) => {
    console.log("Iniciando creación de proyecto");
    console.log("Body recibido:", req.body);
    console.log("Archivos recibidos:", req.files);
    
    try {
        const { name, description, location, size, intention, client } = req.body;
        const images = req.files;

        if (!images || images.length === 0) {
            console.log("No se recibieron imágenes");
        }

        const result = await createNewProject(
            name, 
            description, 
            location, 
            size, 
            intention, 
            client, 
            images
        );
        
        console.log("Proyecto creado exitosamente:", result);
        res.status(201).json({ message: 'Project created successfully', data: result });
    } catch (error) {
        console.error('Error detallado en createProject:', error);
        res.status(500).json({ 
            error: error.message,
            stack: error.stack,
            details: error.details || 'No additional details'
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        await removeProject(req.params.id);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject: [upload.array('images', 10), createProject],
    deleteProject
};
