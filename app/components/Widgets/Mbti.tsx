"use client";
import { useState, useRef, useEffect } from 'react';
import IonIcon from '@reacticons/ionicons';

export default function Mbti() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [hoverLetter, setHoverLetter] = useState(null);
    const [selectedLetter, setSelectedLetter] = useState(null);

    // New state and ref for dynamic card height measurement
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardHeight, setCardHeight] = useState(0);
    useEffect(() => {
        const updateHeight = () => {
            if (cardRef.current) {
                setCardHeight(cardRef.current.clientHeight);
            }
        };
        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    const mbtiData = {
        "I": {
            title: "내향형",
            description: "조용한 환경을 선호하며 깊이 있는 생각과 내적 성찰을 즐깁니다.",
            details: "혼자 있는 시간을 통해 에너지를 얻으며 깊은 대화와 의미 있는 관계를 선호합니다. 많은 사람들과 어울리는 것보다 소수의 친밀한 관계를 중요시합니다."
        },
        "N": {
            title: "직관형",
            description: "미래 가능성과 패턴을 찾아내는 능력이 뛰어나며 추상적 사고를 선호합니다.",
            details: "현재의 사실보다 미래의 가능성에 더 관심이 있으며, 큰 그림을 보는 능력이 뛰어납니다. 혁신적인 아이디어와 창의적인 문제 해결 방식을 추구합니다."
        },
        "T": {
            title: "사고형",
            description: "논리적이고 객관적인 의사결정을 하며 일관성과 효율성을 중요시합니다.",
            details: "감정보다 논리를 우선시하며, 공정하고 객관적인 판단을 추구합니다. 문제를 해결할 때 체계적이고 분석적인 접근 방식을 선호합니다."
        },
        "J": {
            title: "판단형",
            description: "계획적이고 체계적인 생활 방식을 선호하며 결정과 마무리를 중요시합니다.",
            details: "구조화된 환경과 명확한 계획을 선호하며, 일을 미리 완료하는 것을 좋아합니다. 체계적으로 목표를 세우고 달성하는 데 뛰어난 능력을 보입니다."
        }
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
        if (!isFlipped) {
            setSelectedLetter(null);
        }
    };

    const handleLetterClick = (letter, event) => {
        event.stopPropagation();
        setSelectedLetter(letter);
        setIsFlipped(true);
    };

    const totalLetters = 4;
    const letterHeight = 170;

    return (
        <div className="relative w-full h-full mx-auto" ref={cardRef}>
            <div
                className={`relative w-full rounded-xl transition-all duration-500 ease-in-out cursor-pointer ${isFlipped ? "scale-95" : ""}`}
                style={{ perspective: "1000px" }}
            >
                <div className={`relative transition-all duration-500 ease-in-out ${isFlipped ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}>
                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-1">4글자로 보는 성격</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 break-keep text-pretty">제가 가진 모든 모습을 4글자에 담을 수는 없지만, MBTI는 대략적인 성격을 나타내줘요.</p>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mt-6">
                        {["I", "N", "T", "J"].map((letter, index) => {
                            const computedTop = cardHeight
                                ? (index / (totalLetters - 1)) * (cardHeight - letterHeight)
                                : index * 30;
                            return (
                                <div
                                    key={index}
                                    className="relative group"
                                    style={{ top: computedTop }}
                                    onMouseEnter={() => setHoverLetter(letter)}
                                    onMouseLeave={() => setHoverLetter(null)}
                                    onClick={(e) => handleLetterClick(letter, e)}
                                >
                                    <div className={`
                                        flex items-center justify-center 
                                        rounded-2xl transition-all duration-300 aspect-square
                                        ${hoverLetter === letter
                                            ? "bg-indigo-500 text-white scale-105"
                                            : "bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}
                                    `}>
                                        <span className="text-xl font-bold">{letter}</span>
                                    </div>
                                    {hoverLetter === letter && (
                                        <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-indigo-500 text-white text-xs rounded-xl shadow-lg z-10 text-center">
                                            {mbtiData[letter].title}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={`relative transition-all duration-500 ease-in-out -p-2 ${isFlipped ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-12 h-12 aspect-square bg-indigo-500 text-white rounded-full">
                                <span className="text-2xl font-bold">{selectedLetter}</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                                    {selectedLetter && mbtiData[selectedLetter].title}
                                </h4>
                            </div>
                        </div>

                        <div
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            onClick={handleFlip}
                        >
                            <IonIcon name="arrow-back-outline" className="w-4 h-4 text-gray-600 dark:text-indigo-300" />
                        </div>
                    </div>

                    {selectedLetter && (
                        <div className="rounded-xl">
                            <div className="mt-4">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed break-keep text-pretty">
                                    {mbtiData[selectedLetter].details}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}