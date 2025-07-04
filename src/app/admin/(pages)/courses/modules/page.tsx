"use client"
import { Module, ModuleArgs } from '@/app/admin/types/modules';
import { getModules, createModule, updateModule, deleteModule } from '@/app/admin/utils/modules';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Loader, Plus, Edit, Trash2, Settings, Clock, ToggleLeft, ToggleRight } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function ModulesManagement() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const courseId = searchParams.get("courseId");
    const courseName = searchParams.get("courseName");

    const [modules, setModules] = useState<Module[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Modal states
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);

    // Form states
    const [createFormData, setCreateFormData] = useState<ModuleArgs>({
        course_id: courseId || '',
        title: '',
        description: '',
        order_index: 0,
        is_active: true,
        timetofinish: 0
    });

    const [editFormData, setEditFormData] = useState<ModuleArgs>({
        course_id: courseId || '',
        title: '',
        description: '',
        order_index: 0,
        is_active: true,
        timetofinish: 0
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!courseId) {
            toast.error("Course ID is required");
            return;
        }
        fetchModules();
    }, [courseId]);

    const fetchModules = async () => {
        if (!courseId) return;

        setIsLoading(true);
        try {
            const modulesData = await getModules(courseId);
            setModules(modulesData);
            setError(null);
        } catch (error) {
            console.error('Error fetching modules:', error);
            setError("Failed to fetch modules");
            toast.error("Failed to fetch modules");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateModule = async () => {
        if (!createFormData.title.trim()) {
            toast.error("Title is required");
            return;
        }

        setIsSubmitting(true);
        try {
            // Set order_index to be one more than the highest existing order_index
            const maxOrderIndex = modules.length > 0 ? Math.max(...modules.map(m => m.order_index)) : 0;
            const moduleData = { ...createFormData, order_index: maxOrderIndex + 1 };

            const success = await createModule(moduleData);
            if (success) {
                toast.success("Module created successfully");
                setCreateModalOpen(false);
                setCreateFormData({
                    course_id: courseId || '',
                    title: '',
                    description: '',
                    order_index: 0,
                    is_active: true,
                    timetofinish: 0
                });
                fetchModules();
            } else {
                toast.error("Failed to create module");
            }
        } catch (error) {
            console.error('Error creating module:', error);
            toast.error("An error occurred while creating the module");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditModule = (module: Module) => {
        setSelectedModule(module);
        setEditFormData({
            course_id: module.course_id,
            title: module.title,
            description: module.description,
            order_index: module.order_index,
            is_active: module.is_active,
            timetofinish: module.timetofinish
        });
        setEditModalOpen(true);
    };

    const handleUpdateModule = async () => {
        if (!selectedModule || !editFormData.title.trim()) {
            toast.error("Title is required");
            return;
        }

        setIsSubmitting(true);
        try {
            const success = await updateModule(selectedModule.id, editFormData);
            if (success) {
                toast.success("Module updated successfully");
                setEditModalOpen(false);
                setSelectedModule(null);
                fetchModules();
            } else {
                toast.error("Failed to update module");
            }
        } catch (error) {
            console.error('Error updating module:', error);
            toast.error("An error occurred while updating the module");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteModule = (module: Module) => {
        setSelectedModule(module);
        setDeleteModalOpen(true);
    };

    const confirmDeleteModule = async () => {
        if (!selectedModule) return;

        setIsSubmitting(true);
        try {
            const success = await deleteModule(selectedModule.id);
            if (success) {
                toast.success("Module deleted successfully");
                setDeleteModalOpen(false);
                setSelectedModule(null);
                fetchModules();
            } else {
                toast.error("Failed to delete module");
            }
        } catch (error) {
            console.error('Error deleting module:', error);
            toast.error("An error occurred while deleting the module");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleManageMaterial = (module: Module) => {
        toast.success(`Material management for "${module.title}" coming soon!`, {
            duration: 3000,
            icon: '📚'
        });
    };

    const formatDuration = (minutes: number) => {
        if (minutes < 60) {
            return `${minutes}min`;
        }
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
    };

    if (!courseId) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <p className="text-red-600 text-lg">Course ID is required</p>
                    <Button
                        onClick={() => router.back()}
                        className="mt-4 bg-indigo-600 hover:bg-indigo-700"
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.back()}
                                className="text-gray-600"
                            >
                                ← Back to Courses
                            </Button>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Module Management</h1>
                        <p className="text-gray-600 mt-1">
                            Manage modules for {courseName ? `"${courseName}"` : 'this course'}
                        </p>
                    </div>
                    <Button
                        onClick={() => setCreateModalOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Module
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-indigo-600">{modules.length}</p>
                        <p className="text-sm text-gray-600">Total Modules</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                            {modules.filter(m => m.is_active).length}
                        </p>
                        <p className="text-sm text-gray-600">Active Modules</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                            {modules.reduce((total, module) => total + module.timetofinish, 0)} min
                        </p>
                        <p className="text-sm text-gray-600">Total Duration</p>
                    </div>
                </div>
            </div>

            {/* Module Cards */}
            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <p className="ml-3 text-gray-600">Loading modules...</p>
                </div>
            ) : error ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <p className="text-red-600 text-lg">{error}</p>
                    <Button
                        onClick={fetchModules}
                        className="mt-4 bg-indigo-600 hover:bg-indigo-700"
                    >
                        Retry
                    </Button>
                </div>
            ) : modules.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <p className="text-gray-600 text-lg">No modules found</p>
                    <p className="text-gray-500 mt-2">Create your first module to get started</p>
                    <Button
                        onClick={() => setCreateModalOpen(true)}
                        className="mt-4 bg-indigo-600 hover:bg-indigo-700"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Module
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules
                        .sort((a, b) => a.order_index - b.order_index)
                        .map((module, index) => (
                            <div key={module.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                {/* Module Header */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full">
                                                #{module.order_index}
                                            </span>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${module.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {module.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {module.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {module.description}
                                    </p>

                                    {/* Module Details */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Duration:</span>
                                            <span className="text-gray-700 font-medium flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {formatDuration(module.timetofinish)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="border-t border-gray-200 p-4 bg-gray-50">
                                    <div className="grid grid-cols-3 gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => handleManageMaterial(module)}
                                            className="bg-purple-600 hover:bg-purple-700 text-white"
                                            title="Manage Material"
                                        >
                                            <Settings className="w-4 h-4 mr-1" />
                                            Material
                                        </Button>

                                        <Button
                                            size="sm"
                                            onClick={() => handleEditModule(module)}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                            title="Update Module"
                                        >
                                            <Edit className="w-4 h-4 mr-1" />
                                            Update
                                        </Button>

                                        <Button
                                            size="sm"
                                            onClick={() => handleDeleteModule(module)}
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                            title="Delete Module"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}

            {/* Create Module Modal */}
            <Modal
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                title="Create New Module"
                className="max-w-2xl"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Module Title *
                        </label>
                        <Input
                            value={createFormData.title}
                            onChange={(e) => setCreateFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter module title"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={createFormData.description}
                            onChange={(e) => setCreateFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter module description"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                            rows={4}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration (minutes)
                        </label>
                        <Input
                            type="number"
                            min="0"
                            value={createFormData.timetofinish}
                            onChange={(e) => setCreateFormData(prev => ({ ...prev, timetofinish: Number(e.target.value) }))}
                            placeholder="Enter duration in minutes"
                            className="w-full"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700">
                            Active Status
                        </label>
                        <button
                            type="button"
                            onClick={() => setCreateFormData(prev => ({ ...prev, is_active: !prev.is_active }))}
                            className="flex items-center gap-2"
                        >
                            {createFormData.is_active ? (
                                <ToggleRight className="w-6 h-6 text-green-600" />
                            ) : (
                                <ToggleLeft className="w-6 h-6 text-gray-400" />
                            )}
                            <span className={createFormData.is_active ? "text-green-600" : "text-gray-500"}>
                                {createFormData.is_active ? "Active" : "Inactive"}
                            </span>
                        </button>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateModule}
                            disabled={isSubmitting || !createFormData.title.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            {isSubmitting ? "Creating..." : "Create Module"}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Edit Module Modal */}
            <Modal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                title="Update Module"
                className="max-w-2xl"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Module Title *
                        </label>
                        <Input
                            value={editFormData.title}
                            onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter module title"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={editFormData.description}
                            onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter module description"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                            rows={4}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Order Index
                            </label>
                            <Input
                                type="number"
                                min="1"
                                value={editFormData.order_index}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, order_index: Number(e.target.value) }))}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duration (minutes)
                            </label>
                            <Input
                                type="number"
                                min="0"
                                value={editFormData.timetofinish}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, timetofinish: Number(e.target.value) }))}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700">
                            Active Status
                        </label>
                        <button
                            type="button"
                            onClick={() => setEditFormData(prev => ({ ...prev, is_active: !prev.is_active }))}
                            className="flex items-center gap-2"
                        >
                            {editFormData.is_active ? (
                                <ToggleRight className="w-6 h-6 text-green-600" />
                            ) : (
                                <ToggleLeft className="w-6 h-6 text-gray-400" />
                            )}
                            <span className={editFormData.is_active ? "text-green-600" : "text-gray-500"}>
                                {editFormData.is_active ? "Active" : "Inactive"}
                            </span>
                        </button>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdateModule}
                            disabled={isSubmitting || !editFormData.title.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            {isSubmitting ? "Updating..." : "Update Module"}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete Module"
                className="max-w-md"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to delete the module "{selectedModule?.title}"?
                        This action cannot be undone.
                    </p>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmDeleteModule}
                            disabled={isSubmitting}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isSubmitting ? "Deleting..." : "Delete Module"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default function ModulesPage() {
    return (
        <Suspense fallback={
            <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
                <Loader className="animate-spin w-8 h-8 text-indigo-600" />
            </div>
        }>
            <ModulesManagement />
        </Suspense>
    );
}
