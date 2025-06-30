"use client";
import React, { useState, useEffect } from 'react';
import { CartItem, getCart } from "@/utils/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast, { Toaster } from 'react-hot-toast';
import { useContent } from '@/context/ContentContext';

export default function Checkout() {
    const { cart } = useContent();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: 'male',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        termsAccepted: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData({
                ...formData,
                [name]: checked
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        // Process payment logic here
        toast.success("Processing payment...");
        console.log("Form submitted:", formData);
        console.log("Cart items:", cart);
    };

    // Calculate costs
    const subtotal = cart.reduce((total, item) => total + (item.coursePrice * item.quantity), 0);
    const GST = subtotal * 0.18;
    const total = subtotal + GST;

    const formatPrice = (price: number) => {
        const num = typeof price === "number" ? price : parseFloat(price);
        if (isNaN(num)) return "0";
        return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 py-4 sm:py-8 lg:py-12 px-4">
                <Toaster position="top-right" />
                <div className="container mx-auto pt-[8vh] sm:pt-[10vh]">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <h1 className="text-xl sm:text-2xl font-bold mb-4">Your cart is empty</h1>
                            <p className="text-gray-600 mb-6">Add some courses to proceed with checkout</p>
                            <Button
                                onClick={() => window.location.href = '/courses'}
                                className="bg-[#8D1A5F] hover:bg-[#8D1A5F]/90 text-white px-6 py-3"
                            >
                                Browse Courses
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-4 sm:py-8 lg:py-12 px-4">
            <Toaster position="top-right" />
            <div className="container mx-auto pt-[8vh] sm:pt-[10vh]">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">CHECKOUT</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
                        {/* Left side - Customer details form */}
                        <div className="lg:col-span-3 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Customer Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="John Doe"
                                        className="h-10 sm:h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="john@example.com"
                                        className="h-10 sm:h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="+1 (555) 123-4567"
                                        className="h-10 sm:h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full h-10 sm:h-11 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D1A5F] focus:border-transparent"
                                        required
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                        <option value="prefer_not_to_say">Prefer not to say</option>
                                    </select>
                                </div>
                            </div>

                            <h3 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4">Billing Address</h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="address">Street Address</Label>
                                    <Textarea
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="123 Main Street, Apt 4B"
                                        className="min-h-[80px] resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="New York"
                                            className="h-10 sm:h-11"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="state">State/Province</Label>
                                        <Input
                                            id="state"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="NY"
                                            className="h-10 sm:h-11"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                                        <Input
                                            id="zipCode"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="10001"
                                            className="h-10 sm:h-11"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="country">Country</Label>
                                        <Input
                                            id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="United States"
                                            className="h-10 sm:h-11"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Order summary */}
                        <div className="lg:col-span-2">
                            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sticky top-4">
                                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Order Summary</h2>

                                {/* Course details - Mobile friendly layout */}
                                <div className="mb-6">
                                    {/* Desktop Table View */}
                                    <div className="hidden lg:block overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead className="border-b">
                                                <tr>
                                                    <th className="text-left pb-2 pr-2">Course</th>
                                                    <th className="text-left pb-2 pr-2">Type</th>
                                                    <th className="text-right pb-2 pr-2">Price</th>
                                                    <th className="text-right pb-2 pr-2">Qty</th>
                                                    <th className="text-right pb-2">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y">
                                                {cart.map((item) => (
                                                    <tr key={item.courseId} className="text-xs">
                                                        <td className="py-3 pr-2 font-medium">{item.courseName}</td>
                                                        <td className="py-3 pr-2">
                                                            {item.for === "individual" ? "Individual" :
                                                                item.for === "institution" ? `Institution (${item.assignLimit})` :
                                                                    item.for === "corporate" ? `Corporate (${item.assignLimit})` : item.for}
                                                        </td>
                                                        <td className="py-3 text-right pr-2">${formatPrice(item.coursePrice)}</td>
                                                        <td className="py-3 text-right pr-2">{item.quantity}</td>
                                                        <td className="py-3 text-right font-medium">${formatPrice(item.coursePrice * item.quantity)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile Card View */}
                                    <div className="lg:hidden space-y-4">
                                        {cart.map((item) => (
                                            <div key={item.courseId} className="border rounded-lg p-3 space-y-2">
                                                <div className="font-medium text-sm">{item.courseName}</div>
                                                <div className="flex justify-between text-xs text-gray-600">
                                                    <span>Type:</span>
                                                    <span>
                                                        {item.for === "individual" ? "Individual" :
                                                            item.for === "institution" ? `Institution (${item.assignLimit})` :
                                                                item.for === "corporate" ? `Corporate (${item.assignLimit})` : item.for}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-xs">
                                                    <span>Price:</span>
                                                    <span>${formatPrice(item.coursePrice)}</span>
                                                </div>
                                                <div className="flex justify-between text-xs">
                                                    <span>Quantity:</span>
                                                    <span>{item.quantity}</span>
                                                </div>
                                                <div className="flex justify-between text-sm font-medium border-t pt-2">
                                                    <span>Total:</span>
                                                    <span>${formatPrice(item.coursePrice * item.quantity)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3 border-t pt-4">
                                    <div className="flex justify-between text-sm sm:text-base">
                                        <span>Subtotal</span>
                                        <span className="font-semibold">${formatPrice(subtotal)}</span>
                                    </div>

                                    <div className="flex justify-between text-sm sm:text-base">
                                        <span>GST (18%)</span>
                                        <span>${formatPrice(GST)}</span>
                                    </div>

                                    <div className="border-t pt-4 mt-4">
                                        <div className="flex justify-between">
                                            <span className="font-bold text-base sm:text-lg">Total</span>
                                            <span className="font-bold text-lg sm:text-xl">${formatPrice(total)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="flex items-start">
                                        <input
                                            type="checkbox"
                                            id="termsAccepted"
                                            name="termsAccepted"
                                            checked={formData.termsAccepted}
                                            onChange={handleInputChange}
                                            required
                                            className="mr-3 h-4 w-4 mt-0.5 flex-shrink-0"
                                        />
                                        <label htmlFor="termsAccepted" className="text-xs sm:text-sm leading-relaxed">
                                            I agree to the <a href="/terms-and-conditions" className="text-[#8D1A5F] underline">Terms and Conditions</a>
                                        </label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-[#8D1A5F]/90 text-white hover:bg-[#8D1A5F] py-4 sm:py-6 flex items-center justify-center gap-2 rounded-full text-sm sm:text-base"
                                        disabled={!formData.termsAccepted || cart.length === 0}
                                    >
                                        Pay Now
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
