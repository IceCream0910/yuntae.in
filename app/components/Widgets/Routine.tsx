"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const periods = [
    { key: "morning", label: "아침", icon: "☀", color: "#e6a855", pattern: /🌞 Morning.*?(\d+\.?\d*)%/ },
    { key: "daytime", label: "오후", icon: "◒", color: "#83aebd", pattern: /🌆 Daytime.*?(\d+\.?\d*)%/ },
    { key: "evening", label: "저녁", icon: "◐", color: "#a594c7", pattern: /🌃 Evening.*?(\d+\.?\d*)%/ },
    { key: "night", label: "밤·새벽", icon: "☾", color: "#7e85b9", pattern: /🌙 Night.*?(\d+\.?\d*)%/ },
];
export default function Routine() {
    const [values, setValues] = useState<number[] | null>(null);
    const [error, setError] = useState(false);
    const reduce = useReducedMotion();
    useEffect(() => {
        const controller = new AbortController();
        fetch("/api/github/routine", { signal: controller.signal }).then(response => {
            if (!response.ok) throw new Error("Routine unavailable");
            return response.text();
        }).then(text => {
            const matches = periods.map(period => text.match(period.pattern));
            if (matches.some(match => !match)) throw new Error("Missing routine data");
            setValues(matches.map(match => Number(match![1])));
        }).catch(() => { if (!controller.signal.aborted) setError(true); });
        return () => controller.abort();
    }, []);
    const max = values ? Math.max(...values) : 0;
    const favorite = values && max > 0 ? periods[values.indexOf(max)].label : null;
    return (
        <div className="flex h-full flex-col">
            <h3 className="widget-heading">{favorite ? <>주로 {favorite}에<br />코딩하는 편.</> : <>나의 코딩<br />루틴.</>}</h3>
            <div className="my-4 flex min-h-0 flex-1 items-end gap-3">
                {periods.map((period, i) => <div key={period.key} className="flex h-full min-w-0 flex-1 flex-col items-center gap-1.5"><span className="text-lg" style={{ color: period.color }} aria-hidden="true">{period.icon}</span><div className="flex w-full min-h-0 flex-1 items-end overflow-hidden rounded-lg bg-[var(--widget-control)]"><motion.div className="w-full rounded-lg" initial={reduce ? false : { height: 0 }} animate={{ height: values ? `${values[i]}%` : 0 }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: reduce ? 0 : i * .08 }} style={{ background: period.color, minHeight: values ? 3 : 0 }} /></div><span className="text-xs font-semibold tabular-nums">{values ? `${values[i]}%` : "—"}</span><span className="widget-muted text-[10px]">{period.label}</span></div>)}
            </div>
            <p className="widget-muted text-[10px]" role="status">{error ? "활동 정보를 불러오지 못했어요" : !values ? "활동 정보 불러오는 중…" : "GitHub 커밋 시간대 기준"}</p>
        </div>
    );
}
