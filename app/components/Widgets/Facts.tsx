"use client";
import IonIcon from '@reacticons/ionicons';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Facts() {
    const today = new Date();
    const birthDate = new Date('2005-09-10');
    let age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
    if (!hasHadBirthdayThisYear) {
        age -= 1;
    }
    const facts = [
        "저는 **2005년**에 🍰 태어났고, 올해로 **" + age + "살**이에요.",
        "**확장성**이 뛰어난 **웹** 🌐 분야에 관심이 많아요. 앞으로 **웹 브라우저**가 일종의 **OS** 💻 역할을 하게 될 거라고 생각해요.",
        "디자인 🎨 에도 관심이 많아요. 시각적 심미성은 물론 사용자에게 **유려한 경험** ✨ 을 제공하는 **UI/UX**를 고민하고, 프로젝트에 적용해보고 있어요.",
        "**피아노** 🎹 와 **기타** 🎸 를 연주하는 게 취미예요. 근데 악보를 보고는 못 치고, 노래를 듣고 **청음** 🎧 으로 연주할 수 있어요.",
        "예쁜 가삿말과 멜로디를 가진 **인디 밴드** 음악을 자주 들어요. 물론 **K-POP** 🎵 을 포함해 다른 장르도 챙겨 듣고 있어요.",
        "기술과 **인간의 본질** 사이의 관계에 대해 고민해본 적 있나요? 💭 저는 **SF 영화** 🛸 나 **소설** 📖 을 통해 미래를 상상하며 영감을 얻곤 해요.",
        "무심코 지나칠 수 있는 풍경을 **새로운 시선**으로 **카메라** 📸 에 담는 걸 좋아해요.",
        "**집**은 최고의 휴식처예요 🛋️. 침대에서 뒹굴대며 **OTT** 🍿 를 시청하거나 음악을 듣고, **책** 📚 을 읽으며 에너지를 충전해요.",
        "일상의 **불편함**을 발견하면, 항상 제가 가진 **기술** ⚡ 로 해결할 수 있을지 고민하고 재빠르게 **실행** 🏃‍♂️ 으로 옮겨요.",
        "저는 **얼리어답터** 🚀 입니다. 빅테크 기업들의 동향을 찾아보고, **새로운 제품** 💡 과 기술을 가장 먼저 경험해보는 걸 좋아해요."
    ];
    const [shuffledFacts, setShuffledFacts] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const shuffled = [...facts].sort(() => Math.random() - 0.5);
        setShuffledFacts(shuffled);
    }, []);

    const handleReloadFact = () => {
        if (shuffledFacts.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledFacts.length);
        }
    };

    const fact = shuffledFacts.length > 0 ? shuffledFacts[currentIndex] : '';

    const characters = useMemo(() => {
        if (!fact) return [];

        let isBold = false;
        const result: { char: string; isBold: boolean; isEmoji: boolean; }[] = [];

        // `**`를 기준으로 분리하여 볼드체 여부 추적
        const parts = fact.split(/(\*\*)/);

        for (const part of parts) {
            if (part === "**") {
                isBold = !isBold;
            } else {
                let chars: string[] = [];
                // Intl.Segmenter를 사용해 이모지와 한글 글자 단위 분리
                if (typeof Intl !== 'undefined' && Intl.Segmenter) {
                    chars = Array.from(new Intl.Segmenter('ko-KR', { granularity: 'grapheme' }).segment(part)).map(s => s.segment);
                } else {
                    chars = Array.from(part);
                }

                for (const char of chars) {
                    result.push({
                        char,
                        isBold,
                        isEmoji: /\p{Extended_Pictographic}/u.test(char)
                    });
                }
            }
        }
        return result;
    }, [fact]);

    return (
        <div className="relative w-full h-full flex flex-col">
            <span className='text-sm text-gray-500'>태인의 TMI</span>

            <div className="flex-1 mt-2">
                <AnimatePresence mode="wait">
                    {fact && (
                        <motion.h2
                            key={currentIndex}
                            className="relative text-3xl break-keep text-pretty"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.015 } // 글자별 순차적 애니메이션
                                },
                                exit: {
                                    opacity: 0,
                                    transition: { duration: 0.2 }
                                }
                            }}
                        >
                            {characters.map(({ char, isBold, isEmoji }, i) => (
                                <motion.span
                                    key={`${currentIndex}-${i}`}
                                    className={isEmoji ? "emoji" : undefined}
                                    variants={{
                                        hidden: { opacity: 0, fontWeight: 100 },
                                        visible: {
                                            opacity: 1,
                                            // 키워드는 최종적으로 800, 일반 텍스트는 300으로 렌더링
                                            fontWeight: isBold ? [100, 900, 300, 800] : [100, 900, 300, 300],
                                            transition: { duration: 0.8, ease: "easeInOut" }
                                        },
                                        exit: { opacity: 0, transition: { duration: 0.1 } }
                                    }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.h2>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute bottom-0 right-0">
                <button className="bg-black/15 dark:bg-black/50 flex items-center justify-center rounded-full p-2 hover:bg-black/30 dark:hover:bg-black/30 transition-colors"
                    onClick={handleReloadFact}>
                    <IonIcon name="refresh-outline" className="text-[var(--foreground)] text-xl" />
                </button>
            </div>
        </div>
    );
}