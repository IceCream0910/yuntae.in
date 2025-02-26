"use client";
import { Suspense, useEffect, useState } from 'react';

function TimeDisplay() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return time.toTimeString().slice(0, 5);
}

export default function Clock() {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const hourAngle = ((hours % 12) * 30) + (minutes * 0.5);
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-0 flex justify-center items-center z-0 opacity-30 scale-125 -mt-10">
                <div className="clock-hand hour-hand" style={{
                    position: 'absolute',
                    width: '5px',
                    height: '40px',
                    background: 'gray',
                    zIndex: 3,
                    transform: `rotate(${hourAngle}deg)`,
                    transformOrigin: 'bottom center'
                }} />
                <div className="clock-hand minute-hand" style={{
                    position: 'absolute',
                    width: '3px',
                    height: '40px',
                    scale: 1.5,
                    background: 'darkgray',
                    zIndex: 2,
                    transform: `rotate(${minuteAngle}deg)`,
                    transformOrigin: 'bottom center'
                }} />
                <div className="clock-hand second-hand" style={{
                    position: 'absolute',
                    width: '2px',
                    height: '45px',
                    background: 'red',
                    scale: 2,
                    zIndex: 1,
                    transform: `rotate(${secondAngle}deg)`,
                    transformOrigin: 'bottom center'
                }} />
            </div>

            <h2 className="relative text-3xl font-black text-gray-500">
                <span className="text-[var(--foreground)]">
                    <Suspense fallback="00:00">
                        <TimeDisplay />
                    </Suspense>
                </span> now<br />
                in <span className="text-[var(--foreground)]">Seoul <span className='emoji'>🇰🇷</span></span><br />
            </h2>
        </div>
    );
}