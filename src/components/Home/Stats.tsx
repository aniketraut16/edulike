'use client'
import { FaBookOpen, FaUserGraduate, FaCalendarAlt } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

export default function Stats() {
    const { ref, inView } = useInView();
    const [hasAnimated, setHasAnimated] = useState(false);

    // Calculate total courses and students (example numbers)
    // const categories = getCourses();
    const totalCourses = 20;
    const totalStudents = 1200000; // Example: 1.2M students learning
    const yearsActive = 5; // Example: 5 years

    // Trigger animation only once
    useEffect(() => {
        if (inView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [inView, hasAnimated]);

    return (
        <section className="py-16 bg-[#8D1A5F] stats">
            <div className="container mx-auto px-4 md:px-6">
                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
                    ref={ref}
                >
                    {/* Courses Available */}
                    <div className="text-center text-white">
                        <div className="flex items-center justify-center mb-2  ">
                            <FaBookOpen className="text-2xl text-white mr-3" />
                            <div className="text-4xl md:text-5xl font-bold">
                                {hasAnimated && <CountUp end={totalCourses} duration={2} />}+
                            </div>
                        </div>
                        <p className="text-white/90 text-sm md:text-base font-medium">Courses available</p>
                    </div>

                    {/* Students Learning */}
                    <div className="text-center text-white">
                        <div className="flex items-center justify-center mb-2">
                            <FaUserGraduate className="text-2xl text-white mr-3" />
                            <div className="text-4xl md:text-5xl font-bold">
                                {hasAnimated && <CountUp end={1.2} duration={2} decimals={1} />}M+
                            </div>
                        </div>
                        <p className="text-white/90 text-sm md:text-base font-medium">Students learning</p>
                    </div>

                    {/* Years of Excellence */}
                    <div className="text-center text-white">
                        <div className="flex items-center justify-center mb-2">
                            <FaCalendarAlt className="text-2xl text-white mr-3" />
                            <div className="text-4xl md:text-5xl font-bold">
                                {hasAnimated && <CountUp end={yearsActive} duration={2} />}+
                            </div>
                        </div>
                        <p className="text-white/90 text-sm md:text-base font-medium">Years of excellence</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
