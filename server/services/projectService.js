const supabase = require("../supabaseClient.js");
const { v4: uuidv4 } = require('uuid');

const uploadImage = async (file) => {
    try {
        console.log("Iniciando carga de imagen:", file.originalname);
        
        // Verificar que el archivo existe y tiene el formato correcto
        if (!file || !file.buffer) {
            throw new Error('Archivo inválido');
        }

        // Convertir el buffer de multer a un Blob
        const blob = new Blob([file.buffer], { type: file.mimetype });
        
        // Generar nombre único para el archivo
        const fileExt = file.originalname.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;

        console.log("Intentando subir archivo a Supabase:", filePath);

        // Subir a Supabase Storage
        const { data, error } = await supabase.storage
            .from('projects')
            .upload(filePath, blob, {
                contentType: file.mimetype,
                cacheControl: '3600'
            });

        if (error) {
            console.error('Error en Supabase Storage:', error);
            throw error;
        }

        console.log("Archivo subido exitosamente:", data);

        // Obtener la URL pública
        const { data: publicUrlData } = supabase.storage
            .from('projects')
            .getPublicUrl(filePath);

        console.log("URL pública generada:", publicUrlData.publicUrl);

        return publicUrlData.publicUrl;
    } catch (error) {
        console.error('Error detallado en uploadImage:', error);
        throw error;
    }
};

const fetchAllProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*");
    if (error) throw new Error("Error fetching projects");
    return data;
};

const fetchProjectById = async (id) => {
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
    if (error) throw new Error("Error fetching project");
    return data;
};

const createNewProject = async (name, description, location, size, intention, client, images = []) => {
    try {
        console.log("Iniciando creación de proyecto con imágenes:", images.length);

        // Subir todas las imágenes y obtener sus URLs
        const imageUrls = await Promise.all(
            images.map(image => uploadImage(image))
        );

        console.log("URLs de imágenes generadas:", imageUrls);

        // Crear el proyecto con las URLs de las imágenes
        const { data, error } = await supabase
            .from('projects')
            .insert([{
                name,
                description,
                location,
                size: parseInt(size),
                intention,
                client,
                images: imageUrls
            }])
            .select();

        if (error) {
            console.error('Error en Supabase Database:', error);
            throw error;
        }

        console.log("Proyecto creado exitosamente:", data);
        return data;
    } catch (error) {
        console.error('Error detallado en createNewProject:', error);
        throw error;
    }
};

const removeProject = async (id) => {
    const { data, error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);
    if (error) throw new Error("Error deleting project");
    return data;
};

module.exports = {
    fetchAllProjects,
    fetchProjectById,
    createNewProject,
    removeProject,
};
