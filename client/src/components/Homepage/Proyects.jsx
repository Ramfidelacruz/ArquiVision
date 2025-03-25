import React, { useState, useEffect } from "react";
import Proyect from "./Proyect";
import ProyectL from "./ProyectL";

function Proyects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://localhost:8080/projects", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div>
            {projects.length > 0 && (
                <>
                    <Proyect project={projects[0]} />
                    <ProyectL project={projects[1]} />
                </>
            )}
        </div>
    );
}

export default Proyects;
