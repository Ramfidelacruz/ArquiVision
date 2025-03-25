const { createClient } = require('@supabase/supabase-js');
const supabase = require('../supabaseClient');
const { v4: uuidv4 } = require('uuid');

const uploadImage = async (file) => {
    try {
        const fileName = `${Date.now()}_${file.originalname}`;
        const { data, error } = await supabase.storage
            .from('projects')
            .upload(`images/${fileName}`, file.buffer, {
                contentType: file.mimetype,
                cacheControl: '3600'
            });

        if (error) throw error;

        // Obtener la URL pública de la imagen
        const { data: { publicUrl } } = supabase.storage
            .from('projects')
            .getPublicUrl(`images/${fileName}`);

        return publicUrl;
    } catch (error) {
        console.error('Error al subir imagen:', error);
        throw error;
    }
};

const fetchAllProjects = async () => {
    const { data, error } = await supabase
        .from('projects')
        .select('*');
    
    if (error) throw error;
    return data;
};

const fetchProjectById = async (id) => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) throw error;
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
                intention: intention.toLowerCase(),
                client,
                images: imageUrls
            }])
            .select();

        if (error) {
            console.error('Error en Supabase:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error en createNewProject:', error);
        throw error;
    }
};

const removeProject = async (id) => {
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
    
    if (error) throw error;
};

module.exports = {
    createNewProject,
    fetchAllProjects,
    fetchProjectById,
    removeProject
};
