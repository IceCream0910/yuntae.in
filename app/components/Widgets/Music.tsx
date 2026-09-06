"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Music() {
    const [track, setTrack] = useState<{ artwork: string; title: string; artist: string } | null>(null);
    const [error, setError] = useState(false);
    const reduce = useReducedMotion();
    useEffect(() => {
        const controller = new AbortController();
        fetch("/api/music/recent", { signal: controller.signal }).then(response => {
            if (!response.ok) throw new Error("Music unavailable");
            return response.json();
        }).then(({ data }) => {
            const song = data[0].attributes;
            setTrack({ artwork: song.artwork.url.replace("{w}", "400").replace("{h}", "400"), title: song.name, artist: song.artistName });
        }).catch(() => { if (!controller.signal.aborted) setError(true); });
        return () => controller.abort();
    }, []);
    return (
        <div className="relative flex h-full flex-col">
            <div className="relative flex min-h-0 flex-1 items-center justify-center py-2">
                <motion.div className="music-record relative flex aspect-square h-full max-h-[210px] items-center justify-center rounded-full" whileHover={reduce ? undefined : { rotate: 35 }} transition={{ type: "spring", stiffness: 50, damping: 15 }}>
                    {track ? <img src={track.artwork} alt={`${track.title} 앨범 커버`} className="h-full w-full rounded-full object-cover" /> : <div className="h-[56%] w-[56%] rounded-full bg-[#bf7768]" />}
                    <span className="absolute h-3 w-3 rounded-full border-2 border-white/30 bg-[#252529]" />
                </motion.div>
            </div>
            <div className="z-10 flex items-end justify-between">
                <div className="z-10 pt-3">
                    <p className="widget-muted mb-1 text-[10px]">최근 들은 노래</p>
                    <h3 className="truncate text-xl font-bold tracking-tight">{track?.title ?? (error ? "잠시 쉬어가는 중" : "음악 불러오는 중…")}</h3>
                    <p className="widget-muted truncate text-xs">{track?.artist ?? (error ? "최근 재생 정보를 가져오지 못했어요" : "Apple Music")}</p>
                </div>
                <a href="https://music.yuntae.in" target="_blank" rel="noreferrer" className="widget-icon-button" aria-label="음악 사이트 열기">↗</a>
            </div>

        </div>
    );
}
