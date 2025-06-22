'use client';

import Link from 'next/link';
import {
    Search,
    ShoppingCart,
    User,
    ChevronDown,
    ChevronRight,
    Settings,
    BookOpen,
    Heart,
    HelpCircle,
    LogOut,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Course, getCourses } from '@/utils/courses';
import { usePathname } from 'next/navigation';


type Category = Course & {
    iconElement: React.ReactNode;
    bg: string;
    border: string;
};

const colorPalette = [
    { bg: 'bg-blue-100', border: 'hover:border-blue-500', icon: '#3B82F6' },
    { bg: 'bg-orange-100', border: 'hover:border-orange-500', icon: '#F97316' },
    { bg: 'bg-green-100', border: 'hover:border-green-500', icon: '#10B981' },
    { bg: 'bg-indigo-100', border: 'hover:border-indigo-500', icon: '#6366F1' },
    { bg: 'bg-pink-100', border: 'hover:border-pink-500', icon: '#EC4899' },
    { bg: 'bg-yellow-100', border: 'hover:border-yellow-500', icon: '#FBBF24' },
    { bg: 'bg-purple-100', border: 'hover:border-purple-500', icon: '#A855F7' },
    { bg: 'bg-red-100', border: 'hover:border-red-500', icon: '#EF4444' },
    { bg: 'bg-teal-100', border: 'hover:border-teal-500', icon: '#14B8A6' },
    { bg: 'bg-lime-100', border: 'hover:border-lime-500', icon: '#84CC16' },
    { bg: 'bg-rose-100', border: 'hover:border-rose-500', icon: '#F43F5E' },
    { bg: 'bg-cyan-100', border: 'hover:border-cyan-500', icon: '#06B6D4' },
    { bg: 'bg-amber-100', border: 'hover:border-amber-500', icon: '#F59E0B' },
    { bg: 'bg-sky-100', border: 'hover:border-sky-500', icon: '#0EA5E9' },
    { bg: 'bg-fuchsia-100', border: 'hover:border-fuchsia-500', icon: '#D946EF' },
];

const shuffleArray = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5);
const rawCategories = getCourses();
const shuffledColors = shuffleArray(colorPalette).slice(0, rawCategories.length);
const categories = rawCategories.map((cat, idx) => ({
    ...cat,
    iconElement: <cat.icon size={28} color={shuffledColors[idx].icon} />,
    bg: shuffledColors[idx].bg,
    border: shuffledColors[idx].border,
}));

interface ExploreDropdownProps {
    hoveredCategory: Category | null;
    setHoveredCategory: (category: Category | null) => void;
}

const ExploreDropdown = ({ hoveredCategory, setHoveredCategory }: ExploreDropdownProps) => {
    return (
        <div className='ml-[5vw] h-[70vh] flex overflow-hidden'
            style={{
                transform: "translateY(-10px)",
            }}
        >
            <div className={`w-[25vw] rounded-l-lg ${!hoveredCategory ? 'rounded-r-lg' : ''} h-full bg-white p-4`}
                style={{
                    zIndex: "51"
                }}
            >
                <div className='flex justify-between items-center'>
                    <span className='text-md font-bold text-gray-700'>Course Categories</span>
                    <Link href="/courses" className='text-[12px] text-[#67180C] font-medium'>
                        View All Courses
                    </Link>
                </div>
                <div className='flex flex-col gap-2 mt-4 h-full overflow-y-auto mb-4'>
                    {categories.map((category, idx) => (
                        <div
                            key={idx}
                            onMouseEnter={() => setHoveredCategory(category)}
                            className={`flex items-center gap-2 hover:bg-gray-50 p-2 rounded-md cursor-pointer w-full min-h-10 border-l-4 border-transparent ${category.border} hover:font-semibold transition-all duration-300 ${hoveredCategory?.name === category.name ? 'bg-gray-50 font-semibold' : ''}`}
                        >
                            <div className={`w-9 h-9 flex items-center justify-center rounded-full p-2 mr-2 ${category.bg}`}>
                                {category.iconElement}
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-sm text-gray-700'>{category.name}</span>
                                <span className='text-sm text-gray-500'>({category.noofcourses} Courses)</span>
                            </div>
                            <div className='ml-auto'>
                                <ChevronRight className='h-4 w-4' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Courses List - Only show when a category is hovered */}
            <div className={`w-[25vw] h-full bg-gray-200 p-4 rounded-r-lg transition-all duration-300 ease-in-out transform ${hoveredCategory
                ? 'translate-x-0 opacity-100'
                : '-translate-x-full opacity-0 pointer-events-none'
                }`}
                style={{
                    zIndex: "50"
                }}
            >
                {hoveredCategory && (
                    <>
                        <span className='text-md font-bold text-gray-700'>
                            Popular {hoveredCategory.name} Courses
                        </span>
                        <hr className='my-4' />
                        <div className='flex flex-col h-full overflow-y-auto'>
                            {hoveredCategory.courseList.map((course, idx) => (
                                <Link
                                    key={idx}
                                    href={`/course?id=${course.slug}`}
                                    className='text-sm text-gray-700 rounded-md transition-all border-l-3 border-transparent hover:border-gray-500 px-3 py-3 hover:bg-white/70'
                                >
                                    {course.name}
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const UserDropdown = () => {
    const userMenuItems = [
        { icon: User, label: 'My Profile', href: '/profile' },
        { icon: BookOpen, label: 'My Courses', href: '/my-courses' },
        { icon: Heart, label: 'Wishlist', href: '/wishlist' },
        { icon: Settings, label: 'Settings', href: '/settings' },
        { icon: HelpCircle, label: 'Help & Support', href: '/help' },
        { icon: LogOut, label: 'Log Out', href: '/logout', isLogout: true },
    ];

    return (
        <div className='ml-auto h-auto flex overflow-hidden'
            style={{
                transform: "translateY(-10px)",
            }}
        >
            <div className="w-[20vw] rounded-lg bg-white p-4 shadow-lg"
                style={{
                    zIndex: "51"
                }}
            >
                {/* User Info Section */}
                <div className='flex items-center gap-3 pb-4 border-b border-gray-200 group hover:bg-purple-50 transition-colors duration-200'>
                    <div className="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center group-hover:bg-purple-400 transition-colors duration-200">
                        <User className="h-6 w-6 text-purple-700 group-hover:text-purple-900 transition-colors duration-200" />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm font-semibold text-gray-800 group-hover:text-purple-800 transition-colors duration-200'>John Doe</span>
                        <span className='text-xs text-gray-500 group-hover:text-purple-600 transition-colors duration-200'>john.doe@example.com</span>
                        <span className='text-xs text-blue-600 font-medium group-hover:text-blue-800 transition-colors duration-200'>Pro Member</span>
                    </div>
                </div>

                {/* Menu Items */}
                <div className='flex flex-col gap-1 mt-4'>
                    {userMenuItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-200 group
                                ${item.isLogout
                                    ? 'text-red-600 hover:bg-red-50 border-t border-gray-200 mt-2 pt-3 hover:text-red-800'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            <span className='text-sm font-medium'>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Navbar component
const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);

    const handleExploreMouseEnter = () => {
        setIsDropdownOpen(true);
        // Close user dropdown if open
        setIsUserDropdownOpen(false);
    };

    const handleUserMouseEnter = () => {
        setIsUserDropdownOpen(true);
        // Close explore dropdown if open
        setIsDropdownOpen(false);
        setHoveredCategory(null);
    };

    const handleOverlayMouseEnter = () => {
        setIsDropdownOpen(false);
        setIsUserDropdownOpen(false);
        setHoveredCategory(null);
    };

    useEffect(() => {
        handleOverlayMouseEnter();
    }, [pathname]);

    return (
        <>
            <nav className={`fixed flex flex-col gap-3 top-0 left-0 z-50 ${pathname === '/' ? 'px-[10px] pt-[10px]' : ''} ${(!isDropdownOpen && !isUserDropdownOpen) ? 'h-fit ' : 'h-full bg-black/50'} w-full`}>
                <div className={`w-full transition-all duration-300 bg-white ${pathname === '/' ? 'rounded-xl' : ''} py-2 px-4 shadow-lg`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center mr-6">
                                <img src="/logo.png" alt="Logo" className="h-14 w-auto object-contain" />
                            </Link>

                            <div className="relative explore-dropdown hidden md:block">
                                <button
                                    className={`flex items-center space-x-1 font-medium transition-colors`}
                                    onMouseEnter={handleExploreMouseEnter}
                                >
                                    <span>Explore</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

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

                        <div className="hidden md:flex items-center space-x-6 ml-auto">
                            <Link href="/for-corporates" className="font-medium transition-colors whitespace-nowrap">
                                KC for Corporates
                            </Link>
                            <Link href="/for-institutions" className="font-medium transition-colors whitespace-nowrap">
                                KC for Institutions
                            </Link>
                            <Link href="/my-learning" className="font-medium transition-colors whitespace-nowrap">
                                My Learning
                            </Link>
                            <Link href="/cart" className="transition-colors relative">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    2
                                </span>
                            </Link>
                            <div className="relative profile-dropdown">
                                <button
                                    className={`flex items-center space-x-2 transition-colors`}
                                    onMouseEnter={handleUserMouseEnter}
                                >
                                    <div className="w-8 h-8 bg-purple-300 rounded-full flex items-center justify-center">
                                        <User className="h-5 w-5 text-purple-700" />
                                    </div>
                                </button>
                            </div>
                        </div>

                        <button className="md:hidden text-black ml-auto">
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
                </div>

                {/* Black overlay area that resets dropdown when hovered */}
                {(isDropdownOpen || isUserDropdownOpen) && (
                    <div
                        className="fixed inset-0 -z-10"
                        onMouseEnter={handleOverlayMouseEnter}
                    />
                )}

                {isDropdownOpen && (
                    <ExploreDropdown
                        hoveredCategory={hoveredCategory}
                        setHoveredCategory={setHoveredCategory}
                    />
                )}

                {isUserDropdownOpen && <UserDropdown />}
            </nav>
        </>
    );
};

export default Navbar;
