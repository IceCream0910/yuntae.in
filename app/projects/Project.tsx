"use client";
import projectData from "./data";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from "react";
import IonIcon from '@reacticons/ionicons';
import Spacer from '../components/Spacer';

export default function Project({ title, icon, summary, directLink, ...props }) {
    const data = projectData.find((project) => project.title === decodeURIComponent(title));
    const [isSelected, setIsSelected] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const screenshotsRef = useRef(null);
    const controlsTimerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const modalRef = useRef(null);

    const variants = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    if (!data) return null;

    const scrollScreenshots = (direction) => {
        const { current: container } = screenshotsRef;
        const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    const handleScreenshotsHover = (isHovering) => {
        if (isHovering) {
            setShowControls(true);
            if (controlsTimerRef.current) {
                clearTimeout(controlsTimerRef.current);
            }
        } else {
            setShowControls(false);
        }
    };

    useEffect(() => {
        return () => {
            if (controlsTimerRef.current) {
                clearTimeout(controlsTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isSelected) {
            document.body.style.overflow = 'hidden';
            document.getElementById('main-section').style.overflow = 'hidden';
            window.history.pushState({ overlay: true }, '');
            const handlePopState = () => {
                setIsSelected(false);
            };
            window.addEventListener('popstate', handlePopState);

            return () => {
                window.removeEventListener('popstate', handlePopState);
            };
        } else {
            document.body.style.overflow = 'auto';
            document.getElementById('main-section').style.overflow = 'auto';
        }
    }, [isSelected]);

    useEffect(() => {
        setIsReady(true);
        return () => setIsReady(false);
    }, []);

    if (!isReady) return null;

    return (
        <>
            <motion.div
                layoutId={`card-${title}`}
                onClick={() => {
                    if (directLink) window.open(directLink, '_blank');
                    else setIsSelected(true);
                }}
                initial={false}
                layout
            >
                <div className="cursor-pointer bg-[var(--secondary)] h-full rounded-2xl p-5"
                    style={{ aspectRatio: 'unset' }}>
                    <motion.b layoutId={`title-${title}`} className="card-title text-base m-0">
                        {title}
                        {directLink && <IonIcon name='arrow-forward-outline' className="ml-[5px] text-base opacity-60 relative top-[3px] rotate-[-45deg]" />}
                    </motion.b>
                    <motion.p layoutId={`summary-${title}`} className="text-[15px] m-0 mt-[5px] text-gray-700 dark:text-gray-400">
                        {summary}
                    </motion.p>
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                {isSelected && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[999] bg-white dark:bg-black"
                            onClick={() => setIsSelected(false)}
                        />
                        <main className="fixed top-0 left-1/2 -translate-x-1/2 w-[100dvh] h-[100dvh] z-[999] max-w-full overflow-y-auto">
                            <motion.div
                                ref={modalRef}
                                layoutId={`card-${title}`}
                                className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/30 scrollbar-thumb-rounded max-h-screen overflow-y-auto"
                            >
                                <section className="p-5">
                                    <motion.div
                                        layoutId={`fixed-header-${title}`}
                                        className="fixed-header"
                                    >
                                        <div className="content">
                                            <div className="flex items-center gap-5">
                                                {icon && <motion.img layoutId={`icon-${title}`} src={icon} className="w-[50px] rounded-[10px]" />}
                                                <motion.h2 layoutId={`title-${title}`} className="text-2xl font-bold m-0">
                                                    {title}
                                                </motion.h2>
                                            </div>
                                            <Spacer y={15} />
                                            <motion.span layoutId={`summary-${title}`} className="opacity-80">
                                                {summary}
                                            </motion.span>
                                            <Spacer y={15} />
                                            {props.links && (
                                                <div className="flex items-center gap-2.5">
                                                    {props.links.map((link, i) => (
                                                        <a key={i} href={link.url} target="_blank">{link.name}</a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                    <div
                                        className="absolute top-5 right-5 z-[999] w-10 h-10 rounded-full aspect-square cursor-pointer flex justify-center items-center bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsSelected(false);
                                        }}
                                    >
                                        <IonIcon name="close" />
                                    </div>

                                    <Spacer y={30} />

                                    <div className="flex flex-row w-full justify-around">
                                        {data.info && data.info.map((info, i) => (
                                            <div key={i} className="flex flex-col items-center">
                                                <span className="text-sm opacity-60">{info.name}</span>
                                                <span className="text-base font-bold">{info.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Spacer y={30} />

                                    <div className="relative">
                                        <div
                                            className="flex overflow-x-auto overflow-y-hidden scrollbar-none"
                                            ref={screenshotsRef}
                                            onMouseEnter={() => handleScreenshotsHover(true)}
                                            onMouseLeave={() => handleScreenshotsHover(false)}
                                        >
                                            {showControls && (
                                                <>
                                                    <button
                                                        className="absolute left-5 top-1/2 -translate-y-1/2 z-[999] flex justify-center items-center w-10 h-10 text-xl bg-white/50 backdrop-blur shadow-lg text-background rounded-full cursor-pointer opacity-100 transition-opacity duration-300"
                                                        onClick={() => scrollScreenshots('left')}
                                                    >
                                                        <IonIcon name="chevron-back" />
                                                    </button>
                                                    <button
                                                        className="absolute right-5 top-1/2 -translate-y-1/2 z-[999] flex justify-center items-center w-10 h-10 text-xl bg-white/50 backdrop-blur shadow-lg text-background rounded-full cursor-pointer opacity-100 transition-opacity duration-300"
                                                        onClick={() => scrollScreenshots('right')}
                                                    >
                                                        <IonIcon name="chevron-forward" />
                                                    </button>
                                                </>
                                            )}
                                            {data.image && data.image.map((img, i) => (
                                                <div key={i} className="flex-none relative mr-5 rounded-[10px] w-[40%] lg:w-[30%] 2xl:w-[20%]" style={{
                                                    width: '40%'
                                                }}>
                                                    <img
                                                        className="w-full h-full object-cover rounded-[15px]"
                                                        src={img}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Spacer y={10} />

                                    <p dangerouslySetInnerHTML={{ __html: data.desc }}></p>

                                    <Spacer y={50} />
                                </section>
                            </motion.div>
                        </main>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}