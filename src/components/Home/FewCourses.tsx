import EnhancedCourseCard from "@/components/Home/CourseCard";
import Link from "next/link";
import AnimatedText from "./AnimatedText";

export default function FewCourses() {
    return (
        <section id="courses" className="py-16 bg-gray-50">
            <div className="container">
                <div className="text-center mb-16">
                    <AnimatedText as="div" className="inline-block mb-4">
                        <span className="bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                            Discover Our Most Popular Courses
                        </span>
                    </AnimatedText>
                    <AnimatedText as="h2" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight" delay={0.1}>
                        Empowering Education for
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Everyone</span>
                    </AnimatedText>
                    <AnimatedText className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" delay={0.2}>
                        Whether you're a student, a professional, or a lifelong learner, our curated courses are designed to enhance your skills and knowledge. Join thousands of learners who have transformed their careers and lives with our expert-led programs.
                    </AnimatedText>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        {
                            title: "Course 1",
                            description: "Description for Course 1",
                            image: "image1.jpg",
                            instructor: "Instructor 1",
                            price: 100,
                            originalPrice: 150,
                            lessons: 10,
                            difficulty: "Beginner"
                        },
                        {
                            title: "Course 2",
                            description: "Description for Course 2",
                            image: "image2.jpg",
                            instructor: "Instructor 2",
                            price: 120,
                            originalPrice: 180,
                            lessons: 12,
                            difficulty: "Intermediate"
                        },
                        {
                            title: "Course 3",
                            description: "Description for Course 3",
                            image: "image3.jpg",
                            instructor: "Instructor 3",
                            price: 90,
                            originalPrice: 130,
                            lessons: 8,
                            difficulty: "Advanced"
                        },
                        {
                            title: "Course 4",
                            description: "Description for Course 4",
                            image: "image4.jpg",
                            instructor: "Instructor 4",
                            price: 110,
                            originalPrice: 160,
                            lessons: 11,
                            difficulty: "Beginner"
                        },
                        {
                            title: "Course 5",
                            description: "Description for Course 5",
                            image: "image5.jpg",
                            instructor: "Instructor 5",
                            price: 95,
                            originalPrice: 140,
                            lessons: 9,
                            difficulty: "Intermediate"
                        },
                        {
                            title: "Course 6",
                            description: "Description for Course 6",
                            image: "image6.jpg",
                            instructor: "Instructor 6",
                            price: 105,
                            originalPrice: 155,
                            lessons: 10,
                            difficulty: "Advanced"
                        }
                    ].map((item, index) => (
                        <EnhancedCourseCard key={index} item={item} />
                    ))}
                </div>
                <AnimatedText as="div" className="text-center mt-16" delay={0.3}>
                    <Link href="/courses" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl text-sm font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
                        View All Courses
                    </Link>
                </AnimatedText>
            </div>
        </section>
    )
}
