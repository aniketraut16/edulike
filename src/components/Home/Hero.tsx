"use client"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HowitWorks from './HowitWorks';

export default function Hero() {
    const [padding, setPadding] = useState('7%');
    const [borderRadius, setBorderRadius] = useState('250%');
    const vigorousChangeHeightPadding = 0.2;
    const vigorousChangeHeightRadius = 0.5;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

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

    // Animation variants
    const heroVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0
        }
    }

    const buttonVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-[90vh] lg:h-[160vh] pt-[15vh] sm:pt-[20vh] mb-0 lg:mb-50 bg-gradient-to-b from-white to-slate-50"
            style={{
                paddingLeft: isMobile
                    ? `${parseFloat(padding.slice(0, -1)) / 2}%`
                    : padding,
                paddingRight: isMobile
                    ? `${parseFloat(padding.slice(0, -1)) / 2}%`
                    : padding,
            }}
        >
            <div className="relative h-full w-full bg-center bg-cover"
                style={{
                    backgroundImage: 'url(/images/bg.png)',
                    borderTopLeftRadius: isMobile ? "180px" : borderRadius,
                    borderTopRightRadius: isMobile ? "180px" : borderRadius,
                }}
            >
                <div className="absolute inset-0 flex flex-col items-center justify-start pt-[15vh] sm:pt-[20vh] text-center px-4">
                    <motion.h1
                        className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-3 sm:mb-5 max-w-3xl px-2"
                        initial="hidden"
                        animate="visible"
                        variants={heroVariants}
                        transition={{
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                    >
                        Discover Your Next<br />Learning Adventure
                    </motion.h1>
                    <motion.p
                        className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 max-w-xl px-4"
                        initial="hidden"
                        animate="visible"
                        variants={heroVariants}
                        transition={{
                            delay: 0.8,
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                    >
                        Enroll in courses. Expand your skills. Achieve your goals.
                    </motion.p>
                    <motion.button
                        className="bg-white text-black hover:bg-opacity-90 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium flex items-center"
                        initial="hidden"
                        animate="visible"
                        variants={buttonVariants}
                        transition={{
                            delay: 1.3,
                            duration: 0.6,
                            ease: "easeOut",
                            type: "spring",
                            stiffness: 200
                        }}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Learning Now
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            initial={{ x: -5, opacity: 0 }}
                            animate={{
                                x: 0,
                                opacity: 1
                            }}
                            transition={{
                                delay: 1.6,
                                duration: 0.4,
                                ease: "easeOut"
                            }}
                        >
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </motion.svg>
                    </motion.button>
                    <div className="hidden lg:block">
                        <HowitWorks isMobile={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}
