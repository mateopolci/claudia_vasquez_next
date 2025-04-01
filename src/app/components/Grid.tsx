"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PageNavigation from "./PageNavigation";

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

function Grid() {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page') || 1);

    const domain = "http://localhost:1337/";
    const gridPopulate =
        `api/artworks?fields[0]=id&fields[1]=documentId&fields[2]=name&fields[3]=support&fields[4]=size&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&pagination[page]=${currentPage}&pagination[pageSize]=25&sort=year:desc`;
    const gridEndpoint = `${domain}${gridPopulate}`;

    useEffect(() => {
        async function fetchArtworks() {
            try {
                setLoading(true);
                const response = await fetch(gridEndpoint);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setArtworks(data.data);
                setPagination(data.meta.pagination);
                setLoading(false);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "An unknown error occurred"
                );
                setLoading(false);
            }
        }

        fetchArtworks();
    }, [gridEndpoint, currentPage]);

    if (loading) return <div>Loading artworks...</div>;
    if (error) return <div>Error loading artworks: {error}</div>;
    if (artworks.length === 0) return <div>No artworks found</div>;

    return (
        <div>
            <div className="w-full flex justify-center items-center">
                <h1 className="text-3xl font-bold mt-8">Portfolio</h1>
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
                                    src={artwork.image.url}
                                    alt={
                                        artwork.image.alternativeText ||
                                        artwork.name
                                    }
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