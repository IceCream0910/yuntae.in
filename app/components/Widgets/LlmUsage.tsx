"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Usage = {
    totalTokens: number;
    estimatedApiCostUsd: number | null;
    pricedSubtotalUsd: number;
    unpricedEvents: number;
};
type Day = Usage & { date: string };
type UsageData = { daily: Day[]; range: { to: string }; summary: Usage };

const number = new Intl.NumberFormat("en-US");
const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const partial = (usage: Usage) => usage.unpricedEvents > 0 || usage.estimatedApiCostUsd === null;
const cost = (usage: Usage) => usd.format(usage.estimatedApiCostUsd ?? usage.pricedSubtotalUsd);

function recentDays(data: UsageData): Day[] {
    const end = new Date(`${data.range.to}T00:00:00Z`);
    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(end.getTime() - (6 - index) * 86400000).toISOString().slice(0, 10);
        return data.daily.find(day => day.date === date) ?? {
            date, totalTokens: 0, estimatedApiCostUsd: 0, pricedSubtotalUsd: 0, unpricedEvents: 0,
        };
    });
}

export default function LlmUsage() {
    const [data, setData] = useState<UsageData | null>(null);
    const [error, setError] = useState(false);
    const [attempt, setAttempt] = useState(0);
    const [active, setActive] = useState<number | null>(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        const controller = new AbortController();
        setError(false);
        fetch("/api/llm-usage", { signal: controller.signal })
            .then(response => {
                if (!response.ok) throw new Error("Usage request failed");
                return response.json();
            })
            .then(setData)
            .catch(() => { if (!controller.signal.aborted) setError(true); });
        return () => controller.abort();
    }, [attempt]);

    const days = data ? recentDays(data) : [];
    const max = Math.max(1, ...days.map(day => day.totalTokens));
    const selected = active === null ? null : days[active];

    return (
        <div className="flex h-full min-h-0 flex-col">
            <div className="flex items-center justify-between"><h3 className="widget-heading">LLM Usage</h3></div>
            <p className="widget-muted mt-1 text-[11px]">{days.every(day => day.totalTokens === 0) ? "최근 7일 사용량이 없어요" : `일 최대 ${compact.format(max)} tokens`}</p>
            {error ? (
                <div role="alert" className="flex flex-1 flex-col items-center justify-center gap-3 text-sm">
                    <p>사용량을 불러오지 못했어요.</p>
                    <button className="rounded-full bg-black/10 px-4 py-2 dark:bg-white/10" onClick={() => setAttempt(value => value + 1)}>다시 시도</button>
                </div>
            ) : !data ? (
                <div role="status" className="flex flex-1 items-center justify-center text-sm opacity-60">사용량 불러오는 중…</div>
            ) : (
                <>
                    <div className="relative mt-3 flex min-h-0 flex-1 flex-col" onMouseLeave={() => setActive(null)}>
                        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 text-center text-[11px] leading-4" role="status">
                            {selected && (
                                <motion.div key={selected.date} initial={{ opacity: 0, y: reduce ? 0 : 3 }} animate={{ opacity: 1, y: 0 }} className="inline-block rounded-lg bg-[var(--foreground)] px-2 py-1 text-[var(--secondary)] shadow-sm">
                                    <p>{selected.date} · {number.format(selected.totalTokens)} tokens</p>
                                    <p>추정 {cost(selected)}</p>
                                </motion.div>
                            )}
                        </div>
                        <div className="widget-chart-grid mt-10 flex min-h-0 flex-1 items-stretch gap-2 border-b border-[var(--widget-line)]">
                            {days.map((day, index) => (
                                <button
                                    key={day.date}
                                    className="group flex min-w-0 flex-1 items-end rounded-t focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
                                    aria-label={`${day.date}, ${number.format(day.totalTokens)} tokens, 추정 ${cost(day)}${partial(day) ? ", 일부 모델 제외" : ""}`}
                                    onMouseEnter={() => setActive(index)}
                                    onFocus={() => setActive(index)}
                                    onBlur={() => setActive(null)}
                                    onClick={() => setActive(index)}
                                >
                                    <motion.span initial={reduce ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ type: "spring", stiffness: 140, damping: 20, delay: reduce ? 0 : index * .04 }} className={`block w-full origin-bottom rounded-t-md transition-colors ${active === index ? "bg-violet-600 dark:bg-violet-300" : "bg-violet-500/60 dark:bg-violet-400/60"}`} style={{ height: `${day.totalTokens / max * 100}%`, minHeight: 3 }} />
                                </button>
                            ))}
                        </div>
                        <div className="widget-muted mt-2 flex gap-2 text-center text-[10px]" aria-hidden="true">
                            {days.map(day => <span key={day.date} className="min-w-0 flex-1">{Number(day.date.slice(5, 7))}/{Number(day.date.slice(8))}</span>)}
                        </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                        <div>
                            <p className="widget-muted text-[10px]">전체 누적 토큰</p>
                            <p className="widget-number mt-1 text-[clamp(18px,8cqw,28px)] font-semibold" title={`${number.format(data.summary.totalTokens)} tokens`}>{number.format(data.summary.totalTokens)}</p>
                        </div>
                        <div className="text-right">
                            <p className="widget-muted text-[10px]">누적 추정 비용</p>
                            <p className="text-lg font-bold">{cost(data.summary)}</p>
                        </div>
                    </div>
                    <p className="widget-muted mt-2 text-right text-[9px]">모델 별 API 비용 환산{partial(data.summary) ? " · 일부 모델 제외" : ""}</p>
                </>
            )}
        </div>
    );
}
