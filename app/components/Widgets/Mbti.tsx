"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const traits = [
    { letter: "I", title: "내향형", english: "Introverted", detail: "혼자 있는 시간을 통해 에너지를 얻으며 깊은 대화와 의미 있는 관계를 선호합니다. 많은 사람들과 어울리는 것보다 소수의 친밀한 관계를 중요시합니다." },
    { letter: "N", title: "직관형", english: "Intuitive", detail: "현재의 사실보다 미래의 가능성에 더 관심이 있으며, 큰 그림을 보는 능력이 뛰어납니다. 혁신적인 아이디어와 창의적인 문제 해결 방식을 추구합니다." },
    { letter: "T", title: "사고형", english: "Thinking", detail: "감정보다 논리를 우선시하며, 공정하고 객관적인 판단을 추구합니다. 문제를 해결할 때 체계적이고 분석적인 접근 방식을 선호합니다." },
    { letter: "J", title: "판단형", english: "Judging", detail: "구조화된 환경과 명확한 계획을 선호하며, 일을 미리 완료하는 것을 좋아합니다. 체계적으로 목표를 세우고 달성하는 데 뛰어난 능력을 보입니다." },
];
export default function Mbti() {
    const [selected, setSelected] = useState<number | null>(null);
    const reduce = useReducedMotion();
    return (
        <div className="flex h-full flex-col">
            <div>
                <h3 className="widget-heading">MBTI</h3>
                <p className="widget-muted mt-1 text-[11px]">제가 가진 모든 모습을 4글자에 담을 수는 없지만, MBTI는 대략적인 성격을 나타내줘요.</p>
            </div>
            <AnimatePresence mode="wait" initial={false}>
                {selected === null ? (
                    <motion.div key="overview" className="flex min-h-0 flex-1 flex-col pt-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="my-2 grid min-h-0 flex-1 grid-cols-4 gap-2">
                            {traits.map((trait, i) => (
                                <div key={trait.letter} className="relative min-w-0">
                                    <div className="absolute w-full" style={{ top: `${i / 3 * 100}%`, transform: `translateY(-${i / 3 * 100}%)` }}>
                                        <motion.button className="flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-2xl border border-[var(--widget-line)] bg-[var(--widget-control)]" onClick={() => setSelected(i)} aria-label={`${trait.letter} ${trait.title} 자세히 보기`} whileHover={reduce ? undefined : { y: -6, rotate: i % 2 ? 3 : -3 }} whileTap={reduce ? undefined : { scale: .94 }} transition={{ type: "spring", stiffness: 350, damping: 20 }}><span className="text-[clamp(22px,10cqw,36px)] font-semibold leading-none">{trait.letter}</span></motion.button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key={selected} className="flex min-h-0 flex-1 flex-col pt-4" initial={{ opacity: 0, x: reduce ? 0 : 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                        <div className="mb-4 flex items-center gap-3"><span className="text-5xl font-semibold">{traits[selected].letter}</span><div><h3 className="widget-heading">{traits[selected].title}</h3><p className="widget-muted text-xs">{traits[selected].english}</p></div><button className="widget-icon-button ml-auto" onClick={() => setSelected(null)} aria-label="성격 목록으로 돌아가기">←</button></div>
                        <p className="custom-scrollbar min-h-0 overflow-y-auto text-sm leading-relaxed break-keep">{traits[selected].detail}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
