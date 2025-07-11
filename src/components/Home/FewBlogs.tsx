'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedText from "./AnimatedText";
import { getBlogs } from '@/app/admin/utils/blogs';
import { Blog } from '@/app/admin/types/blogs';

export default function FewBlogs() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getBlogs(1, 3); // Get first 3 blogs
                setBlogs(response.blogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

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

    const handleBlogClick = (blogId: string) => {
        router.push(`/blog?id=${blogId}`);
    };

    const handleViewAllBlogs = () => {
        router.push('/blogs');
    };

    return (
        <section id="blog" className="py-10 sm:py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <AnimatedText as="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 sm:mb-6 px-2">
                    Latest from Our Blog
                </AnimatedText>
                <AnimatedText className="text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-3" delay={0.1}>
                    Stay updated with our latest articles and learning resources
                </AnimatedText>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                        <span className="ml-2 text-gray-600">Loading blogs...</span>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">No blogs available yet.</p>
                        <p className="text-sm text-gray-500">Check back soon for exciting content!</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                            {blogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                                    onClick={() => handleBlogClick(blog.id)}
                                >
                                    <div className="h-40 sm:h-48 bg-gradient-to-br from-purple-100 to-[#8D1A5F] relative overflow-hidden">
                                        {blog.image_url ? (
                                            <img
                                                src={blog.image_url}
                                                alt={blog.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-purple-500 font-medium text-sm sm:text-base">
                                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 sm:p-6">
                                        <div className="text-xs sm:text-sm text-gray-500 mb-1.5 sm:mb-2">
                                            {formatDate(blog.created_at)}
                                        </div>
                                        <h3 className="font-bold text-base sm:text-lg mb-1.5 sm:mb-2 line-clamp-2">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                                            {truncateText(stripMarkdown(blog.content), 100)}
                                        </p>
                                        <div>
                                            <span className="text-purple-600 font-medium hover:text-purple-700 flex items-center text-xs sm:text-sm">
                                                Read More
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* View All Blogs Button */}
                        <div className="text-center mt-8 sm:mt-12">
                            <button
                                onClick={handleViewAllBlogs}
                                className="inline-flex items-center px-6 py-3 bg-[#8D1A5F] text-white font-medium rounded-lg hover:bg-[#8D1A5F] transition-colors"
                            >
                                View All Blogs
                                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
