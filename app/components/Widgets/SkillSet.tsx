"use client";

import React, { useRef, useState, useEffect } from "react";
import StackIcon from "tech-stack-icons";
import { skillCategories } from "../../data/profile";

const SkillSet = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAtTop, setIsAtTop] = useState(true);
    const [isAtBottom, setIsAtBottom] = useState(false);

    const handleScroll = () => {
        if (!scrollRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        setIsAtTop(scrollTop <= 0);
        // 1px tolerance for rounding issues
        setIsAtBottom(Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1);
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener("resize", handleScroll);
        return () => window.removeEventListener("resize", handleScroll);
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col overflow-hidden">
            <div className="flex-shrink-0 mb-3.5 relative z-10">
                <h3 className="text-lg font-bold tracking-tight">Skills</h3>
            </div>

            <div className="relative flex-1 overflow-hidden flex flex-col">
                <div className={`absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[var(--secondary)] to-transparent z-10 pointer-events-none transition-opacity duration-300 ${isAtTop ? 'opacity-0' : 'opacity-100'}`} />

                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto pr-0.5 no-scrollbar flex flex-col select-none"
                >
                    {skillCategories.map((category, index) => (
                        <div
                            key={category.title}
                            className={`flex flex-col ${index !== skillCategories.length - 1
                                ? "border-b border-gray-100/70 dark:border-zinc-800/40 pb-3.5"
                                : "pb-4"
                                }`}
                        >
                            <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 tracking-wider mb-2 uppercase">
                                {category.title}
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {category.skills.map((skill) => {
                                    const isFeatured = skill.featured;
                                    return (
                                        <div
                                            key={skill.name}
                                            className={`group inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium cursor-default
                                                ${isFeatured
                                                    ? "bg-blue-100/30 dark:bg-blue-400/10 border border-blue-400/70 dark:border-blue-400/50 shadow-sm"
                                                    : "bg-gray-200/50 dark:bg-zinc-900 border text-gray-700 dark:text-gray-400 border-transparent"
                                                }`}
                                        >
                                            <StackIcon name={skill.iconName} className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                                            <span className="leading-none">{skill.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--secondary)] from-[15%] to-transparent z-10 pointer-events-none transition-opacity duration-300 ${isAtBottom ? 'opacity-0' : 'opacity-100'}`} />
            </div>

            <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none transition-all duration-500 z-20 ${isAtTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <svg className="w-3.5 h-3.5 text-gray-500 dark:text-zinc-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span className="text-[10px] text-gray-500 dark:text-zinc-400 font-medium mb-0.5 animate-pulse">스크롤해서 더보기</span>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </div>
    );
};

export default SkillSet;
