import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Aquí debería ir la lógica de autenticación
        if (mail === "admin@gmail.com" && password === "password") {
            navigate("/admin/Dashboard");
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    };
    return (
        <section className="text-gray-600 body-font flex justify-center items-center h-screen">
            <div className="border lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full">
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                    Iniciar sesion
                </h2>

                <form onSubmit={handleLogin}>
                    <div className="relative mb-4">
                        <label
                            htmlFor="email"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            onChange={(e) => setMail(e.target.value)}
                        />
                    </div>
                    <div className="relative mb-4">
                        <label
                            htmlFor="password"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </section>
    );
}

export default AdminLogin;
