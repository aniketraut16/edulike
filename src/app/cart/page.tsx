"use client";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Globe, Star } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useContent } from "@/context/ContentContext";

export default function CartPage() {
    const { cart, updateCartQuantity, removeCartItem } = useContent();
    const router = useRouter();

    const subtotal = cart.reduce((total, item) => total + (item.coursePrice * item.quantity), 0);
    const total = subtotal;

    const formatPrice = (price: number | string) => {
        const num = typeof price === "number" ? price : parseFloat(price);
        if (isNaN(num)) return "0";
        return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className="min-h-screen bg-slate-50 py-4 sm:py-8 lg:py-12 px-4">
            <Toaster position="top-right" />
            <div className="container mx-auto pt-[8vh] sm:pt-[10vh]">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">YOUR CART</h1>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                    <div className="xl:col-span-2 rounded-lg shadow-sm bg-white p-4 sm:p-6">
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <div key={item.courseId}>
                                    <div className="mb-4">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                            <div className="w-full sm:w-24 h-48 sm:h-24 relative flex-shrink-0">
                                                <img
                                                    src={item.courseImage}
                                                    alt={item.courseName}
                                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                                    className="rounded-md"
                                                />
                                            </div>

                                            <div className="flex-1 w-full sm:w-auto">
                                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg sm:text-xl font-medium leading-tight">{item.courseName}</h3>
                                                        {(item.for === "institution" || item.for === "corporate") && (
                                                            <p
                                                                className="mt-2 p-1 px-2 rounded-full text-xs sm:text-sm font-semibold w-fit"
                                                                style={{
                                                                    background: "linear-gradient(90deg, #F3E6F1 0%, #FDE6F1 100%)",
                                                                    color: "#8D1A5F"
                                                                }}
                                                            >
                                                                For {item.for === "corporate" ? "Corporate" : "Institution"} ({item.assignLimit} Users)
                                                            </p>
                                                        )}
                                                        <div className="text-sm text-gray-500 mt-2">
                                                            <p>Category: {item.courseCategory}</p>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm mt-2">
                                                            <div className="flex items-center">
                                                                <div className="flex mr-2">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star key={i} size={14} className={`${i < Math.floor(4.7) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                                                    ))}
                                                                </div>
                                                                <span className="font-medium">4.7</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <BookOpen size={14} className="mr-1" />
                                                                <span className="font-medium">{item.courseModulesLength} modules</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Clock size={14} className="mr-1" />
                                                                <span className="font-medium">{item.courseTotalDuration} hours</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Globe size={14} className="mr-1" />
                                                                <span className="font-medium">{item.courseLanguage === 'en' ? 'English' : item.courseLanguage}</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-xl font-semibold mt-3">${formatPrice(item.coursePrice)}</p>
                                                    </div>

                                                    <div className="flex flex-row sm:flex-col lg:flex-row items-center justify-between sm:justify-center lg:justify-end gap-4 sm:gap-2 lg:gap-4 mt-4 sm:mt-0">
                                                        <div className="flex items-center gap-3">
                                                            <button
                                                                onClick={() => updateCartQuantity(item.courseId, item.quantity - 1)}
                                                                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                                            >
                                                                −
                                                            </button>
                                                            <span className="min-w-[2rem] text-center font-medium">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateCartQuantity(item.courseId, item.quantity + 1)}
                                                                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => removeCartItem(item.courseId)}
                                                            className="text-red-500 hover:text-red-700 transition-colors p-2"
                                                            aria-label="Remove item"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M3 6h18"></path>
                                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {index !== cart.length - 1 && <hr className="my-6 border-gray-200 border-2 rounded-full" />}
                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                                <p className="text-gray-600">Add some products to get started!</p>
                            </div>
                        )}
                    </div>

                    <div className="xl:col-span-1">
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sticky top-4">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Order Summary</h2>

                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-bold text-base sm:text-lg">Total</span>
                                    <span className="font-bold text-lg sm:text-xl">${formatPrice(total)}</span>
                                </div>

                                <Button
                                    onClick={() => router.push('/checkout')}
                                    className="w-full bg-[#8D1A5F]/90 text-white hover:bg-[#8D1A5F] mt-4 sm:mt-6 py-4 sm:py-6 flex items-center justify-center gap-2 rounded-full text-sm sm:text-base"
                                    disabled={cart.length === 0}
                                >
                                    Go to Checkout
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
