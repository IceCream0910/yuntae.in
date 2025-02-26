"use client";
import { useState, useEffect } from 'react';
import IonIcon from '@reacticons/ionicons';
import CountUp from '../CountUp';
import { motion } from 'framer-motion';

export default function Navy() {
    const [progress, setProgress] = useState(0);
    const [daysLeft, setDaysLeft] = useState(0);
    const [daysServed, setDaysServed] = useState(0);
    const [totalDays, setTotalDays] = useState(0);

    const enlistmentDate = new Date('2025-04-21');
    const dischargeDate = new Date('2026-12-20');

    useEffect(() => {
        const calculateProgress = () => {
            const now = new Date();
            const totalServiceTime = dischargeDate.getTime() - enlistmentDate.getTime();
            setTotalDays(Math.ceil(totalServiceTime / (1000 * 60 * 60 * 24)));

            if (now < enlistmentDate) {
                setProgress(0);
                setDaysLeft(Math.ceil((dischargeDate.getTime() - enlistmentDate.getTime()) / (1000 * 60 * 60 * 24)));
                setDaysServed(0);
                return;
            }

            if (now > dischargeDate) {
                setProgress(100);
                setDaysLeft(0);
                setDaysServed(Math.ceil((dischargeDate.getTime() - enlistmentDate.getTime()) / (1000 * 60 * 60 * 24)));
                return;
            }

            const timeServed = now.getTime() - enlistmentDate.getTime();
            const progressPercentage = (timeServed / totalServiceTime) * 100;

            setProgress(progressPercentage);
            setDaysServed(Math.ceil(timeServed / (1000 * 60 * 60 * 24)));
            setDaysLeft(Math.ceil((dischargeDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
        };

        calculateProgress();
    }, []);

    const waveVariants = {
        animate: {
            x: [0, -100],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 5,
                    ease: "linear",
                }
            }
        }
    };

    const waveVariants2 = {
        animate: {
            x: [0, -100],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 7,
                    ease: "linear",
                }
            }
        }
    };

    const topWaveVariants = {
        animate: {
            x: [-100, -50],
            y: [-4, 4, -4],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 4,
                    ease: "linear",
                }
            }
        }
    };

    const boatVariants = {
        animate: {
            y: [0, -4, 0],
            rotate: [0, 1, 0, -1, 0],
            transition: {
                y: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                    ease: "easeInOut",
                },
                rotate: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 3,
                    ease: "easeInOut",
                }
            }
        }
    };


    // Seagull animation variants
    const seagullVariants = {
        animate: {
            x: [-20, 100],
            transition: {
                x: {
                    repeat: Infinity,
                    duration: 8,
                    ease: "linear",
                }
            }
        }
    };

    return (
        <div className="relative w-full h-full">
            <h2 className="relative text-2xl font-black text-gray-500 break-keep text-pretty">
                대한민국 <span className="text-[var(--foreground)]">해군</span>에<br /><span className="text-[var(--foreground)]">복무 {daysServed == 0 ? "예정" : "중"}</span>이에요 <span className='emoji'>🪖</span>
            </h2>
            <div className="relative h-full">
                <div className="absolute top-[50%] left-0 w-full h-0 z-10"></div>

                <div className="absolute top-[50%] -left-6 w-full h-[50%] bg-blue-500" style={{ width: 'calc(100% + 12rem)' }}>
                    <motion.div
                        className="absolute -top-1 w-full"
                        variants={topWaveVariants}
                        animate="animate"
                    >
                        <svg width="200%" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                            <path
                                d="M0,0 C30,4 70,1 100,3 C130,5 170,2 200,4 L200,8 L0,8 Z"
                                fill="rgba(59, 130, 246, 0.7)"
                            />
                        </svg>
                    </motion.div>

                    <motion.div
                        className="absolute top-0 w-full"
                        variants={waveVariants}
                        animate="animate"
                    >
                        <svg width="200%" height="16" viewBox="0 0 200 20" preserveAspectRatio="none">
                            <path
                                d="M0,20 C20,10 40,30 60,20 C80,10 100,30 120,20 C140,10 160,30 180,20 C200,10 220,30 240,20 L240,50 L0,50 Z"
                                fill="rgba(255,255,255,0.3)"
                            />
                        </svg>
                    </motion.div>

                    <motion.div
                        className="absolute -top-2 w-full"
                        variants={waveVariants2}
                        animate="animate"
                    >
                        <svg width="200%" height="16" viewBox="0 0 200 20" preserveAspectRatio="none">
                            <path
                                d="M0,20 C30,15 70,25 100,15 C130,5 170,15 200,10 C230,15 270,25 300,15 L300,50 L0,50 Z"
                                fill="rgba(255,255,255,0.2)"
                            />
                        </svg>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute top-[calc(50%-18px)]"
                    style={{
                        left: `${progress - 10}%`,
                    }}
                    variants={boatVariants}
                    animate="animate"
                >
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2,28 L10,32 L38,32 L46,28 L2,28 Z" fill="#555555" />
                        <path d="M10,32 L10,24 L38,24 L38,32" fill="#666666" stroke="#444444" strokeWidth="0.5" />

                        <rect x="18" y="14" width="12" height="10" fill="#666666" />
                        <rect x="20" y="6" width="8" height="8" fill="#666666" />
                        <rect x="16" y="18" width="16" height="6" fill="#777777" />

                        <rect x="6" y="26" width="8" height="2" fill="#444444" />
                        <rect x="34" y="26" width="8" height="2" fill="#444444" />

                        <circle cx="14" cy="22" r="2" fill="#555555" />
                        <circle cx="34" cy="22" r="2" fill="#555555" />
                        <rect x="13" y="20" width="2" height="3" fill="#444444" />
                        <rect x="33" y="20" width="2" height="3" fill="#444444" />

                        <path d="M24,2 L24,6" stroke="#888888" strokeWidth="1" />
                        <circle cx="24" cy="2" r="1.5" fill="#888888" />
                        <path d="M21,8 L21,12" stroke="#888888" strokeWidth="0.5" />
                        <path d="M27,8 L27,12" stroke="#888888" strokeWidth="0.5" />

                        <rect x="15" y="16" width="4" height="1.5" fill="#444444" />
                        <rect x="29" y="16" width="4" height="1.5" fill="#444444" />
                        <rect x="22" y="12" width="4" height="2" fill="#888888" />
                    </svg>
                </motion.div>

            </div>

            <h1 className="absolute bottom-0 text-2xl font-bold text-white text-right w-full z-50">
                <CountUp
                    from={0}
                    to={progress}
                    separator=","
                    direction="down"
                    duration={0.5}
                    className="count-up-text" onStart={undefined} onEnd={undefined} />%
            </h1>
        </div>
    );
}