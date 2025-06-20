'use client'
import { FaChalkboardTeacher, FaBookOpen, FaUserGraduate } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import AnimatedText from "./AnimatedText";

export default function Stats() {
    const { ref, inView } = useInView();
    return (
        <section id="features" className="py-20">
            <div className="container mx-auto px-4 md:px-6">
                <AnimatedText as="h2" className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-16 font-playfair">
                    Why Students Love KC Online Education
                </AnimatedText>

                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-10"
                    ref={ref}
                >
                    {/* Feature 1 */}
                    <div className="bg-white shadow-lg hover:shadow-xl transition rounded-2xl p-8 text-center border border-orange-100">
                        <div className="text-5xl text-orange-400 mb-4 mx-auto">
                            <FaBookOpen />
                        </div>
                        <AnimatedText as="h3" className="text-3xl font-bold text-orange-500 mb-2" delay={0.1}>
                            {inView && <CountUp end={500} duration={2} />}+
                        </AnimatedText>
                        <AnimatedText className="text-gray-600 font-medium" delay={0.2}>Courses to Explore</AnimatedText>
                        <AnimatedText className="text-sm text-gray-500 mt-2" delay={0.3}>Choose from tech, business, design, and more—available anytime.</AnimatedText>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white shadow-lg hover:shadow-xl transition rounded-2xl p-8 text-center border border-blue-100">
                        <div className="text-5xl text-blue-400 mb-4 mx-auto">
                            <FaChalkboardTeacher />
                        </div>
                        <AnimatedText as="h3" className="text-3xl font-bold text-blue-500 mb-2" delay={0.1}>
                            {inView && <CountUp end={100} duration={2} />}+
                        </AnimatedText>
                        <AnimatedText className="text-gray-600 font-medium" delay={0.2}>Expert Instructors</AnimatedText>
                        <AnimatedText className="text-sm text-gray-500 mt-2" delay={0.3}>Learn from top industry professionals with real-world experience.</AnimatedText>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white shadow-lg hover:shadow-xl transition rounded-2xl p-8 text-center border border-green-100">
                        <div className="text-5xl text-green-400 mb-4 mx-auto">
                            <FaUserGraduate />
                        </div>
                        <AnimatedText as="h3" className="text-3xl font-bold text-green-500 mb-2" delay={0.1}>
                            {inView && <CountUp end={25000} duration={2} separator="," />}+
                        </AnimatedText>
                        <AnimatedText className="text-gray-600 font-medium" delay={0.2}>Happy Learners</AnimatedText>
                        <AnimatedText className="text-sm text-gray-500 mt-2" delay={0.3}>Join a thriving community of students learning together every day.</AnimatedText>
                    </div>
                </div>
            </div>
        </section>
    )
}
