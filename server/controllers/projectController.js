const { createNewProject, fetchAllProjects, fetchProjectById, removeProject } = require('../services/projectService.js');

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
    console.log("peticion para crear un proyecto nuevo")
    console.log("data: ", req.body);
    
    try {
        const { name, description, location, size, intention, client } = req.body;
        
        await createNewProject(name, description, location, size, intention, client);
        res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        console.error('Error in createProject:', error.message);
        res.status(500).json({ error: error.message });
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
    createProject,
    deleteProject
};
