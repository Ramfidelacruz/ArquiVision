import React from "react";
import Hero from "../components/Homepage/Hero";
import Services from "../components/Homepage/Services";
import Proyects from "../components/Homepage/Proyects";
import MVV from "../components/Homepage/MVV";
import Contact from "../components/Homepage/Contact";
import Footer from "../components/Homepage/Footer";

function Home() {
    return (
        <div>
            <Hero />
            <Services />
            <Proyects />
            <MVV />
            <Contact />
            <Footer />
        </div>
    );
}

export default Home;
