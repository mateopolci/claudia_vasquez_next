"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import Grid from "../components/Grid";
import ScrollToTop from "../components/ScrollToTop";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function SeriePage() {
    const params = useParams();
    const serieName = params.serie as string;

    const endpoint = `api/artworks?fields[0]=id&fields[1]=documentId&fields[2]=name&fields[3]=support&fields[4]=size&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&filters[serie][name][$eq]=${serieName}&sort=year:desc`;

    return (
        <main className={`min-h-screen ${montserrat.className}`}>
            <div className="flex flex-col min-h-screen">
                <Navbar />

                <div className="flex-grow container mx-auto px-4 sm:px-0">
                    <Grid
                        endpoint={endpoint}
                        title={`${decodeURIComponent(serieName)}`}
                    />
                </div>

                <Footer />
            </div>
            <Whatsapp />
            <ScrollToTop />
        </main>
    );
}
