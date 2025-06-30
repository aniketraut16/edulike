"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const studentTestimonials = [
    {
        quote:
            "The courses on this platform completely transformed my career path. I went from knowing nothing about web development to landing my dream job in just six months. The instructors are incredibly knowledgeable and supportive.",
        name: "Sarah Johnson",
        title: "Web Developer",
    },
    {
        quote:
            "As a working professional, I needed flexible learning options that wouldn't compromise on quality. This platform delivered exactly that. The self-paced courses allowed me to learn on my own schedule while still receiving excellent instruction.",
        name: "Michael Chen",
        title: "Product Manager",
    },
    {
        quote:
            "The interactive projects and real-world applications made learning complex topics much easier. I particularly enjoyed the community aspect where I could collaborate with other students from around the world.",
        name: "Priya Patel",
        title: "Data Scientist",
    },
    {
        quote:
            "I've tried many online learning platforms, but this one stands out for its exceptional quality and attention to detail. The courses are comprehensive, up-to-date, and taught by industry experts who truly care about student success.",
        name: "David Rodriguez",
        title: "Software Engineer",
    },
    {
        quote:
            "The value for money is incredible. I gained skills that immediately translated to a 30% salary increase. The investment in these courses has paid for itself many times over.",
        name: "Emma Wilson",
        title: "UX Designer",
    },
    {
        quote:
            "The community support is what makes this platform special. Whenever I got stuck, there was always someone ready to help, whether it was an instructor or a fellow student.",
        name: "James Taylor",
        title: "Frontend Developer",
    },
    {
        quote:
            "I appreciate how the courses are structured to build upon each other. The learning path is clear, and you can see your progress which is incredibly motivating.",
        name: "Sophia Garcia",
        title: "Full Stack Developer",
    },
];

export default function Testimonials() {
    return (
        <section className="py-20 w-full relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 mb-12">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
                        style={{
                            textWrap: "balance"
                        }}
                    >What Our Students Say</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg"
                        style={{
                            textWrap: "balance"
                        }}
                    >
                        Discover why thousands of learners choose our platform for their educational journey
                    </p>
                </div>
            </div>

            <div className="space-y-16 w-full">
                <div>
                    <div className="w-full overflow-hidden">
                        <InfiniteMovingCards
                            items={studentTestimonials}
                            direction="right"
                            speed="normal"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
