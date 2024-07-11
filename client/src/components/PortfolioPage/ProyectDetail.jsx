import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProyectDetail() {
    const [proyect, setProyect] = useState({});
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:8080/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProyect(data);
                console.log(data);
            });
    }, []);

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img
                        alt="ecommerce"
                        className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                        src="https://dummyimage.com/400x400"
                    />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mb-6 lg:mb-0 ">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            {proyect.client}
                        </h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                            {proyect.name}
                        </h1>
                        <div className="flex mb-4">
                            <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                                Description
                            </a>
                        </div>
                        <p className="leading-relaxed mb-4">
                            {proyect.description}
                        </p>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500">Ubicacion</span>
                            <span className="ml-auto text-gray-900">
                                {proyect.location}
                            </span>
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500">
                                Tamaño en metros cuadrados
                            </span>
                            <span className="ml-auto text-gray-900">
                                {proyect.size}
                            </span>
                        </div>
                        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                            <span className="text-gray-500">Categoria</span>
                            <span className="ml-auto text-gray-900">
                                {proyect.intention}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProyectDetail;
