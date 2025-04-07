"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AlertMessage from "./AlertMessage";
import { getApiBaseUrl } from "../utils/getApiBaseUrl";

interface BannerImage {
    url: string;
    alternativeText?: string;
}

interface BannerData {
    data: {
        banner: BannerImage;
    };
}

export default function Banner() {
    const [bannerData, setBannerData] = useState<BannerData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        let isMounted = true;
        
        const fetchBanner = async () => {
            try {
                const domain = getApiBaseUrl();

                const bannerEndpoint = `${domain}api/banner?fields[0]=id&populate[banner][fields][0]=url&populate[banner][fields][1]=alternativeText`;
                
                const res = await fetch(bannerEndpoint, {
                    cache: 'force-cache'
                });
                
                if (!res.ok) throw new Error(`Error: ${res.status}`);
                
                const data = await res.json();
                
                if (isMounted) {
                    setBannerData(data);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Failed to fetch banner:", err);
                if (isMounted) {
                    setError("No se pudo cargar el banner");
                    setLoading(false);
                }
            }
        };
        
        fetchBanner();
        
        return () => {
            isMounted = false;
        };
    }, []);
    
    if (loading) return <div className="w-full h-[40vh] md:h-[50vh] bg-gray-200 animate-pulse"></div>;
    
    if (error) {
        return (
            <>
                <div className="w-full h-[40vh] md:h-[50vh] flex items-center justify-center bg-gray-100">
                    <p className="text-gray-500">No se pudo cargar el banner</p>
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
    
    if (!bannerData?.data?.banner?.url) return null;
    
    return (
        <div className="w-full relative h-[40vh] md:h-[50vh]">
            <Image
                src={bannerData.data.banner.url}
                alt={bannerData.data.banner.alternativeText || "Banner imagen"}
                fill
                priority
                style={{ objectFit: "cover" }}
                sizes="100vw"
            />
        </div>
    );
}