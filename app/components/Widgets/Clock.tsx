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
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');

    return (
        <div>
            <div className="text-7xl font-black text-[var(--foreground)]">{hours}</div>
            <div className="text-7xl font-black text-[var(--foreground)]">{minutes}</div>
        </div>
    );
}

export default function Clock() {
    return (
        <div className="relative w-full h-full">
            <h2 className="relative text-3xl font-black text-gray-500">
                <span className="text-[var(--foreground)]">
                    <Suspense fallback={
                        <div className="text-center">
                            <div className="text-6xl font-bold">00</div>
                            <div className="text-6xl font-bold">00</div>
                        </div>
                    }>
                        <TimeDisplay />
                    </Suspense>
                </span> now<br />
                in <span className="text-[var(--foreground)]">Seoul <span className='emoji'>🇰🇷</span></span><br />
            </h2>
        </div>
    );
}