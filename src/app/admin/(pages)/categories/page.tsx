"use client";

import React from "react";
import { getCategories, createCategory, updateCategory, deactiveCategory } from "@/app/admin/utils/category";
import { useEffect, useState } from "react";
import { Category, CategoryArgs } from "@/app/admin/types/category";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Search, Plus, Edit2, Trash2, ToggleLeft, ToggleRight, FolderOpen, Users } from "lucide-react";

interface CategoryFormProps {
    onSubmit: (e: React.FormEvent) => void;
    title: string;
    formData: CategoryArgs;
    setFormData: React.Dispatch<React.SetStateAction<CategoryArgs>>;
    closeModals: () => void;
}

const CategoryForm = React.memo(({ onSubmit, title, formData, setFormData, closeModals }: CategoryFormProps) => (
    <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
            <Label htmlFor="name">Category Name *</Label>
            <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter category name"
                required
            />
        </div>
        <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter category description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={4}
            />
        </div>
        <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={closeModals} className="bg-red-500 hover:bg-red-600 text-white">
                Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                {title.includes("Create") ? "Create Category" : "Update Category"}
            </Button>
        </div>
    </form>
));

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState<CategoryArgs>({
        name: "",
        description: "",
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCategories(filtered);
    }, [categories, searchQuery]);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            toast.error("Failed to fetch categories");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateCategory = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error("Category name is required");
            return;
        }

        try {
            const success = await createCategory(formData);
            if (success) {
                toast.success("Category created successfully");
                setIsCreateModalOpen(false);
                setFormData({ name: "", description: "" });
                fetchCategories();
            } else {
                toast.error("Failed to create category");
            }
        } catch (error) {
            toast.error("Failed to create category");
        }
    };

    const handleEditCategory = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingCategory || !formData.name.trim()) {
            toast.error("Category name is required");
            return;
        }

        try {
            const success = await updateCategory(editingCategory.id, formData);
            if (success) {
                toast.success("Category updated successfully");
                setIsEditModalOpen(false);
                setEditingCategory(null);
                setFormData({ name: "", description: "" });
                fetchCategories();
            } else {
                toast.error("Failed to update category");
            }
        } catch (error) {
            toast.error("Failed to update category");
        }
    };

    const handleDeactivateCategory = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to deactivate the category "${name}"?`)) {
            return;
        }

        try {
            const success = await deactiveCategory(id);
            if (success) {
                toast.success("Category deactivated successfully");
                fetchCategories();
            } else {
                toast.error("Failed to deactivate category");
            }
        } catch (error) {
            toast.error("Failed to deactivate category");
        }
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            description: category.description,
        });
        setIsEditModalOpen(true);
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        setEditingCategory(null);
        setFormData({ name: "", description: "" });
    };



    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Category Management</h1>
                <p className="text-gray-600">Manage your course categories, organize content, and track usage.</p>
            </div>

            {/* Search and Create Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <Input
                            type="text"
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        <Plus size={20} />
                        Create Category
                    </Button>
                </div>
            </div>

            {/* Categories List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <FolderOpen size={20} className="text-indigo-600" />
                        Categories ({filteredCategories.length})
                    </h2>
                </div>

                {isLoading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-2 text-gray-500">Loading categories...</p>
                    </div>
                ) : filteredCategories.length === 0 ? (
                    <div className="p-8 text-center">
                        <FolderOpen size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg mb-2">
                            {searchQuery ? "No categories found" : "No categories yet"}
                        </p>
                        <p className="text-gray-400 text-sm">
                            {searchQuery ? "Try adjusting your search terms" : "Create your first category to get started"}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Courses
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredCategories.map((category) => (
                                        <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {category.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {category.slug}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 max-w-xs truncate">
                                                    {category.description || "No description"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <Users size={16} className="mr-2 text-gray-400" />
                                                    {category.course_count}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {category.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditModal(category)}
                                                        className="text-indigo-600 hover:text-indigo-900 transition-colors p-1 rounded hover:bg-indigo-50"
                                                        title="Edit category"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeactivateCategory(category.id, category.name)}
                                                        className="text-red-600 hover:text-red-900 transition-colors p-1 rounded hover:bg-red-50"
                                                        title="Deactivate category"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Category Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={closeModals}
                title="Create New Category"
                className="max-w-lg"
            >
                <CategoryForm
                    onSubmit={handleCreateCategory}
                    title="Create Category"
                    formData={formData}
                    setFormData={setFormData}
                    closeModals={closeModals}
                />
            </Modal>

            {/* Edit Category Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={closeModals}
                title="Edit Category"
                className="max-w-lg"
            >
                <CategoryForm
                    onSubmit={handleEditCategory}
                    title="Edit Category"
                    formData={formData}
                    setFormData={setFormData}
                    closeModals={closeModals}
                />
            </Modal>
        </div>
    );
}

