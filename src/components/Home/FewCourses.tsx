'use client'
import Link from "next/link";
import AnimatedText from "./AnimatedText";
import { BoxReveal } from "../magicui/box-reveal";
import { useContent } from "@/context/ContentContext";
import CourseCard from "../Courses/CourseCard";

export default function FewCourses() {
    const { topCourses } = useContent()
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
                                style={{
                                    textWrap: "balance"
                                }}
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
                        <AnimatedText className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2  lg:px-3 text-justify" delay={0.2}>
                            Whether you're a student, a professional, or a lifelong learner, our curated courses are designed to enhance your skills and knowledge. Join thousands of learners who have transformed their careers and lives with our expert-led programs.
                        </AnimatedText>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
                    {topCourses.map((item, index) => (
                        <CourseCard key={index} item={item} />
                    ))}
                </div>

                <div className="flex justify-center">
                    <AnimatedText as="div" delay={0.3} className="w-full sm:w-auto">
                        <Link
                            href="/courses"
                            className="w-full sm:w-auto block px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 text-center"
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
