'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if scrolled more than 50vh
            const scrollThreshold = window.innerHeight * 0.5;
            setScrolled(window.scrollY > scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-[#8b5cf6] shadow-md py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <span className={`font-bold text-2xl ${scrolled ? 'text-white' : 'text-white'}`}>
                        EduLike
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {['Courses', 'Instructors', 'Events', 'Pricing', 'Blog'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className={`${scrolled ? 'text-white hover:text-purple-200' : 'text-white hover:text-purple-100'
                                } font-medium transition-colors`}
                        >
                            {item}
                        </Link>
                    ))}
                    <button className={`ml-4 px-6 py-2 rounded-lg font-medium transition-colors ${scrolled
                        ? 'bg-white text-purple-700 hover:bg-purple-100'
                        : 'bg-white text-purple-700 hover:bg-purple-100'
                        }`}>
                        Sign In
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-purple-900 px-4 py-5">
                    <div className="flex flex-col space-y-4">
                        {['Courses', 'Instructors', 'Events', 'Pricing', 'Blog'].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-white hover:text-purple-200 font-medium transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <button className="mt-4 px-6 py-2 rounded-lg bg-white text-purple-700 hover:bg-purple-100 font-medium transition-colors">
                            Sign In
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar; 