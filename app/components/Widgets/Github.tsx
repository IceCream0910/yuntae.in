"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type Contribution = { date: string; count: number; level: number };
const colors = ["#ffffff12", "#506d42", "#77994a", "#a6cc68", "#d6f5a0"];
export default function Github() {
    const [days, setDays] = useState<Contribution[] | null>(null);
    const [error, setError] = useState(false);
    const [active, setActive] = useState<Contribution | null>(null);
    const reduce = useReducedMotion();
    useEffect(() => {
        const controller = new AbortController();
        fetch("https://github-contributions-api.jogruber.de/v4/icecream0910", { signal: controller.signal }).then(response => {
            if (!response.ok) throw new Error("GitHub unavailable");
            return response.json();
        }).then(data => {
            const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
            setDays(data.contributions.filter((day: Contribution) => day.date <= today).sort((a: Contribution, b: Contribution) => a.date.localeCompare(b.date)).slice(-35));
        }).catch(() => { if (!controller.signal.aborted) setError(true); });
        return () => controller.abort();
    }, []);
    const total = days?.reduce((sum, day) => sum + day.count, 0);
    return (
        <div className="flex h-full flex-col">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="widget-heading">Github에 한 달 간<br />{total === undefined ? "—" : total.toLocaleString("en-US")}개의 commit</h3><p className="widget-muted mt-1 text-[11px]">@icecream0910</p>

                </div>
                <a className="widget-icon-button" href="https://github.com/icecream0910" target="_blank" rel="noreferrer" aria-label="GitHub 프로필 열기">↗</a>
            </div>
            <div className="my-auto py-3">
            </div>
            <div className="relative" onMouseLeave={() => setActive(null)}>
                <AnimatePresence>
                    {active && <motion.div key={active.date} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pointer-events-none absolute bottom-full right-0 z-10 mb-2 rounded-lg bg-[#ecf5df] px-2 py-1 text-[10px] text-[#192c23]" role="status">{active.date} · {active.count} contributions</motion.div>}
                </AnimatePresence>
                <div className="grid grid-cols-7 gap-1.5">
                    {(days ?? Array.from({ length: 35 }, (_, i) => ({ date: String(i), count: 0, level: 0 }))).map((day, index) => (
                        <motion.button key={day.date} disabled={!days} aria-label={`${day.date}: ${day.count} contributions`} onMouseEnter={() => setActive(day)} onFocus={() => setActive(day)} onBlur={() => setActive(null)} onClick={() => setActive(day)} className="h-[clamp(12px,5cqw,20px)] rounded-[4px]" style={{ background: colors[day.level] ?? colors[0] }} initial={reduce ? false : { opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: reduce ? 0 : index * .012 }} whileHover={reduce ? undefined : { scale: 1.12, transition: { delay: 0 } }} />
                    ))}
                </div>
            </div>
            <div className="widget-muted mt-3 flex items-center justify-between text-[10px]">
                <span role="status">{error ? "사용량을 불러오지 못했어요" : !days ? "불러오는 중…" : ""}</span>
                <span className="flex items-center gap-1" aria-hidden="true">Less {colors.map(color => <i key={color} className="h-1.5 w-1.5 rounded-sm" style={{ background: color }} />)} More</span>
            </div>
        </div>
    );
}
