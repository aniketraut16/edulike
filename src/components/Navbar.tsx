'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, ChevronDown, BookOpen, LogOut, Heart, CreditCard } from 'lucide-react';


const Navbar = () => {


    return (
        <nav
            className={`fixed top-[10px] left-[10px] z-50 w-[calc(100%-20px)] transition-all duration-300 bg-white rounded-xl py-2 px-4 shadow-lg`}
        >
            <div className="flex items-center justify-between">
                {/* Left Section - Logo and Explore */}
                <div className="flex items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center mr-6">
                        <img src="/logo.png" alt="Logo" className="h-14 w-auto object-contain " />
                    </Link>

                    {/* Explore Dropdown - Multi-level */}
                    <div className="relative explore-dropdown hidden md:block">
                        <button
                            className={`flex items-center space-x-1 font-medium transition-colors`}
                        >
                            <span>Explore</span>
                            <ChevronDown className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Middle Section - Search Bar */}
                <div className="hidden md:flex flex-1 mx-6">
                    <div className="relative w-full max-w-3xl mx-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search for courses..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Right Section - My Learning, Cart, Profile */}
                <div className="hidden md:flex items-center space-x-6 ml-auto">
                    {/* KC for Corporates */}
                    <Link
                        href="/for-corporates"
                        className={`font-medium transition-colors whitespace-nowrap`}
                    >
                        KC for Corporates
                    </Link>

                    {/* KC for Institutions */}
                    <Link
                        href="/for-institutions"
                        className={`font-medium transition-colors whitespace-nowrap`}
                    >
                        KC for Institutions
                    </Link>

                    {/* My Learning */}
                    <Link
                        href="/my-learning"
                        className={`font-medium transition-colors whitespace-nowrap`}
                    >
                        My Learning
                    </Link>

                    {/* Cart Icon */}
                    <Link
                        href="/cart"
                        className={`transition-colors relative`}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            2
                        </span>
                    </Link>

                    {/* Profile Dropdown */}
                    <div className="relative profile-dropdown">
                        <button
                            className={`flex items-center space-x-2 transition-colors`}
                        >
                            <div className="w-8 h-8 bg-purple-300 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-purple-700" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-black ml-auto"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar; 