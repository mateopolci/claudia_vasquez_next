"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Updated TypeScript interface to match the actual API response
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

function Grid() {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const domain = "http://localhost:1337/";
    /* 
    - id
    - documentId
    - name
    - support
    - size
    - image
    */
    const gridPopulate =
        "api/artworks?fields[0]=id&fields[1]=documentId&fields[2]=name&fields[3]=support&fields[4]=size&populate=image";
    const gridEndpoint = `${domain}${gridPopulate}`;

    useEffect(() => {
        async function fetchArtworks() {
            try {
                const response = await fetch(gridEndpoint);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API response:", data); // For debugging
                setArtworks(data.data);
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
    }, [gridEndpoint]);

    if (loading) return <div>Loading artworks...</div>;
    if (error) return <div>Error loading artworks: {error}</div>;
    if (artworks.length === 0) return <div>No artworks found</div>;

    return (
        <div className="px-22">
            <ul
                role="list"
                className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
                {artworks.map((artwork) => (
                    <li key={artwork.id} className="relative">
						<div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
							<img
								src={artwork.image.url}
								alt={
									artwork.image.alternativeText ||
									artwork.name
								}
								className="object-cover pointer-events-none group-hover:scale-110 transition duration-300"
							/>
							<button
								type="button"
								className="absolute inset-0 focus:outline-none"
							>
								<span className="sr-only">
									View details for {artwork.name}
								</span>
							</button>
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
    );
}

export default Grid;
