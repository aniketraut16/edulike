'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCourse } from "@/app/admin/utils/course";
import { getCategories } from "@/app/admin/utils/category";
import { Category } from "@/app/admin/types/category";
import { CourseArgs, CoursePriceArgs } from "@/app/admin/types/courses";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

export default function CreateCoursePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    const [courseData, setCourseData] = useState<CourseArgs>({
        title: '',
        description: '',
        category_id: '',
        difficulty_level: 'beginner',
        language: '',
        prerequisites: '',
        what_you_will_learn: [''],
        target_audience: '',
        is_active: true,
        is_published: false,
        timetofinish: 0
    });

    const [pricingData, setPricingData] = useState<CoursePriceArgs>({
        tobegive: 'individual',
        pricing: [{ price: 0, assignlimit: 1 }]
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const cats = await getCategories();
            setCategories(cats);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to load categories');
        }
    };

    const handleCourseChange = (field: keyof CourseArgs, value: any) => {
        setCourseData(prev => ({ ...prev, [field]: value }));
    };

    const handleLearningOutcomeChange = (index: number, value: string) => {
        const newOutcomes = [...courseData.what_you_will_learn];
        newOutcomes[index] = value;
        setCourseData(prev => ({ ...prev, what_you_will_learn: newOutcomes }));
    };

    const addLearningOutcome = () => {
        setCourseData(prev => ({
            ...prev,
            what_you_will_learn: [...prev.what_you_will_learn, '']
        }));
    };

    const removeLearningOutcome = (index: number) => {
        if (courseData.what_you_will_learn.length > 1) {
            const newOutcomes = courseData.what_you_will_learn.filter((_, i) => i !== index);
            setCourseData(prev => ({ ...prev, what_you_will_learn: newOutcomes }));
        }
    };

    const handlePricingTypeChange = (type: 'individual' | 'corporate' | 'institution') => {
        setPricingData({
            tobegive: type,
            pricing: type === 'individual'
                ? [{ price: 0, assignlimit: 1 }]
                : [{ price: 0, assignlimit: 1 }]
        });
    };

    const updatePricingTier = (index: number, field: 'price' | 'assignlimit', value: number) => {
        const newPricing = [...pricingData.pricing];
        newPricing[index] = { ...newPricing[index], [field]: value };
        setPricingData(prev => ({ ...prev, pricing: newPricing }));
    };

    const addPricingTier = () => {
        if (pricingData.tobegive !== 'individual') {
            setPricingData(prev => ({
                ...prev,
                pricing: [...prev.pricing, { price: 0, assignlimit: 1 }]
            }));
        }
    };

    const removePricingTier = (index: number) => {
        if (pricingData.pricing.length > 1) {
            const newPricing = pricingData.pricing.filter((_, i) => i !== index);
            setPricingData(prev => ({ ...prev, pricing: newPricing }));
        }
    };

    const validateForm = (): boolean => {
        if (!courseData.title.trim()) {
            toast.error('Course title is required');
            return false;
        }
        if (!courseData.description.trim()) {
            toast.error('Course description is required');
            return false;
        }
        if (!courseData.category_id) {
            toast.error('Please select a category');
            return false;
        }
        if (!courseData.language.trim()) {
            toast.error('Language is required');
            return false;
        }
        if (!courseData.target_audience.trim()) {
            toast.error('Target audience is required');
            return false;
        }
        if (courseData.what_you_will_learn.some(item => !item.trim())) {
            toast.error('All learning outcomes must be filled or removed');
            return false;
        }
        if (pricingData.pricing.some(tier => tier.price <= 0)) {
            toast.error('All pricing tiers must have a valid price');
            return false;
        }
        if (pricingData.pricing.some(tier => tier.assignlimit <= 0)) {
            toast.error('All pricing tiers must have a valid assign limit');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const success = await createCourse({
                course: courseData,
                pricing: pricingData
            });

            if (success) {
                toast.success('Course created successfully!');
                router.push('/admin/courses');
            } else {
                toast.error('Failed to create course. Please try again.');
            }
        } catch (err) {
            console.error('Error creating course:', err);
            toast.error('An error occurred while creating the course.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <Button
                        variant="outline"
                        onClick={() => router.back()}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
                        <p className="text-gray-600 mt-1">Fill in the details to create a new course</p>
                    </div>
                </div>


            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Basic Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Course Title *
                            </label>
                            <Input
                                value={courseData.title}
                                onChange={(e) => handleCourseChange('title', e.target.value)}
                                placeholder="Enter course title"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                value={courseData.category_id}
                                onChange={(e) => handleCourseChange('category_id', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Difficulty Level *
                            </label>
                            <select
                                value={courseData.difficulty_level}
                                onChange={(e) => handleCourseChange('difficulty_level', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Language *
                            </label>
                            <Input
                                value={courseData.language}
                                onChange={(e) => handleCourseChange('language', e.target.value)}
                                placeholder="e.g., English, Spanish, French"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Time to Finish (hours)
                            </label>
                            <Input
                                type="number"
                                min="0"
                                value={courseData.timetofinish}
                                onChange={(e) => handleCourseChange('timetofinish', Number(e.target.value))}
                                placeholder="Estimated hours to complete"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Target Audience *
                            </label>
                            <Input
                                value={courseData.target_audience}
                                onChange={(e) => handleCourseChange('target_audience', e.target.value)}
                                placeholder="Who is this course designed for?"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course Description *
                        </label>
                        <textarea
                            value={courseData.description}
                            onChange={(e) => handleCourseChange('description', e.target.value)}
                            rows={4}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Provide a detailed description of the course content and objectives"
                            required
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Prerequisites
                        </label>
                        <textarea
                            value={courseData.prerequisites}
                            onChange={(e) => handleCourseChange('prerequisites', e.target.value)}
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="What should students know before taking this course?"
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            What You Will Learn *
                        </label>
                        {courseData.what_you_will_learn.map((outcome, index) => (
                            <div key={index} className="flex gap-2 mb-3">
                                <Input
                                    value={outcome}
                                    onChange={(e) => handleLearningOutcomeChange(index, e.target.value)}
                                    placeholder="Learning outcome or skill"
                                    className="flex-1"
                                />
                                {courseData.what_you_will_learn.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeLearningOutcome(index)}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addLearningOutcome}
                            className="flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Learning Outcome
                        </Button>
                    </div>

                    <div className="mt-6 flex items-center gap-6">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={courseData.is_active}
                                onChange={(e) => handleCourseChange('is_active', e.target.checked)}
                                className="mr-2 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm text-gray-700">Active</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={courseData.is_published}
                                onChange={(e) => handleCourseChange('is_published', e.target.checked)}
                                className="mr-2 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="text-sm text-gray-700">Published</span>
                        </label>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing Configuration</h2>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pricing Type *
                        </label>
                        <select
                            value={pricingData.tobegive}
                            onChange={(e) => handlePricingTypeChange(e.target.value as any)}
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
                            <div key={index} className="flex gap-4 mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Price (USD) *
                                    </label>
                                    <Input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={tier.price}
                                        onChange={(e) => updatePricingTier(index, 'price', Number(e.target.value))}
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        {pricingData.tobegive === 'individual' ? 'Assign Limit (Fixed: 1)' : 'Assign Limit *'}
                                    </label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={tier.assignlimit}
                                        onChange={(e) => updatePricingTier(index, 'assignlimit', Number(e.target.value))}
                                        placeholder="Number of assignments"
                                        disabled={pricingData.tobegive === 'individual'}
                                        required
                                    />
                                </div>
                                {pricingData.tobegive !== 'individual' && pricingData.pricing.length > 1 && (
                                    <div className="flex items-end">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removePricingTier(index)}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}

                        {pricingData.tobegive !== 'individual' && (
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addPricingTier}
                                className="flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Pricing Tier
                            </Button>
                        )}
                    </div>

                    {pricingData.tobegive === 'individual' && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                            <p className="text-sm text-blue-700">
                                <strong>Individual Pricing:</strong> This pricing type is for individual users with a fixed assign limit of 1.
                            </p>
                        </div>
                    )}

                    {pricingData.tobegive !== 'individual' && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-sm text-green-700">
                                <strong>{pricingData.tobegive === 'corporate' ? 'Corporate' : 'Institution'} Pricing:</strong>
                                You can create multiple pricing tiers with different assign limits. This allows for flexible pricing based on the number of licenses needed.
                            </p>
                        </div>
                    )}
                </div>

                {/* Submit Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Creating Course...
                                </>
                            ) : (
                                'Create Course'
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}