"use client";
import { motion, useReducedMotion } from "framer-motion";

// Existing profile snapshot; the upstream API is protected by a Cloudflare challenge.
const profile = { tier: "Gold III", rating: 1160, solved: 175, rank: 35428, class: 3 };
export default function Solvedac() {
    const reduce = useReducedMotion();
    return (
        <div className="flex h-full flex-col">
            <div className="flex items-start justify-between">
                <h3 className="widget-heading">solved.ac</h3>
                <a href="https://solved.ac/profile/taein2370" target="_blank" rel="noreferrer" className="widget-icon-button" aria-label="solved.ac 프로필 열기">↗</a></div>
            <div className="flex min-h-0 flex-1 items-center justify-center gap-5 py-3">
                <motion.div className="flex h-24 w-20 shrink-0 items-center justify-center rounded-t-[20px] rounded-b-[35px] border border-[#e0bb5e] bg-[#eac76e] text-4xl font-semibold text-[#70531d] shadow-[inset_0_2px_2px_#fff8,0_10px_20px_-10px_#96722f80]" whileHover={reduce ? undefined : { rotate: -7, y: -4 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>III</motion.div>
                <div><p className="text-[clamp(22px,10cqw,36px)] font-semibold leading-tight tracking-tight">{profile.tier}</p><p className="widget-muted mt-1 text-xs">{profile.rating.toLocaleString()} rating</p><span className="mt-3 inline-block rounded-full bg-[var(--widget-control)] px-2 py-1 text-[10px]">Class {profile.class}</span></div>
            </div>
            <div className="flex items-center justify-between border-t border-[var(--widget-line)] pt-3"><div><p className="widget-number text-3xl font-semibold">{profile.solved}</p><p className="widget-muted mt-1 text-[10px]">해결한 문제</p></div><div className="text-right"><p className="widget-number text-2xl font-medium">#{profile.rank.toLocaleString()}</p><p className="widget-muted mt-1 text-[10px]">전체 순위</p></div></div>        </div>
    );
}
