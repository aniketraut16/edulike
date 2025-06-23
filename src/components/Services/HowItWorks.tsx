"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedText from '../Home/AnimatedText'
import { BoxReveal } from '../magicui/box-reveal'
import { FiShoppingCart, FiCheckSquare, FiUsers } from 'react-icons/fi'

export default function HowItWorks(data: {
    title: string,
    description: string,
    steps: {
        title: string,
        description: string,
        icon: React.ReactNode
    }[]
}) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Default icons if none provided
    const defaultIcons = [
        <FiShoppingCart size={48} />,
        <FiCheckSquare size={48} />,
        <FiUsers size={48} />
    ];

    return (
        <div className="w-full py-20 bg-[#f5f0e8]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="flex justify-center mb-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-[#8D1A5F]"
                        >
                            <FiUsers size={40} />
                        </motion.div>
                    </div>
                    <AnimatedText as="h2" className="text-4xl font-bold mb-4">
                        {data.title}
                    </AnimatedText>
                    <AnimatedText as="p" className="text-gray-500 max-w-2xl" delay={0.2}>
                        {data.description}
                    </AnimatedText>
                </div>

                <div ref={ref} className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                    {data.steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center text-center w-full md:w-1/3 relative"
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            {/* Step Number */}
                            <motion.div
                                className="absolute top-0 left-0 text-5xl font-bold text-gray-200"
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                            >
                                {index + 1}
                            </motion.div>

                            {/* Icon Circle */}
                            <BoxReveal width="fit-content" boxColor="#8D1A5F" duration={0.7}>
                                <div className="w-36 h-36 rounded-full bg-white shadow-md flex items-center justify-center mb-6 relative z-10 border border-gray-100">
                                    <div className="text-[#8D1A5F] flex items-center justify-center">
                                        {step.icon || defaultIcons[index]}
                                    </div>
                                </div>
                            </BoxReveal>

                            {/* Title */}
                            <AnimatedText as="h3" className="text-xl font-semibold mb-3" delay={0.3 + index * 0.1}>
                                {step.title}
                            </AnimatedText>

                            {/* Description */}
                            <AnimatedText as="p" className="text-gray-500 px-4" delay={0.4 + index * 0.1}>
                                {step.description}
                            </AnimatedText>
                        </motion.div>
                    ))}

                    {/* Connecting Lines */}
                    {inView && (
                        <>
                            <motion.div
                                className="hidden md:block absolute top-1/3 left-1/4 w-1/4 border-t-2 border-dashed border-gray-300"
                                initial={{ width: 0 }}
                                animate={{ width: '25%' }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            ></motion.div>
                            <motion.div
                                className="hidden md:block absolute top-1/3 right-1/4 w-1/4 border-t-2 border-dashed border-gray-300"
                                initial={{ width: 0 }}
                                animate={{ width: '25%' }}
                                transition={{ duration: 0.8, delay: 0.9 }}
                            ></motion.div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
