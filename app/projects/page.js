"use client";
import React from 'react';
import NavBar from '../components/NavBar';
import ProjectsWrapper from './ProjectsWrapper';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <>
            <NavBar activeTab={1} />
            <main className="min-h-screen pt-16 px-6 pb-24 relative" id="main-section">
                <div className="max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
                    <motion.h1 layoutId="main-title" className='text-3xl font-black opacity-90 mt-[-2px] mb-3 leading-10'>
                        상상을 현실로,<br />
                        뚝딱뚝딱 만들고 있어요.
                    </motion.h1>

                    <div className="flex space-x-4 mb-8">
                        <a href="https://github.com/icecream0910"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-medium text-gray-500 hover:text-gray-400"
                        > Github </a>
                        <a href="https://blog.yuntae.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-medium text-gray-500 hover:text-gray-400"
                        > Blog </a>
                        <a href="mailto:hey@yuntae.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-medium text-gray-500 hover:text-gray-400"
                        > Email </a>
                    </div>

                    <ProjectsWrapper />
                </div>
            </main>
        </>
    )
}