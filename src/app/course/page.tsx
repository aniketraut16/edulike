'use client'
import { getOneCourse } from '@/utils/course';
import { addToCart } from '@/utils/cart';
import { DetailCourse } from '@/types/courses';
import { Suspense, useEffect, useState } from 'react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Award, Globe, CheckCircle, ShoppingCart, Star, Bookmark, Users, Play, Tag, BarChart3, Zap, Loader, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { useContent } from '@/context/ContentContext';

type PricingOption = {
    type: 'individual' | 'institution' | 'corporate';
    assignLimit: number;
    price: string;
    displayText: string;
};

function OneCoursePageContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const kcType = searchParams.get("kcType");
    const [course, setCourse] = useState<DetailCourse | null>(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [selectedPricing, setSelectedPricing] = useState<PricingOption | null>(null);
    const [availableOptionsForType, setAvailableOptionsForType] = useState<PricingOption[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const { refreshCart, cartId } = useContent();

    useEffect(() => {
        const fetchCourse = async () => {
            const { success, course } = await getOneCourse(id || '');
            if (success) {
                setCourse(course);
            }
        };
        fetchCourse();
    }, [id]);

    useEffect(() => {
        if (!course) return;

        // Determine the target pricing type (kcType from params or default to individual)
        const targetType = (kcType as 'individual' | 'institution' | 'corporate') || 'individual';

        let selectedType: 'individual' | 'institution' | 'corporate' | null = null;
        let optionsForType: PricingOption[] = [];

        // Try to find the target type first
        if (targetType === 'individual' && course.pricing.individual) {
            selectedType = 'individual';
            optionsForType = [{
                type: 'individual',
                assignLimit: course.pricing.individual.assignlimit,
                price: course.pricing.individual.price,
                displayText: `Individual (${course.pricing.individual.assignlimit} user)`
            }];
        } else if (targetType === 'institution' && course.pricing.institution && course.pricing.institution.length > 0) {
            selectedType = 'institution';
            optionsForType = course.pricing.institution.map(option => ({
                type: 'institution' as const,
                assignLimit: option.assignLimit,
                price: option.price,
                displayText: `Institution (${option.assignLimit} users)`
            }));
        } else if (targetType === 'corporate' && course.pricing.corporate && course.pricing.corporate.length > 0) {
            selectedType = 'corporate';
            optionsForType = course.pricing.corporate.map(option => ({
                type: 'corporate' as const,
                assignLimit: option.assignLimit,
                price: option.price,
                displayText: `Corporate (${option.assignLimit} users)`
            }));
        }

        // If target type is not available, fall back using priority: individual > institution > corporate
        if (!selectedType) {
            if (course.pricing.individual) {
                selectedType = 'individual';
                optionsForType = [{
                    type: 'individual',
                    assignLimit: course.pricing.individual.assignlimit,
                    price: course.pricing.individual.price,
                    displayText: `Individual (${course.pricing.individual.assignlimit} user)`
                }];
            } else if (course.pricing.institution && course.pricing.institution.length > 0) {
                selectedType = 'institution';
                optionsForType = course.pricing.institution.map(option => ({
                    type: 'institution' as const,
                    assignLimit: option.assignLimit,
                    price: option.price,
                    displayText: `Institution (${option.assignLimit} users)`
                }));
            } else if (course.pricing.corporate && course.pricing.corporate.length > 0) {
                selectedType = 'corporate';
                optionsForType = course.pricing.corporate.map(option => ({
                    type: 'corporate' as const,
                    assignLimit: option.assignLimit,
                    price: option.price,
                    displayText: `Corporate (${option.assignLimit} users)`
                }));
            }
        }

        setAvailableOptionsForType(optionsForType);
        // Select the first option as default
        setSelectedPricing(optionsForType[0] || null);
    }, [course, kcType]);

    const handleAddToCart = async () => {
        if (!course || !selectedPricing) return;

        setIsAddingToCart(true);
        try {
            toast.loading("Adding to cart...", { id: 'add-to-cart' });

            const result = await addToCart({
                courseId: course.id,
                quantity: 1,
                accessType: selectedPricing.type,
                cartId: cartId,
            }, cartId);

            if (result.success) {
                toast.success("Course added to cart successfully!", { id: 'add-to-cart' });
                // Refresh cart to update the count
                await refreshCart();
            } else {
                toast.error(result.message || "Failed to add course to cart", { id: 'add-to-cart' });
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add course to cart", { id: 'add-to-cart' });
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleEnrollNow = () => {
        // Implement direct enrollment logic here
        toast.success("Redirecting to enrollment...");
        // You can redirect to checkout or enrollment page
    };

    // Helper function to get course price
    const getCoursePrice = () => {
        return selectedPricing ? parseInt(selectedPricing.price) : 0;
    };

    // Helper function to get original price (assuming 20% discount)
    const getOriginalPrice = () => {
        const currentPrice = getCoursePrice();
        return Math.round(currentPrice / 0.8); // Reverse 20% discount
    };

    // Helper function to format language
    const formatLanguage = (language: string) => {
        return language.charAt(0).toUpperCase() + language.slice(1);
    };

    // Check if dropdown should be shown (multiple options for the same type)
    const shouldShowDropdown = () => {
        return availableOptionsForType.length > 1;
    };

    const handlePricingSelect = (option: PricingOption) => {
        setSelectedPricing(option);
        setShowDropdown(false);
    };

    if (!course) {
        return (
            <div className="bg-white min-h-screen pt-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8D1A5F] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading course details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-16">
            <Toaster position="top-right" />
            {/* Hero Section with Course Banner */}
            <div className="bg-gradient-to-br from-[#8D1A5F] via-[#9D2A6F] to-[#AD3A7F] text-white">
                <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center">
                                        <Tag size={14} className="mr-1.5" />
                                        {course.category.name}
                                    </span>
                                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center">
                                        <BarChart3 size={14} className="mr-1.5" />
                                        {course.difficulty_level.charAt(0).toUpperCase() + course.difficulty_level.slice(1)}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                                    {course.title}
                                </h1>
                            </div>

                            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center">
                                    <div className="flex mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className={`${i < Math.floor(course.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                        ))}
                                    </div>
                                    <span className="font-medium">{course.rating || 0}</span>
                                    <span className="text-white/70 ml-1">({course.rating_count} reviews)</span>
                                </div>
                                <div className="flex items-center">
                                    <BookOpen size={16} className="mr-2" />
                                    <span className="font-medium">{course.modules.length} modules</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock size={16} className="mr-2" />
                                    <span className="font-medium">{course.timetofinish || course.total_duration} hours total</span>
                                </div>
                                <div className="flex items-center">
                                    <Globe size={16} className="mr-2" />
                                    <span className="font-medium">{formatLanguage(course.language)}</span>
                                </div>
                                <div className="flex items-center">
                                    <Users size={16} className="mr-2" />
                                    <span className="font-medium">{course.enrollment_count} enrolled</span>
                                </div>
                            </div>
                        </div>

                        {/* Course Card - Mobile View */}
                        <div className="lg:hidden bg-white rounded-xl shadow-xl p-6 text-gray-800">
                            <div className="mb-6">
                                <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
                                    <img
                                        src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"}
                                        alt={course.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                {/* Pricing Selection Dropdown - for multiple options within same type */}
                                {shouldShowDropdown() && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Plan:</label>
                                        <div className="relative">
                                            <button
                                                onClick={() => setShowDropdown(!showDropdown)}
                                                className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#8D1A5F] focus:border-transparent"
                                            >
                                                <span className="text-sm">{selectedPricing?.displayText}</span>
                                                <ChevronDown size={16} className={`transform transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                                            </button>
                                            {showDropdown && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                                    {availableOptionsForType.map((option, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handlePricingSelect(option)}
                                                            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${selectedPricing?.assignLimit === option.assignLimit
                                                                ? 'bg-[#8D1A5F]/10 text-[#8D1A5F]'
                                                                : 'text-gray-700'
                                                                }`}
                                                        >
                                                            <div className="flex justify-between items-center">
                                                                <span>{option.displayText}</span>
                                                                <span className="font-semibold">₹{parseInt(option.price)}</span>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Show pricing type if not individual and no dropdown */}
                                {selectedPricing && selectedPricing.type !== 'individual' && !shouldShowDropdown() && (
                                    <div className="mb-4">
                                        <div className="bg-[#8D1A5F]/10 text-[#8D1A5F] px-3 py-2 rounded-lg text-sm font-medium">
                                            {selectedPricing.displayText}
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-3xl font-bold bg-gradient-to-r from-[#8D1A5F] to-[#AD3A7F] bg-clip-text text-transparent">₹{getCoursePrice()}</span>
                                    <span className="text-gray-500 line-through">₹{getOriginalPrice()}</span>
                                </div>
                                <div className="text-sm text-emerald-600 font-medium mb-6 flex items-center">
                                    <Zap size={16} className="mr-1.5" />
                                    20% off • Limited time offer!
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        onClick={handleEnrollNow}
                                        className="w-full bg-gradient-to-r from-[#8D1A5F] to-[#AD3A7F] hover:from-[#7A1751] hover:to-[#9A2A6F] text-white font-semibold py-3 rounded-lg shadow-lg shadow-[#8D1A5F]/20 transition-all duration-300"
                                    >
                                        <BookOpen size={18} className="mr-2" />
                                        Enroll Now
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleAddToCart}
                                        disabled={isAddingToCart || !selectedPricing}
                                        className="w-full border-[#8D1A5F] text-[#8D1A5F] font-semibold py-3 rounded-lg hover:bg-[#8D1A5F]/5 transition-all duration-300"
                                    >
                                        <ShoppingCart size={18} className="mr-2" />
                                        {isAddingToCart ? "Adding..." : "Add to Cart"}
                                    </Button>
                                </div>
                            </div>

                            <div className="text-sm space-y-4">
                                <div className="flex items-start">
                                    <BookOpen size={16} className="mr-2.5 mt-0.5 text-[#8D1A5F]" />
                                    <span>Full lifetime access</span>
                                </div>
                                <div className="flex items-start">
                                    <Globe size={16} className="mr-2.5 mt-0.5 text-[#8D1A5F]" />
                                    <span>Access on desktop</span>
                                </div>
                                <div className="flex items-start">
                                    <Award size={16} className="mr-2.5 mt-0.5 text-[#8D1A5F]" />
                                    <span>Certificate of completion</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        {/* What You'll Learn */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-10 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                                <Zap size={24} className="mr-2 text-[#8D1A5F]" />
                                What You'll Learn
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.what_you_will_learn.map((item, index) => (
                                    <div key={index} className="flex items-start bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                                        <CheckCircle size={18} className="mr-3 mt-0.5 text-[#8D1A5F]" />
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Course Description */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-10 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                                <BookOpen size={24} className="mr-2 text-[#8D1A5F]" />
                                Course Description
                            </h2>
                            <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                    {course.description}
                                </p>

                                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800 flex items-center">
                                    <Tag size={20} className="mr-2 text-[#8D1A5F]" />
                                    Prerequisites
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 p-4 rounded-lg border-l-4 border-[#8D1A5F]">
                                    {course.prerequisites || "No prerequisites"}
                                </p>

                                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800 flex items-center">
                                    <Users size={20} className="mr-2 text-[#8D1A5F]" />
                                    Who this course is for
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 p-4 rounded-lg border-l-4 border-[#8D1A5F]">
                                    {course.target_audience}
                                </p>
                            </div>
                        </div>

                        {/* Course Content */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                                <BookOpen size={24} className="mr-2 text-[#8D1A5F]" />
                                Course Content
                            </h2>
                            <div className="text-sm text-gray-500 mb-6 flex items-center">
                                <Bookmark size={16} className="mr-2 text-[#8D1A5F]" />
                                {course.modules.length} modules • {course.timetofinish || course.total_duration} hours total
                            </div>

                            <div className="space-y-4">
                                {course.modules.length > 0 ? (
                                    course.modules.map((module, index) => (
                                        <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#8D1A5F]/30 transition-colors duration-300">
                                            <div className="bg-gray-50 px-5 py-4 flex items-center justify-between">
                                                <div className="font-medium flex items-center">
                                                    <div className="w-8 h-8 rounded-full bg-[#8D1A5F]/10 flex items-center justify-center mr-3 text-[#8D1A5F] font-semibold">
                                                        {index + 1}
                                                    </div>
                                                    {module.title}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center">
                                                    <Clock size={14} className="mr-1.5" />
                                                    25 min
                                                </div>
                                            </div>
                                            <div className="p-5 text-gray-700">
                                                <p className="leading-relaxed">{module.description}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
                                        <p>Course modules will be available soon.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Course Card - Desktop View (Sticky) */}
                    <div className="hidden lg:block">
                        <div className="sticky top-20 bg-white rounded-xl shadow-xl p-6">
                            <div className="mb-6">
                                <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
                                    <img
                                        src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"}
                                        alt={course.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="mb-8">
                                {/* Pricing Selection Dropdown - for multiple options within same type */}
                                {shouldShowDropdown() && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Plan:</label>
                                        <div className="relative">
                                            <button
                                                onClick={() => setShowDropdown(!showDropdown)}
                                                className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#8D1A5F] focus:border-transparent"
                                            >
                                                <span className="text-sm">{selectedPricing?.displayText}</span>
                                                <ChevronDown size={16} className={`transform transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                                            </button>
                                            {showDropdown && (
                                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                                    {availableOptionsForType.map((option, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handlePricingSelect(option)}
                                                            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${selectedPricing?.assignLimit === option.assignLimit
                                                                ? 'bg-[#8D1A5F]/10 text-[#8D1A5F]'
                                                                : 'text-gray-700'
                                                                }`}
                                                        >
                                                            <div className="flex justify-between items-center">
                                                                <span>{option.displayText}</span>
                                                                <span className="font-semibold">₹{parseInt(option.price)}</span>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Show pricing type if not individual and no dropdown */}
                                {selectedPricing && selectedPricing.type !== 'individual' && !shouldShowDropdown() && (
                                    <div className="mb-4">
                                        <div className="bg-[#8D1A5F]/10 text-[#8D1A5F] px-3 py-2 rounded-lg text-sm font-medium">
                                            {selectedPricing.displayText}
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-3xl font-bold bg-gradient-to-r from-[#8D1A5F] to-[#AD3A7F] bg-clip-text text-transparent">₹{getCoursePrice()}</span>
                                    <span className="text-gray-500 line-through">₹{getOriginalPrice()}</span>
                                </div>
                                <div className="text-sm text-emerald-600 font-medium mb-6 flex items-center">
                                    <Zap size={16} className="mr-1.5" />
                                    20% off • Limited time offer!
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        onClick={handleEnrollNow}
                                        className="w-full bg-gradient-to-r from-[#8D1A5F] to-[#AD3A7F] hover:from-[#7A1751] hover:to-[#9A2A6F] text-white font-semibold py-3 rounded-lg shadow-lg shadow-[#8D1A5F]/20 transition-all duration-300"
                                    >
                                        <BookOpen size={18} className="mr-2" />
                                        Enroll Now
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleAddToCart}
                                        disabled={isAddingToCart || !selectedPricing}
                                        className="w-full border-[#8D1A5F] text-[#8D1A5F] font-semibold py-3 rounded-lg hover:bg-[#8D1A5F]/5 transition-all duration-300"
                                    >
                                        <ShoppingCart size={18} className="mr-2" />
                                        {isAddingToCart ? "Adding..." : "Add to Cart"}
                                    </Button>
                                </div>
                            </div>

                            <div className="text-sm space-y-4 border-t border-gray-100 pt-6">
                                <div className="flex items-start">
                                    <BookOpen size={16} className="mr-2.5 mt-0.5 text-[#8D1A5F]" />
                                    <span>Full lifetime access</span>
                                </div>
                                <div className="flex items-start">
                                    <Globe size={16} className="mr-2.5 mt-0.5 text-[#8D1A5F]" />
                                    <span>Access on desktop</span>
                                </div>
                                <div className="flex items-start">
                                    <Award size={16} className="mr-2.5 mt-0.5 text-[#8D1A5F]" />
                                    <span>Certificate of completion</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function OneCoursePage() {

    return (
        <Suspense fallback={<Loader className="animate-spin" />}>
            <OneCoursePageContent />
        </Suspense>
    );
}
