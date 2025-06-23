'use client'
import { DetailCourse, getOneCourse } from '@/utils/coursemanagement';
import { Suspense } from 'react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Award, Globe, CheckCircle, ShoppingCart, Star, Bookmark, Users, Play, Tag, BarChart3, Zap, Loader } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function OneCoursePageContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const course: DetailCourse = getOneCourse(id || '');
    return (
        <div className="bg-white min-h-screen pt-16">
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
                                        {course.difficultyLevel}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                                    {course.title}
                                </h1>
                            </div>

                            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                                {course.shortDescription}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm">
                                <div className="flex items-center">
                                    <div className="flex mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className={`${i < Math.floor(4.7) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                        ))}
                                    </div>
                                    <span className="font-medium">4.7</span>
                                    <span className="text-white/70 ml-1">(243 reviews)</span>
                                </div>
                                <div className="flex items-center">
                                    <BookOpen size={16} className="mr-2" />
                                    <span className="font-medium">{course.modules.length} modules</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock size={16} className="mr-2" />
                                    <span className="font-medium">{course.totalDuration} hours total</span>
                                </div>
                                <div className="flex items-center">
                                    <Globe size={16} className="mr-2" />
                                    <span className="font-medium">{course.language === 'en' ? 'English' : course.language}</span>
                                </div>
                                <div className="flex items-center">
                                    <Users size={16} className="mr-2" />
                                    <span className="font-medium">3,245 enrolled</span>
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
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-3xl font-bold bg-gradient-to-r from-[#8D1A5F] to-[#AD3A7F] bg-clip-text text-transparent">₹1,499</span>
                                    <span className="text-gray-500 line-through">₹2,999</span>
                                </div>
                                <div className="text-sm text-emerald-600 font-medium mb-6 flex items-center">
                                    <Zap size={16} className="mr-1.5" />
                                    50% off • 2 days left at this price!
                                </div>

                                <div className="space-y-3">
                                    <Button className="w-full bg-gradient-to-r from-[#8D1A5F] to-[#AD3A7F] hover:from-[#7A1751] hover:to-[#9A2A6F] text-white font-semibold py-3 rounded-lg shadow-lg shadow-[#8D1A5F]/20 transition-all duration-300">
                                        <BookOpen size={18} className="mr-2" />
                                        Enroll Now
                                    </Button>
                                    <Button variant="outline" className="w-full border-[#8D1A5F] text-[#8D1A5F] font-semibold py-3 rounded-lg hover:bg-[#8D1A5F]/5 transition-all duration-300">
                                        <ShoppingCart size={18} className="mr-2" />
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>

                            <div className="text-sm space-y-4">
                                <p className="font-medium text-center">This course includes:</p>
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
                                {course.whatYouWillLearn.map((item, index) => (
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
                                    {course.prerequisites}
                                </p>

                                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800 flex items-center">
                                    <Users size={20} className="mr-2 text-[#8D1A5F]" />
                                    Who this course is for
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 p-4 rounded-lg border-l-4 border-[#8D1A5F]">
                                    {course.targetAudience}
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
                                {course.modules.length} modules • {course.totalDuration} hours total
                            </div>

                            <div className="space-y-4">
                                {course.modules.map((module, index) => (
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
                                ))}
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
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-3xl font-bold bg-gradient-to-r from-[#8D1A5F] to-[#AD3A7F] bg-clip-text text-transparent">₹1,499</span>
                                    <span className="text-gray-500 line-through">₹2,999</span>
                                </div>
                                <div className="text-sm text-emerald-600 font-medium mb-6 flex items-center">
                                    <Zap size={16} className="mr-1.5" />
                                    50% off • 2 days left at this price!
                                </div>

                                <div className="space-y-3">
                                    <Button className="w-full bg-gradient-to-r from-[#8D1A5F] to-[#AD3A7F] hover:from-[#7A1751] hover:to-[#9A2A6F] text-white font-semibold py-3 rounded-lg shadow-lg shadow-[#8D1A5F]/20 transition-all duration-300">
                                        <BookOpen size={18} className="mr-2" />
                                        Enroll Now
                                    </Button>
                                    <Button variant="outline" className="w-full border-[#8D1A5F] text-[#8D1A5F] font-semibold py-3 rounded-lg hover:bg-[#8D1A5F]/5 transition-all duration-300">
                                        <ShoppingCart size={18} className="mr-2" />
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>

                            <div className="text-sm space-y-4 border-t border-gray-100 pt-6">
                                <p className="font-medium text-center mb-2">This course includes:</p>
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
                                <div className="flex items-start">
                                    <Users size={16} className="mr-2.5 mt-0.5 text-[#8D1A5F]" />
                                    <span>3,245 students enrolled</span>
                                </div>
                                <div className="flex items-start">
                                    <Clock size={16} className="mr-2.5 mt-0.5 text-[#8D1A5F]" />
                                    <span>Last updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
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
