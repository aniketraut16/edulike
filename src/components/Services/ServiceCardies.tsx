"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedText from '../Home/AnimatedText'

export default function ServiceCardies(data: {
    services: {
        tag: string;
        title: string;
        description: string;
        image: string;
    }[]
}) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="bg-[#f5f0e8] py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {data.services.map((service, index) => (
                        <ServiceCard key={index} service={service} index={index} />
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

function ServiceCard({ service, index }: {
    service: {
        tag: string;
        title: string;
        description: string;
        image: string;
    },
    index: number
}) {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: index * 0.1
            }
        }
    };

    return (
        <motion.div
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg h-[500px] cursor-pointer"
            whileHover="hover"
            initial="initial"
            animate="initial"
            variants={cardVariants}
            whileTap={{ scale: 0.98 }}
        >
            {/* Tag */}
            <motion.div
                className="absolute top-4 left-4 z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
                <motion.div
                    className="border border-white rounded-md px-4 py-1 text-sm text-gray-900 backdrop-blur-sm shadow-sm"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.9)" }}
                >
                    {service.tag}
                </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
                className="w-full h-full"
                variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.05 }
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* White background that expands from bottom */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl"
                variants={{
                    initial: { height: '30%' },
                    hover: { height: '55%' }
                }}
                transition={{
                    duration: 0.8,
                    ease: [0.19, 1.0, 0.22, 1.0] // Custom easing for more natural expansion
                }}
            >
                {/* Content container */}
                <div className="p-6 h-full flex flex-col pt-10">
                    {/* Title - Always visible */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>

                    {/* Description container with hidden overflow */}
                    <div className="overflow-hidden">
                        {/* Description that slides up from below */}
                        <motion.div
                            variants={{
                                initial: { y: 80, opacity: 0 },
                                hover: { y: 0, opacity: 1 }
                            }}
                            transition={{
                                duration: 0.5,
                                delay: 0.1,
                                ease: [0.19, 1.0, 0.22, 1.0] // Matching easing
                            }}
                        >
                            <p className="text-gray-700 leading-relaxed">{service.description}</p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}