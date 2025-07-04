'use client';

import { getCourses, getDetailedCourse, publishUnpublishCourse, updateCourseThumbnail, updateCourseRating, updateCourse, updateCoursePricing } from "@/app/admin/utils/course";
import { getCategories } from "@/app/admin/utils/category";
import { Course, DetailedCourse } from "@/app/admin/types/courses";
import { Category } from "@/app/admin/types/category";
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useRouter } from "next/navigation";
import { Search, Plus, Edit, DollarSign, Image, Star, Settings, Eye, ChevronLeft, ChevronRight } from "lucide-react";


export default function CoursesPage() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [all, setAll] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);

    // Modals
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [pricingModalOpen, setPricingModalOpen] = useState(false);
    const [thumbnailModalOpen, setThumbnailModalOpen] = useState(false);
    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<DetailedCourse | null>(null);

    // Form states
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [ratingData, setRatingData] = useState({ rating: 0, total_ratings: 0 });
    const [error, setError] = useState<string>('');
    const [pricingData, setPricingData] = useState({
        tobegive: 'individual' as 'individual' | 'corporate' | 'institution',
        pricing: [{ price: 0, assignlimit: 1 }]
    });
    const [editFormData, setEditFormData] = useState({
        title: '',
        description: '',
        category_id: '',
        difficulty_level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
        language: '',
        prerequisites: '',
        what_you_will_learn: [''],
        target_audience: '',
        is_active: true,
        is_published: false,
        timetofinish: 0
    });

    const [pagination, setPagination] = useState<{
        current_page: number;
        total_pages: number;
        total_courses: number;
        has_next: boolean;
        has_prev: boolean;
    }>({
        current_page: 1,
        total_pages: 1,
        total_courses: 0,
        has_next: false,
        has_prev: false,
    });

    useEffect(() => {
        fetchCourses();
        fetchCategories();
    }, [query, all, pagination.current_page]);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const res = await getCourses(query, pagination.current_page, all);
            setCourses(res.courses);
            setPagination(res.pagination);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const cats = await getCategories();
            setCategories(cats);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleEditCourse = async (courseId: string) => {
        try {
            setError('');
            const courseData = await getDetailedCourse(courseId);
            if (courseData) {
                setSelectedCourse(courseData);
                setEditFormData({
                    title: courseData.title,
                    description: courseData.description,
                    category_id: courseData.category.id,
                    difficulty_level: courseData.difficulty_level,
                    language: courseData.language,
                    prerequisites: courseData.prerequisites,
                    what_you_will_learn: courseData.what_you_will_learn,
                    target_audience: courseData.target_audience,
                    is_active: courseData.is_active,
                    is_published: courseData.is_published,
                    timetofinish: courseData.timetofinish || 0
                });
                setEditModalOpen(true);
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
            setError('Failed to load course details');
        }
    };

    const handlePricingUpdate = async (courseId: string) => {
        try {
            const courseData = await getDetailedCourse(courseId);
            if (courseData && courseData.pricing) {
                setSelectedCourse(courseData);
                // Set pricing data based on current course pricing
                if (courseData.pricing.individual) {
                    setPricingData({
                        tobegive: 'individual',
                        pricing: [{
                            price: Number(courseData.pricing.individual.price),
                            assignlimit: courseData.pricing.individual.assignlimit
                        }]
                    });
                } else if (courseData.pricing.corporate?.length) {
                    setPricingData({
                        tobegive: 'corporate',
                        pricing: courseData.pricing.corporate.map(p => ({
                            price: Number(p.price),
                            assignlimit: p.assignLimit
                        }))
                    });
                } else if (courseData.pricing.institution?.length) {
                    setPricingData({
                        tobegive: 'institution',
                        pricing: courseData.pricing.institution.map(p => ({
                            price: Number(p.price),
                            assignlimit: p.assignLimit
                        }))
                    });
                }
                setPricingModalOpen(true);
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };

    const handleThumbnailUpdate = async (courseId: string) => {
        const courseData = await getDetailedCourse(courseId);
        if (courseData) {
            setSelectedCourse(courseData);
            setThumbnailModalOpen(true);
        }
    };

    const handleRatingUpdate = async (courseId: string) => {
        const courseData = await getDetailedCourse(courseId);
        if (courseData) {
            setSelectedCourse(courseData);
            setRatingData({
                rating: courseData.rating || 0,
                total_ratings: courseData.rating_count || 0
            });
            setRatingModalOpen(true);
        }
    };

    const handlePublishToggle = async (courseId: string, currentStatus: boolean) => {
        try {
            await publishUnpublishCourse(courseId, !currentStatus);
            fetchCourses(); // Refresh the list
        } catch (error) {
            console.error('Error toggling publish status:', error);
        }
    };

    const submitThumbnailUpdate = async () => {
        if (selectedCourse && thumbnailFile) {
            try {
                await updateCourseThumbnail(selectedCourse.id, thumbnailFile);
                setThumbnailModalOpen(false);
                setThumbnailFile(null);
                fetchCourses(); // Refresh the list
            } catch (error) {
                console.error('Error updating thumbnail:', error);
            }
        }
    };

    const submitRatingUpdate = async () => {
        if (selectedCourse) {
            try {
                await updateCourseRating({
                    courseId: selectedCourse.id,
                    rating: ratingData.rating,
                    total_ratings: ratingData.total_ratings
                });
                setRatingModalOpen(false);
                fetchCourses(); // Refresh the list
            } catch (error) {
                console.error('Error updating rating:', error);
            }
        }
    };

    const addPricingTier = () => {
        setPricingData(prev => ({
            ...prev,
            pricing: [...prev.pricing, { price: 0, assignlimit: 1 }]
        }));
    };

    const removePricingTier = (index: number) => {
        setPricingData(prev => ({
            ...prev,
            pricing: prev.pricing.filter((_, i) => i !== index)
        }));
    };

    const updatePricingTier = (index: number, field: 'price' | 'assignlimit', value: number) => {
        setPricingData(prev => ({
            ...prev,
            pricing: prev.pricing.map((tier, i) =>
                i === index ? { ...tier, [field]: value } : tier
            )
        }));
    };

    const goToPage = (page: number) => {
        setPagination(prev => ({ ...prev, current_page: page }));
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
                        <p className="text-gray-600 mt-1">Manage your courses, pricing, and content</p>
                    </div>
                    <Button
                        onClick={() => router.push('/admin/courses/create')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Course
                    </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex gap-4 items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search courses..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Show:</span>
                        <Button
                            variant={all ? "default" : "outline"}
                            size="sm"
                            onClick={() => setAll(true)}
                            className={all ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                        >
                            All
                        </Button>
                        <Button
                            variant={!all ? "default" : "outline"}
                            size="sm"
                            onClick={() => setAll(false)}
                            className={!all ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                        >
                            Published
                        </Button>
                    </div>
                </div>

                {error && (
                    <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                        {error}
                        <button
                            onClick={() => setError('')}
                            className="ml-2 text-red-500 hover:text-red-700"
                        >
                            ×
                        </button>
                    </div>
                )}
            </div>

            {/* Course List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <p className="mt-2 text-gray-600">Loading courses...</p>
                    </div>
                ) : courses.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-gray-600">No courses found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {courses.map((course) => (
                            <div key={course.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.is_published
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {course.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>Category: {course.category}</span>
                                            <span>Level: {course.difficulty_level}</span>
                                            <span>Language: {course.language}</span>
                                            <span>Lessons: {course.lessons}</span>
                                            <span>Enrollments: {course.enrollment_count}</span>
                                            {course.rating && (
                                                <span className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                    {course.rating} ({course.rating_count})
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 ml-4">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEditCourse(course.id)}
                                            className="text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handlePricingUpdate(course.id)}
                                            className="text-green-600 border-green-600 hover:bg-green-50"
                                        >
                                            <DollarSign className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleThumbnailUpdate(course.id)}
                                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                        >
                                            <Image className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleRatingUpdate(course.id)}
                                            className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                                        >
                                            <Star className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => alert('Module management coming soon!')}
                                            className="text-purple-600 border-purple-600 hover:bg-purple-50"
                                        >
                                            <Settings className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => router.push(`/course?id=${course.id}`)}
                                            className="text-gray-600 border-gray-600 hover:bg-gray-50"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant={course.is_published ? "outline" : "default"}
                                            onClick={() => handlePublishToggle(course.id, course.is_published || false)}
                                            className={course.is_published
                                                ? "text-red-600 border-red-600 hover:bg-red-50"
                                                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                            }
                                        >
                                            {course.is_published ? 'Unpublish' : 'Publish'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pagination.total_pages > 1 && (
                    <div className="p-6 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Showing page {pagination.current_page} of {pagination.total_pages}
                                ({pagination.total_courses} total courses)
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => goToPage(pagination.current_page - 1)}
                                    disabled={!pagination.has_prev}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => goToPage(pagination.current_page + 1)}
                                    disabled={!pagination.has_next}
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Thumbnail Update Modal */}
            <Modal
                isOpen={thumbnailModalOpen}
                onClose={() => setThumbnailModalOpen(false)}
                title="Update Course Thumbnail"
                className="max-w-md"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select New Thumbnail
                        </label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setThumbnailModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={submitThumbnailUpdate}
                            disabled={!thumbnailFile}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            Update Thumbnail
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Rating Update Modal */}
            <Modal
                isOpen={ratingModalOpen}
                onClose={() => setRatingModalOpen(false)}
                title="Update Course Rating"
                className="max-w-md"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating (0-5)
                        </label>
                        <Input
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            value={ratingData.rating}
                            onChange={(e) => setRatingData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Total Ratings Count
                        </label>
                        <Input
                            type="number"
                            min="0"
                            value={ratingData.total_ratings}
                            onChange={(e) => setRatingData(prev => ({ ...prev, total_ratings: Number(e.target.value) }))}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setRatingModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={submitRatingUpdate}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            Update Rating
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Edit Course Modal */}
            <Modal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                title="Edit Course"
                className="max-w-4xl max-h-[90vh] overflow-y-auto"
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course Title
                            </label>
                            <Input
                                value={editFormData.title}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Enter course title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={editFormData.category_id}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, category_id: e.target.value }))}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Difficulty Level
                            </label>
                            <select
                                value={editFormData.difficulty_level}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, difficulty_level: e.target.value as any }))}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Language
                            </label>
                            <Input
                                value={editFormData.language}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, language: e.target.value }))}
                                placeholder="e.g., English, Spanish"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Time to Finish (hours)
                            </label>
                            <Input
                                type="number"
                                value={editFormData.timetofinish}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, timetofinish: Number(e.target.value) }))}
                                placeholder="Hours to complete"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Target Audience
                            </label>
                            <Input
                                value={editFormData.target_audience}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, target_audience: e.target.value }))}
                                placeholder="Who is this course for?"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course Description
                        </label>
                        <textarea
                            value={editFormData.description}
                            onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows={4}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Detailed course description"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Prerequisites
                        </label>
                        <textarea
                            value={editFormData.prerequisites}
                            onChange={(e) => setEditFormData(prev => ({ ...prev, prerequisites: e.target.value }))}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="What students need to know before taking this course"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            What You Will Learn
                        </label>
                        {editFormData.what_you_will_learn.map((item, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <Input
                                    value={item}
                                    onChange={(e) => {
                                        const newItems = [...editFormData.what_you_will_learn];
                                        newItems[index] = e.target.value;
                                        setEditFormData(prev => ({ ...prev, what_you_will_learn: newItems }));
                                    }}
                                    placeholder="Learning outcome"
                                />
                                {editFormData.what_you_will_learn.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            const newItems = editFormData.what_you_will_learn.filter((_, i) => i !== index);
                                            setEditFormData(prev => ({ ...prev, what_you_will_learn: newItems }));
                                        }}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setEditFormData(prev => ({
                                ...prev,
                                what_you_will_learn: [...prev.what_you_will_learn, '']
                            }))}
                        >
                            Add Learning Outcome
                        </Button>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={editFormData.is_active}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                                className="mr-2"
                            />
                            Active
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={editFormData.is_published}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                                className="mr-2"
                            />
                            Published
                        </label>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={async () => {
                                if (selectedCourse) {
                                    try {
                                        const success = await updateCourse(selectedCourse.id, editFormData);
                                        if (success) {
                                            setEditModalOpen(false);
                                            fetchCourses(); // Refresh the list
                                        } else {
                                            setError('Failed to update course');
                                        }
                                    } catch (error) {
                                        console.error('Error updating course:', error);
                                        setError('An error occurred while updating the course');
                                    }
                                }
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Pricing Update Modal */}
            <Modal
                isOpen={pricingModalOpen}
                onClose={() => setPricingModalOpen(false)}
                title="Update Course Pricing"
                className="max-w-2xl"
            >
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pricing Type
                        </label>
                        <select
                            value={pricingData.tobegive}
                            onChange={(e) => {
                                const newType = e.target.value as 'individual' | 'corporate' | 'institution';
                                setPricingData({
                                    tobegive: newType,
                                    pricing: newType === 'individual'
                                        ? [{ price: 0, assignlimit: 1 }]
                                        : [{ price: 0, assignlimit: 1 }]
                                });
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="individual">Individual</option>
                            <option value="corporate">Corporate</option>
                            <option value="institution">Institution</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pricing Tiers
                        </label>
                        {pricingData.pricing.map((tier, index) => (
                            <div key={index} className="flex gap-2 mb-3 p-3 border border-gray-200 rounded-md">
                                <div className="flex-1">
                                    <label className="block text-xs text-gray-500 mb-1">Price</label>
                                    <Input
                                        type="number"
                                        value={tier.price}
                                        onChange={(e) => updatePricingTier(index, 'price', Number(e.target.value))}
                                        placeholder="Price"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs text-gray-500 mb-1">
                                        {pricingData.tobegive === 'individual' ? 'Assign Limit (1)' : 'Assign Limit'}
                                    </label>
                                    <Input
                                        type="number"
                                        value={tier.assignlimit}
                                        onChange={(e) => updatePricingTier(index, 'assignlimit', Number(e.target.value))}
                                        placeholder="Assign limit"
                                        disabled={pricingData.tobegive === 'individual'}
                                    />
                                </div>
                                {pricingData.tobegive !== 'individual' && pricingData.pricing.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removePricingTier(index)}
                                        className="self-end"
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}

                        {pricingData.tobegive !== 'individual' && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addPricingTier}
                            >
                                Add Pricing Tier
                            </Button>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setPricingModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={async () => {
                                if (selectedCourse) {
                                    try {
                                        const success = await updateCoursePricing(selectedCourse.id, pricingData);
                                        if (success) {
                                            setPricingModalOpen(false);
                                            fetchCourses(); // Refresh the list
                                        } else {
                                            setError('Failed to update pricing');
                                        }
                                    } catch (error) {
                                        console.error('Error updating pricing:', error);
                                        setError('An error occurred while updating pricing');
                                    }
                                }
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            Update Pricing
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
