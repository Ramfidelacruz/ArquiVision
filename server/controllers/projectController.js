const { supabase } = require('../supabaseClient');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB límite por archivo
    }
}).array('images', 10); // máximo 10 imágenes

// Obtener todos los proyectos
const getAllProjects = async (req, res) => {
    try {
        console.log("Iniciando consulta para obtener proyectos");
        
        const { data, error } = await supabase
            .from('projects')
            .select('*');

        if (error) {
            console.error("Error en la consulta a Supabase:", error);
            return res.status(500).json({ error: error.message });
        }
        
        console.log("Proyectos recuperados:", data);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener proyectos:", error);
        return res.status(500).json({ error: error.message });
    }
};

// Obtener un proyecto por ID
const getProjectById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo proyecto
const createProject = async (req, res) => {
    try {
        const projectData = req.body;
        console.log("Creando nuevo proyecto:", projectData);

        // Obtenemos el orden más alto actual para asignar el siguiente
        const { data: existingProjects, error: orderError } = await supabase
            .from('projects')
            .select('order_position')
            .order('order_position', { ascending: false })
            .limit(1);

        if (orderError) throw orderError;
        
        const nextOrder = existingProjects.length > 0 ? (existingProjects[0].order_position || 0) + 1 : 1;
        
        const { data, error } = await supabase
            .from('projects')
            .insert([{ ...projectData, order_position: nextOrder }])
            .select();

        if (error) throw error;

        res.status(201).json(data[0]);
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: error.message });
    }
};

const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) throw error;

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ error: error.message });
    }
};

const updateProjectOrder = async (req, res) => {
    try {
        const newOrder = req.body;
        console.log("Recibida solicitud para actualizar orden:", newOrder);
        
        if (!Array.isArray(newOrder)) {
            return res.status(400).json({ error: "El formato de la solicitud es incorrecto. Se esperaba un array de objetos." });
        }
        
        const updates = await Promise.all(newOrder.map(async (project) => {
            console.log(`Actualizando proyecto ID ${project.id} a orden ${project.order_position}`);
            const { error } = await supabase
                .from('projects')
                .update({ order_position: project.order_position })
                .eq('id', project.id);
                
            if (error) {
                console.error(`Error al actualizar orden del proyecto ${project.id}:`, error);
                throw error;
            }
        }));

        res.status(200).json({ message: 'Orden de proyectos actualizado exitosamente' });
    } catch (error) {
        console.error("Error al actualizar el orden de proyectos:", error);
        res.status(500).json({ error: error.message });
    }
};

// Función para mover un proyecto hacia arriba (disminuir orden)
const moveProjectUp = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Primero obtenemos el proyecto actual
        const { data: currentProject, error: currentError } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();
            
        if (currentError) throw currentError;
        
        // Verificamos si el proyecto tiene un campo order_position
        if (currentProject.order_position === undefined) {
            return res.status(400).json({ message: 'El proyecto no tiene un campo de orden asignado' });
        }
        
        // Encontramos el proyecto que está arriba (menor orden) del actual
        const { data: previousProjects, error: prevError } = await supabase
            .from('projects')
            .select('*')
            .lt('order_position', currentProject.order_position)
            .order('order_position', { ascending: false })
            .limit(1);
            
        if (prevError) throw prevError;
        
        if (previousProjects.length === 0) {
            return res.status(400).json({ message: 'El proyecto ya está en la posición más alta' });
        }
        
        const previousProject = previousProjects[0];
        
        // Intercambiamos las posiciones
        const { error: updateError } = await supabase
            .from('projects')
            .update({ order_position: previousProject.order_position })
            .eq('id', currentProject.id);
            
        if (updateError) throw updateError;
        
        const { error: updatePrevError } = await supabase
            .from('projects')
            .update({ order_position: currentProject.order_position })
            .eq('id', previousProject.id);
            
        if (updatePrevError) throw updatePrevError;
        
        return res.status(200).json({ message: 'Proyecto movido hacia arriba exitosamente' });
    } catch (error) {
        console.error("Error al mover proyecto hacia arriba:", error);
        return res.status(500).json({ error: error.message });
    }
};

// Función para mover un proyecto hacia abajo (aumentar orden)
const moveProjectDown = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Primero obtenemos el proyecto actual
        const { data: currentProject, error: currentError } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();
            
        if (currentError) throw currentError;
        
        // Verificamos si el proyecto tiene un campo order_position
        if (currentProject.order_position === undefined) {
            return res.status(400).json({ message: 'El proyecto no tiene un campo de orden asignado' });
        }
        
        // Encontramos el proyecto que está abajo (mayor orden) del actual
        const { data: nextProjects, error: nextError } = await supabase
            .from('projects')
            .select('*')
            .gt('order_position', currentProject.order_position)
            .order('order_position', { ascending: true })
            .limit(1);
            
        if (nextError) throw nextError;
        
        if (nextProjects.length === 0) {
            return res.status(400).json({ message: 'El proyecto ya está en la posición más baja' });
        }
        
        const nextProject = nextProjects[0];
        
        // Intercambiamos las posiciones
        const { error: updateError } = await supabase
            .from('projects')
            .update({ order_position: nextProject.order_position })
            .eq('id', currentProject.id);
            
        if (updateError) throw updateError;
        
        const { error: updateNextError } = await supabase
            .from('projects')
            .update({ order_position: currentProject.order_position })
            .eq('id', nextProject.id);
            
        if (updateNextError) throw updateNextError;
        
        return res.status(200).json({ message: 'Proyecto movido hacia abajo exitosamente' });
    } catch (error) {
        console.error("Error al mover proyecto hacia abajo:", error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    deleteProject,
    updateProjectOrder,
    moveProjectUp,
    moveProjectDown
};
