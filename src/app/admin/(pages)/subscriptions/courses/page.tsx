'use client';

import { getSubscriptionCoursesForAdmin, SimpleCourse, addCourseToSubscription, removeCourseFromSubscription } from '@/app/admin/utils/subscription';
import { getCourses } from '@/app/admin/utils/course';
import { Course } from '@/app/admin/types/courses';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import { FiSearch, FiPlus, FiTrash2, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';

function SubscriptionCoursesManagement() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const subscriptionId = searchParams.get("subscriptionId");

    const [courses, setCourses] = useState<SimpleCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Course[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        if (subscriptionId) {
            loadSubscriptionCourses();
        }
    }, [subscriptionId]);

    const loadSubscriptionCourses = async () => {
        if (!subscriptionId) return;
        setLoading(true);
        try {
            const data = await getSubscriptionCoursesForAdmin(subscriptionId);
            setCourses(data);
        } catch (error) {
            console.error('Error loading courses:', error);
            toast.error('Failed to load courses');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        try {
            const result = await getCourses(searchQuery, 1, true);
            setSearchResults(result.courses);
            if (result.courses.length === 0) {
                toast.error('No courses found for your search');
            }
        } catch (error) {
            console.error('Error searching courses:', error);
            toast.error('Failed to search courses');
        } finally {
            setIsSearching(false);
        }
    };

    const handleAddCourse = async (courseId: string) => {
        if (!subscriptionId) return;
        setActionLoading(courseId);
        try {
            const result = await addCourseToSubscription(subscriptionId, courseId);
            if (result.success) {
                toast.success('Course added successfully!');
                setShowAddForm(false);
                setSearchQuery('');
                setSearchResults([]);
                loadSubscriptionCourses();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error adding course:', error);
            toast.error('Failed to add course');
        } finally {
            setActionLoading(null);
        }
    };

    const handleRemoveCourse = async (courseId: string) => {
        if (!subscriptionId) return;
        if (!confirm('Are you sure you want to remove this course from the subscription?')) return;

        setActionLoading(courseId);
        try {
            const result = await removeCourseFromSubscription(subscriptionId, courseId);
            if (result.success) {
                toast.success('Course removed successfully!');
                loadSubscriptionCourses();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Error removing course:', error);
            toast.error('Failed to remove course');
        } finally {
            setActionLoading(null);
        }
    };

    const handleViewCourse = (courseId: string) => {
        router.push(`/course?id=${courseId}`);
    };

    if (!subscriptionId) {
        return (
            <div className="p-6 bg-red-50 rounded-lg">
                <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
                <p className="text-red-600">No subscription ID provided. Please select a subscription first.</p>
                <button
                    onClick={() => router.push('/admin/subscriptions')}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Back to Subscriptions
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Subscription Courses Management</h1>
                        <p className="text-gray-600 mt-1">Manage courses for subscription ID: {subscriptionId}</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => router.push('/admin/subscriptions')}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Back to Subscriptions
                        </button>
                        <button
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                        >
                            <FiPlus /> Add Course
                        </button>
                    </div>
                </div>

                {/* Add Course Form */}
                {showAddForm && (
                    <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border">
                        <h3 className="text-lg font-semibold mb-4">Add Course to Subscription</h3>

                        <div className="flex gap-3 mb-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                disabled={isSearching || !searchQuery.trim()}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <FiSearch /> {isSearching ? 'Searching...' : 'Search'}
                            </button>
                        </div>

                        {/* Search Results */}
                        {searchResults.length > 0 && (
                            <div className="border border-gray-200 rounded-lg">
                                <div className="bg-gray-50 px-4 py-2 border-b">
                                    <h4 className="font-medium text-gray-900">Search Results ({searchResults.length})</h4>
                                </div>
                                <div className="max-h-60 overflow-y-auto">
                                    {searchResults.map((course) => (
                                        <div key={course.id} className="p-4 border-b border-gray-100 last:border-b-0 flex justify-between items-center hover:bg-gray-50">
                                            <div className="flex-1">
                                                <h5 className="font-medium text-gray-900">{course.title}</h5>
                                                <p className="text-sm text-gray-600">{course.category} • {course.difficulty_level} • {course.language}</p>
                                            </div>
                                            <button
                                                onClick={() => handleAddCourse(course.id)}
                                                disabled={actionLoading === course.id}
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                            >
                                                {actionLoading === course.id ? 'Adding...' : 'Add'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Current Courses */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Current Courses ({courses.length})</h2>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                            <p className="mt-2 text-gray-600">Loading courses...</p>
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-600">No courses found in this subscription.</p>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Add First Course
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {courses.map((course) => (
                                        <tr key={course.course_id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <img
                                                        src={course.courses.thumbnail}
                                                        alt={course.courses.title}
                                                        className="h-12 w-12 rounded-lg object-cover mr-4"
                                                    />
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{course.courses.title}</div>
                                                        <div className="text-sm text-gray-500">ID: {course.courses.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${course.courses.difficulty_level === 'beginner' ? 'bg-green-100 text-green-800' :
                                                    course.courses.difficulty_level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {course.courses.difficulty_level}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {course.courses.language}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {course.courses.total_duration} hours
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleViewCourse(course.courses.id)}
                                                        className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center gap-1"
                                                    >
                                                        <FiEye size={14} /> View
                                                    </button>
                                                    <button
                                                        onClick={() => handleRemoveCourse(course.course_id)}
                                                        disabled={actionLoading === course.course_id}
                                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                                    >
                                                        <FiTrash2 size={14} />
                                                        {actionLoading === course.course_id ? 'Removing...' : 'Remove'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SubscriptionCoursesManagement />
        </Suspense>
    );
}
