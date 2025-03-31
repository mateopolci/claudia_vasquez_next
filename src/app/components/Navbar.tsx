"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Firma from "/public/firma.png";
import { Instagram, Menu, X } from "lucide-react";
import NavbarButtons from "./NavbarButtons";
import Link from "next/link";
import { useCategories } from "../hooks/useCategories";
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMenuOpen]);

    return (
        <>
            <div className="lg:p-5 w-full flex items-center shadow-lg rounded-b px-4 lg:px-22 py-3 relative z-[60]">
                <div className="w-1/4">
                    <Link href="/">
                        <Image
                            src={Firma}
                            alt="Firma de Claudia Vásquez"
                            className="w-32 lg:w-44"
                        />
                    </Link>
                </div>

                <div className="hidden lg:flex flex-grow justify-center">
                    <NavbarButtons />
                </div>

                <div className="w-3/4 lg:w-1/4 flex justify-end items-center">
                    <a
                        href="https://www.instagram.com/clauvasquez.art/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mr-4"
                    >
                        <Instagram size={32} color="#000000" />
                    </a>
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X size={32} color="#000000" />
                        ) : (
                            <Menu size={32} color="#000000" />
                        )}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 bg-white z-50 lg:hidden overflow-y-auto pt-20">
                    <div className="px-4 py-2">
                        <MobileNavMenu closeMenu={() => setIsMenuOpen(false)} />
                    </div>
                </div>
            )}
        </>
    );
}

function MobileNavMenu({ closeMenu }: { closeMenu: () => void }) {
    const { categories, loading, error, fetchCategories } = useCategories();

    // Fetch categories when the mobile menu opens
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <div className="flex flex-col space-y-4">
            <div className="border-b pb-2">
                <Link href="/" className="font-medium mb-2 z-10">Portfolio</Link>
                <ul className="ml-4 space-y-4">
                    {loading && <li className="py-2">Cargando categorías...</li>}
                    
                    {error && (
                        <li className="py-2 text-red-500">
                            Error al cargar las categorías
                        </li>
                    )}
                    
                    {!loading && !error && categories.map((category) => (
                        <li key={category.id}>
                            <Link
                                href={`/portfolio/${category.documentId}`}
                                onClick={closeMenu}
                                className="block py-2 hover:text-claudiapurple transition duration-300"
                            >
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <Link
                href="/bio"
                onClick={closeMenu}
                className="block py-2 hover:text-claudiapurple transition duration-300"
            >
                Bio
            </Link>

            <Link
                href="/expo"
                onClick={closeMenu}
                className="block py-2 hover:text-claudiapurple transition duration-300"
            >
                Expos
            </Link>

            <Link
                href="/disponibles"
                onClick={closeMenu}
                className="block py-2 hover:text-claudiapurple transition duration-300"
            >
                Disponibles
            </Link>
        </div>
    );
}

export default Navbar;