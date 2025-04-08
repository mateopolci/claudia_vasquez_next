"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import ScrollToTop from "../components/ScrollToTop";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import AlertMessage from "../components/AlertMessage";
import { getApiBaseUrl } from "../utils/getApiBaseUrl";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
});

interface TextNode {
    type: string;
    text: string;
}

interface ParagraphChild {
    type: string;
    children: TextNode[];
}

interface ImageData {
    id: number;
    documentId: string;
    url: string;
}

interface ExpoData {
    data: {
        details: ParagraphChild[];
        expo1: ImageData;
        expo2: ImageData;
    };
}

export default function Expo() {
    const [expoData, setExpoData] = useState<ExpoData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchExpoData = async () => {
            try {
                const domain = getApiBaseUrl();
                const expoEndpoint = `${domain}api/expo?fields=id,documentId,details&populate[expo1][fields]=id,url&populate[expo2][fields]=id,url`;

                const res = await fetch(expoEndpoint, {
                    next: { revalidate: 3600 },
                });

                if (!res.ok) throw new Error(`Error: ${res.status}`);

                const data = await res.json();

                if (isMounted) {
                    setExpoData(data);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Failed to fetch exhibition data:", err);
                if (isMounted) {
                    setError("No se pudo cargar la información");
                    setLoading(false);
                }
            }
        };

        fetchExpoData();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <main className={montserrat.className}>
                <div className="flex flex-col justify-between min-h-screen items-center">
                    <Navbar />
                    <div className="container mx-auto py-12 px-4">
                        <div className="h-[60vh] bg-gray-200 animate-pulse rounded-lg"></div>
                    </div>
                    <Footer />
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className={montserrat.className}>
                <div className="flex flex-col justify-between min-h-screen items-center">
                    <Navbar />
                    <div className="container mx-auto py-12 px-4 flex items-center justify-center">
                        <div className="h-[50vh] flex items-center justify-center bg-gray-100 w-full">
                            <p className="text-gray-500">
                                No se pudo cargar la información
                            </p>
                        </div>
                    </div>
                    <Footer />
                    <AlertMessage
                        type="error"
                        title="Error"
                        text={error}
                        timer={3000}
                    />
                </div>
            </main>
        );
    }

    if (!expoData?.data) return null;

    const { details, expo1, expo2 } = expoData.data;

    const halfExhibitionLength = Math.ceil(details.length / 2);
    const firstHalf = details.slice(0, halfExhibitionLength);
    const secondHalf = details.slice(halfExhibitionLength);

    return (
        <main className={montserrat.className}>
            <div className="flex flex-col justify-between min-h-screen items-center">
                <Navbar />
                <Whatsapp />
                <ScrollToTop />

                <div className="container mx-auto py-12 px-4">
                    <h1 className="text-3xl font-medium mb-8 text-center">
                        Exhibiciones
                    </h1>

                    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 ">
                        <div>
                            {firstHalf.map((paragraph, index) => (
                                <p key={index} className="mb-4 text-lg">
                                    {paragraph.children.map(
                                        (child, childIndex) => (
                                            <span key={childIndex}>
                                                {child.text}
                                            </span>
                                        )
                                    )}
                                </p>
                            ))}
                        </div>

                        {expo1 && (
                            <div className="relative w-full min-h-96 md:h-full">
                                <Image
                                    src={expo1.url}
                                    alt="Exhibición de arte 1"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {expo2 && (
                            <div className="relative w-full min-h-96 md:h-full order-2 md:order-1">
                                <Image
                                    src={expo2.url}
                                    alt="Exhibición de arte 2"
                                    fill
                                    style={{ objectFit: "cover", objectPosition: "top" }}
                                    className="rounded-lg"
                                />
                            </div>
                        )}

                        <div className="order-1 md:order-2">
                            {secondHalf.map((paragraph, index) => (
                                <p key={index} className="mb-4 text-lg">
                                    {paragraph.children.map(
                                        (child, childIndex) => (
                                            <span key={childIndex}>
                                                {child.text}
                                            </span>
                                        )
                                    )}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </main>
    );
}
