import React, { useState, useEffect } from "react";
import ProyectItem from "./ProyectItem";

function GalleryProyects() {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/projects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("peticion, todas las listas de proyectos"); // Aquí tendrás la lista de proyectos
                setProjects(data);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    }, []);
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                        Master Cleanse Reliac Heirloom
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Whatever cardigan tote bag tumblr hexagon brooklyn
                        asymmetrical gentrify, subway tile poke farm-to-table.
                        Franzen you probably haven't heard of them man bun deep
                        jianbing selfies heirloom.
                    </p>
                </div>
                <div className="flex flex-wrap -m-4">
                    {projects.map((project) => {
                        console.log("este es un proyecto: ");
                        console.log(project.id);
                        return (
                            <ProyectItem key={project.id} project={project} />
                        );
                    })}
                    
                </div>
            </div>
        </section>
    );
}

export default GalleryProyects;
