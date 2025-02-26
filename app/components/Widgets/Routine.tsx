"use client";
import IonIcon from '@reacticons/ionicons';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Routine() {
    const [commitStats, setCommitStats] = useState({
        morning: 0,
        daytime: 0,
        evening: 0,
        night: 0
    });
    const [max, setMax] = useState(null);
    const [maxEng, setMaxEng] = useState(null);

    useEffect(() => {
        fetchCommitData();
    }, []);

    const fetchCommitData = async () => {
        try {
            const response = await fetch('/api/github/routine');
            const data = await response.text();
            const { morning, daytime, evening, night } = parseCommitTimes(data);

            setCommitStats({ morning, daytime, evening, night });
            const max = Math.max(morning, daytime, evening, night);
            setMaxEng(max === morning ? 'morning' : max === daytime ? 'daytime' : max === evening ? 'evening' : 'night');
            setMax(max === morning ? '아침' : max === daytime ? '오후' : max === evening ? '저녁' : '밤과 새벽');


        } catch (error) {
            console.error('Error fetching commit data:', error);
            setCommitStats({ morning: 0, daytime: 0, evening: 0, night: 0 });
        }
    };

    interface CommitTimes {
        morning: number;
        daytime: number;
        evening: number;
        night: number;
    }


    function parseCommitTimes(text): CommitTimes {
        const patterns = {
            morning: /🌞 Morning.*?(\d+\.?\d*)%/,
            daytime: /🌆 Daytime.*?(\d+\.?\d*)%/,
            evening: /🌃 Evening.*?(\d+\.?\d*)%/,
            night: /🌙 Night.*?(\d+\.?\d*)%/
        };

        const result: CommitTimes = {
            morning: 0,
            daytime: 0,
            evening: 0,
            night: 0
        };

        for (const [timeOfDay, pattern] of Object.entries(patterns)) {
            const match = text.match(pattern);
            if (match) {
                result[timeOfDay] = parseFloat(match[1]);
            } else {
                result[timeOfDay] = 0;
            }
        }

        return result;
    }

    const timeIcons = {
        morning: "sunny",
        daytime: "partly-sunny",
        evening: "cloudy-night",
        night: "moon"
    };

    const timeColors = {
        morning: "#FFB347",
        daytime: "#87CEEB",
        evening: "#9370DB",
        night: "#483D8B"
    };

    const timeTitles = {
        morning: "아침",
        daytime: "오후",
        evening: "저녁",
        night: "밤과 새벽"
    };

    return (
        <div className="relative w-full h-full flex flex-col bg-opacity-80 rounded-3xl backdrop-blur-lg">
            <h2 className="relative text-xl font-black text-gray-500 break-keep text-pretty mb-4">
                주로 <span className='text-[var(--foreground)]'>{max}</span>에 코딩.
            </h2>

            <div className="grid grid-cols-2 gap-3 grow overflow-hidden">
                {Object.entries(commitStats).map(([time, value]) => (
                    <motion.div
                        key={time}
                        className="relative rounded-xl p-3 cursor-pointer overflow-hidden h-full flex flex-col"
                        style={{
                            background: 'var(--background, #f3f4f6)',
                            transition: 'box-shadow 0.3s ease'
                        }}
                    >
                        <AnimatePresence>
                            {(
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-xl"
                                    style={{
                                        backgroundColor: maxEng === time ? `${timeColors[time]}ee` : 'var(--background)',
                                        color: maxEng === time ? `#fff` : 'inherit'
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.9 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="text-center">
                                        <IonIcon name={timeIcons[time]} className="w-8 h-8" />
                                        <div className="text-lg font-bold">{value}%</div>
                                        <div className="text-xs opacity-90">{timeTitles[time]} </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}