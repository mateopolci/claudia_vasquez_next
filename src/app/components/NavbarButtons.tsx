import React from "react";
import Link from "next/link";
function NavbarButtons() {
    return (
        <div className="bg-white">
            <nav className="flex px-4   items-center relative">
                <ul className="md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0">
                    <li className="relative parent">
                        <Link
                            href="#"
                            className="flex justify-between md:inline-flex py-4 px-2 mx-2 items-center hover:bg-gray-50 space-x-2"
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
                        <ul className="child transition duration-300 md:absolute top-full md:w-72 bg-white md:shadow-[-5px_15px_15px_rgba(0,0,0,0.1),15px_15px_15px_rgba(0,0,0,0.1)] md:rounded-b">
                            <p className="px-5 pt-3 text-sm italic text-claudiagray">Series</p>
                            <li className="px-4 py-2">
                                <Link
                                    href="#"
                                    className="flex hover:bg-claudiapurple hover:text-claudiawhite p-1 transition duration-300 rounded-xs"
                                >
                                    Conexiones Lineales
                                </Link>
                            </li>
                            <li className="px-4 py-2">
                                <Link
                                    href="#"
                                    className="flex hover:bg-claudiapurple hover:text-claudiawhite p-1 transition duration-300 rounded-xs"
                                >
                                    Materia Convergente
                                </Link>
                            </li>
                            <li className="px-4 py-2">
                                <Link
                                    href="#"
                                    className="flex hover:bg-claudiapurple hover:text-claudiawhite p-1 transition duration-300 rounded-xs"
                                >
                                    Ventanas
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex md:inline-flex py-4 px-2 mx-2 items-center hover:bg-gray-50"
                        >
                            <span>Bio</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex md:inline-flex py-4 px-2 mx-2 items-center hover:bg-gray-50"
                        >
                            <span>Expos</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            className="flex md:inline-flex py-4 px-2 mx-2 items-center hover:bg-gray-50"
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
