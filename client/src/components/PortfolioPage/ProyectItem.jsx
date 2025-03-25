import React from "react";
import { Link } from "react-router-dom";

function ProyectItem({project}) {
    // Usar la primera imagen del array de imágenes, o una imagen por defecto
    const imageUrl = project.images?.[0] || "https://dummyimage.com/600x360";

    return (
        <Link to={`/Portafolio/${project.id}`} className="lg:w-1/3 sm:w-1/2 p-4">
            <div className="flex relative h-48 sm:h-64">
                <img
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    src={imageUrl}
                />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                        {project.client}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {project.name}
                    </h1>
                    <p className="leading-relaxed line-clamp-3">
                        {project.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default ProyectItem;
