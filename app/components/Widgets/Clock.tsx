"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./Clock.module.css";

const timeFormat = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Seoul", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
});
const dateFormat = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul", month: "long", day: "numeric", weekday: "long",
});
const scenes = [
    { from: 0, name: "night" },
    { from: 5, name: "dawn" },
    { from: 7, name: "morning" },
    { from: 11, name: "day" },
    { from: 17, name: "evening" },
    { from: 20, name: "night" },
];
const stars = [[14, 18], [42, 12], [65, 30], [89, 46], [34, 38], [76, 9]];

export default function Clock() {
    const [time, setTime] = useState<Date | null>(null);
    const reduce = useReducedMotion();
    useEffect(() => {
        const update = () => setTime(new Date());
        update();
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
    }, []);
    const parts = time ? timeFormat.format(time).split(":") : ["--", "--", "--"];
    const hour = time ? Number(parts[0]) : null;
    const scene = hour === null ? null : scenes.filter(item => hour >= item.from).slice(-1)[0];

    return (
        <div className={styles.clock}>
            <div className={styles.backdrop} aria-hidden="true">
                <AnimatePresence initial={false}>
                    <motion.div key={scene?.name ?? "loading"} className={styles.artwork} data-scene={scene?.name ?? "loading"}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 1.8 }}>
                        <div className={styles.glow} />
                        <motion.div className={styles.orb} animate={reduce ? undefined : { y: [0, -5, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
                        <div className={styles.cloud} />
                        <div className={styles.horizon} />
                        <div className={styles.stars}>{stars.map(([left, top], index) => <span key={index} style={{ left: `${left}%`, top: `${top}%` }} />)}</div>
                    </motion.div>
                </AnimatePresence>
                <div className={styles.scrim} />
            </div>
            <div className={styles.content}>
                <div>
                    <h3 className="widget-heading">I'm in Seoul <span className="emoji">🇰🇷</span></h3>
                    <p className="mt-1 text-[11px] opacity-60">대한민국 서울 · KST</p>
                </div>
                <div className="flex flex-col items-end justify-end">
                    <time dateTime={time?.toISOString()} aria-label={time ? `서울 현재 시간 ${parts[0]}시 ${parts[1]}분` : "서울 시간 불러오는 중"} className={styles.time}>
                        {parts[0]}<span className={styles.colon}>:</span>{parts[1]}<span className={styles.seconds} aria-hidden="true">{parts[2]}</span>
                    </time>
                    <p className={styles.date}>{time ? dateFormat.format(time) : "Asia/Seoul"}</p>
                </div>
            </div>
        </div>
    );
}
