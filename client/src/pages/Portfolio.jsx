import React, { useState, useEffect } from "react";
import Proyect from "../components/PortfolioPage/Proyect";
import Nav from "../components/Nav";
import Footer from "../components/Homepage/Footer";
import ProyectL from "../components/PortfolioPage/ProyectL";
import GalleryProyects from "../components/PortfolioPage/GalleryProyects";

function Portfolio() {
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
                setProjects(data);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    }, []);

    return (
        <div>
            <Nav />
            {projects.length > 0 && (
                <>
                    <Proyect project={projects[0]} />
                    <ProyectL project={projects[1]} />
                </>
            )}
            <GalleryProyects projects={projects.slice(2)} />
            <Footer />
        </div>
    );
}

export default Portfolio;
