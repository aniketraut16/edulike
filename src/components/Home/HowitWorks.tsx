"use client"
import { BookOpen, CreditCard, GraduationCap, Users } from "lucide-react"
import { motion } from "framer-motion"

export default function HowitWorks({ isMobile }: { isMobile: boolean }) {
    const steps = [
        {
            number: "1",
            icon: <BookOpen className="w-12 h-12 text-blue-600" />,
            title: "Browse & Choose",
            description: "Explore our comprehensive course catalog and select courses that match your learning goals and interests."
        },
        {
            number: "2",
            icon: <CreditCard className="w-12 h-12 text-green-600" />,
            title: "Enroll & Pay",
            description: "Secure your spot with flexible payment options. Start learning immediately after enrollment."
        },
        {
            number: "3",
            icon: <Users className="w-12 h-12 text-purple-600" />,
            title: "Learn & Practice",
            description: "Access interactive content, video lectures, and hands-on exercises. Learn at your own pace with expert guidance."
        },
        {
            number: "4",
            icon: <GraduationCap className="w-12 h-12 text-orange-600" />,
            title: "Get Certified",
            description: "Complete assessments and projects to earn industry-recognized certificates that boost your career."
        }
    ]

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: isMobile ? 0.15 : 0.3,
                delayChildren: isMobile ? 0.1 : 0.2
            }
        }
    }

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1
        }
    }

    const textVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0
        }
    }

    return (
        <div>
            <div className={`container mx-auto px-6 py-16 ${!isMobile ? "translate-y-1/5" : ""}`}>
                {/* Header Section */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    <motion.h2
                        className={`text-4xl md:text-5xl font-bold mb-4 ${!isMobile ? "text-white" : "text-black"}`}
                        variants={textVariants}
                        transition={{
                            duration: isMobile ? 0.4 : 0.8,
                            ease: "easeOut"
                        }}
                    >
                        How it works
                    </motion.h2>
                    <motion.p
                        className={`text-xl max-w-2xl mx-auto ${!isMobile ? "text-white" : "text-black"}`}
                        variants={textVariants}
                        transition={{
                            duration: isMobile ? 0.4 : 0.8,
                            ease: "easeOut"
                        }}
                    >
                        Transform your career with our comprehensive online education platform designed for modern learners
                    </motion.p>
                </motion.div>

                {/* Steps Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="relative h-full"
                            variants={itemVariants}
                            transition={{
                                duration: isMobile ? 0.3 : 0.6,
                                ease: "easeOut"
                            }}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: isMobile ? 0.1 : 0.2 }
                            }}
                        >
                            {/* Step Card */}
                            <div className="bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-transform duration-300 h-full">
                                {/* Number Badge */}
                                <motion.div
                                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                                    initial={{ scale: 0, rotate: -180 }}
                                    whileInView={{
                                        scale: 1,
                                        rotate: 0,
                                        transition: {
                                            delay: isMobile ? index * 0.05 + 0.2 : index * 0.1 + 0.5,
                                            duration: isMobile ? 0.3 : 0.5,
                                            type: "spring",
                                            stiffness: 200
                                        }
                                    }}
                                    viewport={{ once: true }}
                                >
                                    <div className="w-12 h-12 bg-white border-4 border-blue-200 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-xl font-bold text-blue-600">{step.number}</span>
                                    </div>
                                </motion.div>

                                {/* Content */}
                                <div className="pt-8 text-center">
                                    {/* Icon */}
                                    <motion.div
                                        className="flex justify-center mb-6"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{
                                            scale: 1,
                                            opacity: 1,
                                            transition: {
                                                delay: isMobile ? index * 0.05 + 0.3 : index * 0.1 + 0.7,
                                                duration: isMobile ? 0.2 : 0.4,
                                                type: "spring"
                                            }
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="p-4 bg-gray-50 rounded-2xl">
                                            {step.icon}
                                        </div>
                                    </motion.div>

                                    {/* Title */}
                                    <motion.h3
                                        className="text-xl font-bold text-gray-800 mb-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                delay: isMobile ? index * 0.05 + 0.4 : index * 0.1 + 0.9,
                                                duration: isMobile ? 0.3 : 0.5
                                            }
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        {step.title}
                                    </motion.h3>

                                    {/* Description */}
                                    <motion.p
                                        className="text-gray-600 leading-relaxed"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                delay: isMobile ? index * 0.05 + 0.5 : index * 0.1 + 1.1,
                                                duration: isMobile ? 0.3 : 0.5
                                            }
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        {step.description}
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
