import EnhancedCourseCard from "@/components/Home/CourseCard";
import Link from "next/link";
import AnimatedText from "@/components/Home/AnimatedText";
import { BoxReveal } from "@/components/magicui/box-reveal";

export default function OrganizationCourses({ forCorporate }: { forCorporate: boolean }) {
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
                    {[
                        {
                            id: "1",
                            slug: "full-stack-web-development-react-nodejs",
                            title: "Full-Stack Web Development with React & Node.js",
                            description: "Master modern web development by building real-world applications using React, Node.js, Express, and MongoDB.",
                            image: "https://i.ytimg.com/vi/5i8ej1-GpFU/maxresdefault.jpg",
                            instructor: "Sarah Thompson",
                            pricing: {
                                individual: {
                                    price: 149,
                                    tobegive: "Complete access",
                                    assignlimit: 1
                                },
                                institution: [
                                    { assignLimit: 50, price: 7450 },
                                    { assignLimit: 100, price: 14900 }
                                ],
                                corporate: [
                                    { assignLimit: 25, price: 3725 },
                                    { assignLimit: 50, price: 7450 }
                                ]
                            },
                            lessons: 42,
                            difficulty_level: "Intermediate",
                            language: "English",
                            rating: 4.9,
                            category: "Web Development",
                            enrollment_count: 3000
                        },
                        {
                            id: "2",
                            slug: "python-data-science-machine-learning",
                            title: "Python for Data Science & Machine Learning",
                            description: "Learn Python from scratch and apply it to data analysis, visualization, and machine learning projects.",
                            image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230318230239/Python-Data-Science-Tutorial.jpg",
                            instructor: "Dr. Anil Mehra",
                            pricing: {
                                individual: {
                                    price: 129,
                                    tobegive: "Complete access",
                                    assignlimit: 1
                                },
                                institution: [
                                    { assignLimit: 50, price: 6450 },
                                    { assignLimit: 100, price: 12900 }
                                ],
                                corporate: [
                                    { assignLimit: 25, price: 3225 },
                                    { assignLimit: 50, price: 6450 }
                                ]
                            },
                            lessons: 38,
                            difficulty_level: "Beginner",
                            language: "English",
                            rating: 4.8,
                            category: "Data Science",
                            enrollment_count: 2500
                        },
                        {
                            id: "3",
                            slug: "uiux-design-essentials-figma-prototyping",
                            title: "UI/UX Design Essentials: Figma to Prototyping",
                            description: "Design beautiful and user-friendly interfaces with Figma, and learn the fundamentals of UX research and prototyping.",
                            image: "https://static.skillshare.com/uploads/video/thumbnails/0bcdb57f80be0d1cceb3f11e51408c6e/original",
                            instructor: "Emily Carter",
                            pricing: {
                                individual: {
                                    price: 99,
                                    tobegive: "Complete access",
                                    assignlimit: 1
                                },
                                institution: [
                                    { assignLimit: 50, price: 4950 },
                                    { assignLimit: 100, price: 9900 }
                                ],
                                corporate: [
                                    { assignLimit: 25, price: 2475 },
                                    { assignLimit: 50, price: 4950 }
                                ]
                            },
                            lessons: 27,
                            difficulty_level: "Beginner",
                            language: "English",
                            rating: 4.7,
                            category: "Design",
                            enrollment_count: 1800
                        },
                        {
                            id: "4",
                            slug: "advanced-javascript-es6-typescript-patterns",
                            title: "Advanced JavaScript: ES6+, TypeScript & Patterns",
                            description: "Deep dive into modern JavaScript, TypeScript, and advanced programming patterns for scalable applications.",
                            image: "https://miro.medium.com/v2/resize:fit:1400/1*8njcJv-4iLyrZV76FhdkDg.png",
                            instructor: "Michael Lee",
                            pricing: {
                                individual: {
                                    price: 139,
                                    tobegive: "Complete access",
                                    assignlimit: 1
                                },
                                institution: [
                                    { assignLimit: 50, price: 6950 },
                                    { assignLimit: 100, price: 13900 }
                                ],
                                corporate: [
                                    { assignLimit: 25, price: 3475 },
                                    { assignLimit: 50, price: 6950 }
                                ]
                            },
                            lessons: 34,
                            difficulty_level: "Advanced",
                            language: "English",
                            rating: 4.9,
                            category: "Programming",
                            enrollment_count: 2200
                        },
                        {
                            id: "5",
                            slug: "digital-marketing-masterclass-seo-sem-analytics",
                            title: "Digital Marketing Masterclass: SEO, SEM & Analytics",
                            description: "Grow your business or career with hands-on digital marketing strategies, SEO, SEM, and Google Analytics.",
                            image: "https://media.assettype.com/analyticsinsight/2024-08-06/9k7iet26/Top-75-Digital-Marketing-Courses-to-Explore.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true",
                            instructor: "Priya Sharma",
                            pricing: {
                                individual: {
                                    price: 119,
                                    tobegive: "Complete access",
                                    assignlimit: 1
                                },
                                institution: [
                                    { assignLimit: 50, price: 5950 },
                                    { assignLimit: 100, price: 11900 }
                                ],
                                corporate: [
                                    { assignLimit: 25, price: 2975 },
                                    { assignLimit: 50, price: 5950 }
                                ]
                            },
                            lessons: 30,
                            difficulty_level: "Intermediate",
                            language: "English",
                            rating: 4.6,
                            category: "Marketing",
                            enrollment_count: 3200
                        },
                        {
                            id: "6",
                            slug: "introduction-cloud-computing-aws",
                            title: "Introduction to Cloud Computing with AWS",
                            description: "Get started with cloud computing and learn how to deploy, manage, and scale applications on AWS.",
                            image: "https://images.squarespace-cdn.com/content/v1/60cfd646701da4034512a1c5/ca3d678a-cbfc-4c9c-bc79-9d3be9fb907e/AWS-Cloud.png?format=2500w",
                            instructor: "David Kim",
                            pricing: {
                                individual: {
                                    price: 109,
                                    tobegive: "Complete access",
                                    assignlimit: 1
                                },
                                institution: [
                                    { assignLimit: 50, price: 5450 },
                                    { assignLimit: 100, price: 10900 }
                                ],
                                corporate: [
                                    { assignLimit: 25, price: 2725 },
                                    { assignLimit: 50, price: 5450 }
                                ]
                            },
                            lessons: 22,
                            difficulty_level: "Beginner",
                            language: "English",
                            rating: 4.5,
                            category: "Cloud Computing",
                            enrollment_count: 1500
                        }
                    ].map((item, index) => (
                        <EnhancedCourseCard key={index} item={item} />
                    ))}
                </div>
                <AnimatedText as="div" className="text-center mt-16" delay={0.3}>
                    <Link
                        href="/courses"
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
