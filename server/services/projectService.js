const { supabase } = require("../supabaseClient.js");
const fs = require("fs");
const path = require("path");

/* const uploadImage = async (imagePath, imageName) => {
    const fileContent = fs.readFileSync(imagePath);
    const { data, error } = await supabase.storage
        .from("projects")
        .upload(`public/${imageName}`, fileContent);
    if (error) throw new Error("Error uploading image");
    return data.Key;
}; */

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

const createNewProject = async (name, description, location, size, intention, client) => {
    const { data, error } = await supabase.from('projects').insert([
        { name, description, location, size, intention, client }
    ]);

    if (error) {
        console.error('Error creating project:', error.message);
        throw new Error('Ha ocurrido un error creando el proyecto');
    }
    return data;
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
