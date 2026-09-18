"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Stack from "../Stack";

export default function Photo() {
    const [images, setImages] = useState<string[]>([]);
    const [status, setStatus] = useState("사진을 불러오는 중입니다.");
    const stackArea = useRef<HTMLDivElement>(null);
    const [side, setSide] = useState<number | null>(null);
    const reduce = useReducedMotion();
    useEffect(() => {
        const controller = new AbortController();
        async function loadPhotos() {
            try {
                const response = await fetch("/api/photos", { signal: controller.signal });
                if (!response.ok) throw new Error("Photo feed request failed");
                const feed = new DOMParser().parseFromString(await response.text(), "application/xml");
                if (feed.querySelector("parsererror") || !feed.querySelector("rss > channel")) {
                    throw new Error("Invalid photo feed");
                }
                const photos = Array.from(feed.querySelectorAll("channel > item"))
                    .map(item => {
                        const enclosure = item.querySelector('enclosure[type^="image/"]');
                        const src = enclosure?.getAttribute("url");
                        const date = Date.parse(item.querySelector("pubDate")?.textContent ?? "");
                        return { src, date: Number.isNaN(date) ? 0 : date };
                    })
                    .filter((photo): photo is { src: string; date: number } =>
                        Boolean(photo.src && /^https?:\/\//i.test(photo.src)))
                    .sort((a, b) => b.date - a.date)
                    .slice(0, 4)
                    .map(photo => `/api/photos/thumbnail?url=${encodeURIComponent(photo.src)}`)
                    .reverse(); // Stack renders its last card on top.
                if (!controller.signal.aborted) {
                    setImages(photos);
                    setStatus(photos.length ? "" : "아직 등록된 사진이 없습니다.");
                }
            } catch {
                if (!controller.signal.aborted) setStatus("사진을 불러오지 못했습니다.");
            }
        }
        void loadPhotos();
        return () => controller.abort();
    }, []);
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
                {status && <p role="status" className="widget-muted text-xs">{status}</p>}
                <div className="absolute left-0 top-0">
                {side !== null && images.length > 0 && <Stack
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
