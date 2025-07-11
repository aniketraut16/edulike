"use client";
import { useAuth } from '@/context/AuthContext';
import { useContent } from '@/context/ContentContext';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {

    const { isAdmin } = useAuth();
    const { navbarCourses } = useContent();
    const pathname = usePathname();
    const isAdminPage = pathname.includes("/admin");

    if (isAdmin && isAdminPage) {
        return null;
    }
    return (
        <footer className="bg-gray-900 text-white py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
                    {/* Company Info */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4">KC Online Education</h3>
                        <p className="text-gray-400 text-sm md:text-base mb-3 md:mb-4">
                            Making quality education accessible to everyone, everywhere.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook size={18} className="md:w-5 md:h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter size={18} className="md:w-5 md:h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={18} className="md:w-5 md:h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin size={18} className="md:w-5 md:h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Youtube size={18} className="md:w-5 md:h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Courses Categories */}
                    <div>
                        <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4">Courses</h4>
                        <ul className="space-y-1.5 md:space-y-2">
                            <li>
                                <Link href="/courses" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors">
                                    All Courses
                                </Link>
                            </li>
                            {navbarCourses.slice(0, 5).map((category, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={`/courses?categories=${category.category_id}`}
                                        className="text-gray-400 hover:text-white text-sm md:text-base transition-colors"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                            {navbarCourses.length > 5 && (
                                <li>
                                    <Link href="/courses" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors">
                                        View More...
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4">Company</h4>
                        <ul className="space-y-1.5 md:space-y-2">
                            <li><Link href="/aboutus" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors">About Us</Link></li>
                            <li><Link href="/blogs" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4">Support</h4>
                        <ul className="space-y-1.5 md:space-y-2">
                            <li><Link href="/terms-and-conditions" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/refund-policy" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors">Refund Policy</Link></li>
                            <li>
                                <a href="mailto:support@kceducation.com" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors flex items-center gap-2">
                                    <Mail size={14} className="md:w-4 md:h-4" />
                                    <span>support@kceducation.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 pt-6 md:pt-8">
                    <p className="text-center text-gray-400 text-sm md:text-base">
                        © {new Date().getFullYear()} KC Online Education. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
