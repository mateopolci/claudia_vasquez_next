import React from "react";
import Image from "next/image";
import { Phone, Instagram } from "lucide-react";

function Footer() {
    return (
        <div className="relative flex flex-col justify-center items-center p-5 text-center bg-gray-100 px-4 sm:px-10 md:px-20 w-full min-h-[100px]">
            <div className="absolute top-0 left-0 w-full h-[5px] shadow-[0_-2px_4px_rgba(0,0,0,0.1)]"></div>
            <div className="flex flex-col md:flex-row justify-center items-center footerText gap-2 md:gap-0">
                <div className="flex justify-center items-center md:w-1/3">
                    <Phone className="footerIcons md:order-none order-first min-w-[20px]" />
                    <p className="pl-2 whitespace-nowrap text-xs sm:text-sm md:text-base">
                        +54 9 11 2887 3109
                    </p>
                </div>
                <div className="px-5 my-1 md:my-0 md:w-1/3 flex justify-center">
                    <Image
                        src="/logo.png"
                        alt="Logo artístico de Claudia Vásquez"
                        width={128}
                        height={128}
                        className="w-10 h-10 sm:w-12 sm:h-12"
                    />
                </div>
                <div className="flex justify-center items-center md:w-1/3">
                    <Instagram className="footerIcons md:order-none order-first min-w-[20px]" />
                    <p className="ml-2 whitespace-nowrap text-xs sm:text-sm md:text-base">
                        claudiavasquez.art
                    </p>
                </div>
            </div>
            <div className="w-full">
                <hr className="border-black-300 w-full my-3" />
            </div>
            <div className="container mx-auto py-6 px-4">
                <p className="text-center text-sm text-gray-600">
                    © {new Date().getFullYear()} Claudia Vásquez. Todos los
                    derechos reservados.
                </p>
            </div>
        </div>
    );
}

export default Footer;
