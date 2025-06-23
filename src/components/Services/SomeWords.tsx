"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedText from '../Home/AnimatedText'

export default function SomeWords(data: {
    title: string;
    personImage: string;
    companyImage: string;
    personName: string;
    personTitle: string;
    personWords: string;
}) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <div className="bg-[#f5f0e8] py-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedText as="h2" className="text-4xl md:text-5xl font-bold text-center mb-20 text-gray-900">
                    {data.title}
                </AnimatedText>

                <div ref={ref} className="flex flex-col items-center">
                    {/* Profile Images */}
                    <div className="relative mb-12">
                        {/* Company Logo */}
                        <motion.div
                            className="absolute -left-16 top-1/2 -translate-y-1/2 bg-black rounded-full w-24 h-24 flex items-center justify-center z-10 shadow-lg"
                            initial={{ opacity: 0, x: -50 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <motion.img
                                src={data.companyImage}
                                alt="Company logo"
                                className="w-16 h-16 object-contain"
                                animate={inView ? { rotateY: [0, 360] } : {}}
                                transition={{ duration: 1.5, delay: 0.8 }}
                            />
                        </motion.div>

                        {/* Person Image */}
                        <motion.div
                            className="w-28 h-28 rounded-full border-4 border-teal-400 overflow-hidden shadow-lg"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <img
                                src={data.personImage}
                                alt={data.personName}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>

                    {/* Quote */}
                    <motion.div
                        className="text-center max-w-3xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <motion.p
                                className="text-xl md:text-2xl font-medium mb-10 leading-relaxed text-gray-800"
                                initial={{ scale: 0.95 }}
                                animate={inView ? { scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                "{data.personWords}"
                            </motion.p>
                        </motion.div>

                        {/* Person Info */}
                        <motion.div
                            className="mt-8"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            <h4 className="text-xl font-bold text-gray-900">{data.personName}</h4>
                            <p className="text-gray-600 mt-1">{data.personTitle}</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
