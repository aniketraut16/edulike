"use client";
import AnimatedText from "@/components/Home/AnimatedText";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { motion } from "motion/react";
import { FiMessageCircle, FiMessageSquare, FiMapPin, FiPhone } from "react-icons/fi";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the WorldMap component with no SSR
const WorldMap = dynamic(() => import("@/components/ui/world-map"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-50">
            <div className="animate-pulse text-gray-400">Loading map...</div>
        </div>
    )
});

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const faqs = [
    {
        question: "What courses do you offer?",
        answer: "We offer a wide range of courses across various disciplines including technology, business, design, marketing, personal development, and more. Our catalog is regularly updated with new content."
    },
    {
        question: "How do I enroll in a course?",
        answer: "To enroll in a course, simply browse our course catalog, select the course you're interested in, and click the 'Enroll' button. You'll be guided through the payment process, after which you'll gain immediate access to the course materials."
    },
    {
        question: "Are there any prerequisites for your courses?",
        answer: "Prerequisites vary by course. Some advanced courses may require prior knowledge or completion of beginner courses. All prerequisites are clearly listed on each course's description page."
    },
    {
        question: "What is your refund policy?",
        answer: "We offer a 30-day money-back guarantee for most of our courses. If you're unsatisfied with your purchase, you can request a refund within 30 days of enrollment."
    },
    {
        question: "How long do I have access to a course after purchase?",
        answer: "Once you purchase a course, you have lifetime access to the course materials, including any future updates to the content."
    },
    {
        question: "Do you offer certificates upon course completion?",
        answer: "Yes, we provide certificates of completion for all our courses. These certificates can be downloaded, printed, or shared directly on your social media profiles."
    }
];

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showMap, setShowMap] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            console.log(values);
            setIsSubmitting(false);
            setIsSubmitted(true);
            form.reset();
        }, 1500);
    }

    // Defer loading the map until after initial page render and animations
    useEffect(() => {
        // Wait for initial animations to complete before showing map
        const timer = setTimeout(() => {
            setShowMap(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="py-40 bg-white w-full">
            <div className="text-center mb-16">
                {/* Framer Motion animation for heading section */}
                <motion.div
                    className="inline-block mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <span
                        className="px-4 py-2 rounded-full text-sm font-semibold"
                        style={{
                            background: "linear-gradient(90deg, #F3E6F1 0%, #FDE6F1 100%)",
                            color: "#8D1A5F"
                        }}
                    >
                        Contact Us
                    </span>
                </motion.div>
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                >
                    We're Here to Help{" "}
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
                        You
                    </span>
                </motion.h2>
                <motion.p
                    className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                >
                    Have a question, feedback, or need support? Reach out to us and our team will get back to you as soon as possible. You can email us at <a href="mailto:support@kceducation.com" className="text-[#8D1A5F] underline">support@kceducation.com</a> or use the contact form below.
                </motion.p>
            </div>

            {/* Map section with deferred loading */}
            <div className="w-full relative h-[400px] bg-gray-50">
                {!showMap && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 border-4 border-[#8D1A5F] border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-500">Loading global presence map...</p>
                        </div>
                    </div>
                )}

                {showMap && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <WorldMap
                            lineColor="#8D1A5F"
                            dots={[
                                {
                                    start: {
                                        lat: 64.2008,
                                        lng: -149.4937,
                                    }, // Alaska (Fairbanks)
                                    end: {
                                        lat: 34.0522,
                                        lng: -118.2437,
                                    }, // Los Angeles
                                },
                                {
                                    start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                                    end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                                },
                                {
                                    start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                                    end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
                                },
                                {
                                    start: { lat: 51.5074, lng: -0.1278 }, // London
                                    end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                                },
                                {
                                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                                    end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
                                },
                                {
                                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                                    end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                                },
                            ]}
                        />
                    </motion.div>
                )}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Chat to sales card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 relative">
                        <div className="bg-gray-50 rounded-full p-4 w-14 h-14 flex items-center justify-center mb-8">
                            <FiMessageCircle className="h-6 w-6 text-gray-700" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat to sales</h3>
                        <p className="text-gray-500 mb-8">Speak to our friendly team.</p>
                        <a href="mailto:sales@kceducation.com" className="bg-[#8D1A5F] hover:bg-[#8D1A5F] text-white py-3 px-4 rounded-md transition-colors w-full block text-center font-medium">
                            sales@kceducation.com
                        </a>
                    </div>

                    {/* Chat to support card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 relative">
                        <div className="bg-gray-50 rounded-full p-4 w-14 h-14 flex items-center justify-center mb-8">
                            <FiMessageSquare className="h-6 w-6 text-gray-700" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat to support</h3>
                        <p className="text-gray-500 mb-8">We're here to help.</p>
                        <a href="mailto:support@kceducation.com" className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-3 px-4 rounded-md transition-colors w-full block text-center font-medium">
                            support@kceducation.com
                        </a>
                    </div>

                    {/* Visit us card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 relative">
                        <div className="bg-gray-50 rounded-full p-4 w-14 h-14 flex items-center justify-center mb-8">
                            <FiMapPin className="h-6 w-6 text-gray-700" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit us</h3>
                        <p className="text-gray-500 mb-8">Visit our office HQ.</p>
                        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-3 px-4 rounded-md transition-colors w-full block text-center font-medium">
                            View on Google Maps
                        </a>
                    </div>

                    {/* Call us card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 relative">
                        <div className="bg-gray-50 rounded-full p-4 w-14 h-14 flex items-center justify-center mb-8">
                            <FiPhone className="h-6 w-6 text-gray-700" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Call us</h3>
                        <p className="text-gray-500 mb-8">Mon-Fri from 8am to 5pm.</p>
                        <a href="tel:+15550000000" className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-3 px-4 rounded-md transition-colors w-full block text-center font-medium">
                            +1 (555) 000-0000
                        </a>
                    </div>
                </div>
            </div>

            {/* FAQ and Contact Form Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                <div className="text-center mb-16">
                    <AnimatedText as="h2" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Frequently Asked Questions
                    </AnimatedText>
                    <AnimatedText className="text-lg text-gray-600 max-w-3xl mx-auto" delay={0.1}>
                        Find answers to common questions about our courses, enrollment process, and more.
                    </AnimatedText>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* FAQ Section */}
                    <div className="bg-white rounded-xl shadow-sm border-2 border-gray-100 p-8">
                        <AnimatedText as="h3" className="text-2xl font-semibold text-gray-900 mb-6 font-raleway ">
                            Common Questions
                        </AnimatedText>

                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-left font-medium text-gray-800">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-600">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-xl shadow-sm border-2 border-gray-100 p-8">
                        <AnimatedText as="h3" className="text-2xl font-semibold text-gray-900 mb-6 font-raleway ">
                            Send Us a Message
                        </AnimatedText>

                        {isSubmitted ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h4>
                                <p className="text-gray-600 mb-4">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                                <Button
                                    onClick={() => setIsSubmitted(false)}
                                    className="bg-[#8D1A5F] hover:bg-[#8D1A5F]/90 text-white"
                                >
                                    Send Another Message
                                </Button>
                            </div>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700">Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your name" {...field} className="border-gray-300" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700">Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your email" {...field} className="border-gray-300" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700">Subject</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Message subject" {...field} className="border-gray-300" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700">Message</FormLabel>
                                                <FormControl>
                                                    <textarea
                                                        placeholder="Your message"
                                                        {...field}
                                                        className="min-h-32 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#8D1A5F] disabled:cursor-not-allowed disabled:opacity-50"
                                                        rows={5}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="bg-[#8D1A5F] hover:bg-[#8D1A5F]/90 text-white w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </Button>
                                </form>
                            </Form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
