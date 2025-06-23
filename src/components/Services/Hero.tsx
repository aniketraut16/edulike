"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedText from '../Home/AnimatedText';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero(data: {
    title: string;
    buttons: {
        text: string;
        link: string;
    }[]
    image: string;
}) {
    // Function to handle smooth scrolling for anchor links
    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Check if the link is an anchor link
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <div className="relative w-full bg-[#f5f0e8] overflow-hidden pt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center py-16 md:py-24">
                    {/* Text Content */}
                    <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-8">
                        <AnimatedText as="h1" className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#461217] leading-tight mb-6">
                            {data.title}
                        </AnimatedText>
                        <motion.div
                            className="flex flex-wrap gap-4 mt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            {data.buttons.map((button, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                >
                                    {button.link.startsWith('#') ? (
                                        <a
                                            href={button.link}
                                            onClick={(e) => handleAnchorClick(e, button.link)}
                                            className={
                                                `px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center cursor-pointer ` +
                                                (index === 0
                                                    ? ""
                                                    : "border border-[#8D1A5F] bg-transparent text-[#8D1A5F] hover:bg-[#8D1A5F] hover:text-white")
                                            }
                                            style={
                                                index === 0
                                                    ? {
                                                        background: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)",
                                                        color: "#fff"
                                                    }
                                                    : {}
                                            }
                                        >
                                            {button.text}
                                            {index === 0 && (
                                                <motion.div
                                                    className="ml-2 flex items-center justify-center"
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                                                >
                                                    <FiArrowRight size={16} />
                                                </motion.div>
                                            )}
                                        </a>
                                    ) : (
                                        <Link href={button.link}>
                                            <span
                                                className={
                                                    `px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center ` +
                                                    (index === 0
                                                        ? ""
                                                        : "border border-[#8D1A5F] bg-transparent text-[#8D1A5F] hover:bg-[#8D1A5F] hover:text-white")
                                                }
                                                style={
                                                    index === 0
                                                        ? {
                                                            background: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)",
                                                            color: "#fff"
                                                        }
                                                        : {}
                                                }
                                            >
                                                {button.text}
                                                {index === 0 && (
                                                    <motion.div
                                                        className="ml-2 flex items-center justify-center"
                                                        animate={{ x: [0, 5, 0] }}
                                                        transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                                                    >
                                                        <FiArrowRight size={16} />
                                                    </motion.div>
                                                )}
                                            </span>
                                        </Link>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Image */}
                    <motion.div
                        className="w-full md:w-1/2 relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.img
                            src={data.image}
                            alt="Hero image"
                            className="w-8/10 h-auto aspect-[3/2] object-cover rounded-lg shadow-lg"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
