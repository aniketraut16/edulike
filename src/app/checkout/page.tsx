"use client";
import React, { useState, useEffect } from 'react';
import { CartItem, getCart } from "@/utils/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Checkout() {
    const [cart, setCart] = useState<CartItem[]>([]);
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

    useEffect(() => {
        setCart(getCart());
    }, []);

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
        // Process payment logic here
        console.log("Form submitted:", formData);
        console.log("Cart items:", cart);
    };

    // Calculate costs
    const subtotal = cart.reduce((total, item) => total + (item.coursePrice * item.quantity), 0);
    const discount = Math.round(subtotal * 0.2);
    const GST = subtotal * 0.18;
    const total = subtotal - discount + GST;

    const formatPrice = (price: number) => {
        return price.toFixed(0);
    };

    return (
        <div className="mx-auto py-12 px-4 bg-slate-50">
            <div className="container mx-auto pt-[10vh]">
                <h1 className="text-4xl font-bold mb-8">CHECKOUT</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
                        {/* Left side - Customer details form */}
                        <div className="lg:col-span-4 bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-2xl font-semibold mb-6">Customer Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="John Doe"
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
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                        <option value="prefer_not_to_say">Prefer not to say</option>
                                    </select>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold mt-8 mb-4">Billing Address</h3>

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
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="New York"
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
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Order summary */}
                        <div className="lg:col-span-3">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                                {/* Course details table */}
                                <div className="overflow-x-auto mb-6">
                                    <table className="w-full">
                                        <thead className="border-b">
                                            <tr>
                                                <th className="text-left pb-2 pr-6">Course</th>
                                                <th className="text-left pb-2 pr-6">Type</th>
                                                <th className="text-right pb-2 pr-6">Price</th>
                                                <th className="text-right pb-2 pr-6">Qty</th>
                                                <th className="text-right pb-2">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {cart.map((item) => (
                                                <tr key={item.courseId} className="text-sm">
                                                    <td className="py-3 pr-6">{item.courseName}</td>
                                                    <td className="py-3 pr-6">
                                                        {item.for === "individual" ? "Individual" :
                                                            item.for === "institution" ? `Institution (${item.assingLimit})` :
                                                                item.for === "corporate" ? `Corporate (${item.assingLimit})` : item.for}
                                                    </td>
                                                    <td className="py-3 text-right pr-6">${formatPrice(item.coursePrice)}</td>
                                                    <td className="py-3 text-right pr-6">{item.quantity}</td>
                                                    <td className="py-3 text-right">${formatPrice(item.coursePrice * item.quantity)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="space-y-3 border-t pt-4">
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
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="termsAccepted"
                                            name="termsAccepted"
                                            checked={formData.termsAccepted}
                                            onChange={handleInputChange}
                                            required
                                            className="mr-2 h-4 w-4"
                                        />
                                        <label htmlFor="termsAccepted" className="text-sm">
                                            I agree to the <a href="/terms-and-conditions" className="text-[#8D1A5F] underline">Terms and Conditions</a>
                                        </label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-[#8D1A5F]/90 text-white hover:bg-[#8D1A5F] py-6 flex items-center justify-center gap-2 rounded-full"
                                        disabled={!formData.termsAccepted}
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
