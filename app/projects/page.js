"use client";
import React from 'react';
import NavBar from '../components/NavBar';
import ProjectsWrapper from './ProjectsWrapper';
import { motion } from 'framer-motion';
import SocialLinks from '../components/SocialLinks';
import ThemePicker from '../components/ThemePicker';

export default function Home() {
    return (
        <>
            <NavBar activeTab={1} />
            <main className="min-h-screen px-6 pb-24 relative" id="main-section">
                <div className="relative max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto pt-16">
                    <header className="-mt-0.5 mb-3">
                        <div className="absolute right-0 top-5 md:top-[62px]">
                            <ThemePicker />
                        </div>
                        <motion.h1 layoutId="main-title" className="text-3xl font-black leading-10 opacity-90">
                            상상을 현실로,<br />
                            뚝딱뚝딱 만들고 있어요.
                        </motion.h1>
                    </header>

                    <SocialLinks className="mb-8" />

                    <ProjectsWrapper />
                </div>
            </main>
        </>
    )
}
