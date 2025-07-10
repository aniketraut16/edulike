"use client"
import CourseCard from '@/components/Courses/CourseCard';
import { Course } from "@/types/courses";
import { getSubscriptionCourses } from '@/utils/subscribe';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, Loader2, GraduationCap, Clock, Users } from 'lucide-react';

function SubscriptionCoursesContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const subscription_id = searchParams.get("subscription_id");
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCourses = async () => {
        if (!subscription_id) {
            setError('No subscription ID provided');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const coursesData = await getSubscriptionCourses(subscription_id);
            setCourses(coursesData);
        } catch (err) {
            setError('Failed to load courses');
            console.error('Error fetching courses:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [subscription_id]);

    const handleGoBack = () => {
        router.back();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-purple-600" />
                    <p className="mt-4 text-gray-600">Loading your courses...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <BookOpen className="mx-auto h-12 w-12 text-red-500" />
                    <p className="mt-4 text-red-600">{error}</p>
                    <button
                        onClick={fetchCourses}
                        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 pt-[15vh]">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    {/* Back Button */}
                    <button
                        onClick={handleGoBack}
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to My Subscriptions
                    </button>

                    {/* Hero Section */}
                    <div
                        className="rounded-xl p-8 text-white mb-8 shadow-lg"
                        style={{
                            background: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)"
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold mb-4">
                                    Available Courses
                                </h1>
                                <p className="text-lg text-purple-100 mb-2">
                                    Courses included in your subscription plan
                                </p>
                                <div className="flex items-center space-x-6 text-purple-100">
                                    <div className="flex items-center">
                                        <BookOpen className="h-5 w-5 mr-2" />
                                        <span>{courses.length} Courses</span>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="bg-white bg-opacity-20 rounded-full p-6">
                                    <GraduationCap className="h-16 w-16 text-[#8D1A5F]" />
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Courses Section */}
                {courses.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 max-w-md mx-auto">
                            <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses available</h3>
                            <p className="text-gray-500 mb-6">
                                There are no courses associated with this subscription plan yet.
                            </p>
                            <button
                                onClick={handleGoBack}
                                className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-colors"
                                style={{
                                    background: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)"
                                }}
                            >
                                <ArrowLeft className="mr-2 h-5 w-5" />
                                Back to Subscriptions
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Section Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Course Library</h2>
                                <p className="text-gray-600">Start learning with these carefully curated courses</p>
                            </div>
                            <div className="text-sm text-gray-500">
                                {courses.length} course{courses.length !== 1 ? 's' : ''} available
                            </div>
                        </div>

                        {/* Courses Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {courses.map((course) => (
                                <div key={course.id} className="transform hover:scale-105 transition-transform duration-200">
                                    <CourseCard item={course} />
                                </div>
                            ))}
                        </div>

                    </>
                )}
            </div>
        </div>
    );
}

export default function SubscriptionCoursesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-purple-600" />
                    <p className="mt-4 text-gray-600">Loading courses...</p>
                </div>
            </div>
        }>
            <SubscriptionCoursesContent />
        </Suspense>
    );
}
