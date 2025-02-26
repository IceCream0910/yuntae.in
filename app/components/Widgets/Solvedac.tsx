"use client";
import { useEffect, useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import CountUp from '../CountUp';

const TIER_INFO = {
    0: { name: "Unrated", color: "#435F7A" },
    1: { name: "Bronze V", color: "#AD5600" },
    2: { name: "Bronze IV", color: "#AD5600" },
    3: { name: "Bronze III", color: "#AD5600" },
    4: { name: "Bronze II", color: "#AD5600" },
    5: { name: "Bronze I", color: "#AD5600" },
    6: { name: "Silver V", color: "#435F7A" },
    7: { name: "Silver IV", color: "#435F7A" },
    8: { name: "Silver III", color: "#435F7A" },
    9: { name: "Silver II", color: "#435F7A" },
    10: { name: "Silver I", color: "#435F7A" },
    11: { name: "Gold V", color: "#EC9A00" },
    12: { name: "Gold IV", color: "#EC9A00" },
    13: { name: "Gold III", color: "#EC9A00" },
    14: { name: "Gold II", color: "#EC9A00" },
    15: { name: "Gold I", color: "#EC9A00" },
    16: { name: "Platinum V", color: "#27E2A4" },
    17: { name: "Platinum IV", color: "#27E2A4" },
    18: { name: "Platinum III", color: "#27E2A4" },
    19: { name: "Platinum II", color: "#27E2A4" },
    20: { name: "Platinum I", color: "#27E2A4" },
    21: { name: "Diamond V", color: "#00B4FC" },
    22: { name: "Diamond IV", color: "#00B4FC" },
    23: { name: "Diamond III", color: "#00B4FC" },
    24: { name: "Diamond II", color: "#00B4FC" },
    25: { name: "Diamond I", color: "#00B4FC" },
    26: { name: "Ruby V", color: "#FF0062" },
    27: { name: "Ruby IV", color: "#FF0062" },
    28: { name: "Ruby III", color: "#FF0062" },
    29: { name: "Ruby II", color: "#FF0062" },
    30: { name: "Ruby I", color: "#FF0062" },
    31: { name: "Master", color: "#B300FF" },
};

export default function Solvedac() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/solvedac');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center p-6">
                <div className="animate-spin w-10 h-10 border-4 border-r-transparent rounded-full" style={{ borderColor: 'var(--secondary)', borderRightColor: 'transparent' }}></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full flex items-center justify-center p-6">
                <div className="text-red-500 flex items-center gap-2">
                    <IonIcon name="alert-circle-outline" className="text-xl" />
                    <span>Failed to load solved.ac data</span>
                </div>
            </div>
        );
    }

    if (!data) return null;

    const tierInfo = TIER_INFO[data.tier] || TIER_INFO[0];
    const tierColor = tierInfo.color;
    const tierName = tierInfo.name;

    const tierBase = Math.floor(data.tier / 5) * 5;
    const nextTierBase = tierBase + 5;
    const minRating = tierBase * 100;
    const maxRating = nextTierBase * 100;

    return (
        <div className="relative w-full h-full">
            <div
                className={`w-full rounded-xl transition-all duration-300 `}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="mb-3">
                    <h3 className="text-lg font-bold mb-1">PS를 연습하고 있어요.</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 break-keep text-pretty">백준 티어가 PS 실력을 대변하는 지표는 아니예요. 다양한 문제를 접하며 새로운 접근법을 고민하는 걸 좋아해요.</p>
                </div>

                <div className='absolute bottom-0 w-full'>
                    <div
                        className="relative rounded-xl p-4 mb-4 flex items-center justify-between cursor-pointer transition-transform shadow-sm hover:shadow-lg"
                        style={{
                            backgroundColor: `${tierColor}20`,
                            border: `1px solid ${tierColor}40`
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-300 ${hovered ? 'rotate-6' : ''}`}
                                style={{ backgroundColor: tierColor }}
                            >
                                <span className="text-white text-2xl font-black">
                                    {tierName.includes(' ') ? tierName.split(' ')[1] : tierName.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <div className="font-bold text-lg flex items-start gap-2 -mb-1" style={{ color: tierColor }}>{tierName}
                                    <div className="text-xs font-semibold px-2 py-1 rounded-md" style={{ backgroundColor: tierColor, color: '#fff' }}>
                                        Class {data.class}
                                    </div>
                                </div>
                                <div className="text-sm opacity-70">
                                    Rating: {data.rating.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm opacity-50">Rank #{data.rank.toLocaleString()}</div>
                    <div className="text-sm opacity-50">푼 문제 수: <CountUp
                        from={0}
                        to={data.solvedCount}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text" onStart={undefined} onEnd={undefined} /></div>
                </div>
            </div>
        </div>
    );
}