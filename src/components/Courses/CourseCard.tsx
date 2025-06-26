'use client'
import React, { useState } from 'react';
import { Course } from '@/types/courses';
import Link from 'next/link';

export default function CourseCard({ item }: { item: Course }) {
    const [isHovered, setIsHovered] = useState(false);

    // Convert prices to INR format
    const formattedPrice = `₹${item.price.toLocaleString('en-IN')}`;
    const formattedOriginalPrice = `₹${item.originalPrice.toLocaleString('en-IN')}`;

    // Ensure rating is a valid integer between 0 and 5
    const safeRating = Math.max(0, Math.min(5, Math.floor(Number(item.rating) || 0)));

    return (
        <div className="w-full h-full p-4">
            <div
                className={`bg-white rounded-2xl shadow-lg overflow-hidden h-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${isHovered ? 'shadow-2xl' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image Section with Gradient Overlay */}
                <div className="h-56 relative overflow-hidden">
                    <img src={item.image} alt={item.title} className="object-cover w-full h-full"
                        onError={(e) => {
                            e.currentTarget.src = "https://hukumchandcollegeajmer.org/wp-content/uploads/2017/11/dummy-3.jpg";
                        }}
                    />
                </div>

                {/* Content Section */}
                <div className="p-6">
                    {/* Rating and Stats */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                            <div className="flex">
                                {[...Array(safeRating)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4" style={{ color: 'gold' }} fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-1">({item.rating})</span>
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <div className="flex items-center">
                                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="#8D1A5F">
                                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2c0 .74-.4 1.38-1 1.72v.78h-2v-.78c-.6-.34-1-.98-1-1.72zM15.5 17c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zM3 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12L10.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H3z" />
                                </svg>
                                <span>{item.enrollment_count} enrolled</span>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-xl mb-2 text-gray-800 leading-tight">
                        {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {item.description.length > 100
                            ? item.description.slice(0, 100) + "..."
                            : item.description}
                    </p>

                    {/* Course Features */}
                    <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
                        <div className="flex items-center">
                            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="#8D1A5F">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                            </svg>
                            <span>{item.lessons} Lessons</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="#8D1A5F">
                                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
                            </svg>
                            <span>Difficulty: {item.difficulty_level.charAt(0).toUpperCase() + item.difficulty_level.slice(1)}</span>
                        </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-center space-x-2">
                            <span
                                className="font-bold text-2xl"
                                style={{
                                    background: 'linear-gradient(to right, #8D1A5F, #8D1A5F)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent'
                                }}
                            >
                                {formattedPrice}
                            </span>
                            <span className="text-sm text-gray-400 line-through">{formattedOriginalPrice}</span>
                        </div>
                        <Link
                            className="text-white px-6 py-3 rounded-xl text-sm font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                            style={{
                                background: 'linear-gradient(to right, #8D1A5F, #8D1A5F)'
                            }}
                            href={`/course?id=${item.id}`}
                        >
                            Enroll Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}