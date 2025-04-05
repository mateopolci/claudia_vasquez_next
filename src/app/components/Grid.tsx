"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PageNavigation from "./PageNavigation";
import GridSkeleton from "./GridSkeleton";
import LightboxModal from "./LightboxModal";
import Masonry from "react-masonry-css";

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

interface GridProps {
    endpoint: string;
    title?: string;
}

function Grid({ endpoint, title = "Portfolio" }: GridProps) {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [fetchingData, setFetchingData] = useState(true);
    const [loadingImages, setLoadingImages] = useState(true);
    const [renderSkeleton, setRenderSkeleton] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page") || 1);

    const domain = "http://localhost:1337/";
    const fullEndpoint = `${domain}${endpoint}${
        endpoint.includes("?") ? "&" : "?"
    }pagination[page]=${currentPage}&pagination[pageSize]=12`;

    useEffect(() => {
        setRenderSkeleton(true);
        setFetchingData(true);
        setLoadingImages(true);

        async function fetchArtworks() {
            try {
                const response = await fetch(fullEndpoint);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setArtworks(data.data);
                setPagination(data.meta.pagination);
                setFetchingData(false);

                if (data.data.length === 0) {
                    setLoadingImages(false);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "An unknown error occurred"
                );
                setFetchingData(false);
                setLoadingImages(false);
            }
        }

        fetchArtworks();

        const safetyTimeout = setTimeout(() => {
            setRenderSkeleton(false);
            setLoadingImages(false);
            setFetchingData(false);
        }, 8000);

        return () => clearTimeout(safetyTimeout);
    }, [fullEndpoint, currentPage]);

    useEffect(() => {
        if (!fetchingData && artworks.length > 0 && loadingImages) {
            let loadedCount = 0;
            const totalImages = artworks.length;

            const preloadImages = () => {
                artworks.forEach((artwork) => {
                    if (!artwork.image || !artwork.image.url) {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            setLoadingImages(false);
                        }
                        return;
                    }

                    const img = new Image();
                    img.src = artwork.image.url;

                    img.onload = () => {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            setLoadingImages(false);
                        }
                    };

                    img.onerror = () => {
                        loadedCount++;
                        if (loadedCount === totalImages) {
                            setLoadingImages(false);
                        }
                    };
                });
            };

            preloadImages();

            const imageTimeout = setTimeout(() => {
                setLoadingImages(false);
            }, 5000);

            return () => clearTimeout(imageTimeout);
        }
    }, [fetchingData, artworks]);

    useEffect(() => {
        if (!fetchingData && !loadingImages) {
            const timer = setTimeout(() => {
                setRenderSkeleton(false);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [fetchingData, loadingImages]);

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

    if (renderSkeleton) {
        return (
            <GridSkeleton title={title} count={pagination?.pageSize || 25} />
        );
    }

    if (error)
        return (
            <div className="text-center my-8 text-red-500">
                Error loading artworks: {error}
            </div>
        );
    if (artworks.length === 0)
        return <div className="text-center my-8">No artworks found</div>;

    if (renderSkeleton) {
        return (
            <GridSkeleton title={title} count={pagination?.pageSize || 25} />
        );
    }

    if (error)
        return (
            <div className="text-center my-8 text-red-500">
                Error loading artworks: {error}
            </div>
        );
    if (artworks.length === 0)
        return <div className="text-center my-8">No artworks found</div>;

    return (
        <div>
            <div className="w-full flex justify-center items-center">
                <h1 className="text-3xl font-medium mt-8">{title}</h1>
            </div>
            <div className="p-4 sm:p-6 md:p-8">
            <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex w-auto -ml-4"
                    columnClassName="pl-4 bg-clip-padding"
                    style={masonryStyles}
                >
                    {artworks.map((artwork, index) => (
                        <div
                            key={artwork.id}
                            className="relative mb-4 cursor-pointer"
                            onClick={() => openLightbox(index)}
                        >
                            <div className="group block w-full overflow-hidden rounded-lg bg-gray-100">
                                <img
                                    src={artwork.image?.url}
                                    alt={
                                        artwork.image?.alternativeText ||
                                        artwork.name
                                    }
                                    className="w-full object-cover group-hover:scale-110 transition duration-300"
                                    loading="lazy"
                                />
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
