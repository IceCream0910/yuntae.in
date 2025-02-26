"use client";
import { useState, useEffect, useRef } from "react";
import projectData from "./data";
import Project from "./Project";
import IonIcon from '@reacticons/ionicons';

export default function ProjectsWrapper() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const tabsRef = useRef(null);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(false);

    const categories = ['All', ...new Set(projectData.flatMap(project =>
        Array.isArray(project.category) ? project.category : [project.category]
    ).filter(Boolean))];

    const filteredProjects = projectData.filter(project => {
        if (selectedCategory === 'All') return true;
        return Array.isArray(project.category)
            ? project.category.includes(selectedCategory)
            : project.category === selectedCategory;
    });

    const scrollTabs = (direction) => {
        const container = tabsRef.current;
        if (!container) return;

        const scrollAmount = direction === 'left' ? -200 : 200;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    const checkScroll = () => {
        if (!tabsRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
        setShowLeftScroll(scrollLeft > 0);
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        const tabsElement = tabsRef.current;
        if (tabsElement) {
            checkScroll();
            tabsElement.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
        }

        return () => {
            if (tabsElement) {
                tabsElement.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            }
        };
    }, []);

    return (
        <div className="w-full">
            <div className="relative mb-5">
                {showLeftScroll && (
                    <>
                        <div className="absolute left-0 top-0 w-[100px] h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
                        <button
                            onClick={() => scrollTabs('left')}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white border-none rounded-full w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
                        >
                            <IonIcon name="chevron-back" />
                        </button>
                    </>
                )}
                {showRightScroll && (
                    <>
                        <div className="absolute right-0 top-0 w-[100px] h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
                        <button
                            onClick={() => scrollTabs('right')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white border-none rounded-full w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
                        >
                            <IonIcon name="chevron-forward" />
                        </button>
                    </>
                )}
                <div
                    ref={tabsRef}
                    className="flex gap-2.5 p-2.5 overflow-x-auto scrollbar-none"
                >
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-[20px] border-none cursor-pointer whitespace-nowrap transition-all duration-300 ease-in-out ${selectedCategory === category ? 'bg-gray-200 dark:bg-gray-800' : 'bg-zinc-50 dark:bg-zinc-900'
                                } text-text`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
                {filteredProjects.map((project, index) => (
                    <Project key={index} {...project} />
                ))}
            </div>
        </div>
    );
}