"use client";

import projectData from "./data";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import IonIcon from "@reacticons/ionicons";
import LazyImage from "../components/LazyImage";

function getPlaceholderUrl(src?: string) {
    if (!src) return undefined;

    try {
        const url = new URL(src);
        if (url.hostname === "i.imgur.com") {
            const dot = url.pathname.lastIndexOf(".");
            if (dot > -1) url.pathname = `${url.pathname.slice(0, dot)}t${url.pathname.slice(dot)}`;
            return url.toString();
        }
        if (url.hostname.includes("googleusercontent.com")) {
            url.pathname = url.pathname.replace(/=w\d+(?:-h\d+)?[^/]*/, "=w96-h60-rw");
            return url.toString();
        }
    } catch {
        return undefined;
    }

    return undefined;
}

export default function Project({ title, icon, summary, directLink, ...props }) {
    const data = projectData.find((project) => project.title === decodeURIComponent(title));
    const [isSelected, setIsSelected] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [iframeHeight, setIframeHeight] = useState("620px");
    const screenshotsRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const placeholderSrc = getPlaceholderUrl(props.thumbnail);

    useEffect(() => {
        setIsReady(true);
        return () => setIsReady(false);
    }, []);

    useEffect(() => {
        if (!isSelected) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.history.pushState({ projectOverlay: true }, "");

        const closeOnBack = () => setIsSelected(false);
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsSelected(false);
        };
        const resizeIframe = (event: MessageEvent) => {
            if (typeof event.data?.height === "number") setIframeHeight(`${event.data.height}px`);
        };

        window.addEventListener("popstate", closeOnBack);
        window.addEventListener("keydown", closeOnEscape);
        window.addEventListener("message", resizeIframe);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("popstate", closeOnBack);
            window.removeEventListener("keydown", closeOnEscape);
            window.removeEventListener("message", resizeIframe);
        };
    }, [isSelected]);

    if (!data || !isReady) return null;

    const categories = (Array.isArray(data.category) ? data.category : [data.category]).filter(Boolean);
    const scrollScreenshots = (direction: "left" | "right") => {
        const container = screenshotsRef.current;
        if (!container) return;

        const start = container.scrollLeft;
        const distance = (direction === "left" ? -1 : 1) * container.clientWidth * 0.78;
        const target = Math.max(0, Math.min(start + distance, container.scrollWidth - container.clientWidth));
        const duration = shouldReduceMotion ? 0 : 520;
        const startedAt = performance.now();

        const animateScroll = (now: number) => {
            const progress = duration === 0 ? 1 : Math.min((now - startedAt) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            container.scrollLeft = start + (target - start) * eased;
            if (progress < 1) requestAnimationFrame(animateScroll);
        };

        requestAnimationFrame(animateScroll);
    };

    return (
        <>
            <motion.article
                className="group cursor-pointer bg-[var(--secondary)] h-full rounded-3xl p-2 transition-shadow hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/25"
                layoutId={`card-${title}`}
                onClick={() => directLink ? window.open(directLink, "_blank", "noopener,noreferrer") : setIsSelected(true)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                layout
            >
                {props.thumbnail && (
                    <LazyImage
                        layoutId={`thumbnail-${title}`}
                        src={props.thumbnail}
                        placeholderSrc={placeholderSrc}
                        alt={`${title} 프로젝트 미리보기`}
                        className="rounded-2xl"
                        aspectRatio="16/10"
                    />
                )}
                <div className="px-3 py-4">
                    <motion.h2 layoutId={`title-${title}`} className="text-lg font-bold m-0 flex items-center gap-1.5">
                        {title}
                        <IonIcon name={directLink ? "arrow-up-outline" : "chevron-forward"} className={`${directLink ? "rotate-45" : ""} text-sm opacity-35 transition-transform group-hover:translate-x-0.5`} />
                    </motion.h2>
                    <motion.p layoutId={`summary-${title}`} className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {summary}
                    </motion.p>
                </div>
            </motion.article>

            <AnimatePresence>
                {isSelected && (
                    <motion.div
                        className="fixed inset-0 z-[999] flex items-end justify-center bg-black/45 p-0 backdrop-blur-md md:items-center md:p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) setIsSelected(false);
                        }}
                    >
                        <motion.main
                            layoutId={`card-${title}`}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={`project-title-${title}`}
                            className="project-modal-scrollbar relative h-[100dvh] w-full max-w-5xl overflow-y-auto rounded-t-[2rem] bg-[var(--background)] shadow-2xl md:h-[min(90dvh,900px)] md:rounded-[2rem]"
                            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <header className="sticky top-0 z-[9999] flex items-center justify-end px-5 py-5 md:px-8">
                                <button
                                    type="button"
                                    aria-label="프로젝트 상세 닫기"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.06] text-xl transition-colors hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 backdrop-blur-xl dark:border-white/10"
                                    onClick={() => setIsSelected(false)}
                                >
                                    <IonIcon name="close" />
                                </button>
                            </header>

                            <div className="px-5 pb-12 pt-0 md:px-10 md:pt-0">
                                <section className="mx-auto max-w-4xl">
                                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                                        {icon && <motion.img layoutId={`icon-${title}`} src={icon} alt="" className="h-24 w-24 shrink-0 rounded-[22px] object-cover shadow-lg ring-1 ring-black/5 md:h-36 md:w-36" />}
                                        <div className="min-w-0 flex-1">
                                            <div className="mb-2 flex flex-wrap gap-1.5">
                                                {categories.map((category) => <span key={category} className="rounded-full bg-black/[0.055] px-2.5 py-1 text-xs font-semibold opacity-70 dark:bg-white/10">{category}</span>)}
                                            </div>
                                            <motion.h1 id={`project-title-${title}`} layoutId={`title-${title}`} className="text-3xl font-black tracking-tight md:text-4xl">{title}</motion.h1>
                                            <motion.p layoutId={`summary-${title}`} className="mt-2 max-w-2xl text-base leading-relaxed opacity-60 md:text-lg">{summary}</motion.p>
                                            {props.links?.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {props.links.map((link, index) => (
                                                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-gray-200 dark:bg-gray-800 text-[var(--foreground)] px-4 py-2 text-sm font-bold transition">
                                                            {link.name}<IonIcon name="arrow-up-outline" className="rotate-45" />
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {data.info?.length > 0 && (
                                        <div className="mt-8 flex flex-wrap justify-center overflow-hidden rounded-2xl border border-black/[0.07] bg-[var(--secondary)] dark:border-white/10">
                                            {data.info.map((info, index) => (
                                                <div
                                                    key={index}
                                                    className="w-1/2 border-black/[0.07] p-4 text-center dark:border-white/10 md:p-5 sm:w-[var(--info-width)] [&:not(:last-child)]:border-r"
                                                    style={{ "--info-width": `${100 / Math.min(data.info.length, 4)}%` } as React.CSSProperties}
                                                >
                                                    <span className="block text-xs font-medium opacity-45">{info.name}</span>
                                                    <strong className="mt-1 block text-sm md:text-base">{info.value}</strong>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>

                                {data.image?.length > 0 ? (
                                    <section className="mx-auto mt-10 max-w-4xl">
                                        <div className="mb-4 flex items-end justify-between">
                                            <div><span className="text-xs font-bold uppercase tracking-widest opacity-40">Screenshots</span><h2 className="text-xl font-bold">프로젝트 둘러보기</h2></div>
                                            <div className="hidden gap-2 sm:flex">
                                                {(["left", "right"] as const).map((direction) => <button key={direction} aria-label={`${direction === "left" ? "이전" : "다음"} 스크린샷`} onClick={() => scrollScreenshots(direction)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--secondary)]"><IonIcon name={direction === "left" ? "chevron-back" : "chevron-forward"} /></button>)}
                                            </div>
                                        </div>
                                        <div ref={screenshotsRef} className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 scrollbar-none md:mx-0 md:px-0">
                                            {data.image.map((img, index) => <img key={index} src={img} alt={`${title} 스크린샷 ${index + 1}`} loading="lazy" className="h-[280px] w-auto max-w-[85vw] flex-none snap-center rounded-2xl bg-[var(--secondary)] object-contain ring-1 ring-black/[0.06] md:h-[380px]" />)}
                                        </div>
                                    </section>
                                ) : data.thumbnail ? (
                                    <section className="mx-auto mt-10 max-w-4xl"><LazyImage src={data.thumbnail} placeholderSrc={placeholderSrc} alt={`${title} 프로젝트 화면`} className="rounded-2xl" aspectRatio="16/9" /></section>
                                ) : null}

                                {data.blogPostUrl && (
                                    <section className="mx-auto mt-12 max-w-4xl border-t border-black/[0.07] pt-8 dark:border-white/10">
                                        <span className="text-xs font-bold uppercase tracking-widest opacity-40">Story</span>
                                        <h2 className="mb-4 text-xl font-bold">프로젝트 상세</h2>
                                        <iframe src={data.blogPostUrl} className="w-full border-0" title={`${title} 상세 글`} style={{ height: iframeHeight }} />
                                    </section>
                                )}
                            </div>
                        </motion.main>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
