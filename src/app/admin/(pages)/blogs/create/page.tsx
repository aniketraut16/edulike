'use client';

import React, { Suspense, useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getBlogById, createBlog, updateBlog } from '@/app/admin/utils/blogs';
import { Blog, BlogArgs } from '@/app/admin/types/blogs';
import { FiSave, FiArrowLeft, FiImage } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { ForwardRefEditor } from '@/components/editor/ForwardRefEditor';
import { type MDXEditorMethods } from '@mdxeditor/editor';



function BlogCreateEditPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const editorRef = useRef<MDXEditorMethods>(null);
    const id = searchParams.get("id");
    const mode = searchParams.get("mode");

    const [blog, setBlog] = useState<Blog | null>(null);
    const [title, setTitle] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editorLoaded, setEditorLoaded] = useState(false);
    const isEditMode = mode === "edit" && id;

    useEffect(() => {
        if (isEditMode) {
            loadBlog();
        }
    }, [id, mode]);

    useEffect(() => {
        if (blog && editorLoaded && editorRef.current) {
            setTitle(blog.title);
            setImageUrl(blog.image_url);
            editorRef.current.setMarkdown(blog.content || '');
        }
    }, [blog, editorLoaded]);

    const loadBlog = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const blogData = await getBlogById(id);
            if (blogData) {
                setBlog(blogData);
            } else {
                toast.error('Blog not found');
                router.push('/admin/blogs');
            }
        } catch (error) {
            console.error('Error loading blog:', error);
            toast.error('Failed to load blog');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!title.trim()) {
            toast.error('Please enter a title');
            return;
        }

        if (!editorRef.current) {
            toast.error('Editor not ready');
            return;
        }

        const markdownContent = editorRef.current.getMarkdown();
        if (!markdownContent.trim()) {
            toast.error('Please enter some content');
            return;
        }

        setSaving(true);
        try {
            const blogData: BlogArgs = {
                title: title.trim(),
                content: markdownContent.trim(),
                image_url: imageUrl.trim(),
            };

            let success = false;
            if (isEditMode && id) {
                success = await updateBlog(id, blogData);
                if (success) {
                    toast.success('Blog updated successfully!');
                }
            } else {
                success = await createBlog(blogData);
                if (success) {
                    toast.success('Blog created successfully!');
                }
            }

            if (success) {
                router.push('/admin/blogs');
            } else {
                toast.error(isEditMode ? 'Failed to update blog' : 'Failed to create blog');
            }
        } catch (error) {
            console.error('Error saving blog:', error);
            toast.error('Failed to save blog');
        } finally {
            setSaving(false);
        }
    };

    const handleBack = () => {
        const hasContent = editorRef.current ? editorRef.current.getMarkdown().trim() : '';
        if (title || hasContent || imageUrl) {
            if (confirm('You have unsaved changes. Are you sure you want to go back?')) {
                router.push('/admin/blogs');
            }
        } else {
            router.push('/admin/blogs');
        }
    };

    if (loading) {
        return (
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading blog...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {isEditMode ? 'Edit Blog' : 'Create New Blog'}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {isEditMode ? 'Update your blog post' : 'Write and publish a new blog post'}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleBack}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                        >
                            <FiArrowLeft /> Back
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                        >
                            <FiSave /> {saving ? 'Saving...' : (isEditMode ? 'Update' : 'Create')}
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Blog Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog title..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    {/* Image URL Input */}
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                            Featured Image URL
                        </label>
                        <div className="relative">
                            <input
                                type="url"
                                id="imageUrl"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <FiImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        {imageUrl && (
                            <div className="mt-2">
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="w-full max-w-md h-32 object-cover rounded-lg border"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Content Editor */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Blog Content *
                        </label>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <ForwardRefEditor
                                ref={editorRef}
                                markdown=""
                                placeholder="Write your blog content here using markdown..."
                                onChange={(markdown) => {
                                    // Content changes are handled by the editor
                                    if (!editorLoaded) {
                                        setEditorLoaded(true);
                                    }
                                }}
                                className="min-h-[400px]"
                            />
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                            <p>Use markdown syntax for formatting. Supports headings, bold, italic, lists, links, images, tables, and code blocks.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default function page() {
    return (
        <Suspense fallback={
            <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <BlogCreateEditPage />
        </Suspense>
    );
}