"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useSearchParams } from 'next/navigation';
import IonIcon from "@reacticons/ionicons";
import { Suspense } from "react";

const images = [
    {
        id: 250312,
        title: "비 온 뒤 맑음",
        url: "https://i.imgur.com/mXhmYRh.jpeg",
        location: "Shizuoka, Japan",
        camera: "samsung Galaxy S23",
        focal: "5.4mm",
        aperture: "f/1.8",
        shutter: "1/219",
        iso: "ISO 25",
        date: "Mar 12, 2025"
    },
    {
        id: 250309,
        title: "강 위 기찻길",
        url: "https://i.imgur.com/iXxCE3G.jpeg",
        location: "Tokyo, Japan",
        camera: "samsung Galaxy S23",
        focal: "7.00mm",
        aperture: "f/2.4",
        shutter: "1/2701",
        iso: "ISO 25",
        date: "Mar 9, 2025"
    },
    {
        id: 250308,
        title: "해질녘 도시",
        url: "https://i.imgur.com/a7eOkZz.jpeg",
        location: "Tokyo, Japan",
        camera: "samsung Galaxy S23",
        focal: "7.00mm",
        aperture: "f/2.4",
        shutter: "1/60",
        iso: "ISO 50",
        date: "Mar 8, 2025"
    },
    {
        id: 250307,
        title: "도쿄의 밤",
        url: "https://i.imgur.com/lADbuOB.jpeg",
        location: "Tokyo, Japan",
        camera: "samsung Galaxy S23",
        focal: "7.00mm",
        aperture: "f/2.4",
        shutter: "1/60",
        iso: "ISO 400",
        date: "Mar 7, 2025"
    },
    {
        id: 250305,
        title: "올려다보기",
        url: "https://i.imgur.com/6x6FZ7a.jpeg",
        location: "Tokyo, Japan",
        camera: "samsung Galaxy S23",
        focal: "7.00mm",
        aperture: "f/2.4",
        shutter: "1/1000",
        iso: "ISO 32",
        date: "Mar 5, 2025"
    },
    {
        id: 250210,
        title: "불",
        url: "https://i.imgur.com/7T6DpwL.png",
        location: "가평, South Korea",
        camera: "samsung Galaxy S23",
        focal: "7.00mm",
        aperture: "f/2.4",
        shutter: "1/359",
        iso: "ISO 100",
        date: "Feb 10, 2025"
    },
    {
        id: 0,
        title: "7호선 뷰",
        url: "https://i.imgur.com/Bn4gnng.jpeg",
        location: "뚝섬한강공원, South Korea",
        camera: "samsung Galaxy S23",
        focal: "7.00mm",
        aperture: "f/2.4",
        shutter: "1/1117",
        iso: "ISO 25",
        date: "Oct 2, 2024"
    },
    {
        id: 1,
        title: "사막",
        url: "https://i.imgur.com/OKPYDl2.jpeg",
        location: "Phan Rang Desert, Vietnam",
        camera: "samsung Galaxy S23",
        focal: "7.00mm",
        aperture: "f/2.4",
        shutter: "1/3925",
        iso: "ISO 25",
        date: "Feb 24, 2024"
    },
    {
        id: 2,
        title: "자전거, 냥이",
        url: "https://i.imgur.com/GHZOIqq.jpeg",
        location: "Ainoshima island, Japan",
        camera: "samsung Galaxy S23",
        focal: "7.00mm",
        aperture: "f/2.4",
        shutter: "1/586",
        iso: "ISO 25",
        date: "Jan 15, 2024"
    },
    {
        id: 240118,
        title: "기찻길",
        url: "https://i.imgur.com/Sx1F4cH.jpeg",
        location: "Fukuoka, Japan",
        camera: "samsung Galaxy S23",
        focal: "5.4mm",
        aperture: "f/1.8",
        shutter: "1/427",
        iso: "ISO 25",
        date: "Jan 14, 2024"
    },
    {
        id: 3,
        title: "새, 날다",
        url: "https://i.imgur.com/P8lqIlC.jpeg",
        location: "대부도, South Korea",
        camera: "samsung Galaxy S21",
        focal: "5.90mm",
        aperture: "f/2.0",
        shutter: "1/1250",
        iso: "ISO 50",
        date: "Aug 16, 2022"
    },
    {
        id: 4,
        title: "비 맞는 청둥오리",
        url: "https://i.imgur.com/Kg4tQik.jpeg",
        location: "남양주시, South Korea",
        camera: "samsung Galaxy S21",
        focal: "5.90mm",
        aperture: "f/2.0",
        shutter: "1/120",
        iso: "ISO 50",
        date: "Sep 21, 2022"
    }
]

function Photos() {
    const searchParams = useSearchParams();
    const containerRef = useRef(null);

    useEffect(() => {
        const focus = searchParams.get('focus');
        if (focus) {
            const targetElement = document.getElementById(`photo-${focus}`);
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 500);
            }
        }

        gsap.registerPlugin(ScrollTrigger);

        images.forEach((image) => {
            const infoId = `info-${image.id}`;
            const infoElement = document.getElementById(infoId);

            if (infoElement) {
                ScrollTrigger.create({
                    trigger: `#photo-${image.id}`,
                    start: "top top",
                    end: "bottom bottom",
                    pin: `#${infoId}`,
                    pinSpacing: false
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [searchParams]);

    return (
        <main className="min-h-screen pt-16 px-6 pb-24 relative" ref={containerRef}>
            <div className="max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
                <motion.h1
                    layoutId='page-title'
                    className="text-3xl font-black opacity-90 mb-12"
                >
                    Photographs
                </motion.h1>

                {images.map((image) => (
                    <div key={image.id} id={`photo-${image.id}`} className="mb-24">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 lg:gap-x-6 gap-y-8">
                            <div className="col-span-1 md:col-span-9">
                                <img
                                    loading="lazy"
                                    className="w-full h-auto"
                                    src={image.url}
                                    alt={image.title}
                                />
                            </div>

                            <div className="col-span-1 md:col-span-3">
                                <div
                                    id={`info-${image.id}`}
                                    className="md:sticky md:top-24 self-start"
                                >
                                    <h2 className="text-2xl font-bold uppercase mb-2">
                                        {image.title}
                                    </h2>
                                    <p className="text-sm font-medium text-gray-500 mb-4">
                                        <IonIcon name="location-outline" className="inline-block mr-1 relative top-0.5" />
                                        {image.location}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        <IonIcon name="camera-outline" className="inline-block mr-1 relative top-0.5" />
                                        {image.camera}</p>
                                    <div className="flex text-sm text-gray-500">
                                        <p>{image.focal}</p>&nbsp;·&nbsp;
                                        <p>{image.aperture}</p>&nbsp;·&nbsp;
                                        <p>{image.shutter}</p>&nbsp;·&nbsp;
                                        <p>{image.iso}</p>
                                    </div>

                                    <p className="text-sm text-gray-500 mt-4">{image.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default function Home() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-16 px-6 pb-24 relative">Loading...</div>}>
            <Photos />
        </Suspense>
    );
}