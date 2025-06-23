import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-xl mb-4">KC Online Education</h3>
                        <p className="text-gray-400 mb-4">
                            Making quality education accessible to everyone, everywhere.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Courses</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">All Courses</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Web Development</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Data Science</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Business</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Design</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><Link href="/terms-and-conditions" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                            <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                            <li><Link href="/refund-policy" className="text-gray-400 hover:text-white">Refund Policy</Link></li>
                            <li>
                                <a href="mailto:support@kceducation.com" className="text-gray-400 hover:text-white flex items-center gap-2">
                                    <Mail size={16} />
                                    <span>support@kceducation.com</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8">
                    <p className="text-center text-gray-400">
                        © {new Date().getFullYear()} KC Online Education. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
