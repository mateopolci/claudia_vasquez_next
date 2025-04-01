import React from "react";
import Image from "next/image";

interface BannerImage {
    id: number;
    documentId: string;
    url: string;
    alternativeText: string;
}

interface BannerData {
    data: {
        id: number;
        documentId: string;
        banner: BannerImage;
    };
}

async function Banner() {
    const domain = "http://localhost:1337/";
    const bannerEndpoint = `${domain}api/banner?fields[0]=id&populate[banner][fields][0]=url&populate[banner][fields][1]=alternativeText`;

    const res = await fetch(bannerEndpoint, { next: { revalidate: 3600 } });
    const bannerData: BannerData = await res.json();

    const { banner } = bannerData.data;

    return (
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
            <Image
                src={banner.url}
                alt={banner.alternativeText || "Banner principal"}
                fill
                priority
                style={{ objectFit: "cover" }}
                className="w-full"
            />
        </div>
    );
}

export default Banner;
