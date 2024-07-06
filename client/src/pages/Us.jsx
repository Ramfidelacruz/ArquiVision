import React from "react";
import AboutUs from "../components/Uspage/AboutUs";
import Nav from "../components/Nav";
import OurTeam from "../components/Uspage/OurTeam";
import Footer from "../components/Homepage/Footer";

function Us() {
    return (
        <div>
            <Nav />
            <AboutUs />
            <OurTeam />
            <Footer />
        </div>
    );
}

export default Us;
