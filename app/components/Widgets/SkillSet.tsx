"use client";

import React, { useRef, useState, useEffect } from "react";
import StackIcon from "tech-stack-icons";

interface Skill {
    name: string;
    iconName: string;
    featured?: boolean;
}

interface Category {
    title: string;
    skills: Skill[];
}

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

    const categories: Category[] = [
        {
            title: "Languages",
            skills: [
                { name: "JavaScript", iconName: "nodejs", featured: true },
                { name: "TypeScript", iconName: "typescript" },
                { name: "Kotlin", iconName: "kotlin" },
                { name: "Java", iconName: "java", featured: true },
                { name: "Python", iconName: "python" },
                { name: "C", iconName: "c++" },
            ]
        },
        {
            title: "Web",
            skills: [
                { name: "NextJS", iconName: "nextjs2", featured: true },
                { name: "ReactJS", iconName: "react" },
                { name: "Tailwindcss", iconName: "tailwindcss", featured: true },
                { name: "PWA", iconName: "pwa" }
            ]
        },
        {
            title: "Mobile",
            skills: [
                { name: "Android", iconName: "android", featured: true },
                { name: "Jetpack Compose", iconName: "webpack" },
                { name: "React Native", iconName: "reactnative" },
            ]
        },
        {
            title: "Backend",
            skills: [
                { name: "NodeJS(Express)", iconName: "nodejs2", featured: true },
                { name: "NestJS", iconName: "nestjs" },
                { name: "Spring Boot", iconName: "spring" },
                { name: "FastAPI", iconName: "fastgpt" }
            ]
        },
        {
            title: "Database",
            skills: [
                { name: "Firebase", iconName: "firebase" },
                { name: "Supabase", iconName: "supabase" },
                { name: "MongoDB", iconName: "mongodb" },
                { name: "MySQL", iconName: "mysql" },
                { name: "Redis", iconName: "redis" },
            ]
        },
        {
            title: "DevOps",
            skills: [
                { name: "Oracle cloud", iconName: "oracle" },
                { name: "Cloudflare", iconName: "cloudflare" },
                { name: "AWS", iconName: "aws" },
                { name: "Docker", iconName: "docker" },
                { name: "Git", iconName: "git" },
                { name: "GitHub Actions", iconName: "github" },
                { name: "Traefik", iconName: "traefikproxy" },
                { name: "Vercel", iconName: "vercel" },
                { name: "Notion", iconName: "notion" },
            ]
        },
        {
            title: "AI",
            skills: [
                { name: "Claude", iconName: "claude" },
                { name: "Codex", iconName: "openai" },
                { name: "Hugging Face", iconName: "huggingface" },
                { name: "Ollama", iconName: "ollama" }
            ]
        }
    ];

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
                    {categories.map((category, index) => (
                        <div
                            key={category.title}
                            className={`flex flex-col ${index !== categories.length - 1
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