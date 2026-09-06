"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Navy() {
    const [progress, setProgress] = useState<{ percent: number; left: number; served: number } | null>(null);
    const reduce = useReducedMotion();
    useEffect(() => {
        const update = () => {
            const start = new Date("2025-04-21T00:00:00+09:00").getTime();
            const end = new Date("2026-12-18T00:00:00+09:00").getTime();
            const now = Date.now();
            const elapsed = Math.max(0, Math.min(now - start, end - start));
            setProgress({ percent: elapsed / (end - start) * 100, left: Math.max(0, Math.ceil((end - now) / 86400000)), served: Math.floor(elapsed / 86400000) });
        };
        update();
        const timer = setInterval(update, 60000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="relative flex h-full flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="widget-heading">대한민국 해군 <span className="emoji">⚓</span> 에<br />복무 중이에요.</h3>
                </div>
            </div>
            <div className="relative z-10 min-h-0 flex-1">
                <div className="absolute -bottom-2.5" style={{ left: `${progress?.percent ?? 0}%`, transform: `translateX(-${progress?.percent ?? 0}%)` }}>
                    <motion.svg aria-hidden="true" className="h-9 w-16" viewBox="0 0 112 64" animate={reduce ? undefined : { y: [0, -3, 0], rotate: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                        <path d="M5 44h77l25-5-12 18H17Z" fill="#657d8e" />
                        <path d="M27 44V31h12V20h20l9 24Z" fill="#a7bac6" />
                        <path d="M44 26h13" stroke="#38556b" strokeWidth="4" />
                        <path d="M49 20V7m-8 5h18" stroke="#c4d1d9" strokeWidth="3" />
                        <path d="M73 35h9l7 9H69Z" fill="#a7bac6" />
                        <path d="m80 36 16-5" stroke="#c4d1d9" strokeWidth="4" strokeLinecap="round" />
                    </motion.svg>
                </div>
            </div>
            <div className="relative z-0 -mx-6 -mb-6 overflow-hidden bg-[#286cb0] px-6 pb-6 pt-5 text-white">
                <motion.svg aria-hidden="true" className="absolute -top-1 left-0 h-3 w-[200%]" viewBox="0 0 400 12" preserveAspectRatio="none" animate={reduce ? undefined : { x: [0, "-50%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}><path d="M0 4 Q50 12 100 4 T200 4 T300 4 T400 4 V0 H0Z" fill="var(--secondary)" /></motion.svg>
                <div className="flex items-end justify-between"><div><p className="text-[10px] text-blue-100">복무 진행률</p><p className="widget-number mt-1 text-4xl font-semibold">{progress ? progress.percent.toFixed(1) : "—"}<span className="ml-1 text-lg">%</span></p></div><div className="text-right"><p className="text-xl font-semibold">{progress ? (progress.left === 0 ? "완료" : `D−${progress.left}`) : "—"}</p><p className="mt-1 text-[10px] text-blue-100">2026.12.20 전역</p></div></div>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/20"><motion.div className="h-full rounded-full bg-blue-100" initial={reduce ? false : { width: 0 }} animate={{ width: `${progress?.percent ?? 0}%` }} transition={{ duration: reduce ? 0 : 1 }} /></div>
            </div>
        </div>
    );
}
