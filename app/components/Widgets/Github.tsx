"use client";
import { useState, useEffect } from 'react';
import IonIcon from '@reacticons/ionicons';

export default function Github() {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredDay, setHoveredDay] = useState(null);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://github-contributions-api.jogruber.de/v4/icecream0910');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setContributions(data.contributions);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchContributions();
    }, []);

    const levelToColor = (level) => {
        const colors = [
            'bg-gray-300 dark:bg-gray-700', // Level 0
            'bg-green-400 dark:bg-green-700', // Level 1
            'bg-green-600 dark:bg-green-600', // Level 2
            'bg-green-800 dark:bg-green-500', // Level 3
            'bg-green-900 dark:bg-green-300'  // Level 4
        ];
        return colors[level] || colors[0];
    };

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    const today = new Date();
    const pastThreshold = new Date();
    pastThreshold.setDate(today.getDate() - 36);
    const recentContributions = contributions
        .filter(contrib => {
            const contribDate = new Date(contrib.date);
            return contribDate >= pastThreshold && contribDate <= today;
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const totalRecent = recentContributions.reduce((sum, contrib) => sum + contrib.count, 0);

    const renderContributionDots = () => {
        return (
            <div className="flex flex-wrap gap-1">
                {recentContributions.map((contrib, index) => (
                    <div
                        key={index}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${levelToColor(contrib.level)} ${hoveredDay === index ? 'scale-125' : ''}`}
                        onMouseEnter={() => setHoveredDay(index)}
                        onMouseLeave={() => setHoveredDay(null)}
                    >
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="relative w-full h-full overflow-hidden transition-all duration-300">
            <div className="w-full flex items-center mb-2">
                <div>
                    <h3 className="text-gray-900 dark:text-gray-100 font-bold text-lg">GitHub Stats</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">@icecraem0910</p>
                </div>

                <button className="absolute right-0 bg-black/15 dark:bg-black/50 flex items-center justify-center rounded-full p-2 hover:bg-black/30 dark:hover:bg-black/30"
                    onClick={() => window.open("https://github.com/icecream0910", '_blank')}>
                    <IonIcon name="add" className="text-[var(--foreground)] text-xl" />
                </button>
            </div>

            <div className="absolute bottom-0">
                <h2 className="text-3xl font-black text-gray-800 dark:text-gray-200 mb-4">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        최근 36일 동안<br />
                    </span>
                    {formatNumber(totalRecent)}
                    <span className="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                        개의 commits
                    </span>
                </h2>

                {renderContributionDots()}
            </div>

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin h-8 w-8 border-4 border-green-500 rounded-full border-t-transparent"></div>
                </div>
            )}

            {error && (
                <div className="mt-4 p-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded">
                    Error: {error}
                </div>
            )}

            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.8;
                    }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s infinite;
                }
            `}</style>
        </div>
    );
}