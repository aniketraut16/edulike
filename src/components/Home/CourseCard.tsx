'use client'
import React, { useState } from 'react';

export default function EnhancedCourseCard({ item }: {
    item: {
        title: string;
        description: string;
        image: string;
        price: number;
        originalPrice: number;
        lessons: number;
        difficulty: string;
    }
}) {
    const [isHovered, setIsHovered] = useState(false);

    // Convert prices to INR format
    const formattedPrice = `₹${item.price.toLocaleString('en-IN')}`;
    const formattedOriginalPrice = `₹${item.originalPrice.toLocaleString('en-IN')}`;

    return (
        <div className="w-full p-4">
            <div
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isHovered ? 'shadow-2xl' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Section with Gradient Overlay */}
                <div className="h-56 bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700 relative overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <div className={`w-32 h-32 bg-white rounded-full absolute -top-8 -right-8 transition-transform duration-700 ${isHovered ? 'scale-150 rotate-45' : ''}`}></div>
                        <div className={`w-24 h-24 bg-white rounded-full absolute top-1/2 -left-6 transition-transform duration-500 ${isHovered ? 'scale-125 -rotate-12' : ''}`}></div>
                    </div>

                    {/* Play Button Overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform transition-transform duration-300 hover:scale-110">
                            <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                    {/* Rating and Stats */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-1">(4.9)</span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <div className="flex items-center">
                                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2c0 .74-.4 1.38-1 1.72v.78h-2v-.78c-.6-.34-1-.98-1-1.72zM15.5 17c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM3 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12L10.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H3z" />
                                </svg>
                                <span>3k enrolled</span>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-xl mb-2 text-gray-800 leading-tight">
                        {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {item.description}
                    </p>

                    {/* Course Features */}
                    <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
                        <div className="flex items-center">
                            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                            </svg>
                            <span>{item.lessons} Lessons</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
                            </svg>
                            <span>Difficulty: {item.difficulty}</span>
                        </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                                {formattedPrice}
                            </span>
                            <span className="text-sm text-gray-400 line-through">{formattedOriginalPrice}</span>
                        </div>
                        <button className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-6 py-3 rounded-xl text-sm font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
                            Enroll Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}