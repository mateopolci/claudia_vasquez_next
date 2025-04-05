"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AlertMessage from "./AlertMessage";

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
                const domain = "http://localhost:1337/";
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
    
    if (loading) return <div className="banner-placeholder h-[250px] bg-gray-200 animate-pulse"></div>;
    
    if (error) {
        return (
            <>
                <div className="banner-error h-[250px] flex items-center justify-center bg-gray-100"></div>
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
        <div className="relative w-full h-[250px] overflow-hidden">
            <Image
                src={bannerData.data.banner.url}
                alt={bannerData.data.banner.alternativeText || "Banner imagen"}
                fill
                style={{ 
                    objectFit: "cover",
                    objectPosition: "center 30%"
                }}
                priority
                sizes="100vw"
            />
        </div>
    );
}