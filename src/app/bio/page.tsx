"use client";

import { useState, useEffect, Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import ScrollToTop from "../components/ScrollToTop";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import AlertMessage from "../components/AlertMessage";
import LiteYoutube from "../components/LiteYoutube";
import { getApiBaseUrl } from "../utils/getApiBaseUrl";
import { useRouter, useSearchParams } from "next/navigation";

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

function BioContent() {
    const [bioData, setBioData] = useState<BioData | null>(null);
    const [bannerData, setBannerData] = useState<BannerResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const lang = searchParams.get("lang") || "es";

    const texts = {
        es: {
            biography: "Biografía",
            artisticConcept: "Concepto Artístico",
            loadingError: "No se pudo cargar la información",
            portraitAlt: "Retrato de Claudia Vásquez",
            conceptAlt: "Obra conceptual de Claudia Vásquez",
            bannerAlt: "Claudia Vásquez - Banner de biografía",
        },
        en: {
            biography: "Biography",
            artisticConcept: "Statement",
            loadingError: "Could not load the information",
            portraitAlt: "Portrait of Claudia Vásquez",
            conceptAlt: "Conceptual work by Claudia Vásquez",
            bannerAlt: "Claudia Vásquez - Biography Banner",
        },
    };

    const t = texts[lang === "en" ? "en" : "es"];

    const toggleLanguage = () => {
        const newLang = lang === "en" ? "es" : "en";
        router.push(`/bio?lang=${newLang}`);
    };

    useEffect(() => {
        if (typeof window !== "undefined" && !searchParams.get("lang")) {
            const browserLang = navigator.language.toLowerCase();
            const userPreferredLang = browserLang.startsWith("es")
                ? "es"
                : "en";

            if (userPreferredLang !== lang) {
                router.replace(`/bio?lang=${userPreferredLang}`);
            }
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        const domain = getApiBaseUrl();
        setLoading(true);

        const fetchData = async () => {
            try {
                const endpoint =
                    lang === "en"
                        ? `${domain}api/bio?fields=biography_en,art_concept_en&populate[bio][fields]=id,url&populate[concept][fields]=id,url`
                        : `${domain}api/bio?fields=biography,art_concept&populate[bio][fields]=id,url&populate[concept][fields]=id,url`;

                const [bioRes, bannerRes] = await Promise.all([
                    fetch(endpoint, { next: { revalidate: 3600 } }),
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

                if (lang === "en" && bioData?.data) {
                    bioData.data = {
                        biography: bioData.data.biography_en || [],
                        art_concept: bioData.data.art_concept_en || [],
                        bio: bioData.data.bio,
                        concept: bioData.data.concept,
                    };
                }

                if (isMounted) {
                    setBioData(bioData);
                    setBannerData(bannerData);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Failed to fetch data:", err);
                if (isMounted) {
                    setError(t.loadingError);
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [lang, t.loadingError]);

    if (loading) {
        return (
            <div className="flex flex-col justify-between min-h-screen items-center">
                <Navbar />
                <div className="container mx-auto py-12 px-4">
                    <div className="h-[60vh] bg-gray-200 animate-pulse rounded-lg"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-between min-h-screen items-center">
                <Navbar />
                <div className="container mx-auto py-12 px-4 flex items-center justify-center">
                    <div className="h-[50vh] flex items-center justify-center bg-gray-100 w-full">
                        <p className="text-gray-500">{t.loadingError}</p>
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
        );
    }

    if (!bioData?.data) return null;

    const { biography, art_concept, bio, concept } = bioData.data;
    const banner = bannerData?.data?.bannerBio;

    const halfBiographyLength = Math.ceil(biography.length / 2);
    const firstHalf = biography.slice(0, halfBiographyLength);
    const secondHalf = biography.slice(halfBiographyLength);

    return (
        <div className="flex flex-col justify-between min-h-screen items-center">
            <Navbar />
            <Whatsapp />
            <ScrollToTop />

            {banner && (
                <div className="w-full relative h-[40vh] md:h-[50vh]">
                    <Image
                        src={banner.url}
                        alt={banner.alternativeText || t.bannerAlt}
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                    />
                </div>
            )}

            <div className="container mx-auto py-12 px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-medium md:text-2xl">
                        {t.biography}
                    </h1>
                    <button
                        onClick={toggleLanguage}
                        className="px-3 py-1 bg-gray-100 hover:bg-claudiapurple hover:text-claudiawhite rounded text-sm transition duration-300 cursor-pointer"
                    >
                        {lang === "en" ? "Español" : "English"}
                    </button>
                </div>

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
                                alt={t.portraitAlt}
                                fill
                                style={{ objectFit: "cover" }}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                </div>

                <div className="mb-12 space-y-1">
                    {secondHalf.map((paragraph, index) => (
                        <FormattedParagraph key={index} paragraph={paragraph} />
                    ))}
                </div>

                <div className="w-full 2/3 aspect-video mb-12 mx-auto">
                    <LiteYoutube
                        videoId="jxA3MSyfRk4"
                        title="Claudia Vásquez"
                    />
                </div>

                <h2 className="text-2xl font-medium mb-6">
                    {t.artisticConcept}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {concept && (
                        <div className="relative w-full h-80 md:h-full min-h-[300px] order-2 md:order-1 overflow-hidden rounded-lg">
                            <Image
                                src={concept.url}
                                alt={t.conceptAlt}
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
    );
}

export default function Bio() {
    return (
        <main className={montserrat.className}>
            <Suspense
                fallback={
                    <div className="flex flex-col justify-between min-h-screen items-center">
                        <Navbar />
                        <div className="container mx-auto py-12 px-4">
                            <div className="h-[60vh] bg-gray-200 animate-pulse rounded-lg"></div>
                        </div>
                        <Footer />
                    </div>
                }
            >
                <BioContent />
            </Suspense>
        </main>
    );
}
