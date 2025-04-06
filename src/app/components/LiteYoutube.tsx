"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface LiteYoutubeProps {
    videoId: string;
    title?: string;
}

function LoadingPlaceholder() {
    return (
        <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <p></p>
        </div>
    );
}

function LiteYoutubeComponent({
    videoId,
    title = "YouTube video",
}: LiteYoutubeProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        import("@justinribeiro/lite-youtube");
        setMounted(true);
    }, []);

    if (!mounted) {
        return <LoadingPlaceholder />;
    }

    return (
        // @ts-expect-error
        <lite-youtube
            videoid={videoId}
            playlabel={`Play: ${title}`}
            class="w-full h-full rounded-lg overflow-hidden"
        />
    );
}

export default dynamic(() => Promise.resolve(LiteYoutubeComponent), {
    ssr: false,
    loading: () => <LoadingPlaceholder />,
});
