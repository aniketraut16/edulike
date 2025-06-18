import AnimatedText from "./AnimatedText";

export default function FewBlogs() {
    return (
        <section id="blog" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <AnimatedText as="h2" className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
                    Latest from Our Blog
                </AnimatedText>
                <AnimatedText className="text-center text-gray-600 mb-12 max-w-2xl mx-auto" delay={0.1}>
                    Stay updated with our latest articles and learning resources
                </AnimatedText>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="h-48 bg-purple-100 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-purple-500 font-medium">
                                    Blog Image
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="text-sm text-gray-500 mb-2">June 10, 2023</div>
                                <h3 className="font-bold text-lg mb-2">Blog Post Title {item}</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <div>
                                    <a href="#" className="text-purple-600 font-medium hover:text-purple-700 flex items-center">
                                        Read More
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
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
