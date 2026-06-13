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
        "저는 **2005년**에 🍰 태어났고, 올해로 **" + age + "살**이에요. 세상에는 아직 마주하지 못한 문제들과 기술들이 너무 많기에, 끊임없이 **도전**하며 **경험** 🌱 을 쌓아갈게요.",
        "앞으로 **웹 브라우저**가 일종의 **운영체제** 💻 역할을 할 거라 믿어요. 그만큼 무궁무진한 확장성을 가진 **웹 🌐 생태계**에 깊은 관심이 있습니다.",
        "디자인 🎨 에도 관심이 많아요. 사용자에게 직관적이고 **유려한 사용경험** ✨ 을 선사할 수 있는 **UI/UX**를 고민합니다.",
        "LLM 🤖 등 **AI 도구**를 적극 활용해 개발 **자동화 환경** ⚙️ 을 구축해보고 있어요. 새로운 개발 패러다임 속에서 **소프트웨어 엔지니어** 🧑‍💻 의 역할을 항상 고민합니다.",
        "단순히 기능이 동작하는 데서 멈추지 않고, 버그 🐞 를 찾아 해결하거나 **성능 최적화** ⚡ 같은 유지보수 과정도 놓치지 않고 꼼꼼히 챙깁니다.",
        "수만 명 이상의 실사용자를 보유한 서비스를 **직접 운영** 👥 해봤어요. 덕분에 프로덕션 레벨에서의 **안정성** 🛡️ 확보와 **보안** 🔒 설계의 중요성을 이해하고 있습니다.",
        "**피아노** 🎹 와 **기타** 🎸 연주가 취미예요. 정해진 악보를 따라가기보다는, 좋아하는 노래의 멜로디를 듣고 **청음** 🎶 으로 자유롭게 연주하는 것을 즐깁니다.",
        "예쁜 가삿말과 감성적인 멜로디를 가진 **인디 밴드 음악** 🎵 을 즐겨 들어요. 코딩할 때나 쉴 때나 음악 🎧 은 저에게 빼놓을 수 없는 좋은 동료이죠.",
        "기술과 인간의 본질적인 관계에 대해 호기심이 많아요. **SF 영화** 🛸 나 **소설** 📖 을 감상하며 다가올 미래 기술에 대한 **영감** 🔮 을 얻곤 합니다.",
        "무심코 지나칠 수 있는 일상적인 풍경들을 저만의 **새로운 시선**으로 **카메라** 📸 에 담으며, 시각적인 아름다움이 주는 작은 힐링 🌿 을 즐겨요.",
        "주변에서 **불편함**을 발견하면 그냥 넘기지 않아요. 제가 가진 **기술** 🛠️ 로 어떻게 가치를 창출하고 해결할 수 있을지 고민한 뒤 빠르게 **실행** 🏃‍♂️ 에 옮깁니다.",
        "저는 기술 **얼리어답터** 🚀 예요. 빅테크 기업들의 동향에 관심이 많고, 새로 나온 **제품이나 서비스** 📱 를 가장 먼저 경험해보는 것을 좋아해요.",
        "혼자 코딩하는 것도 좋지만, 열정 넘치는 **동료들과 깊게 토론** 🤝 하는 것을 즐겨요. 서로의 아이디어 💡 를 나누며 **더 나은 결과를 향해가는 여정** 🧭 을 좋아합니다."
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

        const parts = fact.split(/(\*\*)/);

        for (const part of parts) {
            if (part === "**") {
                isBold = !isBold;
            } else {
                let chars: string[] = [];
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

            <div className="flex-1 mt-2 overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
                <AnimatePresence mode="wait">
                    {fact && (
                        <motion.h2
                            key={currentIndex}
                            className="relative text-xl sm:text-xl md:text-2xl break-keep text-pretty"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.015 }
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
                                            fontWeight: isBold ? [100, 900, 800] : [100, 900, 300],
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