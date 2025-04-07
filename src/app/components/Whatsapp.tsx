import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function Whatsapp() {
    // Número de teléfono sin espacios y con formato adecuado
    const phoneNumber = "5491168513268";
    const message = "Hola Claudia, visité tu página web y me interesó una de tus obras. ¿Podrías brindarme más información al respecto?";
    
    return (
        <div>
            <a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
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