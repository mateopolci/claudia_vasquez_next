import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function Whatsapp() {
    const phoneNumber = "5491128873109";
    const message =
        "Hola Claudia, visité tu página web y me interesó una de tus obras. ¿Podrías brindarme más información al respecto?";

    return (
        <div>
            <a
                href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
                    message
                )}`}
                className="floatBottomRight flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaWhatsapp className="fa fa-whatsapp" />
            </a>
        </div>
    );
}

export default Whatsapp;
