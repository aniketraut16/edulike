'use client'
import Link from "next/link";
import AnimatedText from "@/components/Home/AnimatedText";
import { BoxReveal } from "@/components/magicui/box-reveal";
import CourseCard from "../Courses/CourseCard";
import { Course } from '@/types/courses';
import { useEffect, useState } from "react";
import { getAllCourses } from "@/utils/course";

export default function OrganizationCourses({ forCorporate }: { forCorporate: boolean }) {
    const [courses, setcourses] = useState<Course[]>([])

    useEffect(() => {
        const fetchCourses = async () => {
            const { courses } = await getAllCourses(1, "", "", "", 0, "", forCorporate ? "corporate" : "institution")
            setcourses(courses)
        }
        fetchCourses()
    }, [])

    return (
        <section id="courses" className="py-16 bg-gray-50">
            <div className="container">
                <div className="text-center mb-16">

                    <AnimatedText as="div" className="inline-block mb-4">
                        <span
                            className="px-4 py-2 rounded-full text-sm font-semibold"
                            style={{
                                background: "linear-gradient(90deg, #F3E6F1 0%, #FDE6F1 100%)",
                                color: "#8D1A5F"
                            }}
                        >
                            Discover Our Most Popular {forCorporate ? "Corporate" : "Institution"} Courses
                        </span>
                    </AnimatedText>
                    <BoxReveal boxColor={"transparent"} duration={0.5} width="100%">
                        <AnimatedText
                            as="h2"
                            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                            delay={0.1}
                        >
                            Empowering Education for{" "}
                            <span
                                className="bg-clip-text text-transparent font-playfair"
                                style={{
                                    backgroundImage: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    color: "transparent"
                                }}
                            >
                                {forCorporate ? "Organizations" : "Institutions"}
                            </span>
                        </AnimatedText>
                    </BoxReveal>
                    <AnimatedText className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" delay={0.2}>
                        Whether you're a {forCorporate ? "business leader, HR professional, or team manager" : "school administrator, faculty member, or education professional"}, our curated courses are designed to enhance your {forCorporate ? "organization's" : "institution's"} skills and knowledge. Join thousands of {forCorporate ? "companies" : "educational institutions"} who have transformed their {forCorporate ? "workforce" : "learning environments"} with our expert-led programs.
                    </AnimatedText>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(() => {
                        // Show at most 9 courses, but only in multiples of 3 (3, 6, or 9)
                        let displayCount = Math.min(9, courses.length);
                        if (displayCount >= 3) {
                            displayCount = displayCount - (displayCount % 3);
                            if (displayCount === 0) displayCount = 3;
                        }
                        else {
                            displayCount = courses.length;
                        }
                        return courses.slice(0, displayCount).map((item, index) => (
                            <CourseCard key={index} item={item} kcType={forCorporate ? "corporate" : "institution"} />
                        ));
                    })()}
                </div>
                <AnimatedText as="div" className="text-center mt-16" delay={0.3}>
                    <Link
                        href={`/courses?kcTypes=${forCorporate ? "Corporate" : "Institution"}`}
                        className="px-6 py-3 rounded-xl text-sm font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                        style={{
                            background: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)",
                            color: "#fff"
                        }}
                    >
                        View All {forCorporate ? "Corporate" : "Institution"} Courses
                    </Link>
                </AnimatedText>
            </div>
        </section>
    )
}
