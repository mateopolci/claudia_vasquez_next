"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PageNavigation from "./PageNavigation";
import GridSkeleton from "./GridSkeleton";
import LightboxModal from "./LightboxModal";
import Masonry from "react-masonry-css";
import AlertMessage from "./AlertMessage";
import { getApiBaseUrl } from "../utils/getApiBaseUrl";
import Image from "next/image";

interface Artwork {
    id: number;
    documentId: string;
    name: string;
    support: string;
    size: string;
    year?: string;
    code?: string;
    image: {
        id: number;
        documentId: string;
        url: string;
        alternativeText: string;
    };
}

interface PaginationData {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

interface TextNode {
    type: string;
    text: string;
}

interface ChildNode {
    text: any;
    type: string;
    children: TextNode[];
}

interface SeriesDescription {
    type: string;
    children: ChildNode[];
}

interface GridProps {
    endpoint: string;
    title?: string;
}

function Grid({ endpoint, title = "Portfolio" }: GridProps) {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [seriesDescription, setSeriesDescription] = useState<
        SeriesDescription[] | null
    >(null);
    const [loadingDescription, setLoadingDescription] = useState(false);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page") || 1);

    const domain = getApiBaseUrl();
    const fullEndpoint = `${domain}${endpoint}${
        endpoint.includes("?") ? "&" : "?"
    }pagination[page]=${currentPage}&pagination[pageSize]=12`;

    useEffect(() => {
        if (title !== "Portfolio" && title !== "Disponibles") {
            setLoadingDescription(true);

            const fetchSeriesDescription = async () => {
                try {
                    const response = await fetch(
                        `${domain}api/series?filters[name][$eq]=${title}&fields[0]=id&fields[1]=documentId&fields[2]=name&fields[3]=description`
                    );

                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
                    }

                    const data = await response.json();

                    if (
                        data.data &&
                        data.data.length > 0 &&
                        data.data[0].description
                    ) {
                        setSeriesDescription(data.data[0].description);
                    }
                } catch (err) {
                    console.error("Error fetching series description:", err);
                } finally {
                    setLoadingDescription(false);
                }
            };

            fetchSeriesDescription();
        }
    }, [domain, title]);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        async function fetchArtworks() {
            try {
                const response = await fetch(fullEndpoint);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                setArtworks(data.data);
                setPagination(data.meta.pagination);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("No se pudieron cargar las obras");
                setIsLoading(false);
            }
        }

        fetchArtworks();

        const safetyTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(safetyTimeout);
    }, [fullEndpoint, currentPage]);

    const breakpointColumnsObj = {
        default: 4,
        1280: 4,
        1024: 3,
        768: 2,
        640: 2,
        500: 1,
    };

    const masonryStyles = {
        display: "flex",
        width: "auto",
    };

    const columnStyles = {
        paddingLeft: "16px",
        backgroundClip: "padding-box",
    };

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const lightboxImages = artworks.map((artwork) => ({
        url: artwork.image?.url || "",
        alt: artwork.image?.alternativeText || artwork.name,
        name: artwork.name,
        support: artwork.support,
        size: artwork.size,
        year: artwork.year,
        code: artwork.code,
    }));

    if (isLoading) {
        return (
            <GridSkeleton title={title} count={pagination?.pageSize || 12} />
        );
    }

    if (error) {
        return (
            <>
                <div className="text-center my-8">
                    No se pudo cargar la información
                </div>
                <AlertMessage
                    type="error"
                    title="Error"
                    text={error}
                    timer={3000}
                />
            </>
        );
    }

    if (artworks.length === 0)
        return <div className="text-center my-8">No artworks found</div>;

    const renderDescription = () => {
        if (!seriesDescription) return null;

        return seriesDescription.map((block, blockIndex) => {
            if (block.type === "paragraph") {
                return (
                    <p
                        key={blockIndex}
                        className="text-gray-700 mx-auto max-w-5xl mb-4 px-4 text-justify"
                    >
                        {block.children.map((child, childIndex) => {
                            if (child.text) {
                                return (
                                    <span key={childIndex}>{child.text}</span>
                                );
                            } else if (
                                child.children &&
                                Array.isArray(child.children)
                            ) {
                                return child.children.map(
                                    (textNode, textIndex) => (
                                        <span
                                            key={`${childIndex}-${textIndex}`}
                                        >
                                            {textNode.text}
                                        </span>
                                    )
                                );
                            }
                            return null;
                        })}
                    </p>
                );
            }
            return null;
        });
    };

    return (
        <div>
            <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-3xl font-medium mt-8">{title}</h1>

                {!loadingDescription &&
                    (() => {
                        const description = renderDescription();
                        return description ? (
                            <div className="mt-4 mb-6">{description}</div>
                        ) : null;
                    })()}
            </div>

            <div className="py-8 px-12">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex w-auto -ml-4"
                    columnClassName="pl-4 bg-clip-padding"
                    style={masonryStyles}
                >
                    {artworks.map((artwork, index) => (
                        <div
                            key={artwork.id}
                            className="relative mb-4 cursor-pointer min-h[200px]"
                            onClick={() => openLightbox(index)}
                        >
                            <div className="group block w-full overflow-hidden rounded-lg bg-gray-100">
                                <Image
                                    src={artwork.image?.url || ""}
                                    width={500}
                                    height={300}
                                    alt={
                                        artwork.image?.alternativeText ||
                                        artwork.name
                                    }
                                    className="w-full object-cover group-hover:scale-110 transition duration-300"
                                    loading="lazy"
                                />{" "}
                            </div>
                            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                                {artwork.name}
                            </p>
                            <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                                {artwork.support} - {artwork.size}
                            </p>
                        </div>
                    ))}
                </Masonry>
            </div>

            <PageNavigation pagination={pagination} />

            {lightboxOpen && artworks.length > 0 && (
                <LightboxModal
                    images={lightboxImages}
                    currentIndex={currentImageIndex}
                    onClose={closeLightbox}
                />
            )}
        </div>
    );
}

export default Grid;
