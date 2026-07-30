"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./resume.module.css";

const STORY_SCALE = 0.72;

export default function ResumeProjectStory({
    title,
    src,
}: {
    title: string;
    src: string;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [iframeHeight, setIframeHeight] = useState(900);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const storyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resizeIframe = (event: MessageEvent) => {
            if (
                event.source === iframeRef.current?.contentWindow &&
                typeof event.data?.height === "number"
            ) {
                setIframeHeight(Math.max(620, Math.min(event.data.height, 12000)));
            }
        };

        window.addEventListener("message", resizeIframe);
        return () => window.removeEventListener("message", resizeIframe);
    }, []);

    const toggleStory = () => {
        if (!isExpanded) {
            setIsExpanded(true);
            return;
        }

        setIsExpanded(false);
        window.requestAnimationFrame(() => {
            const project = storyRef.current?.closest("article");
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            project?.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start",
            });
        });
    };

    return (
        <div ref={storyRef} className={styles.story}>
            <div
                className={styles.storyViewport}
                style={{
                    maxHeight: isExpanded ? `${iframeHeight * STORY_SCALE}px` : "100px",
                }}
            >
                <iframe
                    ref={iframeRef}
                    src={src}
                    title={`${title} 프로젝트 상세 글`}
                    loading="lazy"
                    style={{
                        height: `${iframeHeight}px`,
                        width: `${100 / STORY_SCALE}%`,
                        transform: `scale(${STORY_SCALE})`,
                        opacity: isExpanded ? 0.85 : 0.5,
                    }}
                />
                {!isExpanded && <div className={styles.storyGradient} aria-hidden="true" />}
            </div>
            <button
                type="button"
                className={styles.storyToggle}
                aria-expanded={isExpanded}
                onClick={toggleStory}
            >
                {isExpanded ? "간략히 ↑" : "펼치기 ↓"}
            </button>
        </div>
    );
}
