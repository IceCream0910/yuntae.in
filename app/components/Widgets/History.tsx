"use client";
import IonIcon from '@reacticons/ionicons';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function History() {
    const [activeTab, setActiveTab] = useState<'education' | 'certification'>('education');
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    const education = [
        { institution: '성일고등학교', detail: '일반 인문계', period: '2021~2024', icon: 'school-outline' as const },
        { institution: '광운대학교', detail: '소프트웨어학부', period: '2024~', icon: 'laptop-outline' as const },
    ];

    const certifications = [
        { name: '정보처리기능사', year: '2017', icon: 'code-slash-outline' as const },
        { name: '컴퓨터활용능력 2급', year: '2016', icon: 'desktop-outline' as const },
        { name: 'GTQ 그래픽기술자격 1급', year: '2017', icon: 'brush-outline' as const },
    ];

    return (
        <div className="relative w-full h-full flex flex-col" ref={boxRef}>
            <div className="absolute top-2 right-2 flex space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)] opacity-60"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)] opacity-30"></div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[var(--foreground)] -mt-1">
                    <IonIcon name={activeTab === 'education' ? 'school' : 'ribbon' as const} className="relative mr-2 top-1" />
                    {activeTab === 'education' ? '학력' : '자격증'}
                </h2>

                <div className="flex bg-[var(--secondary)]/20 rounded-full p-1 backdrop-blur-sm">
                    <button
                        onClick={() => setActiveTab('education')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'education'
                            ? 'bg-white text-[var(--background)] shadow-sm'
                            : 'text-[var(--foreground)]/70'
                            }`}
                    >
                        학력
                    </button>
                    <button
                        onClick={() => setActiveTab('certification')}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'certification'
                            ? 'bg-white text-[var(--background)] shadow-sm'
                            : 'text-[var(--foreground)]/70'
                            }`}
                    >
                        자격증
                    </button>
                </div>
            </div>

            <div className="flex-grow overflow-hidden mt-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        className="h-full space-y-3 overflow-y-auto pr-1 pb-1"
                        style={{
                            maxHeight: 'calc(100% - 10px)',
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'var(--secondary) transparent'
                        }}
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'education' ? (
                            education.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="backdrop-blur-sm mb-6"
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onMouseEnter={() => setHoveredItem(index)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className={`w-10 rounded-full mr-3 aspect-square ${hoveredItem === index ? 'bg-[var(--secondary)] ' : 'bg-[var(--secondary)]/30'} transition-colors duration-300 flex justify-center items-center`}>
                                                <IonIcon name={item.icon} className="text-[var(--foreground)] relative text-xl" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-[var(--foreground)]">{item.institution}</span>
                                                <div className="text-sm text-[var(--foreground)]/70 mt-0.5">
                                                    {item.detail}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[var(--foreground)]/70 bg-[var(--secondary)]/20 px-2 py-1 rounded-full text-xs">
                                            {item.period}
                                        </span>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    className="backdrop-blur-sm flex items-center justify-between"
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onMouseEnter={() => setHoveredItem(index)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="flex items-center">
                                        <div className={`w-10 rounded-full mr-3 aspect-square ${hoveredItem === index ? 'bg-[var(--secondary)] ' : 'bg-[var(--secondary)]/30'} transition-colors duration-300 flex justify-center items-center`}>
                                            <IonIcon name={cert.icon} className="text-[var(--foreground)]" />
                                        </div>
                                        <span className="font-bold text-[var(--foreground)]">{cert.name}</span>
                                    </div>
                                    <div className="bg-[var(--secondary)]/30 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-[var(--foreground)]">
                                        {cert.year}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="absolute bottom-1 right-1 w-1 h-20 opacity-0 hover:opacity-50 transition-opacity">
                <div className="w-full h-full rounded-full bg-[var(--foreground)]/20"></div>
            </div>
        </div>
    );
}