"use client";
import IonIcon from '@reacticons/ionicons';
import Stack from '../Stack';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const images = [
    { id: 0, img: "https://i.imgur.com/Bn4gnng.jpeg" },
    { id: 2, img: "https://i.imgur.com/GHZOIqq.jpeg" },
    { id: 1, img: "https://i.imgur.com/OKPYDl2.jpeg" },
    { id: 3, img: "https://i.imgur.com/P8lqIlC.jpeg" },
    { id: 4, img: "https://i.imgur.com/Kg4tQik.jpeg" }
];

export default function Photo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 150, height: 150 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                const height = containerRef.current.offsetHeight;
                setDimensions({ width, height });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full box-border">
            <span className='text-sm text-gray-500'>
                <span className='emoji'>📷</span> 직접 찍은 사진</span>
            <h2 className="relative text-3xl font-black break-keep text-pretty -mt-1 mb-4">
                <motion.span layoutId='page-title'>Photos</motion.span>
                <Link href={`/photos`}>
                    <button className="absolute -top-5 right-0 bg-black/15 dark:bg-black/50 flex items-center justify-center rounded-full p-2 hover:bg-black/30 dark:hover:bg-black/30">
                        <IonIcon name="add" className="text-[var(--foreground)] text-xl" />
                    </button>
                </Link>
            </h2>


            <div className='m-2 mt-5 scale-[0.85]'>
                <Stack
                    randomRotation={true}
                    sensitivity={180}
                    sendToBackOnClick={true}
                    cardDimensions={dimensions}
                    cardsData={images}
                    onChange={() => { }}
                /></div>

        </div>
    );
}