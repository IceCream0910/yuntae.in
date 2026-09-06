"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Stack from "../Stack";

const images = [
    "https://ik.imagekit.io/vhnrc0r8ovw/tr:w-0.1/iXxCE3G_gB3qlMFRV.jpeg",
    "https://ik.imagekit.io/vhnrc0r8ovw/tr:w-0.1/a7eOkZz_mhYE3j-Y0.jpeg",
    "https://ik.imagekit.io/vhnrc0r8ovw/tr:w-0.1/OKPYDl2_pPIEaeTPj.jpeg",
];
export default function Photo() {
    const stackArea = useRef<HTMLDivElement>(null);
    const [side, setSide] = useState<number | null>(null);
    const reduce = useReducedMotion();
    useEffect(() => {
        const area = stackArea.current;
        if (!area) return;
        const observer = new ResizeObserver(() => {
            setSide(Math.max(area.clientWidth, area.clientHeight + 48));
        });
        observer.observe(area);
        return () => observer.disconnect();
    }, []);
    return (
        <div className="relative flex h-full flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="widget-heading">Photos</h3>
                    <p className="widget-muted mt-1 text-[11px]">직접 찍은 사진들</p>
                </div>
                <a href="https://photo.yuntae.in" target="_blank" rel="noreferrer" className="widget-icon-button" aria-label="사진 갤러리 열기">↗</a></div>
            <div ref={stackArea} className="relative mt-8 min-h-0 flex-1">
                <div className="absolute left-0 top-0">
                {side !== null && <Stack
                    randomRotation={!reduce}
                    sensitivity={Math.min(180, side * .5)}
                    sendToBackOnClick
                    cardDimensions={{ width: side, height: side }}
                    cardsData={images.map((img, id) => ({ id, img }))}
                    onChange={() => { }}
                />}
                </div>
            </div>
        </div>
    );
}
