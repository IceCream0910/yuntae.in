"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt?: string;
  className?: string;
  layoutId?: string;
  aspectRatio?: string;
  blurDataURL?: string;
  placeholderSrc?: string;
}

export default function LazyImage({ 
  src, 
  alt = '', 
  className = '', 
  layoutId,
  aspectRatio = '16/9',
  blurDataURL,
  placeholderSrc,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden bg-gray-200 dark:bg-gray-800 ${className}`}
      style={{ aspectRatio }}
    >
      {/* Blur placeholder */}
      {!isLoaded && isInView && (placeholderSrc || blurDataURL) && (
        <img
          src={placeholderSrc || blurDataURL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-80"
        />
      )}
      
      {/* Actual image */}
      {isInView && (
        <motion.img
          layoutId={layoutId}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}
