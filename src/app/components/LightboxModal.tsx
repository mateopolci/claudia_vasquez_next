"use client";

import { useState, useEffect } from 'react';

interface LightboxModalProps {
  images: {
    url: string;
    alt: string;
    name: string;
    support?: string;
    size?: string;
  }[];
  currentIndex: number;
  onClose: () => void;
}

const LightboxModal = ({ images, currentIndex, onClose }: LightboxModalProps) => {
  const [index, setIndex] = useState(currentIndex);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigatePrev();
      } else if (e.key === 'ArrowRight') {
        navigateNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [index, images.length, onClose]);

  const navigateNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const navigatePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const currentImage = images[index];

  if (!currentImage) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 transition"
        aria-label="Close lightbox"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>

      <button 
        onClick={navigatePrev}
        className="absolute left-4 text-white p-2 rounded-full hover:bg-white/20 transition"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
      </button>
      
      <button 
        onClick={navigateNext}
        className="absolute right-4 text-white p-2 rounded-full hover:bg-white/20 transition"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
      
      <div className="max-w-[90%] max-h-[90%] relative">
        <img 
          src={currentImage.url} 
          alt={currentImage.alt || currentImage.name} 
          className="max-h-[80vh] max-w-full object-contain"
        />
        
        <div className="bg-black/60 text-white p-4 absolute bottom-0 left-0 right-0">
          <h3 className="text-lg font-semibold">{currentImage.name}</h3>
          {(currentImage.support || currentImage.size) && (
            <p className="text-sm text-gray-300">
              {currentImage.support} {currentImage.support && currentImage.size && '-'} {currentImage.size}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">
            {index + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LightboxModal;