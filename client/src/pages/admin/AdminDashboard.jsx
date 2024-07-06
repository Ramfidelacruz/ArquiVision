import React from "react";
/* import { Link } from "react-router-dom"; */
import Nav from "../../components/admin/Nav";
import QuickActions from "../../components/admin/dashboard/QuickActions";
import ResentActivity from "../../components/admin/dashboard/ResentActivity";
function AdminDashboard() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Nav />
            <div className="flex gap-3">
                <div className=" border-gray-200 border p-4 rounded-lg w-4/12 min-h-14">
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font text-3xl font-medium mb-2">
                            Dashboard
                        </h2>
                        <p className="text-gray-500">
                            Bienvenido a tu panel de administración. Aquí podrás
                            ver estadísticas clave, actividades recientes y
                            accesos rápidos a las funciones más utilizadas.
                        </p>
                    </div>
                </div>

                <div className=" border-gray-200 border p-4 rounded-lg w-4/12 min-h-14">
                    <div className="flex-grow">
                        <p className="">Resumen estadistico</p>
                        <h2 className="text-gray-900 title-font text-4xl font-medium mb-2">
                            34
                        </h2>
                        <p className="text-gray-500 text-sm min-h-14">
                            Proyectos totales
                        </p>
                    </div>
                </div>

                <div className=" border-gray-200 border p-4 rounded-lg w-4/12 min-h-14">
                    <div className="flex-grow">
                        <p className="text-gray-500">Resumen estadistico</p>
                        <h2 className="text-gray-900 title-font text-4xl font-medium mb-2">
                            23
                        </h2>
                        <p className="text-gray-500 text-sm min-h-14">
                            Miembros del equipo
                        </p>
                    </div>
                </div>
            </div>
            {/* --------------------------------------------- */}

            {/* --------------------------------------------- */}
            {/* --------------------------------------------- */}
            <div className="flex flex-col min-h-screen bg-muted/40">
                <main className="flex-1 grid gap-6 p-4 md:p-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"></div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                        <ResentActivity />
                        {/* -----------acciones rapidas-------------- */}
                        <QuickActions />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;
