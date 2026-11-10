"use client";

import type { ProjectData } from "./data";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import IonIcon from "@reacticons/ionicons";
import LazyImage from "../components/LazyImage";
import ProjectScreenshots from "./ProjectScreenshots";

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

export default function Project({ project, showFeatured }: { project: ProjectData; showFeatured?: boolean }) {
    const { title, summary, categories, icon, directLink, thumbnail, links, info, screenshots, blogPostUrl } = project;
    const [isSelected, setIsSelected] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [iframeHeight, setIframeHeight] = useState("620px");
    const [isModalExpanded, setIsModalExpanded] = useState(false);
    const [isIframeLoaded, setIsIframeLoaded] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const placeholderSrc = getPlaceholderUrl(thumbnail);

    useEffect(() => {
        setIsReady(true);
        return () => setIsReady(false);
    }, []);

    useEffect(() => {
        if (!isSelected) {
            setIsModalExpanded(false);
            setIsIframeLoaded(false);
            return;
        }

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

    useEffect(() => {
        if (!isSelected || isModalExpanded) return;

        // Layout completion is the primary trigger; this also covers reduced-motion
        // environments and browsers that skip a shared-layout animation frame.
        const fallbackTimer = window.setTimeout(
            () => setIsModalExpanded(true),
            shouldReduceMotion ? 0 : 450,
        );

        return () => window.clearTimeout(fallbackTimer);
    }, [isSelected, isModalExpanded, shouldReduceMotion]);

    if (!isReady) return null;

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
                {thumbnail && (
                    <div className="relative">
                        <LazyImage
                            layoutId={`thumbnail-${title}`}
                            src={thumbnail}
                            placeholderSrc={placeholderSrc}
                            alt={`${title} 프로젝트 미리보기`}
                            className="rounded-2xl"
                            aspectRatio="16/10"
                        />
                        {showFeatured && (
                            <span className="pointer-events-none absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-sm text-amber-900 shadow-sm dark:bg-amber-950 dark:text-amber-200">
                                <IonIcon name="star" aria-hidden="true" />
                                <span className="sr-only">Featured</span>
                            </span>
                        )}
                    </div>
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
                            onLayoutAnimationComplete={() => setIsModalExpanded(true)}
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
                                            {links?.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {links.map((link, index) => (
                                                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-gray-200 dark:bg-gray-800 text-[var(--foreground)] px-4 py-2 text-sm font-bold transition">
                                                            {link.name}<IonIcon name="arrow-up-outline" className="rotate-45" />
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {info?.length > 0 && (
                                        <div className="mt-8 flex flex-wrap justify-center overflow-hidden rounded-2xl border border-black/[0.07] bg-[var(--secondary)] dark:border-white/10">
                                            {info.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="w-1/2 border-black/[0.07] p-4 text-center dark:border-white/10 md:p-5 sm:w-[var(--info-width)] [&:not(:last-child)]:border-r"
                                                    style={{ "--info-width": `${100 / Math.min(info.length, 4)}%` } as React.CSSProperties}
                                                >
                                                    <span className="block text-xs font-medium opacity-45">{item.name}</span>
                                                    <strong className="mt-1 block text-sm md:text-base">{item.value}</strong>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>

                                {screenshots?.length > 0 ? (
                                    <ProjectScreenshots title={title} images={screenshots} reducedMotion={shouldReduceMotion} />
                                ) : thumbnail ? (
                                    <section className="mx-auto mt-10 max-w-4xl"><LazyImage src={thumbnail} placeholderSrc={placeholderSrc} alt={`${title} 프로젝트 화면`} className="rounded-2xl" aspectRatio="16/9" /></section>
                                ) : null}

                                {blogPostUrl && (
                                    <section
                                        className="mx-auto mt-12 max-w-4xl border-t border-black/[0.07] pt-8 dark:border-white/10"
                                        aria-busy={!isIframeLoaded}
                                    >
                                        <span className="text-xs font-bold uppercase tracking-widest opacity-40">Story</span>
                                        <h2 className="mb-4 text-xl font-bold">프로젝트 상세</h2>
                                        <div className="relative min-h-[620px] overflow-hidden">
                                            <AnimatePresence>
                                                {!isIframeLoaded && (
                                                    <motion.div
                                                        className="pointer-events-none absolute inset-0 z-10 bg-[var(--background)] p-6"
                                                        aria-hidden="true"
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                                                    >
                                                        <div className="motion-safe:animate-pulse">
                                                            <div className="h-6 w-2/5 rounded-full bg-black/[0.07] dark:bg-white/10" />
                                                            <div className="mt-7 space-y-3">
                                                                <div className="h-3 w-full rounded-full bg-black/[0.06] dark:bg-white/[0.08]" />
                                                                <div className="h-3 w-11/12 rounded-full bg-black/[0.06] dark:bg-white/[0.08]" />
                                                                <div className="h-3 w-4/5 rounded-full bg-black/[0.06] dark:bg-white/[0.08]" />
                                                            </div>
                                                            <div className="mt-10 aspect-video w-full rounded-xl bg-black/[0.055] dark:bg-white/[0.07]" />
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                            {isModalExpanded && (
                                                <iframe
                                                    src={blogPostUrl}
                                                    className={`w-full border-0 motion-safe:transition-opacity motion-safe:duration-300 ${isIframeLoaded ? "opacity-100" : "opacity-0"}`}
                                                    title={`${title} 상세 글`}
                                                    style={{ height: iframeHeight }}
                                                    onLoad={() => setIsIframeLoaded(true)}
                                                />
                                            )}
                                        </div>
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
