import EnhancedCourseCard from "@/components/Home/CourseCard";
import Link from "next/link";
import AnimatedText from "./AnimatedText";
import { BoxReveal } from "../magicui/box-reveal";

export default function FewCourses() {
    return (
        <section id="courses" className="py-10 sm:py-16 bg-gray-50">
            <div className="container px-4 sm:px-6">
                <div className="flex justify-center">
                    <div className="w-full max-w-3xl text-center mb-10 sm:mb-16 mx-auto">
                        <AnimatedText as="div" className="inline-block mb-4">
                            <span
                                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold"
                                style={{
                                    background: "linear-gradient(90deg, #F3E6F1 0%, #FDE6F1 100%)",
                                    color: "#8D1A5F"
                                }}
                            >
                                Discover Our Most Popular Courses
                            </span>
                        </AnimatedText>

                        <BoxReveal>
                            <AnimatedText
                                as="h2"
                                className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2 text-center mx-auto"
                                delay={0.1}
                            >
                                Empowering Education for{" "}
                                <span
                                    className="bg-clip-text inline text-transparent font-playfair"
                                    style={{
                                        backgroundImage: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        color: "transparent"
                                    }}
                                >
                                    Everyone
                                </span>
                            </AnimatedText>
                        </BoxReveal>
                        <AnimatedText className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-3" delay={0.2}>
                            Whether you're a student, a professional, or a lifelong learner, our curated courses are designed to enhance your skills and knowledge. Join thousands of learners who have transformed their careers and lives with our expert-led programs.
                        </AnimatedText>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
                    {[
                        {
                            title: "Full-Stack Web Development with React & Node.js",
                            description: "Master modern web development by building real-world applications using React, Node.js, Express, and MongoDB.",
                            image: "https://i.ytimg.com/vi/5i8ej1-GpFU/maxresdefault.jpg",
                            instructor: "Sarah Thompson",
                            price: 149,
                            originalPrice: 249,
                            lessons: 42,
                            difficulty: "Intermediate"
                        },
                        {
                            title: "Python for Data Science & Machine Learning",
                            description: "Learn Python from scratch and apply it to data analysis, visualization, and machine learning projects.",
                            image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230318230239/Python-Data-Science-Tutorial.jpg",
                            instructor: "Dr. Anil Mehra",
                            price: 129,
                            originalPrice: 199,
                            lessons: 38,
                            difficulty: "Beginner"
                        },
                        {
                            title: "UI/UX Design Essentials: Figma to Prototyping",
                            description: "Design beautiful and user-friendly interfaces with Figma, and learn the fundamentals of UX research and prototyping.",
                            image: "https://static.skillshare.com/uploads/video/thumbnails/0bcdb57f80be0d1cceb3f11e51408c6e/original",
                            instructor: "Emily Carter",
                            price: 99,
                            originalPrice: 159,
                            lessons: 27,
                            difficulty: "Beginner"
                        },
                        {
                            title: "Advanced JavaScript: ES6+, TypeScript & Patterns",
                            description: "Deep dive into modern JavaScript, TypeScript, and advanced programming patterns for scalable applications.",
                            image: "https://miro.medium.com/v2/resize:fit:1400/1*8njcJv-4iLyrZV76FhdkDg.png",
                            instructor: "Michael Lee",
                            price: 139,
                            originalPrice: 199,
                            lessons: 34,
                            difficulty: "Advanced"
                        },
                        {
                            title: "Digital Marketing Masterclass: SEO, SEM & Analytics",
                            description: "Grow your business or career with hands-on digital marketing strategies, SEO, SEM, and Google Analytics.",
                            image: "https://media.assettype.com/analyticsinsight/2024-08-06/9k7iet26/Top-75-Digital-Marketing-Courses-to-Explore.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true",
                            instructor: "Priya Sharma",
                            price: 119,
                            originalPrice: 179,
                            lessons: 30,
                            difficulty: "Intermediate"
                        },
                        {
                            title: "Introduction to Cloud Computing with AWS",
                            description: "Get started with cloud computing and learn how to deploy, manage, and scale applications on AWS.",
                            image: "https://images.squarespace-cdn.com/content/v1/60cfd646701da4034512a1c5/ca3d678a-cbfc-4c9c-bc79-9d3be9fb907e/AWS-Cloud.png?format=2500w",
                            instructor: "David Kim",
                            price: 109,
                            originalPrice: 169,
                            lessons: 22,
                            difficulty: "Beginner"
                        }
                    ].map((item, index) => (
                        <EnhancedCourseCard key={index} item={item} />
                    ))}
                </div>

                <div className="flex justify-center">
                    <AnimatedText as="div" delay={0.3}>
                        <Link
                            href="/courses"
                            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                            style={{
                                background: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)",
                                color: "#fff"
                            }}
                        >
                            View All Courses
                        </Link>
                    </AnimatedText>
                </div>
            </div>
        </section>
    )
}
