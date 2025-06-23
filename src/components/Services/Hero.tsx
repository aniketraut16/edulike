"use client"
import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Hero(data: {
    title: string;
    buttons: {
        text: string;
        link: string;
    }[]
    image: string;
}) {
    return (
        <div className="relative w-full bg-[#f5f0e8] overflow-hidden pt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center py-16 md:py-24">
                    {/* Text Content */}
                    <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-8">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#461217] leading-tight mb-6">
                            {data.title}
                        </h1>
                        <div className="flex flex-wrap gap-4 mt-8">
                            {data.buttons.map((button, index) => (
                                <Link href={button.link} key={index}>
                                    <span
                                        className={
                                            `px-6 py-3 rounded-xl text-sm font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 inline-flex items-center ` +
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
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="w-full md:w-1/2 relative">
                        <img
                            src={data.image}
                            alt="Hero image"
                            className="w-8/10 h-auto aspect-[3/2] object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
