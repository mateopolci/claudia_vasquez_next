import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function Whatsapp() {
    return (
        <div>
            <a
                href="https://api.whatsapp.com/send?phone=+54 9 11 6851-3268&text=Hola%20Claudia%2C%20visité%20tu%20página%20web%20y%20me%20interesó%20una%20de%20tus%20obras.%20¿Podrías%20brindarme%20más%20información%20al%20respecto%3F"
                className="floatBottomRight flex items-center justify-center"
                target="_blank"
            >
                <FaWhatsapp className="fa fa-whatsapp" />
            </a>
        </div>
    );
}

export default Whatsapp;
