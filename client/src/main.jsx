import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Us from "./pages/Us";
import Contacts from "./pages/Contacts";
import Portfolio from "./pages/Portfolio";
import ProyectDetail from "./components/PortfolioPage/ProyectDetail";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Servicios" element={<Services />} />

            <Route path="/Portafolio" element={<Portfolio />} />
            <Route path="/Portafolio/:id" element={<ProyectDetail />} />

            <Route path="/Nosotros" element={<Us />} />
            <Route path="/Contactos" element={<Contacts />} />
            <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
        </Routes>
    </BrowserRouter>
);
