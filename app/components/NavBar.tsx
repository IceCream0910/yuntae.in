"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NavBar = ({ activeTab }: { activeTab: number }) => {
    const tabs = [
        { id: 0, label: 'About', link: '/' },
        { id: 1, label: 'Projects', link: '/projects' },
    ];

    return (<>
        <div className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center items-center w-full p-12 backdrop-blur-sm" style={{ WebkitMaskImage: 'linear-gradient(to top, var(--background) 55%, rgba(0, 0, 0, 0) 100%)', maskImage: 'linear-gradient(to top, var(--background) 55%, rgba(0, 0, 0, 0) 100%)' }}>
        </div>
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
            <div className="flex gap-1 p-2 rounded-full bg-[var(--background)] border-gray-500 shadow-md">
                {tabs.map((tab) => (
                    <Link key={tab.id} href={tab.link}>
                        <motion.button
                            key={tab.id}
                            className={`
                                px-4 py-2 rounded-full text-sm font-medium transition-colors
                                ${activeTab === tab.id
                                    ? 'bg-gray-200 dark:bg-gray-800 text-[var(--foreground)]'
                                    : 'text-[var(--foreground)] hover:bg-white/10 dark:hover:bg-white/5'
                                }
                            `}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {tab.label}
                        </motion.button>
                    </Link>
                ))}
            </div>
        </div>
    </>

    );
};

export default NavBar;