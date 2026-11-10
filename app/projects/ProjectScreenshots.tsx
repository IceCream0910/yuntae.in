import { useEffect, useRef, type PointerEvent } from "react";
import IonIcon from "@reacticons/ionicons";

function screenshotSource(src: string) {
    const match = src.match(/^(https:\/\/play-lh\.googleusercontent\.com\/[^?]+)=w(\d+)-h(\d+)(-rw)$/);
    if (!match) return { src };

    const [, base, widthString, heightString, format] = match;
    const width = Number(widthString);
    const height = Number(heightString);
    const displayHeight = 380;
    if (height <= displayHeight) return { src };

    // The CDN dimensions describe a bounding box, not the image's aspect ratio.
    const resize = (size: number) => `${base}=w${Math.round(size * width / height)}-h${size}${format}`;
    const highDpiHeight = Math.min(height, displayHeight * 2);

    return {
        src: resize(displayHeight),
        srcSet: `${resize(displayHeight)} 1x, ${resize(highDpiHeight)} ${highDpiHeight / displayHeight}x`,
    };
}

export default function ProjectScreenshots({ title, images, reducedMotion }: {
    title: string;
    images: string[];
    reducedMotion: boolean | null;
}) {
    const galleryRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<{ pointerId: number; startX: number; startScroll: number; nextScroll: number } | null>(null);
    const frameRef = useRef<number | null>(null);

    useEffect(() => () => {
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    }, []);

    const scroll = (direction: number) => {
        const gallery = galleryRef.current;
        gallery?.scrollBy({
            left: direction * gallery.clientWidth * 0.78,
            behavior: reducedMotion ? "instant" : "smooth",
        });
    };

    const startDrag = (event: PointerEvent<HTMLDivElement>) => {
        const gallery = event.currentTarget;
        if (event.pointerType !== "mouse" || event.button !== 0 || dragRef.current
            || gallery.scrollWidth <= gallery.clientWidth) return;

        const startScroll = gallery.scrollLeft;
        dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startScroll, nextScroll: startScroll };
        gallery.dataset.dragging = "true";
        gallery.scrollTo({ left: startScroll, behavior: "instant" });
        gallery.setPointerCapture(event.pointerId);
    };

    const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;

        drag.nextScroll = drag.startScroll + drag.startX - event.clientX;
        if (frameRef.current !== null) return;

        const gallery = event.currentTarget;
        frameRef.current = requestAnimationFrame(() => {
            gallery.scrollLeft = drag.nextScroll;
            frameRef.current = null;
        });
    };

    const endDrag = (event: PointerEvent<HTMLDivElement>) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;

        const gallery = event.currentTarget;
        if (frameRef.current !== null) {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = null;
        }
        if (event.type === "pointerup") {
            gallery.scrollLeft = drag.startScroll + drag.startX - event.clientX;
        }
        dragRef.current = null;
        delete gallery.dataset.dragging;
    };

    return (
        <section className="mx-auto mt-10 max-w-4xl">
            <div className="mb-4 flex items-end justify-between">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-40">Screenshots</span>
                    <h2 className="text-xl font-bold">프로젝트 둘러보기</h2>
                </div>
                <div className="hidden gap-2 sm:flex">
                    <button type="button" aria-label="이전 스크린샷" onClick={() => scroll(-1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--secondary)]">
                        <IonIcon name="chevron-back" />
                    </button>
                    <button type="button" aria-label="다음 스크린샷" onClick={() => scroll(1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--secondary)]">
                        <IonIcon name="chevron-forward" />
                    </button>
                </div>
            </div>
            <div
                ref={galleryRef}
                role="region"
                aria-label="프로젝트 스크린샷"
                tabIndex={0}
                onPointerDown={startDrag}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onLostPointerCapture={endDrag}
                className="-mx-5 flex select-none gap-4 overflow-x-auto px-5 pb-3 scrollbar-none md:mx-0 md:px-0 [@media(any-pointer:fine)]:cursor-grab [@media(pointer:coarse)]:snap-x [@media(pointer:coarse)]:snap-mandatory data-[dragging=true]:cursor-grabbing data-[dragging=true]:snap-none"
            >
                {/* The gallery only mounts in an open modal. Start image requests
                    without relying on lazy loading inside the horizontal scroller. */}
                {images.map((src, index) => (
                    <img
                        key={index}
                        {...screenshotSource(src)}
                        alt={`${title} 스크린샷 ${index + 1}`}
                        loading="eager"
                        decoding="async"
                        draggable={false}
                        className="h-[280px] w-auto max-w-[85vw] flex-none snap-center rounded-2xl bg-[var(--secondary)] object-contain ring-1 ring-black/[0.06] md:h-[380px]"
                    />
                ))}
            </div>
        </section>
    );
}
