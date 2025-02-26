"use client";
import { useState, useEffect } from 'react';
import IonIcon from '@reacticons/ionicons';

export default function Hobby() {
    const [checkedItems, setCheckedItems] = useState({});
    const [activeItem, setActiveItem] = useState(null);

    const hobbies = [
        {
            id: "1",
            icon: "🧑‍💻",
            label: "프로그래밍, 신기술",
            color: "#007AFF",
            description: "웹과 새로운 기술에 관심이 많아요."
        },

        {
            id: "2",
            icon: "🎨",
            label: "디자인",
            color: "#FF9500",
            description: "UI/UX 디자인에 흥미가 있어요."
        },
        {
            id: "3",
            icon: "🎹",
            label: "음악 감상, 악기 연주",
            color: "#FF2D55",
            description: "인디 음악을 즐겨듣고 피아노와 기타 연주가 취미예요."
        },
        {
            id: "4",
            icon: "🏠",
            label: "집에서 뒹굴뒹굴",
            color: "#34C759",
            description: "SF 장르의 소설이나 영화를 즐겨봐요."
        }
    ];

    const toggleItem = (id) => {
        setCheckedItems(prev => {
            const newState = { ...prev, [id]: !prev[id] };
            localStorage.setItem('hobby-checked-items', JSON.stringify(newState));
            return newState;
        });
    };

    const handleMouseEnter = (id) => {
        setActiveItem(id);
    };

    const handleMouseLeave = () => {
        setActiveItem(null);
    };

    useEffect(() => {
        try {
            const savedItems = localStorage.getItem('hobby-checked-items');
            if (savedItems) {
                setCheckedItems(JSON.parse(savedItems));
            }
        } catch (e) {
            console.error("Could not load saved hobby state:", e);
        }
    }, []);

    return (
        <div className="relative w-full h-full">
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-1">취미와 관심사</h3>
            </div>

            <div className="rounded-xl overflow-hidden">
                {hobbies.map((hobby, index) => (
                    <div
                        key={hobby.id}
                        className="relative"
                    >
                        <div
                            className={`
                                flex items-center py-1 transition-all duration-200
                            `}
                            onClick={() => toggleItem(hobby.id)}
                            onMouseEnter={() => handleMouseEnter(hobby.id)}
                            onMouseLeave={handleMouseLeave}
                        >

                            <div
                                className={`
                                    flex-shrink-0 w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200
                                    ${checkedItems[hobby.id]
                                        ? `bg-${hobby.color.replace('#', '')} border-transparent`
                                        : 'border-gray-300 dark:border-gray-600 bg-transparent'}
                                `}
                                style={{
                                    backgroundColor: checkedItems[hobby.id] ? hobby.color : 'transparent',
                                    borderColor: checkedItems[hobby.id] ? 'transparent' : ''
                                }}
                            >
                                {checkedItems[hobby.id] && (
                                    <IonIcon
                                        name="checkmark"
                                        className="text-white text-sm"
                                    />
                                )}
                            </div>

                            <div className="flex-1">
                                <div className={`
                                    text-sm font-medium transition-all duration-200
                                    ${checkedItems[hobby.id] ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}
                                `}>
                                    {hobby.label} <span className='emoji'>{hobby.icon}</span>
                                </div>
                                <span className={`text-xs line-clamp-2 ${checkedItems[hobby.id] ? 'line-through text-gray-300 dark:text-gray-600' : 'text-gray-500 dark:text-gray-400 '}`}>{hobby.description}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}