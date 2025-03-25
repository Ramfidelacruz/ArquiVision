import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AddProject() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [size, setSize] = useState("");
    const [intention, setIntention] = useState("");
    const [client, setClient] = useState("");
    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const navigate = useNavigate();

    const intentionOptions = [
        { value: 'comercial', label: 'Comercial' },
        { value: 'residencial', label: 'Residencial' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'otro', label: 'Otro' }
    ];

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Validar tamaño y tipo de archivos
        const validFiles = files.filter(file => {
            const isValidType = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
            const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
            
            if (!isValidType) {
                alert(`El archivo ${file.name} no es una imagen válida`);
            }
            if (!isValidSize) {
                alert(`El archivo ${file.name} excede el tamaño máximo de 5MB`);
            }
            
            return isValidType && isValidSize;
        });

        setImages(validFiles);
        
        // Crear previsualizaciones
        const urls = validFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(urls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Agregar datos del proyecto
        formData.append('name', name);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('size', size);
        formData.append('intention', intention);
        formData.append('client', client);
        
        // Agregar imágenes
        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await fetch("http://localhost:8080/projects", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error creando el proyecto");
            }

            console.log("Proyecto creado exitosamente:", data);
            navigate("/admin/manage/proyectos");
        } catch (error) {
            console.error("Error detallado:", error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="px-24 py-10 bg-gray-100 min-h-screen flex flex-col items-center w-full ">
            <h2 className="text-3xl font-bold mb-6">Crear un nuevo proyecto</h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:w-96">
                <div>
                    <label className="block text-sm font-medium">
                        Nombre del proyecto
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Descripción
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-2 border rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Locación
                    </label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="p-2 border rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Tamaño (m²)
                    </label>
                    <input
                        type="number"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="p-2 border rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Intención
                    </label>
                    <select 
                        value={intention}
                        onChange={(e) => setIntention(e.target.value)}
                        className="w-full rounded border border-gray-300 p-2"
                        required
                    >
                        <option value="">Seleccione una intención</option>
                        {intentionOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Cliente</label>
                    <input
                        type="text"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        className="p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">
                        Imágenes del Proyecto
                    </label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="p-2 border rounded w-full"
                    />
                    
                    {/* Previsualización de imágenes */}
                    <div className="mt-2 flex gap-2 flex-wrap">
                        {previewUrls.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Preview ${index + 1}`}
                                className="w-24 h-24 object-cover rounded"
                            />
                        ))}
                    </div>
                </div>
                <div className="flex justify-between">
                    <Link to={"/admin/Manage/Proyectos"} className="bg-red-500 px-4 py-2 rounded text-white">
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Añadir Proyecto
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProject;
