"use client";
import React, { useEffect, useState } from 'react';
import { prominent } from 'color.js';
import IonIcon from '@reacticons/ionicons';
import Card from '../Card';

const Music = () => {
    const [musicData, setMusicData] = useState({
        artwork: '',
        artist: '',
        title: '',
        url: '',
        dominantColor: 'rgba(0, 0, 0, 0.1)'
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMusicData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/music/recent');
                const { data } = await response.json();
                const track = data[0].attributes;

                const artworkUrl = track.artwork.url.replace('{w}x{h}', '400x400');
                const colors = await prominent(artworkUrl, { amount: 1 });
                const [r, g, b] = Array.isArray(colors[0]) ? colors[0] : [0, 0, 0];

                setMusicData({
                    artwork: artworkUrl,
                    artist: track.artistName,
                    title: track.name,
                    url: track.previews[0].url,
                    dominantColor: `rgba(${r}, ${g}, ${b}, 0.1)`
                });
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch music data:', error);
                setIsLoading(false);
            }
        };

        fetchMusicData();
    }, []);

    return (
        <>
            <div className="flex-1 relative -top-[20%] flex justify-center items-center">
                <div className="w-50 h-50 rounded-full absolute 
                    bg-gradient-to-r from-gray-800 to-gray-900
                    shadow-lg flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[var(--secondary)]
                        absolute z-20 shadow-inner border border-gray-700" />
                </div>

                {musicData.artwork && (
                    <div className="w-50 h-50 rounded-full bg-slate-50 overflow-hidden absolute hover:animate-spin"
                        style={{ animationDuration: '8s', animationTimingFunction: 'linear' }}>
                        <img
                            src={isLoading ? "https://rukminim2.flixcart.com/image/750/900/kwgpz0w0/paper/0/k/q/black-1-coloured-paper-sharma-business-original-imag94z6y4smhcz7.jpeg?q=20&crop=false" : musicData.artwork}
                            alt={musicData.title || 'Album artwork'}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>

            <div className='w-full relative top-10'>
                <span className="text-xs opacity-50">
                    <span className='emoji'>🎧</span> 최근 들은 노래
                </span>
                <h3 className="text-lg font-semibold truncate mt-1">
                    {musicData.title || 'Loading...'}
                </h3>
                <p className="m-0 -mt-1 text-sm text-gray-400 truncate">
                    {musicData.artist || 'Please wait'}
                </p>

                <button className="relative float-right -top-9 bg-black/15 dark:bg-black/50 flex items-center justify-center rounded-full p-2 hover:bg-black/30 dark:hover:bg-black/30"
                    onClick={() => window.open("https://music.yuntae.in", '_blank')}>
                    <IonIcon name="add" className="text-[var(--foreground)] text-xl" />
                </button>
            </div>
        </>
    );
};

export default Music;
