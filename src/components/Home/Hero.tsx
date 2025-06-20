"use client"
import { useEffect, useState } from 'react';

export default function Hero() {
    const [padding, setPadding] = useState('7%');
    const [borderRadius, setBorderRadius] = useState('250%');
    const vigorousChangeHeightPadding = 0.2;
    const vigorousChangeHeightRadius = 0.5;

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            const vigorousChangePositionPadding = vigorousChangeHeightPadding * viewportHeight;
            const vigorousChangePositionRadius = vigorousChangeHeightRadius * viewportHeight;

            if (scrollPosition >= vigorousChangePositionPadding) {
                setPadding('0%');
            } else {
                const newPadding = Math.max(0, 5 - (scrollPosition / vigorousChangePositionPadding) * 5);
                setPadding(`${newPadding}%`);
            }

            if (scrollPosition >= vigorousChangePositionRadius) {
                setBorderRadius('0%');
            } else {
                const newBorderRadius = Math.max(0, 150 - (scrollPosition / vigorousChangePositionRadius) * 150);
                setBorderRadius(`${newBorderRadius}%`);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-[160vh] pt-[20vh] bg-gradient-to-b from-white to-slate-50" style={{ paddingLeft: padding, paddingRight: padding }}>
            <div className="relative h-full w-full bg-center bg-cover" style={{ backgroundImage: 'url(/images/bg.png)', borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }}>
                <div className="absolute inset-0 flex flex-col items-center justify-start pt-[20vh] text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-5 max-w-3xl">
                        Discover Your Next<br />Learning Adventure
                    </h1>
                    <p className="text-lg md:text-xl text-white mb-8 max-w-xl">
                        Enroll in courses. Expand your skills. Achieve your goals.
                    </p>
                    <button className="bg-white text-black hover:bg-opacity-90 px-7 py-2.5 rounded-full text-base font-medium flex items-center">
                        Start Learning Now
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
