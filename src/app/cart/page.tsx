"use client";
import { CartItem, getCart, removeFromCart, updateCartItemQuantity } from "@/utils/cart";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Globe, Star, Users } from 'lucide-react';

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [promoCode, setPromoCode] = useState("");

    useEffect(() => {
        setCart(getCart());
    }, []);

    const subtotal = cart.reduce((total, item) => total + (item.coursePrice * item.quantity), 0);
    const discount = Math.round(subtotal * 0.2); //
    const GST = subtotal * 0.18;
    const total = subtotal - discount + GST;

    const handleQuantityChange = (courseId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        const updatedCart = updateCartItemQuantity(courseId, newQuantity);
        setCart(updatedCart);
    };

    const handleRemoveItem = (courseId: string) => {
        const updatedCart = removeFromCart(courseId);
        setCart(updatedCart);
    };

    const formatPrice = (price: number) => {
        return price.toFixed(0);
    };

    return (
        <div className="mx-auto py-12 px-4 bg-slate-50">
            <div className="container mx-auto pt-[10vh]">
                <h1 className="text-4xl font-bold mb-8"> YOUR CART</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 rounded-lg shadow-sm bg-white p-6">
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <>
                                    <div key={item.courseId} className="mb-4 ">
                                        <div className="flex items-center gap-6">
                                            <div className="w-24 h-24 relative">
                                                <img
                                                    src={item.courseImage}
                                                    alt={item.courseName}
                                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                                    className="rounded-md"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="text-xl font-medium">{item.courseName}  {(item.for === "individual" || item.for === "institution") && item.assingLimit && <p
                                                    className="ml-2  p-1 px-2 rounded-full text-sm font-semibold w-fit inline"
                                                    style={{
                                                        background: "linear-gradient(90deg, #F3E6F1 0%, #FDE6F1 100%)",
                                                        color: "#8D1A5F"
                                                    }}
                                                >
                                                    For {item.for === "individual" ? "Individual" : "Institution"} ({item.assingLimit})
                                                </p>} </h3>
                                                <div className="text-sm text-gray-500 mt-1">
                                                    <p>Category: {item.courseCategory}</p>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-6 text-sm mt-1">
                                                    <div className="flex items-center">
                                                        <div className="flex mr-2">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} size={16} className={`${i < Math.floor(4.7) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                                            ))}
                                                        </div>
                                                        <span className="font-medium">4.7</span>

                                                    </div>
                                                    <div className="flex items-center">
                                                        <BookOpen size={16} className="mr-2" />
                                                        <span className="font-medium">{item.courseModulesLength} modules</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Clock size={16} className="mr-2" />
                                                        <span className="font-medium">{item.courseTotalDuration} hours total</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Globe size={16} className="mr-2" />
                                                        <span className="font-medium">{item.courseLanguage === 'en' ? 'English' : item.courseLanguage}</span>
                                                    </div>
                                                </div>
                                                <p className="text-xl font-semibold mt-2">${formatPrice(item.coursePrice)}</p>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => handleQuantityChange(item.courseId, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                                                >
                                                    −
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.courseId, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => handleRemoveItem(item.courseId)}
                                                className="text-red-500 ml-4"
                                                aria-label="Remove item"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 6h18"></path>
                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    {index !== cart.length - 1 && <hr className="my-4 border-gray-200 border-2 rounded-full" />}
                                </>
                            ))
                        ) : (
                            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                                <p className="text-gray-600">Add some products to get started!</p>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">${formatPrice(subtotal)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Discount (-20%)</span>
                                    <span className="text-red-500">-${formatPrice(discount)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>GST (18%)</span>
                                    <span>${formatPrice(GST)}</span>
                                </div>

                                <div className="border-t pt-4 mt-4">
                                    <div className="flex justify-between">
                                        <span className="font-bold">Total</span>
                                        <span className="font-bold text-xl">${formatPrice(total)}</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-[#8D1A5F]/90 text-white hover:bg-[#8D1A5F] mt-4 py-6 flex items-center justify-center gap-2 rounded-full">
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
