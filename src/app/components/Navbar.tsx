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
    const { categories, loading, error, fetchCategories } = useCategories();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

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
            <div className="lg:p-5 w-full flex items-center shadow-lg rounded-b px-4 lg:px-22 py-3 z-[60] bg-white sticky top-0">
                <div className="w-1/4">
                    <Link
                        href="/"
                        onClick={() => isMenuOpen && setIsMenuOpen(false)}
                        className="inline-block"
                    >
                        <Image
                            src={Firma}
                            alt="Firma de Claudia Vásquez"
                            className="w-32 lg:w-44"
                            style={{ display: 'block' }}
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
                    <div className="container mx-auto px-4 py-2">
                        <MobileNavMenu
                            closeMenu={() => setIsMenuOpen(false)}
                            categories={categories}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

function MobileNavMenu({
    closeMenu,
    categories,
    loading,
    error,
}: {
    closeMenu: () => void;
    categories: any[];
    loading: boolean;
    error: any;
}) {
    const [showSeries, setShowSeries] = useState(true);

    const toggleSeries = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowSeries(!showSeries);
    };

    return (
        <div className="bg-white">
            <nav className="relative">
                <ul className="relative space-y-6">
                    <li>
                        <Link
                            href="/"
                            onClick={closeMenu}
                            className="block text-lg hover:text-claudiapurple transition-colors"
                        >
                            Galería
                        </Link>
                    </li>
                    
                    <li className="relative">
                        <div className="flex items-center mb-4">
                            <span className="text-lg font-medium">Series</span>
                            <button
                                onClick={toggleSeries}
                                className="ml-2 p-1 focus:outline-none"
                                aria-label="Mostrar/ocultar series"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`w-3 h-3 fill-current transition-transform duration-300 ${
                                        showSeries ? "rotate-0" : "-rotate-90"
                                    }`}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
                                </svg>
                            </button>
                        </div>

                        {showSeries && (
                            <div className="pl-2 border-l-2 border-claudiagray">
                                {loading && (
                                    <div className="py-2 pl-4">
                                        Cargando categorías...
                                    </div>
                                )}

                                {error && (
                                    <div className="py-2 pl-4 text-red-500">
                                        Error al cargar las categorías
                                    </div>
                                )}

                                <ul className="space-y-3">
                                    {!loading &&
                                        !error &&
                                        categories.map((category) => (
                                            <li
                                                key={category.id}
                                                className="pl-4"
                                            >
                                                <Link
                                                    href={`/${category.name}`}
                                                    onClick={closeMenu}
                                                    className="block py-1 hover:text-claudiapurple transition-colors"
                                                >
                                                    {category.name}
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}
                    </li>

                    <li className="border-t pt-4">
                        <Link
                            href="/bio"
                            onClick={closeMenu}
                            className="block text-lg hover:text-claudiapurple transition-colors"
                        >
                            Bio
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/expo"
                            onClick={closeMenu}
                            className="block text-lg hover:text-claudiapurple transition-colors"
                        >
                            Expos
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/disponibles"
                            onClick={closeMenu}
                            className="block text-lg hover:text-claudiapurple transition-colors"
                        >
                            Disponibles
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;