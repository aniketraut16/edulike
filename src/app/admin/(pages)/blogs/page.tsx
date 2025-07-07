'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBlogs, deleteBlog } from '@/app/admin/utils/blogs';
import { Blog, BlogsResponse } from '@/app/admin/types/blogs';
import { FiPlus, FiEdit, FiTrash2, FiCalendar, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function BlogsPage() {
    const router = useRouter();
    const [blogsData, setBlogsData] = useState<BlogsResponse>({
        blogs: [],
        pagination: {
            currentPage: 0,
            totalPages: 0,
            totalCount: 0,
            hasNext: false,
            hasPrev: false,
        },
    });
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        loadBlogs(currentPage);
    }, [currentPage]);

    const loadBlogs = async (page: number = 1) => {
        setLoading(true);
        try {
            const data = await getBlogs(page, 9);
            setBlogsData(data);
        } catch (error) {
            console.error('Error loading blogs:', error);
            toast.error('Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBlog = () => {
        router.push('/admin/blogs/create');
    };

    const handleEditBlog = (blogId: string) => {
        router.push(`/admin/blogs/create?mode=edit&id=${blogId}`);
    };

    const handleDeleteBlog = async (blogId: string, title: string) => {
        if (!confirm(`Are you sure you want to delete the blog "${title}"?`)) return;

        setDeletingId(blogId);
        try {
            const success = await deleteBlog(blogId);
            if (success) {
                toast.success('Blog deleted successfully!');
                loadBlogs(currentPage); // Reload the current page
            } else {
                toast.error('Failed to delete blog');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            toast.error('Failed to delete blog');
        } finally {
            setDeletingId(null);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePrevPage = () => {
        if (blogsData.pagination.hasPrev) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (blogsData.pagination.hasNext) {
            setCurrentPage(currentPage + 1);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const stripMarkdown = (markdown: string) => {
        // Simple markdown stripping - remove common markdown syntax
        return markdown
            .replace(/#{1,6}\s+/g, '') // Remove headers
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
            .replace(/\*(.*?)\*/g, '$1') // Remove italic
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
            .replace(/`([^`]+)`/g, '$1') // Remove inline code
            .replace(/```[\s\S]*?```/g, '') // Remove code blocks
            .replace(/>\s+/g, '') // Remove blockquotes
            .replace(/[-*+]\s+/g, '') // Remove list markers
            .replace(/\n+/g, ' ') // Replace newlines with spaces
            .trim();
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
                        <p className="text-gray-600 mt-1">
                            Manage your blog posts ({blogsData.pagination.totalCount} total)
                        </p>
                    </div>
                    <button
                        onClick={handleCreateBlog}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                        <FiPlus /> Create New Blog
                    </button>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <span className="ml-2 text-gray-600">Loading blogs...</span>
                    </div>
                ) : (
                    <>
                        {/* Blogs Grid */}
                        {blogsData.blogs.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="mb-4">
                                    <FiPlus className="mx-auto h-12 w-12 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs yet</h3>
                                <p className="text-gray-600 mb-4">
                                    Get started by creating your first blog post.
                                </p>
                                <button
                                    onClick={handleCreateBlog}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Create First Blog
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {blogsData.blogs.map((blog) => (
                                    <div
                                        key={blog.id}
                                        className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                                    >
                                        {/* Blog Image */}
                                        <div className="aspect-w-16 aspect-h-9">
                                            <img
                                                src={blog.image_url || '/images/bg.png'}
                                                alt={blog.title}
                                                className="w-full h-48 object-cover rounded-t-lg"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/images/bg.png';
                                                }}
                                            />
                                        </div>

                                        {/* Blog Content */}
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                                                {blog.title}
                                            </h3>

                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {truncateText(stripMarkdown(blog.content), 120)}
                                            </p>

                                            {/* Meta Information */}
                                            <div className="flex flex-col gap-2 text-xs text-gray-500 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <FiCalendar size={12} />
                                                    <span>Created: {formatDate(blog.created_at)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FiClock size={12} />
                                                    <span>Updated: {formatDate(blog.updated_at)}</span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditBlog(blog.id)}
                                                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-1 text-sm"
                                                >
                                                    <FiEdit size={14} /> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteBlog(blog.id, blog.title)}
                                                    disabled={deletingId === blog.id}
                                                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 text-sm"
                                                >
                                                    <FiTrash2 size={14} />
                                                    {deletingId === blog.id ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {blogsData.pagination.totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-8">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={!blogsData.pagination.hasPrev}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>

                                <div className="flex gap-1">
                                    {Array.from({ length: blogsData.pagination.totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-3 py-2 rounded ${page === currentPage
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={handleNextPage}
                                    disabled={!blogsData.pagination.hasNext}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
