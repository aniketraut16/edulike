import React from 'react'
import Hero from '@/components/Services/Hero'
import ServiceCardies from '@/components/Services/ServiceCardies'
import SomeWords from '@/components/Services/SomeWords'
import OrganizationCourses from '@/components/Services/OrganizationCourses'
import HowItWorks from '@/components/Services/HowItWorks'
import { FiBookOpen, FiUsers, FiBarChart2 } from 'react-icons/fi'

export default function InstitutionsPage() {
    // Key benefits for institutions
    const institutionBenefits = [
        {
            tag: "Academic Excellence",
            title: "Enhance Learning Outcomes",
            description: "Supplement your curriculum with industry-relevant courses that prepare students for real-world challenges and improve academic performance.",
            image: "/images/institution.jpg"
        },
        {
            tag: "Student Success",
            title: "Career-Ready Graduates",
            description: "Equip your students with practical skills that employers demand, increasing their employability and career prospects after graduation.",
            image: "/images/individual.jpg"
        },
        {
            tag: "Institutional Growth",
            title: "Data-Driven Insights",
            description: "Access comprehensive analytics on student engagement and performance to continuously improve your educational offerings and outcomes.",
            image: "/images/corporate.jpg"
        }
    ];

    // How it works steps for KC Institutions
    const howItWorksData = {
        title: "How Institution Access Works",
        description: "Enhance your educational offerings in just a few simple steps. Our Knowledge Center for Institutions makes implementing additional learning resources seamless.",
        steps: [
            {
                title: "Partner With Us",
                description: "Choose from flexible licensing options that fit your institution's size, needs, and budget. We offer special pricing for educational institutions.",
                icon: <FiBookOpen size={48} />
            },
            {
                title: "Set Up Student Access",
                description: "Easily create student accounts and manage access through our intuitive admin dashboard. Integrate with your existing LMS if needed.",
                icon: <FiUsers size={48} />
            },
            {
                title: "Track & Measure Success",
                description: "Monitor student engagement, course completion rates, and learning outcomes with our comprehensive analytics dashboard.",
                icon: <FiBarChart2 size={48} />
            }
        ]
    };

    return (
        <div>
            <Hero
                title="Knowledge Center for Educational Institutions"
                buttons={[
                    {
                        text: "Get Started",
                        link: "/courses?for=institutions"
                    },
                    {
                        text: "How It Works",
                        link: "#how-it-works"
                    }
                ]}
                image="/images/institution.jpg"
            />
            <OrganizationCourses forCorporate={false} />
            <ServiceCardies services={institutionBenefits} />
            <div id="how-it-works">
                <HowItWorks {...howItWorksData} />
            </div>
            <SomeWords
                title="What Our Educational Partners Say"
                personImage="/images/individual.jpg"
                companyImage="/logo.png"
                personName="Dr. Sarah Johnson"
                personTitle="Dean of Digital Learning, University of Technology"
                personWords="The Knowledge Center has transformed how we approach supplemental learning. Our students now have access to industry-relevant content that perfectly complements our curriculum, and the analytics help us identify areas where students need additional support."
            />
            <section className="bg-gray-50 pb-12">
                <div className="container mx-auto bg-white rounded-lg p-8">
                    <div className="container mx-auto text-center">
                        <h3 className="text-2xl font-semibold mb-4">Ready to Enhance Your Educational Offerings?</h3>
                        <p className="mb-6 text-gray-700">Partner with us today and give your students access to world-class learning resources.</p>
                        <a
                            href="/courses?for=institutions"
                            className="inline-block px-8 py-3 rounded-lg text-white font-semibold shadow-lg hover:scale-105 transition"
                            style={{
                                background: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)",
                                color: "#fff"
                            }}
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
} 