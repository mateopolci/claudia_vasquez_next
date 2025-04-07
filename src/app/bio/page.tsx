"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import ScrollToTop from "../components/ScrollToTop";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import AlertMessage from "../components/AlertMessage";
import LiteYoutube from "../components/LiteYoutube";
import { getApiBaseUrl } from "../utils/getApiBaseUrl";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
});

interface TextNode {
    type: string;
    text: string;
    bold?: boolean;
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

interface BannerData {
    id: number;
    documentId: string;
    alternativeText: string;
    url: string;
}

interface BannerResponse {
    data: {
        id: number;
        documentId: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        bannerBio: BannerData;
    };
}

interface BioData {
    data: {
        biography: ParagraphChild[];
        art_concept: ParagraphChild[];
        bio: ImageData;
        concept: ImageData;
    };
}

function FormattedText({ node }: { node: TextNode }) {
    if (node.bold) {
        return <span className="font-bold">{node.text}</span>;
    }
    return <span>{node.text}</span>;
}

function FormattedParagraph({ paragraph }: { paragraph: ParagraphChild }) {
    return (
        <p className="mb-2 text-lg">
            {paragraph.children.map((child, index) => (
                <FormattedText key={index} node={child} />
            ))}
        </p>
    );
}

export default function Bio() {
    const [bioData, setBioData] = useState<BioData | null>(null);
    const [bannerData, setBannerData] = useState<BannerResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const domain = getApiBaseUrl();
        //const domain = "https://claudiavasquezstrapi-production.up.railway.app/";

        const fetchData = async () => {
            try {
                const [bioRes, bannerRes] = await Promise.all([
                    fetch(
                        `${domain}api/bio?fields=biography,art_concept&populate[bio][fields]=id,url&populate[concept][fields]=id,url`,
                        { next: { revalidate: 3600 } }
                    ),
                    fetch(
                        `${domain}api/banner?populate[bannerBio][fields][0]=alternativeText&populate[bannerBio][fields][1]=url`,
                        { next: { revalidate: 3600 } }
                    ),
                ]);

                if (!bioRes.ok)
                    throw new Error(`Error fetching bio: ${bioRes.status}`);
                if (!bannerRes.ok)
                    throw new Error(
                        `Error fetching banner: ${bannerRes.status}`
                    );

                const bioData = await bioRes.json();
                const bannerData = await bannerRes.json();

                if (isMounted) {
                    setBioData(bioData);
                    setBannerData(bannerData);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Failed to fetch data:", err);
                if (isMounted) {
                    setError("No se pudo cargar la información");
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <main className={montserrat.className}>
                <div className="flex flex-col justify-between min-h-screen items-center">
                    <Navbar />
                    <div className="container mx-auto py-12 px-22">
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
                    <div className="container mx-auto py-12 px-22 flex items-center justify-center">
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

    if (!bioData?.data) return null;

    const { biography, art_concept, bio, concept } = bioData.data;
    const banner = bannerData?.data?.bannerBio;

    const halfBiographyLength = Math.ceil(biography.length / 2);
    const firstHalf = biography.slice(0, halfBiographyLength);
    const secondHalf = biography.slice(halfBiographyLength);

    return (
        <main className={montserrat.className}>
            <div className="flex flex-col justify-between min-h-screen items-center">
                <Navbar />
                <Whatsapp />
                <ScrollToTop />

                {banner && (
                    <div className="w-full relative h-[40vh] md:h-[50vh]">
                        <Image
                            src={banner.url}
                            alt={
                                banner.alternativeText ||
                                "Claudia Vásquez - Banner de biografía"
                            }
                            fill
                            priority
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                )}

                <div className="container mx-auto py-12 px-22">
                    <h1 className="text-3xl font-medium mb-8 md:text-2xl">
                        Biografía
                    </h1>

                    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            {firstHalf.map((paragraph, index) => (
                                <FormattedParagraph
                                    key={index}
                                    paragraph={paragraph}
                                />
                            ))}
                        </div>

                        {bio && (
                            <div className="relative w-full h-80 md:h-full min-h-[300px] overflow-hidden rounded-lg">
                                <Image
                                    src={bio.url}
                                    alt="Retrato de Claudia Vásquez"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div className="mb-12 space-y-1">
                        {secondHalf.map((paragraph, index) => (
                            <FormattedParagraph
                                key={index}
                                paragraph={paragraph}
                            />
                        ))}
                    </div>

                    <div className="w-2/3 aspect-video mb-12 mx-auto">
                        <LiteYoutube videoId="jxA3MSyfRk4" title="Claudia Vásquez" />
                    </div>
                    
                    <h2 className="text-2xl font-medium mb-6">
                        Concepto Artístico
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {concept && (
                            <div className="relative w-full h-80 md:h-full min-h-[300px] order-2 md:order-1 overflow-hidden rounded-lg">
                                <Image
                                    src={concept.url}
                                    alt="Obra conceptual de Claudia Vásquez"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="rounded-lg"
                                />
                            </div>
                        )}

                        <div className="order-1 md:order-2 space-y-1">
                            {art_concept.map((paragraph, index) => (
                                <FormattedParagraph
                                    key={index}
                                    paragraph={paragraph}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </main>
    );
}
