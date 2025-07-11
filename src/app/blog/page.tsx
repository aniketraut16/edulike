'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Blog } from '@/app/admin/types/blogs'
import { getBlogById } from '@/app/admin/utils/blogs'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { FiCalendar, FiClock, FiArrowLeft, FiShare } from 'react-icons/fi'
import 'highlight.js/styles/github-dark.css'

function BlogPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const id = searchParams.get("id")
    const [blog, setBlog] = useState<Blog | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (id) {
            const loadBlog = async () => {
                setLoading(true)
                try {
                    const blogData = await getBlogById(id)
                    if (blogData) {
                        setBlog(blogData)
                    } else {
                        toast.error("Blog not found")
                        router.push('/')
                    }
                } catch (error) {
                    console.error('Error loading blog:', error)
                    toast.error("Failed to load blog")
                } finally {
                    setLoading(false)
                }
            }
            loadBlog()
        } else {
            router.push('/')
        }
    }, [id, router])

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const estimateReadingTime = (content: string) => {
        const wordsPerMinute = 200
        const words = content.trim().split(/\s+/).length
        const readingTime = Math.ceil(words / wordsPerMinute)
        return readingTime
    }

    const handleShare = async () => {
        if (blog && navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    url: window.location.href
                })
            } catch (error) {
                // Fallback to copying URL
                navigator.clipboard.writeText(window.location.href)
                toast.success('Blog URL copied to clipboard!')
            }
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(window.location.href)
            toast.success('Blog URL copied to clipboard!')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8D1A5F] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading blog post...</p>
                </div>
            </div>
        )
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog not found</h2>
                    <button
                        onClick={() => router.push('/')}
                        className="px-4 py-2 bg-[#8D1A5F] text-white rounded-lg hover:bg-[#8D1A5F]-700"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative h-96 md:h-[500px] overflow-hidden">
                <img
                    src={blog.image_url || '/images/bg.png'}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/images/bg.png'
                    }}
                />
                <div className="absolute inset-0 bg-black/70"></div>


                {/* Hero Content */}
                <div className="absolute bottom-8 left-6 right-6 text-white">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                            {blog.title}
                        </h1>

                        {/* Blog Metadata */}
                        <div className="flex flex-wrap items-center gap-6 text-gray-200">
                            <div className="flex items-center gap-2">
                                <FiCalendar size={16} />
                                <span>Published {formatDate(blog.created_at)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiClock size={16} />
                                <span>{estimateReadingTime(blog.content)} min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <article className="p-8 md:p-12">
                    <div className="prose prose-lg prose-[#8D1A5F] max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                // Custom styling for different elements
                                h1: ({ children }) => (
                                    <h1 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-[#8D1A5F]">
                                        {children}
                                    </h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
                                        {children}
                                    </h3>
                                ),
                                p: ({ children }) => (
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        {children}
                                    </p>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-[#8D1A5F] pl-6 my-6 italic text-gray-600 bg-[#8D1A5F]-50 py-2">
                                        {children}
                                    </blockquote>
                                ),
                                code: ({ children, className }) => {
                                    const isInline = !className
                                    if (isInline) {
                                        return (
                                            <code className="bg-gray-100 text-[#8D1A5F] px-2 py-1 rounded text-sm font-mono">
                                                {children}
                                            </code>
                                        )
                                    }
                                    return (
                                        <code className={className}>
                                            {children}
                                        </code>
                                    )
                                },
                                pre: ({ children }) => (
                                    <div className="bg-gray-900 rounded-lg p-4 my-6 overflow-x-auto">
                                        <pre className="text-sm">{children}</pre>
                                    </div>
                                ),
                                img: ({ src, alt }) => (
                                    <div className="my-8">
                                        <img
                                            src={src}
                                            alt={alt}
                                            className="w-full rounded-lg shadow-md"
                                        />
                                        {alt && (
                                            <p className="text-center text-sm text-gray-500 mt-2 italic">
                                                {alt}
                                            </p>
                                        )}
                                    </div>
                                ),
                                table: ({ children }) => (
                                    <div className="overflow-x-auto my-6">
                                        <table className="min-w-full bg-white border border-gray-300">
                                            {children}
                                        </table>
                                    </div>
                                ),
                                th: ({ children }) => (
                                    <th className="px-6 py-3 border-b border-gray-300 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {children}
                                    </th>
                                ),
                                td: ({ children }) => (
                                    <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-900">
                                        {children}
                                    </td>
                                ),
                                ul: ({ children }) => (
                                    <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                                        {children}
                                    </ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                                        {children}
                                    </ol>
                                ),
                                li: ({ children }) => (
                                    <li className="text-gray-700">{children}</li>
                                ),
                                a: ({ href, children }) => (
                                    <a
                                        href={href}
                                        className="text-[#8D1A5F] hover:text-[#8D1A5F]-800 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {children}
                                    </a>
                                ),
                            }}
                        >
                            {blog.content}
                        </ReactMarkdown>
                    </div>
                </article>

            </div>
        </div>
    )
}

export default function page() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8D1A5F] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <BlogPage />
        </Suspense>
    )
}
