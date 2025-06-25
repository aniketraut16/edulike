'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BoxReveal } from '@/components/magicui/box-reveal';
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import { FaQuoteLeft } from 'react-icons/fa';
import { Timeline } from '@/components/ui/timeline';

export default function AboutUs() {
    const { ref, inView } = useInView();
    const [hasAnimated, setHasAnimated] = useState(false);

    // Updated testimonials for KC Online Education
    const testimonials = [
        {
            quote:
                "Our live interactive classes provide real-time engagement with expert instructors, ensuring a hands-on learning experience for every student.",
            name: "Live Interactive Classes",
            designation: "Service",
            src: "https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3",
        },
        {
            quote:
                "Access a vast library of on-demand video courses, allowing you to learn at your own pace and revisit lessons anytime.",
            name: "On-Demand Video Library",
            designation: "Feature",
            src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
        },
        {
            quote:
                "Our personalized learning paths adapt to your goals, recommending courses and resources tailored to your career aspirations.",
            name: "Personalized Learning Paths",
            designation: "Feature",
            src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
        },
        {
            quote:
                "Get certified with industry-recognized credentials upon course completion, boosting your professional profile and job prospects.",
            name: "Certification Programs",
            designation: "Service",
            src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3",
        },
        {
            quote:
                "Our dedicated support team is available 24/7 to assist you with any queries, ensuring a smooth and productive learning journey.",
            name: "24/7 Learner Support",
            designation: "Service",
            src: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3",
        },
    ];

    // Updated timeline for KC Online Education
    const data = [
        {
            title: "2024",
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm ">
                        KC Online Education launched its new platform, introducing advanced features for seamless course delivery and interactive learning.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="/images/corporate.jpg"
                            alt="KC Online Education Feature"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src="/images/corporate.jpg"
                            alt="KC Online Education Feature"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src="/images/corporate.jpg"
                            alt="KC Online Education Feature"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src="/images/corporate.jpg"
                            alt="KC Online Education Feature"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "2023",
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm ">
                        KC Online Education expanded its course catalog to over 500 courses, covering technology, business, and personal development.
                    </p>
                    <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm ">
                        We welcomed thousands of new learners and partnered with leading industry experts to deliver high-quality content.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="/images/corporate.jpg"
                            alt="KC Online Education Courses"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src="/images/corporate.jpg"
                            alt="KC Online Education Courses"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src="/images/corporate.jpg"
                            alt="KC Online Education Courses"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src="/images/corporate.jpg"
                            alt="KC Online Education Courses"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Milestones",
            content: (
                <div>
                    <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm ">
                        KC Online Education reached 100,000+ enrollments and received recognition for excellence in online learning.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="/images/corporate.jpg"
                            alt="KC Online Education Award"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src="/images/corporate.jpg"
                            alt="KC Online Education Award"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src="/images/corporate.jpg"
                            alt="KC Online Education Award"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                        <img
                            src="/images/corporate.jpg"
                            alt="KC Online Education Award"
                            width={500}
                            height={500}
                            className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                        />
                    </div>
                </div>
            ),
        },
    ];

    // Trigger animation only once
    useEffect(() => {
        if (inView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [inView, hasAnimated]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section
                className="relative min-h-screen flex items-center justify-center bg-white"
                style={{
                    backgroundImage: "url('/images/corporate.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-16 md:py-24 text-center">
                    <BoxReveal boxColor="#8D1A5F">
                        <h1 className="text-4xl md:text-5xl max-w-3xl mx-auto font-bold mb-6 text-white drop-shadow-lg">
                            Empowering Your Learning Journey with KC Online Education
                        </h1>
                    </BoxReveal>
                    <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow">
                        At KC Online Education, we are dedicated to making quality education accessible to everyone. Discover a world of opportunities and unlock your potential with our expertly crafted courses.
                    </p>
                    <Button size="lg" className="bg-[#8D1A5F] hover:bg-[#7D1950] text-white">
                        Explore Courses
                    </Button>
                </div>
            </section>

            <div className="relative w-full overflow-clip">
                <Timeline data={data} />
            </div>

            {/* Mission Statement */}
            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Transforming Lives Through Online Learning</h2>
                    <p className="text-center text-gray-700 max-w-3xl mx-auto">
                        Whether you want to advance your career, learn a new skill, or share your expertise, KC Online Education is your trusted partner. Our mission is to provide affordable, high-quality courses that help you achieve your goals and succeed in a rapidly changing world.
                    </p>
                </div>
            </section>

            <AnimatedTestimonials testimonials={testimonials} />

            {/* Stats Section */}
            <section className="py-16 bg-[#8D1A5F]">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">KC Online Education by the Numbers</h2>
                    <p className="text-center text-white/90 max-w-3xl mx-auto mb-12">
                        Join a vibrant community of learners and instructors. Our platform is designed to help you grow, connect, and achieve more.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8" ref={ref}>
                        <div className="text-center text-white">
                            <div className="text-4xl md:text-5xl font-bold mb-2">
                                {hasAnimated && <CountUp end={0.1} duration={2} decimals={1} />}M+
                            </div>
                            <p className="text-white/90 text-sm">Learners</p>
                        </div>

                        <div className="text-center text-white">
                            <div className="text-4xl md:text-5xl font-bold mb-2">
                                {hasAnimated && <CountUp end={500} duration={2} />}+
                            </div>
                            <p className="text-white/90 text-sm">Courses</p>
                        </div>

                        <div className="text-center text-white">
                            <div className="text-4xl md:text-5xl font-bold mb-2">
                                {hasAnimated && <CountUp end={100} duration={2} />}+
                            </div>
                            <p className="text-white/90 text-sm">Expert Instructors</p>
                        </div>

                        <div className="text-center text-white">
                            <div className="text-4xl md:text-5xl font-bold mb-2">
                                {hasAnimated && <CountUp end={200} duration={2} />}K+
                            </div>
                            <p className="text-white/90 text-sm">Course Enrollments</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <div className="text-center text-white">
                            <div className="text-4xl md:text-5xl font-bold mb-2">
                                {hasAnimated && <CountUp end={15} duration={2} />}
                            </div>
                            <p className="text-white/90 text-sm">Categories</p>
                        </div>

                        <div className="text-center text-white">
                            <div className="text-4xl md:text-5xl font-bold mb-2">
                                {hasAnimated && <CountUp end={50} duration={2} />}+
                            </div>
                            <p className="text-white/90 text-sm">Corporate Partners</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Corporate Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <p className="text-center text-gray-700 max-w-3xl mx-auto mb-8">
                        KC Online Education supports organizations of all sizes in upskilling their teams. Our tailored business solutions help companies, educational institutions, and nonprofits foster a culture of continuous learning and growth.
                    </p>
                    <div className="flex justify-center">
                        <Button className="bg-[#8D1A5F] hover:bg-[#7D1950] text-white">
                            Learn more
                        </Button>
                    </div>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="py-8 mb-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: "KC Online Education provided our team with the skills needed to excel in a competitive market. The course selection is outstanding.",
                                name: "Rohit Sinha",
                                designation: "Head of Learning & Development",
                                link: "#",
                                linkText: "Read the TechNova case study"
                            },
                            {
                                quote: "The flexibility and quality of KC Online Education's platform made it easy for our employees to learn and grow.",
                                name: "Meera Joshi",
                                designation: "Corporate Training Lead",
                                link: "#",
                                linkText: "Read the EduCorp case study"
                            },
                            {
                                quote: "We saw measurable improvements in productivity after partnering with KC Online Education for our upskilling initiatives.",
                                name: "Sandeep Kumar",
                                designation: "HR Director",
                                link: "#",
                                linkText: "Read the FutureWorks case study"
                            }
                        ].map((testimonial, idx) => (
                            <div className="pt-6 flex flex-col" key={idx}>
                                <div className="text-[#8D1A5F] text-4xl font-serif mb-4"><FaQuoteLeft /></div>
                                <p className="text-gray-700 mb-4">
                                    {testimonial.quote}
                                </p>
                                <div className="mt-auto">
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-gray-600">{testimonial.designation}</p>
                                    <a href={testimonial.link} className="text-[#8D1A5F] text-sm flex items-center mt-2">
                                        {testimonial.linkText}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
