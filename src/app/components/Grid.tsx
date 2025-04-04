"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PageNavigation from "./PageNavigation";
import GridSkeleton from "./GridSkeleton";

interface Artwork {
    id: number;
    documentId: string;
    name: string;
    support: string;
    size: string;
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
    
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page') || 1);

    const domain = "http://localhost:1337/";
    const fullEndpoint = `${domain}${endpoint}${endpoint.includes('?') ? '&' : '?'}pagination[page]=${currentPage}&pagination[pageSize]=25`;

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
                setError(err instanceof Error ? err.message : "An unknown error occurred");
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

    if (renderSkeleton) {
        return <GridSkeleton 
            title={title} 
            count={pagination?.pageSize || 25} 
        />;
    }

    if (error) return <div className="text-center my-8 text-red-500">Error loading artworks: {error}</div>;
    if (artworks.length === 0) return <div className="text-center my-8">No artworks found</div>;

    return (
        <div>
            <div className="w-full flex justify-center items-center">
                <h1 className="text-3xl font-bold mt-8">{title}</h1>
            </div>
            <div className="p-22">
                <ul
                    role="list"
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                >
                    {artworks.map((artwork) => (
                        <li key={artwork.id} className="relative">
                            <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
                                <img
                                    src={artwork.image?.url}
                                    alt={artwork.image?.alternativeText || artwork.name}
                                    className="object-cover group-hover:scale-110 transition duration-300 cursor-pointer"
                                />
                            </div>
                            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                                {artwork.name}
                            </p>
                            <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                                {artwork.support} - {artwork.size}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            
            <PageNavigation pagination={pagination} />
        </div>
    );
}

export default Grid;