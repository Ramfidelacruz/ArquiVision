import React from "react";

function Proyect() {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            BRAND NAME
                        </h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                            Animated Night Hill Illustrations
                        </h1>
                        <div className="flex mb-4">
                            <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                                Description
                            </a>
                        </div>
                        <p className="leading-relaxed mb-4">
                            Fam locavore kickstarter distillery. Mixtape
                            chillwave tumeric sriracha taximy chia microdosing
                            tilde DIY. XOXO fam inxigo juiceramps cornhole raw
                            denim forage brooklyn. Everyday carry +1 seitan
                            poutine tumeric. Gastropub blue bottle austin
                            listicle pour-over, neutra jean.
                        </p>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500">Ubicacion</span>
                            <span className="ml-auto text-gray-900">
                                Santo Domingo
                            </span>
                        </div>
                        <div className="flex border-t border-gray-200 py-2">
                            <span className="text-gray-500">
                                Tamaño en metros cuadrados
                            </span>
                            <span className="ml-auto text-gray-900">347</span>
                        </div>
                        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                            <span className="text-gray-500">Categoria</span>
                            <span className="ml-auto text-gray-900">
                                Comercial
                            </span>
                        </div>
                        
                    </div>
                    <img
                        alt="ecommerce"
                        className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                        src="https://dummyimage.com/400x400"
                    />
                </div>
            </div>
        </section>
    );
}

export default Proyect;
