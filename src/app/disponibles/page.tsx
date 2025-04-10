"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import Grid from "../components/Grid";
import GridSkeleton from "../components/GridSkeleton";
import ScrollToTop from "../components/ScrollToTop";
import { Montserrat } from "next/font/google";
import { useState, useEffect } from "react";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
});

function Disponibles() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const endpoint =
        "api/artworks?fields[0]=id&fields[1]=documentId&fields[2]=name&fields[3]=support&fields[4]=size&fields[5]=year&fields[6]=code&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&filters[available][$eq]=true&sort=year:desc";

    return (
        <main className={montserrat.className}>
            <div className="flex flex-col justify-between min-h-screen items-center">
                <Navbar />
                <Whatsapp />
                <ScrollToTop />

                <div className="container mx-auto py-12 px-4">
                    <h1 className="text-3xl font-medium mb-8 text-center">
                        Obras Disponibles
                    </h1>

                    {!mounted ? (
                        <GridSkeleton title="" count={12} />
                    ) : (
                        <Grid endpoint={endpoint} title="" />
                    )}
                </div>

                <Footer />
            </div>
        </main>
    );
}

export default Disponibles;
