"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaVenusMars } from "react-icons/fa";

type FormData = {
    name: string;
    email: string;
    phone: string;
    profile_image: string;
    dob: string;
    gender: 'male' | 'female' | 'other' | '';
};

export default function CompleteSetup() {
    const { user, dbUser, isLoading, setDBUser, needsCompleteSetup } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        profile_image: '',
        dob: '',
        gender: 'male'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push('/auth');
                return;
            }

            if (dbUser && !needsCompleteSetup) {
                router.push('/');
                return;
            }
        }

        // Pre-fill form with Firebase user data
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.displayName || '',
                email: user.email || ''
            }));
        }
    }, [user, dbUser, isLoading, needsCompleteSetup, router]);

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (!formData.dob) {
            newErrors.dob = 'Date of birth is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await setDBUser({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                profile_image: formData.profile_image || undefined,
                dob: formData.dob,
                gender: formData.gender as 'male' | 'female' | 'other'
            });

            // Redirect to home page after successful setup
            router.push('/');
        } catch (error) {
            console.error('Error completing setup:', error);
            alert('Failed to complete setup. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen relative flex items-center justify-center bg-[#f5f0e8]">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-[#8D1A5F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-lg text-gray-700">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 py-[15vh] bg-[#f5f0e8]">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 z-10 backdrop-blur-sm">
                <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 bg-[#8D1A5F]/10 flex items-center justify-center rounded-full">
                        <FaUser className="text-[#8D1A5F] text-3xl" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Complete Your Profile</h1>
                <p className="text-center text-sm text-gray-600 mb-6">
                    Please fill in your details to complete the setup
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-gray-700 mb-1">Full Name *</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="text-gray-400" />
                            </div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D1A5F] ${errors.name ? 'border-red-500' : ''}`}
                                placeholder="Enter your full name"
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 mb-1">Email *</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                disabled
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed ${errors.email ? 'border-red-500' : ''}`}
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number *</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaPhone className="text-gray-400" />
                            </div>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D1A5F] ${errors.phone ? 'border-red-500' : ''}`}
                                placeholder="Enter your phone number"
                            />
                        </div>
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label htmlFor="dob" className="block text-gray-700 mb-1">Date of Birth *</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaCalendarAlt className="text-gray-400" />
                            </div>
                            <input
                                id="dob"
                                name="dob"
                                type="date"
                                value={formData.dob}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D1A5F] ${errors.dob ? 'border-red-500' : ''}`}
                            />
                        </div>
                        {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                    </div>

                    {/* Gender */}
                    <div>
                        <label htmlFor="gender" className="block text-gray-700 mb-1">Gender *</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaVenusMars className="text-gray-400" />
                            </div>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D1A5F] ${errors.gender ? 'border-red-500' : ''}`}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#8D1A5F] text-white py-3 rounded-md hover:bg-[#4e1c72] transition-colors shadow-md mt-6"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Completing Setup...
                            </span>
                        ) : (
                            "Complete Setup"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
} 