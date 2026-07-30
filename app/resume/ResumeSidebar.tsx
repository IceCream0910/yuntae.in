"use client";

import { useEffect, useState } from "react";
import styles from "./resume.module.css";

type Section = [string, string];

export default function ResumeSidebar({ sections }: { sections: Section[] }) {
    const [activeSection, setActiveSection] = useState(sections[0]?.[0] ?? "");

    useEffect(() => {
        let frame = 0;

        const updateActiveSection = () => {
            frame = 0;
            const activationLine = window.innerHeight * 0.34;
            let current = sections[0]?.[0] ?? "";

            for (const [id] of sections) {
                const section = document.getElementById(id);
                if (section && section.getBoundingClientRect().top <= activationLine) {
                    current = id;
                }
            }

            setActiveSection(current);
        };

        const handleScroll = () => {
            if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
        };

        updateActiveSection();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, [sections]);

    return (
        <aside className={styles.sidebar}>
            <a className={styles.identity} href="#top" aria-label="이력서 상단으로">
                <strong>Yun Taein.</strong>
            </a>

            <nav aria-label="이력서 섹션">
                {sections.map(([id, label], index) => {
                    const isActive = activeSection === id;

                    return (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={isActive ? styles.navLinkActive : undefined}
                            aria-current={isActive ? "location" : undefined}
                        >
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            {label}
                        </a>
                    );
                })}
            </nav>

            <div className={styles.sidebarLinks}>
                <a href="https://github.com/icecream0910" target="_blank" rel="noreferrer">
                    GitHub ↗
                </a>
                <a href="https://blog.yuntae.in" target="_blank" rel="noreferrer">
                    Blog ↗
                </a>
                <a href="mailto:hey@yuntae.in">hey@yuntae.in</a>
            </div>

            <a className={styles.backLink} href="/">← 메인 페이지로 돌아가기</a>
        </aside>
    );
}
