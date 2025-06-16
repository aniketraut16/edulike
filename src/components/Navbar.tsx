'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, ChevronDown, BookOpen, LogOut, Heart, CreditCard } from 'lucide-react';

const categories = [
    {
        id: 1,
        name: 'Web Development',
        courses: [
            { id: 1, name: 'React Fundamentals', price: '$99', slug: 'react-fundamentals' },
            { id: 2, name: 'Next.js Complete Guide', price: '$129', slug: 'nextjs-complete-guide' },
            { id: 3, name: 'JavaScript Mastery', price: '$89', slug: 'javascript-mastery' },
            { id: 4, name: 'TypeScript Advanced', price: '$109', slug: 'typescript-advanced' }
        ]
    },
    {
        id: 2,
        name: 'Data Science',
        courses: [
            { id: 5, name: 'Python for Data Science', price: '$149', slug: 'python-data-science' },
            { id: 6, name: 'Machine Learning Basics', price: '$199', slug: 'machine-learning-basics' },
            { id: 7, name: 'Data Visualization', price: '$119', slug: 'data-visualization' },
            { id: 8, name: 'SQL for Beginners', price: '$79', slug: 'sql-beginners' }
        ]
    },
    {
        id: 3,
        name: 'Mobile Development',
        courses: [
            { id: 9, name: 'React Native Complete', price: '$159', slug: 'react-native-complete' },
            { id: 10, name: 'Flutter Development', price: '$139', slug: 'flutter-development' },
            { id: 11, name: 'iOS Swift Programming', price: '$179', slug: 'ios-swift-programming' },
            { id: 12, name: 'Android Kotlin', price: '$149', slug: 'android-kotlin' }
        ]
    },
    {
        id: 4,
        name: 'Design',
        courses: [
            { id: 13, name: 'UI/UX Design Principles', price: '$129', slug: 'uiux-design-principles' },
            { id: 14, name: 'Figma Masterclass', price: '$99', slug: 'figma-masterclass' },
            { id: 15, name: 'Adobe Creative Suite', price: '$189', slug: 'adobe-creative-suite' },
            { id: 16, name: 'Graphic Design Basics', price: '$109', slug: 'graphic-design-basics' }
        ]
    },
    {
        id: 5,
        name: 'Business',
        courses: [
            { id: 17, name: 'Digital Marketing', price: '$119', slug: 'digital-marketing' },
            { id: 18, name: 'Project Management', price: '$139', slug: 'project-management' },
            { id: 19, name: 'Entrepreneurship 101', price: '$99', slug: 'entrepreneurship-101' },
            { id: 20, name: 'Financial Planning', price: '$149', slug: 'financial-planning' }
        ]
    }
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = window.innerHeight * 0.5;
            setScrolled(window.scrollY > scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.explore-dropdown') && !target.closest('.profile-dropdown')) {
                setExploreDropdownOpen(false);
                setProfileDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#8b5cf6] shadow-md py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center">
                {/* Left Section - Logo and Explore */}
                <div className="flex items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center mr-6">
                        <span className={`font-bold text-2xl ${scrolled ? 'text-white' : 'text-white'}`}>
                            EduLike
                        </span>
                    </Link>

                    {/* Explore Dropdown - Multi-level */}
                    <div className="relative explore-dropdown hidden md:block">
                        <button
                            className={`flex items-center space-x-1 ${scrolled ? 'text-white hover:text-purple-200' : 'text-white hover:text-purple-100'
                                } font-medium transition-colors`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setExploreDropdownOpen(!exploreDropdownOpen);
                                setProfileDropdownOpen(false);
                            }}
                            onMouseEnter={() => setExploreDropdownOpen(true)}
                        >
                            <span>Explore</span>
                            <ChevronDown className="h-4 w-4" />
                        </button>

                        {/* Explore Dropdown Menu - First Level */}
                        {exploreDropdownOpen && (
                            <div
                                className="absolute top-full left-0 mt-2 w-[700px] bg-white rounded-lg shadow-xl border border-gray-200"
                                onMouseLeave={() => setExploreDropdownOpen(false)}
                            >
                                <div className="flex">
                                    {/* Categories - First Level */}
                                    <div className="w-1/3 border-r border-gray-200">
                                        <ul className="py-2">
                                            {categories.map((category) => (
                                                <li key={category.id}>
                                                    <button
                                                        className={`w-full text-left px-4 py-3 transition-colors flex justify-between items-center ${selectedCategory === category.id
                                                            ? 'bg-purple-50 text-purple-700 font-medium'
                                                            : 'text-gray-700 hover:bg-gray-50'
                                                            }`}
                                                        onMouseEnter={() => setSelectedCategory(category.id)}
                                                    >
                                                        <span>{category.name}</span>
                                                        <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Courses - Second Level */}
                                    <div className="w-2/3 p-4">
                                        {selectedCategory ? (
                                            <div>
                                                <h3 className="font-semibold text-gray-800 mb-4 text-lg">
                                                    {categories.find(cat => cat.id === selectedCategory)?.name} Courses
                                                </h3>
                                                <div className="grid grid-cols-1 gap-4">
                                                    {categories
                                                        .find(cat => cat.id === selectedCategory)
                                                        ?.courses.map((course) => (
                                                            <Link
                                                                href={`/courses/${course.slug}`}
                                                                key={course.id}
                                                                className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100 group"
                                                            >
                                                                <h4 className="font-medium text-gray-800 group-hover:text-purple-600">{course.name}</h4>
                                                                <p className="text-sm font-semibold text-purple-600 mt-1">{course.price}</p>
                                                            </Link>
                                                        ))}
                                                </div>
                                                <div className="mt-6 text-right">
                                                    <Link
                                                        href={`/categories/${selectedCategory}`}
                                                        className="text-purple-600 font-medium hover:text-purple-800"
                                                    >
                                                        View all courses →
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-500 py-16">
                                                Hover over a category to see courses
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
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
                    {/* My Learning */}
                    <Link
                        href="/my-learning"
                        className={`${scrolled ? 'text-white hover:text-purple-200' : 'text-white hover:text-purple-100'
                            } font-medium transition-colors whitespace-nowrap`}
                    >
                        My Learning
                    </Link>

                    {/* Cart Icon */}
                    <Link
                        href="/cart"
                        className={`${scrolled ? 'text-white hover:text-purple-200' : 'text-white hover:text-purple-100'
                            } transition-colors relative`}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            2
                        </span>
                    </Link>

                    {/* Profile Dropdown */}
                    <div className="relative profile-dropdown">
                        <button
                            className={`flex items-center space-x-2 ${scrolled ? 'text-white hover:text-purple-200' : 'text-white hover:text-purple-100'
                                } transition-colors`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setProfileDropdownOpen(!profileDropdownOpen);
                                setExploreDropdownOpen(false);
                            }}
                            onMouseEnter={() => setProfileDropdownOpen(true)}
                        >
                            <div className="w-8 h-8 bg-purple-300 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-purple-700" />
                            </div>
                        </button>

                        {/* Profile Dropdown Menu */}
                        {profileDropdownOpen && (
                            <div
                                className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                                onMouseLeave={() => setProfileDropdownOpen(false)}
                            >
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="font-medium text-gray-800">John Doe</p>
                                    <p className="text-sm text-gray-500">john.doe@example.com</p>
                                </div>

                                <Link
                                    href="/profile"
                                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <User className="h-4 w-4" />
                                    <span>Profile</span>
                                </Link>
                                <Link
                                    href="/my-learning"
                                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <BookOpen className="h-4 w-4" />
                                    <span>My Learning</span>
                                </Link>
                                <Link
                                    href="/wishlist"
                                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <Heart className="h-4 w-4" />
                                    <span>Wishlist</span>
                                </Link>
                                <Link
                                    href="/subscriptions"
                                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    <CreditCard className="h-4 w-4" />
                                    <span>Subscriptions</span>
                                </Link>
                                <hr className="my-1" />
                                <button className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors w-full text-left">
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white ml-auto"
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
                    {/* Mobile Search */}
                    <div className="mb-4">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search for courses..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        {/* Mobile Explore Menu */}
                        <div className="space-y-2">
                            <button
                                className="text-white hover:text-purple-200 font-medium transition-colors text-left flex items-center justify-between w-full"
                                onClick={() => setSelectedCategory(selectedCategory ? null : 1)}
                            >
                                <span>Explore</span>
                                <ChevronDown className={`h-4 w-4 transition-transform ${selectedCategory ? 'rotate-180' : ''}`} />
                            </button>

                            {selectedCategory && (
                                <div className="pl-4 space-y-3 pt-2">
                                    {categories.map(category => (
                                        <div key={category.id} className="mb-3">
                                            <button
                                                className={`text-left text-white hover:text-purple-200 w-full mb-2 ${selectedCategory === category.id ? 'font-medium' : ''}`}
                                                onClick={() => setSelectedCategory(category.id)}
                                            >
                                                {category.name}
                                            </button>

                                            {selectedCategory === category.id && (
                                                <div className="pl-3 space-y-2 border-l border-purple-700">
                                                    {category.courses.map(course => (
                                                        <Link
                                                            key={course.id}
                                                            href={`/courses/${course.slug}`}
                                                            className="block text-purple-300 hover:text-white text-sm py-1"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            {course.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            href="/my-learning"
                            className="text-white hover:text-purple-200 font-medium transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            My Learning
                        </Link>
                        <Link
                            href="/cart"
                            className="text-white hover:text-purple-200 font-medium transition-colors flex items-center space-x-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <ShoppingCart className="h-4 w-4" />
                            <span>Cart (2)</span>
                        </Link>
                        <div className="border-t border-purple-700 pt-4">
                            <Link
                                href="/profile"
                                className="text-white hover:text-purple-200 font-medium transition-colors block py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Profile
                            </Link>
                            <Link
                                href="/wishlist"
                                className="text-white hover:text-purple-200 font-medium transition-colors block py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Wishlist
                            </Link>
                            <Link
                                href="/subscriptions"
                                className="text-white hover:text-purple-200 font-medium transition-colors block py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Subscriptions
                            </Link>
                            <button className="text-white hover:text-purple-200 font-medium transition-colors text-left py-2">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar; 