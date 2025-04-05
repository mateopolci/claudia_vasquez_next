"use client";

import { useState, useEffect, useRef } from "react";

interface LightboxModalProps {
    images: {
        url: string;
        alt: string;
        name: string;
        support?: string;
        size?: string;
        year?: string;
        code?: string;
    }[];
    currentIndex: number;
    onClose: () => void;
}

const LightboxModal = ({
    images,
    currentIndex,
    onClose,
}: LightboxModalProps) => {
    const [index, setIndex] = useState(currentIndex);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0.5, y: 0.5 });
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const isFirstImage = index === 0;
    const isLastImage = index === images.length - 1;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                if (!isFirstImage) {
                    navigatePrev();
                }
            } else if (e.key === "ArrowRight") {
                if (!isLastImage) {
                    navigateNext();
                }
            } else if (e.key === "Escape") {
                if (isZoomed) {
                    setIsZoomed(false);
                } else {
                    onClose();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [index, images.length, onClose, isZoomed, isFirstImage, isLastImage]);

    const navigateNext = () => {
        if (!isLastImage) {
            setIsZoomed(false);
            setIndex((prevIndex) => prevIndex + 1);
        }
    };

    const navigatePrev = () => {
        if (!isFirstImage) {
            setIsZoomed(false);
            setIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageContainerRef.current) return;

        if (isZoomed) {
            setIsZoomed(false);
        } else {
            const rect = imageContainerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            setZoomPosition({ x, y });
            setIsZoomed(true);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed || !imageContainerRef.current) return;

        const rect = imageContainerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const boundedX = Math.max(0, Math.min(1, x));
        const boundedY = Math.max(0, Math.min(1, y));

        setZoomPosition({ x: boundedX, y: boundedY });
    };

    const currentImage = images[index];

    if (!currentImage) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center"
            onClick={handleBackgroundClick}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 transition"
                aria-label="Close lightbox"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x"
                >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
            </button>

            {!isZoomed && (
                <>
                    {!isFirstImage && (
                        <button
                            onClick={navigatePrev}
                            className="absolute left-4 text-white p-2 rounded-full hover:bg-white/20 transition"
                            aria-label="Previous image"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-chevron-left"
                            >
                                <path d="m15 18-6-6 6-6"></path>
                            </svg>
                        </button>
                    )}

                    {!isLastImage && (
                        <button
                            onClick={navigateNext}
                            className="absolute right-4 text-white p-2 rounded-full hover:bg-white/20 transition"
                            aria-label="Next image"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-chevron-right"
                            >
                                <path d="m9 18 6-6-6-6"></path>
                            </svg>
                        </button>
                    )}
                </>
            )}

            <div
                className={`relative overflow-hidden ${
                    isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                } ${
                    isZoomed
                        ? "max-w-[95%] max-h-[95%]"
                        : "max-w-[90%] max-h-[90%]"
                }`}
                ref={imageContainerRef}
                onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(e);
                }}
                onMouseMove={handleMouseMove}
            >
                <img
                    src={currentImage.url}
                    alt={currentImage.alt || currentImage.name}
                    className={`max-h-[80vh] max-w-full object-contain transition-transform duration-100 ${
                        isZoomed ? "scale-[2]" : ""
                    }`}
                    style={
                        isZoomed
                            ? {
                                  transformOrigin: `${zoomPosition.x * 100}% ${
                                      zoomPosition.y * 100
                                  }%`,
                              }
                            : {}
                    }
                />

                {!isZoomed && (
                    <div className="bg-black/60 text-white p-4 absolute bottom-0 left-0 right-0">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {currentImage.name}
                                </h3>
                                <div className="flex flex-wrap gap-x-2 text-sm text-gray-300">
                                    {currentImage.code && (
                                        <span>
                                            {currentImage.code}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                {currentImage.year && (
                                    <span className="italic text-sm text-gray-300">
                                        {currentImage.year}
                                    </span>
                                )}
                                {(currentImage.support ||
                                    currentImage.size) && (
                                    <p className="text-sm text-gray-300">
                                        {currentImage.support}{" "}
                                        {currentImage.support &&
                                            currentImage.size &&
                                            "-"}{" "}
                                        {currentImage.size}
                                    </p>
                                )}
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                            {index + 1} / {images.length}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LightboxModal;
