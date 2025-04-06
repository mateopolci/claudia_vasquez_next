import Link from "next/link";
import Navbar from "./components/Navbar";

export default function NotFound() {
    return (
        <div className="flex flex-col justify-between min-h-screen items-center">
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-20 mb-10">
                <h1 className="text-6xl font-bold mb-4">Error 404</h1>
                <h2 className="text-2xl mb-6">Página no encontrada</h2>
            </div>
            <p className="mb-6">
                Lo sentimos, la página que estás buscando no existe.
            </p>
        </div>
    );
}
