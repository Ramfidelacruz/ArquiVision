import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import Nav from "./components/Nav";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Nav />
        <Home />
    </React.StrictMode>
);
