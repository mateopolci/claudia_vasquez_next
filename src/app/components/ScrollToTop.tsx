"use client";

import React, { useState, useEffect } from "react";

function ScrollToTop() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const startShowingAt = 25; // Empieza en 25%
    const fullyVisibleAt = 35; // Totalmente visible al 35%

    const handleScroll = () => {
        const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (window.scrollY / documentHeight) * 100;
        
        setScrollProgress(scrollPercent);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Calculo de opacidad basada en el progreso de scroll
    const calculateOpacity = () => {
        if (scrollProgress <= startShowingAt) return 0;
        if (scrollProgress >= fullyVisibleAt) return 1;
        
        return (scrollProgress - startShowingAt) / (fullyVisibleAt - startShowingAt);
    };

    const buttonStyle = {
        opacity: calculateOpacity(),
        pointerEvents: scrollProgress > startShowingAt ? 'auto' : 'none',
        transform: `translateY(${scrollProgress > startShowingAt ? 0 : '20px'})`
    } as React.CSSProperties;

    return (
        <button 
            className="button" 
            onClick={scrollToTop} 
            aria-label="Volver al inicio"
            style={buttonStyle}
        >
            <svg className="svgIcon" viewBox="0 0 384 512">
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
            </svg>
        </button>
    );
}

export default ScrollToTop;