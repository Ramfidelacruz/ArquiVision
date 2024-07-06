import React from "react";
import Proyect from "../components/PortfolioPage/Proyect";
import Nav from "../components/Nav";
import Footer from "../components/Homepage/Footer";
import ProyectL from "../components/PortfolioPage/ProyectL";
import GalleryProyects from "../components/PortfolioPage/GalleryProyects";

function Portfolio() {
    return (
        <div>
            <Nav />
            <Proyect />
            <ProyectL />
            <GalleryProyects />
            <Footer />
        </div>
    );
}

export default Portfolio;
