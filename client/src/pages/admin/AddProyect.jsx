import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AddProject() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [size, setSize] = useState("");
    const [intention, setIntention] = useState("");
    const [client, setClient] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name: name,
            description: description,
            location: location,
            size: size,
            intention: intention,
            client: client,
        };

        console.log(
            "estos son los datos del fromdata desde el frontend: ",
            JSON.stringify(formData)
        );

        try {
            const response = await fetch("http://localhost:8080/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Error creating project");
            }

            navigate("/admin/manage/proyectos");
        } catch (error) {
            console.error("Error:", error);
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
                    <input
                        type="text"
                        value={intention}
                        onChange={(e) => setIntention(e.target.value)}
                        className="p-2 border rounded w-full"
                        required
                    />
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
