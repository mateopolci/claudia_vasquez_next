"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCategories } from "../hooks/useCategories";

function NavbarButtons() {
    const { categories, loading, error, fetchCategories } = useCategories();
    const [isHovering, setIsHovering] = useState(false);

    // Initialize fetch when hovering for the first time
    const handleMouseEnter = () => {
        setIsHovering(true);
        fetchCategories();
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <div className="bg-white">
            <nav className="lg:flex lg:px-4 lg:items-center lg:relative">
                <ul className="lg:px-2 ml-auto lg:flex lg:space-x-2 absolute lg:relative top-full left-0 right-0">
                    <li 
                        className="relative parent"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link
                            href="#"
                            className="flex justify-between lg:inline-flex py-4 px-2 mx-2 items-center hover:bg-gray-50 space-x-2"
                        >
                            <span>Portfolio</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3 fill-current"
                                viewBox="0 0 24 24"
                            >
                                <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
                            </svg>
                        </Link>
                        <ul className="py-2 child transition duration-300 lg:absolute top-full lg:w-72 bg-white lg:shadow-[-5px_15px_15px_rgba(0,0,0,0.1),15px_15px_15px_rgba(0,0,0,0.1)] lg:rounded-b">
                            <p className="px-5 pt-3 text-sm italic text-claudiagray">Series</p>
                            
                            {loading && (
                                <li className="px-4 py-2">
                                    <div className="flex p-1">
                                        Cargando categorías...
                                    </div>
                                </li>
                            )}
                            
                            {error && (
                                <li className="px-4 py-2">
                                    <div className="flex p-1 text-red-500">
                                        Error al cargar las categorías
                                    </div>
                                </li>
                            )}
                            
                            {!loading && !error && categories.map((category) => (
                                <li key={category.id} className="px-4 py-2">
                                    <Link
                                        href={`/portfolio/${category.documentId}`}
                                        className="flex hover:bg-claudiapurple hover:text-claudiawhite p-1 transition duration-300 rounded-xs"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex lg:inline-flex py-4 px-2 mx-2 items-center hover:bg-gray-50"
                        >
                            <span>Bio</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex lg:inline-flex py-4 px-2 mx-2 items-center hover:bg-gray-50"
                        >
                            <span>Expos</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex lg:inline-flex py-4 px-2 mx-2 items-center hover:bg-gray-50"
                        >
                            <span>Disponibles</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavbarButtons;