"use client";
import IonIcon from '@reacticons/ionicons';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certifications, education } from '../../data/profile';

export default function History() {
    const [activeTab, setActiveTab] = useState<'education' | 'certification'>('education');
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative w-full h-full flex flex-col" ref={boxRef}>
            <div className="absolute top-2 right-2 flex space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)] opacity-60"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)] opacity-30"></div>
            </div>

            <div className="flex mb-4">
                <div className="flex bg-[var(--secondary)]/20 rounded-full p-1 backdrop-blur-sm">
                    <button
                        onClick={() => setActiveTab('education')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'education'
                            ? 'bg-black/70 dark:bg-white text-[var(--background)] shadow-sm'
                            : 'text-[var(--foreground)]/70'
                            }`}
                    >
                        학력
                    </button>
                    <button
                        onClick={() => setActiveTab('certification')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'certification'
                            ? 'bg-black/70 dark:bg-white text-[var(--background)] shadow-sm'
                            : 'text-[var(--foreground)]/70'
                            }`}
                    >
                        자격증
                    </button>
                </div>
            </div>

            <div className="flex-grow overflow-hidden relative">
                {/* Timeline background line (Full Card Height) */}
                <div className="absolute left-[15px] top-0 bottom-0 w-[1px] bg-[var(--foreground)] opacity-20 z-0"></div>

                <AnimatePresence mode="wait">
                    <motion.div
                        className="h-full relative overflow-y-auto pr-1 pb-1 z-10"
                        style={{
                            maxHeight: 'calc(100% - 10px)',
                            scrollbarWidth: 'none',
                        }}
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="space-y-6 py-4">
                            {activeTab === 'education' ? (
                                education.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative pl-10 group cursor-default"
                                        onMouseEnter={() => setHoveredItem(index)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <div className={`absolute left-0 top-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center shadow-sm z-10`}>
                                            <IonIcon name={item.icon} className={`text-[14px] transition-colors duration-300`} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm text-[var(--foreground)] leading-tight">{item.institution}</span>
                                            <span className="text-xs text-[var(--foreground)] opacity-50 mt-1">
                                                {item.period} · {item.detail}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                certifications.map((cert, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative pl-10 group cursor-default"
                                        onMouseEnter={() => setHoveredItem(index)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <div className={`absolute left-0 top-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center shadow-sm z-10`}>
                                            <IonIcon name={cert.icon} className={`text-[14px] transition-colors duration-300`} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm text-[var(--foreground)] leading-tight">{cert.name}</span>
                                            <span className="text-xs text-[var(--foreground)] opacity-50 mt-1">
                                                {cert.year}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
