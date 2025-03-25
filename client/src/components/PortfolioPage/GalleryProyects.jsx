import React from "react";
import ProyectItem from "./ProyectItem";

function GalleryProyects({ projects }) {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                        Otros Proyectos
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Aquí puedes ver más proyectos que hemos realizado.
                    </p>
                </div>
                <div className="flex flex-wrap -m-4">
                    {projects.map((project) => (
                        <ProyectItem key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default GalleryProyects;
