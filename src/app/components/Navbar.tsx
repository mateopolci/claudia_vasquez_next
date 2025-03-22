"use client";
import React from "react";
import Image from "next/image";
import Firma from "/public/firma.png";
import { Instagram } from "lucide-react";
import NavbarButtons from "./NavbarButtons";
import Link from "next/link";

function Navbar() {
    return (
        <div className="p-5 w-full flex items-center md:shadow-lg md:rounded-b px-22">
            <div className="w-1/4">
                <Link href="#">
                    <Image src={Firma} alt="Firma de Claudia Vásquez" className="w-44" />
                </Link>
            </div>
            
            <div className="flex-grow flex justify-center">
                <NavbarButtons />
            </div>
            
            <div className="w-1/4 flex justify-end">
                <a
                    href="https://www.instagram.com/clauvasquez.art/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Instagram size={40} color="#000000" />
                </a>
            </div>
        </div>
    );
}

export default Navbar;
