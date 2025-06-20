"use client"
import { useEffect, useState } from 'react';

export default function Hero() {
    const [padding, setPadding] = useState('7%');
    const [borderRadius, setBorderRadius] = useState('100%');
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
                const newBorderRadius = Math.max(0, 50 - (scrollPosition / vigorousChangePositionRadius) * 50);
                setBorderRadius(`${newBorderRadius}%`);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-[160vh] pt-[20vh] bg-gradient-to-b from-white to-slate-50" style={{ paddingLeft: padding, paddingRight: padding }}>
            <div className="h-full w-full bg-center bg-cover" style={{ backgroundImage: 'url(/images/bg.png)', borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }}>
            </div>
        </div>
    );
}
