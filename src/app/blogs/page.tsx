'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getBlogs } from '@/app/admin/utils/blogs';
import { Blog, BlogsResponse } from '@/app/admin/types/blogs';
import { FiSearch, FiCalendar, FiClock, FiArrowLeft } from 'react-icons/fi';
import { Suspense } from 'react';

function BlogsPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [blogsData, setBlogsData] = useState<BlogsResponse>({
        blogs: [],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalCount: 0,
            hasNext: false,
            hasPrev: false,
        },
    });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 9;

    useEffect(() => {
        // Get initial page from URL params
        const page = parseInt(searchParams.get('page') || '1');
        setCurrentPage(page);
    }, [searchParams]);

    useEffect(() => {
        loadBlogs(currentPage);
    }, [currentPage]);

    const loadBlogs = async (page: number = 1) => {
        setLoading(true);
        try {
            const data = await getBlogs(page, blogsPerPage);
            setBlogsData(data);
        } catch (error) {
            console.error('Error loading blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        // For now, we'll implement client-side filtering
        // In production, you'd want server-side search
        if (searchQuery.trim()) {
            const filteredBlogs = blogsData.blogs.filter(blog =>
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                blog.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setBlogsData(prev => ({
                ...prev,
                blogs: filteredBlogs
            }));
        } else {
            loadBlogs(currentPage);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.history.pushState({}, '', `/blogs?page=${page}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBlogClick = (blogId: string) => {
        router.push(`/blog?id=${blogId}`);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const stripMarkdown = (markdown: string) => {
        return markdown
            .replace(/#{1,6}\s+/g, '')
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/\*(.*?)\*/g, '$1')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/`([^`]+)`/g, '$1')
            .replace(/```[\s\S]*?```/g, '')
            .replace(/>\s+/g, '')
            .replace(/[-*+]\s+/g, '')
            .replace(/\n+/g, ' ')
            .trim();
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    const estimateReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm pt-[15vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <button
                                    onClick={() => router.push('/')}
                                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <FiArrowLeft /> Back to Home
                                </button>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                All Blog Posts
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Discover insights, tutorials, and updates from our team
                                {blogsData.pagination.totalCount > 0 && (
                                    <span className="ml-2">
                                        ({blogsData.pagination.totalCount} posts)
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="w-full md:w-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search blogs..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full md:w-80 px-4 py-2 pl-10 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <button
                                    onClick={handleSearch}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading blogs...</p>
                        </div>
                    </div>
                ) : blogsData.blogs.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="mb-4">
                            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {searchQuery ? 'No blogs found' : 'No blogs available'}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {searchQuery
                                ? `No blogs match your search for "${searchQuery}"`
                                : 'Check back soon for exciting content!'
                            }
                        </p>
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    loadBlogs(1);
                                }}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Blogs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogsData.blogs.map((blog) => (
                                <article
                                    key={blog.id}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
                                    onClick={() => handleBlogClick(blog.id)}
                                >
                                    {/* Blog Image */}
                                    <div className="h-48 bg-gradient-to-br from-purple-100 to-[#8D1A5F] relative overflow-hidden">
                                        {blog.image_url ? (
                                            <img
                                                src={blog.image_url}
                                                alt={blog.title}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-purple-500">
                                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Blog Content */}
                                    <div className="p-6">
                                        {/* Blog Meta */}
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                            <div className="flex items-center gap-1">
                                                <FiCalendar size={14} />
                                                <span>{formatDate(blog.created_at)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FiClock size={14} />
                                                <span>{estimateReadingTime(blog.content)} min read</span>
                                            </div>
                                        </div>

                                        {/* Blog Title */}
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-purple-600 transition-colors">
                                            {blog.title}
                                        </h2>

                                        {/* Blog Excerpt */}
                                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                                            {truncateText(stripMarkdown(blog.content), 120)}
                                        </p>

                                        {/* Read More Link */}
                                        <div className="flex justify-between items-center">
                                            <span className="text-purple-600 font-medium hover:text-purple-700 flex items-center text-sm">
                                                Read Full Article
                                                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {blogsData.pagination.totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                {/* Previous Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={!blogsData.pagination.hasPrev}
                                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Previous
                                </button>

                                {/* Page Numbers */}
                                <div className="flex gap-1">
                                    {Array.from({ length: Math.min(blogsData.pagination.totalPages, 5) }, (_, i) => {
                                        let pageNum;
                                        if (blogsData.pagination.totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= blogsData.pagination.totalPages - 2) {
                                            pageNum = blogsData.pagination.totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`px-3 py-2 rounded-lg ${pageNum === currentPage
                                                    ? 'bg-purple-600 text-white'
                                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={!blogsData.pagination.hasNext}
                                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    Next
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default function BlogsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <BlogsPageContent />
        </Suspense>
    );
}
