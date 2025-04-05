import React from "react";
import Image from "next/image";
import { Phone, Instagram } from "lucide-react";

function Footer() {
    return (
        <div className="flex flex-col justify-center items-center p-5 text-center bg-gray-100 px-4 sm:px-10 md:px-20 w-full">
            <div className="flex flex-col md:flex-row justify-center items-center footerText gap-4 md:gap-0">
                <div className="flex justify-center items-center">
                    <Phone className="footerIcons md:order-none order-first"/>
                    <p className="pl-2">+54 9 11 6851 3268</p>
                </div>
                <div className="px-5 my-3 md:my-0">
                    <Image
                        src="/logo.png"
                        alt="Logo artístico de Claudia Vásquez"
                        width={128}
                        height={128}
                        className="w-12 h-12"
                    />
                </div>
                <div className="flex justify-center items-center">
                    <Instagram className="footerIcons md:order-none order-first" />
                    <p className="md:pr-2 pl-2 md:pl-0">claudiavasquez.art</p>
                </div>
            </div>
            <div className="w-full">
                <hr className="border-black-300 w-full my-3" />
            </div>
            <div className="text-center footerText">
                <p>© Claudia Vásquez</p>
            </div>
        </div>
    );
}

export default Footer;