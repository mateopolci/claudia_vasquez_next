import React from "react";
import Image from "next/image";
import { Phone, Instagram } from "lucide-react";

function Footer() {
    return (
        <div className="flex flex-col justify-center items-center p-5 text-center bg-gray-100 px-20 w-full">
            <div className="flex justify-center items-center">
                <div className="flex">
                    <Phone/>
                    <p className="pl-2">+54 9 11 6851 3268</p>
                </div>
                <div className="px-5">
                    <Image
                        src="/logo.png"
                        alt="Logo artístico de Claudia Vásquez"
                        width={128}
                        height={128}
                        className="w-12 h-12"
                    />
                </div>
                <div className="flex">
                    <Instagram />
                    <p className="pl-2">claudiavasquez.art</p>
                </div>
            </div>
            <div className="w-full">
                <hr className="border-black-300 w-full my-3" />
            </div>
            <div className="text-center">
                <p>© Claudia Vásquez</p>
            </div>
        </div>
    );
}

export default Footer;