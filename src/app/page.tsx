"use client";

import { Suspense, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Whatsapp from "./components/Whatsapp";
import Grid from "./components/Grid";
import ScrollToTop from "./components/ScrollToTop";
import { Montserrat } from "next/font/google";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const DynamicBanner = dynamic(() => import("./components/Banner"), {
    ssr: false,
    loading: () => (
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 animate-pulse"></div>
    ),
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
});

function HomeContent() {
    const searchParams = useSearchParams();
    const pageParam = searchParams.get("page");
    const currentPage = pageParam ? parseInt(pageParam) : 1;

    const isFirstPage = currentPage === 1;

    return (
        <>
            {isFirstPage && <DynamicBanner />}

            <Grid
                endpoint="api/artworks?fields[0]=id&fields[1]=documentId&fields[2]=name&fields[3]=support&fields[4]=size&fields[5]=year&fields[6]=code&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&sort=year:desc"
                title="Portfolio"
            />
        </>
    );
}

export default function Home() {
    return (
        <main className={montserrat.className}>
            <div className="flex flex-col justify-between min-h-screen items-center">
                <Navbar />
                <Whatsapp />
                <ScrollToTop />

                <Suspense
                    fallback={
                        <div className="container mx-auto py-12 px-4">
                            <div className="h-[60vh] bg-gray-200 animate-pulse rounded-lg"></div>
                        </div>
                    }
                >
                    <HomeContent />
                </Suspense>

                <Footer />
            </div>
        </main>
    );
}
