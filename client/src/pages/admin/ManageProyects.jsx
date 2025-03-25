import React from "react";
import { Link } from "react-router-dom";
import Nav from "../../components/admin/Nav";
import { useState, useEffect } from "react";

function ManageProyects() {
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/projects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error de servidor: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Verificar que data sea un array antes de asignarlo
                if (Array.isArray(data)) {
                    setProjects(data);
                } else if (data.error) {
                    // Si hay un mensaje de error en la respuesta
                    setError(`Error del servidor: ${data.error}`);
                    setProjects([]);
                } else {
                    // Si data no es un array y no contiene error, inicializar como array vacío
                    console.warn("La respuesta no es un array:", data);
                    setProjects([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
                setError(`Error al cargar proyectos: ${error.message}`);
                setProjects([]);
            });
    }, []);

    const handleDelete = async (id) => {
        // Lógica para eliminar proyecto
        /* setProjects(projects.filter((project) => project.id !== id)); */
        const response = await fetch(`http://localhost:8080/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            setProjects(projects.filter((project) => project.id !== id));
        } else {
            console.error("Error deleting project:", response.statusText);
        }
    };

    const moveProjectUp = (index) => {
        if (index > 0) {
            const newProjects = [...projects];
            const temp = newProjects[index - 1];
            newProjects[index - 1] = newProjects[index];
            newProjects[index] = temp;
            setProjects(newProjects);
        }
    };

    const moveProjectDown = (index) => {
        if (index < projects.length - 1) {
            const newProjects = [...projects];
            const temp = newProjects[index + 1];
            newProjects[index + 1] = newProjects[index];
            newProjects[index] = temp;
            setProjects(newProjects);
        }
    };

    // Asegúrate de que projects es un array antes de filtrar
    const filteredProjects = Array.isArray(projects) 
        ? projects.filter((project) =>
            project.name?.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Nav />

            <div className="flex flex-col min-h-screen bg-muted/40">
                <main className="flex-1 p-4 md:p-6">
                    {/* Mostrar mensaje de error si existe */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    <div className="px-12 mb-6 flex justify-between items-center">
                        <div className="relative w-full max-w-md">
                            <input
                                className="flex h-10 border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-lg bg-background pl-8"
                                placeholder="Buscar Proyecto..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Link
                            to="/admin/manage/proyectos/new"
                            className="px-4 py-2 bg-[--primary-color] text-white rounded"
                        >
                            Nuevo proyecto
                        </Link>
                    </div>
                    <div className="max-w-6xl mx-auto">
                        <div
                            className="rounded-lg border bg-card text-card-foreground shadow-sm"
                            data-v0-t="card"
                        >
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                                    Proyectos
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Administra tus proyectos y clientes
                                </p>
                            </div>
                            <div className="p-6">
                                <div className="relative w-full overflow-auto">
                                    <table className="w-full caption-bottom text-sm">
                                        <thead className="[&amp;_tr]:border-b">
                                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                                    Nombre
                                                </th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                                    Cliente
                                                </th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                                    Ubicacion
                                                </th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="[&amp;_tr:last-child]:border-0">
                                            {filteredProjects.map((project, index) => (
                                                <tr
                                                    key={project.id}
                                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                                >
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                        {project.name}
                                                    </td>
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                        {project.client}
                                                    </td>
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                        {project.location}
                                                    </td>
                                                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => moveProjectUp(index)}
                                                                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                                            >
                                                                Mover Arriba
                                                            </button>
                                                            <button
                                                                onClick={() => moveProjectDown(index)}
                                                                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                                            >
                                                                Mover Abajo
                                                            </button>
                                                            <Link
                                                                to={`/admin/manage/proyectos/edit/${project.id}`}
                                                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="w-4 h-4"
                                                                >
                                                                    <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                                                                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                                                    <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
                                                                </svg>
                                                                <span className="sr-only">
                                                                    Edit
                                                                </span>
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        project.id
                                                                    )
                                                                }
                                                                className="inline-flex hover:bg-red-500 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="24"
                                                                    height="24"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="w-4 h-4"
                                                                >
                                                                    <path d="M3 6h18"></path>
                                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                                    <line
                                                                        x1="10"
                                                                        x2="10"
                                                                        y1="11"
                                                                        y2="17"
                                                                    ></line>
                                                                    <line
                                                                        x1="14"
                                                                        x2="14"
                                                                        y1="11"
                                                                        y2="17"
                                                                    ></line>
                                                                </svg>
                                                                <span className="sr-only">
                                                                    Delete
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ManageProyects;
