'use client';

import Link from 'next/link';
import {
    Search,
    ShoppingCart,
    User,
    ChevronDown,
    ChevronRight,
    BookOpen,
    HelpCircle,
    LogOut,
    Menu,
    X,
    ChevronUp,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Course } from '@/utils/navbar';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import { useContent } from '@/context/ContentContext';

// Category type is now the same as Course since preprocessing is done in courses.ts
type Category = Course;

interface ExploreDropdownProps {
    hoveredCategory: Category | null;
    setHoveredCategory: (category: Category | null) => void;
    categories: Category[];
}

const ExploreDropdown = ({ hoveredCategory, setHoveredCategory, categories }: ExploreDropdownProps) => {
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
                    {categories.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <span className="text-gray-500">Loading categories...</span>
                        </div>
                    ) : (
                        categories.map((category: Category, idx: number) => (
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
                        ))
                    )}
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
                            {hoveredCategory.courseList.map((course: { name: string; slug: string; id: string }, idx: number) => (
                                <Link
                                    key={idx}
                                    href={`/course?id=${course.id}`}
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
        { icon: BookOpen, label: 'My Learning', href: '/my-learning' },
        { icon: User, label: 'My Subscription', href: '/my-subscription' },
        { icon: ShoppingCart, label: 'Cart', href: '/cart' },
        { icon: HelpCircle, label: 'Help and Support', href: '/contact' },
    ];


    const { user, logout } = useAuth();

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
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="User" className="rounded-full" />
                        ) : (
                            <User className="h-6 w-6 text-purple-700 group-hover:text-purple-900 transition-colors duration-200" />
                        )}
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-sm font-semibold text-gray-800 group-hover:text-purple-800 transition-colors duration-200'>{user?.displayName}</span>
                        <span className='text-xs text-gray-500 group-hover:text-purple-600 transition-colors duration-200'>{user?.email}</span>
                        <span className='text-xs text-blue-600 font-medium group-hover:text-blue-800 transition-colors duration-200'>Pro Member</span>
                    </div>
                </div>

                {/* Menu Items */}
                <div className='flex flex-col gap-1 mt-4'>
                    {userMenuItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            className="flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-200 group text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        >
                            <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                            <span className='text-sm font-medium'>{item.label}</span>
                        </Link>
                    ))}
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-200 group text-red-600 hover:text-white hover:bg-red-500 mt-2"
                    >
                        <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                        <span className='text-sm font-medium'>Log Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Mobile menu component
const MobileMenu = ({ isOpen, onClose, isLoggedIn, user, logout, categories }: {
    isOpen: boolean;
    onClose: () => void;
    isLoggedIn: boolean;
    user: any;
    logout: () => void;
    categories: Category[];
}) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const userMenuItems = [
        { icon: BookOpen, label: 'My Learning', href: '/my-learning' },
        { icon: User, label: 'My Subscription', href: '/my-subscription' },
        { icon: ShoppingCart, label: 'Cart', href: '/cart' },
        { icon: HelpCircle, label: 'Help and Support', href: '/contact' },
    ];

    const toggleCategory = (categoryName: string) => {
        if (expandedCategory === categoryName) {
            setExpandedCategory(null);
        } else {
            setExpandedCategory(categoryName);
        }
    };

    return (
        <div className={`fixed top-0 right-0 h-full w-full bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                </button>
            </div>

            <div className="p-4">
                {isLoggedIn && (
                    <div className="mb-6 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt="User" className="rounded-full" />
                                ) : (
                                    <User className="h-6 w-6 text-purple-700" />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-800">{user?.displayName}</span>
                                <span className="text-xs text-gray-500">{user?.email}</span>
                                <span className="text-xs text-blue-600 font-medium">Pro Member</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-6 pb-4 border-b border-gray-200">
                    <Link href="/for-corporates" className="flex items-center py-3 font-medium">
                        KC for Corporates
                    </Link>
                    <Link href="/for-institutions" className="flex items-center py-3 font-medium">
                        KC for Institutions
                    </Link>
                    <Link href="/my-learning" className="flex items-center py-3 font-medium">
                        My Learning
                    </Link>
                </div>

                {isLoggedIn ? (
                    <div className="mb-6 pb-4 border-b border-gray-200">
                        {userMenuItems.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className="flex items-center gap-3 py-3"
                                onClick={onClose}
                            >
                                <item.icon className="h-5 w-5 text-gray-600" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                logout();
                                onClose();
                            }}
                            className="flex w-full items-center gap-3 py-3 text-red-600"
                        >
                            <LogOut className="h-5 w-5" />
                            <span className="font-medium">Log Out</span>
                        </button>
                    </div>
                ) : (
                    <div className="mb-6 pb-4 border-b border-gray-200">
                        <Link href="/auth"
                            className="flex items-center justify-center py-3 rounded-xl font-semibold w-full"
                            onClick={onClose}
                            style={{
                                background: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)",
                                color: "#fff"
                            }}
                        >
                            Login
                        </Link>
                    </div>
                )}

                <div className="mb-4">
                    <h3 className="font-bold text-gray-700 mb-2">Course Categories</h3>
                    {categories.map((category: Category, idx: number) => (
                        <div key={idx} className="mb-2 bg-gray-50 hover:bg-gray-100 rounded-lg p-2">
                            <div
                                className="flex items-center justify-between py-3 cursor-pointer"
                                onClick={() => toggleCategory(category.name)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 p-2 font-bold flex items-center justify-center rounded-full ${category.bg}`}>
                                        {category.iconElement}
                                    </div>
                                    <span className="font-medium">
                                        {category.name}
                                        <span className="text-xs text-gray-500">  ({category.noofcourses} Courses)</span>
                                    </span>
                                </div>
                                {expandedCategory === category.name ? (
                                    <ChevronUp className="mr-2 h-5 w-5" />
                                ) : (
                                    <ChevronDown className="mr-2 h-5 w-5" />
                                )}
                            </div>

                            {expandedCategory === category.name && (
                                <div>
                                    {category.courseList && category.courseList.length > 0 ? (
                                        <ul>
                                            {category.courseList.map((course: { name: string; slug: string; id: string }, courseIdx: number) => (
                                                <li key={course.id || courseIdx}>
                                                    <Link
                                                        href={`/course?id=${course.id}`}
                                                        className="block py-2 text-sm text-gray-700 hover:text-[#8D1A5F] transition-colors bg-gray-50 rounded-lg p-2 mb-2"
                                                        onClick={onClose}
                                                    >
                                                        <span className="font-medium">{course.name}</span>

                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="py-2 text-sm text-gray-400">No courses available.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="mb-6 pb-4 border-b border-gray-200">
                        <Link href="/courses"
                            className="flex items-center justify-center py-3 rounded-xl font-semibold w-full"
                            onClick={onClose}
                            style={{
                                background: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)",
                                color: "#fff"
                            }}
                        >
                            View All Courses
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Navbar component
const Navbar = () => {

    const { isAdmin, user, logout } = useAuth();
    const pathname = usePathname();
    const isAdminPage = pathname.includes("/admin");

    if (isAdmin && isAdminPage) {
        return null;
    }



    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { navbarCourses, cartCount } = useContent();
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();


    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push(`/courses?query=${searchQuery}`);
            setSearchQuery('');
        }
    };



    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobileMenuOpen]);

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
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
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

                        {/* Desktop Search */}
                        <div className="hidden md:flex flex-1 mx-6">
                            <div className="relative w-full max-w-3xl mx-auto">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    value={searchQuery}
                                    onKeyDown={handleSearchKeyDown}
                                    placeholder="Search for courses..."
                                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <button
                                    onClick={() => router.push(`/courses`)}
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white text-sm bg-[#8D1A5F] p-[7px] rounded-[9px] cursor-pointer"
                                >
                                    Explore All Courses
                                </button>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
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
                                <span className="absolute -top-2 -right-2 text-[10px] rounded-full h-4 w-4 flex items-center justify-center"
                                    style={{
                                        background: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)",
                                        color: "#fff"
                                    }}
                                >
                                    {cartCount}
                                </span>
                            </Link>
                            {isLoggedIn && (
                                <div className="relative profile-dropdown">
                                    <button
                                        className={`flex items-center space-x-2 transition-colors`}
                                        onMouseEnter={handleUserMouseEnter}
                                    >
                                        <div className="w-8 h-8 bg-purple-300 rounded-full flex items-center justify-center">
                                            {user?.photoURL ? (
                                                <img src={user.photoURL} alt="User" className="rounded-full" />
                                            ) : (
                                                <User className="h-5 w-5 text-purple-700" />
                                            )}
                                        </div>
                                    </button>
                                </div>
                            )}
                            {!isLoggedIn && (
                                <Link href="/auth"
                                    className="px-6 py-3 rounded-xl text-sm font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                                    style={{
                                        background: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)",
                                        color: "#fff"
                                    }}
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile Navigation */}
                        <div className="flex md:hidden items-center space-x-4">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="text-gray-700"
                            >
                                <Search className="h-5 w-5" />
                            </button>
                            <Link href="/cart" className="transition-colors relative">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="absolute -top-2 -right-2 text-[10px] rounded-full h-4 w-4 flex items-center justify-center"
                                    style={{
                                        background: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)",
                                        color: "#fff"
                                    }}
                                >
                                    {cartCount}
                                </span>
                            </Link>
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="text-gray-700"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    {isSearchOpen && (
                        <div className="md:hidden mt-3 pb-2">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input
                                    type="text"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    value={searchQuery}
                                    onKeyDown={handleSearchKeyDown}
                                    placeholder="Search for courses..."
                                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    autoFocus
                                />
                                <button
                                    onClick={() => router.push(`/courses`)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    View All Courses
                                </button>
                            </div>
                        </div>
                    )}
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
                        categories={navbarCourses}
                    />
                )}

                {isUserDropdownOpen && <UserDropdown />}
            </nav>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                isLoggedIn={isLoggedIn}
                user={user}
                logout={logout}
                categories={navbarCourses}
            />

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
};

export default Navbar;
