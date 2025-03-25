import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProyectDetail() {
    const [project, setProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProject(data);
                console.log("Proyecto cargado:", data);
            })
            .catch(error => {
                console.error("Error al cargar el proyecto:", error);
            });
    }, [id]);

    if (!project) {
        return <div className="text-center py-10">Cargando...</div>;
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === (project.images?.length - 1) ? 0 : prev + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? (project.images?.length - 1) : prev - 1
        );
    };

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full relative">
                        {project.images && project.images.length > 0 ? (
                            <>
                                <img
                                    alt={project.name}
                                    className="w-full h-64 sm:h-96 object-cover object-center rounded"
                                    src={project.images[currentImageIndex]}
                                />
                                {project.images.length > 1 && (
                                    <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
                                        <button 
                                            onClick={handlePrevImage}
                                            className="bg-white/80 hover:bg-white p-2 rounded-full"
                                        >
                                            ←
                                        </button>
                                        <button 
                                            onClick={handleNextImage}
                                            className="bg-white/80 hover:bg-white p-2 rounded-full"
                                        >
                                            →
                                        </button>
                                    </div>
                                )}
                                <div className="flex mt-4 gap-2 overflow-x-auto">
                                    {project.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`${project.name} ${index + 1}`}
                                            className={`w-20 h-20 object-cover cursor-pointer rounded ${
                                                currentImageIndex === index ? 'border-2 border-blue-500' : ''
                                            }`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <img
                                alt="No imagen disponible"
                                className="w-full h-64 sm:h-96 object-cover object-center rounded"
                                src="https://dummyimage.com/400x400"
                            />
                        )}
                    </div>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            {project.client}
                        </h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                            {project.name}
                        </h1>
                        <p className="leading-relaxed">
                            {project.description}
                        </p>
                        <div className="flex mt-6 pt-4 border-t border-gray-200">
                            <span className="text-gray-500">Ubicación</span>
                            <span className="ml-auto text-gray-900">
                                {project.location}
                            </span>
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500">
                                Tamaño en metros cuadrados
                            </span>
                            <span className="ml-auto text-gray-900">
                                {project.size}
                            </span>
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500">Categoría</span>
                            <span className="ml-auto text-gray-900">
                                {project.intention}
                            </span>
                        </div>
                        <button 
                            onClick={() => navigate(-1)} 
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Volver
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProyectDetail;
