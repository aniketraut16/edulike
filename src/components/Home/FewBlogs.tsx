import AnimatedText from "./AnimatedText";

export default function FewBlogs() {
    return (
        <section id="blog" className="py-10 sm:py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <AnimatedText as="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 sm:mb-6 px-2">
                    Latest from Our Blog
                </AnimatedText>
                <AnimatedText className="text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-3" delay={0.1}>
                    Stay updated with our latest articles and learning resources
                </AnimatedText>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden">
                            <div className="h-40 sm:h-48 bg-purple-100 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-purple-500 font-medium text-sm sm:text-base">
                                    Blog Image
                                </div>
                            </div>
                            <div className="p-4 sm:p-6">
                                <div className="text-xs sm:text-sm text-gray-500 mb-1.5 sm:mb-2">June 10, 2023</div>
                                <h3 className="font-bold text-base sm:text-lg mb-1.5 sm:mb-2">Blog Post Title {item}</h3>
                                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <div>
                                    <a href="#" className="text-purple-600 font-medium hover:text-purple-700 flex items-center text-xs sm:text-sm">
                                        Read More
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
