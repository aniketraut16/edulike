import React from 'react'
import Hero from '@/components/Services/Hero'
import ServiceCardies from '@/components/Services/ServiceCardies'
import SomeWords from '@/components/Services/SomeWords'
import OrganizationCourses from '@/components/Services/OrganizationCourses'
import HowItWorks from '@/components/Services/HowItWorks'

export default function CorporatePage() {
    // Key benefits for corporates
    const corporateBenefits = [
        {
            tag: "Cost Savings",
            title: "Volume Discounts & Centralized Billing",
            description: "Save more with bulk course purchases and manage all transactions under a single corporate account for simplified billing.",
            image: "/images/billing.jpg"
        },
        {
            tag: "Team Empowerment",
            title: "Upskill Your Workforce",
            description: "Provide your employees with access to industry-leading courses, helping them grow their skills and drive organizational success.",
            image: "/images/growth.jpg"
        },
        {
            tag: "Easy Management",
            title: "Seamless Admin Controls",
            description: "Assign courses, set seat limits, and monitor employee progress with an intuitive admin dashboard designed for organizations.",
            image: "/images/controls.jpg"
        }
    ];

    // How it works steps for KC Corporate
    const howItWorksData = {
        title: "How Corporate Course Access Works",
        description: "Empower your workforce in just a few simple steps. Our Knowledge Center for Corporates makes upskilling your team effortless and efficient.",
        steps: [
            {
                title: "Buy Corporate Courses",
                description: "Browse our catalog and purchase courses under your corporate account. Enjoy volume discounts and centralized billing.",
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="7" width="18" height="13" rx="2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="8" cy="16" r="1" fill="currentColor" />
                        <circle cx="16" cy="16" r="1" fill="currentColor" />
                    </svg>
                )
            },
            {
                title: "Select & Assign Courses",
                description: "Choose which courses to assign, set the number of seats per course, and allocate them to specific employees or teams.",
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="4" width="16" height="16" rx="3" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )
            },
            {
                title: "Share with Employees",
                description: "Send course invitations to your employees. They can start learning right away, and you can monitor their progress in real time.",
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M4 20C4 16.6863 7.13401 14 11 14H13C16.866 14 20 16.6863 20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M16 8L20 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M20 8L16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                )
            }
        ]
    };

    return (
        <div>
            <Hero
                title="Knowledge Center for Corporates"
                buttons={[
                    {
                        text: "Book a Demo",
                        link: "/contact"
                    },
                    {
                        text: "See How It Works",
                        link: "#how-it-works"
                    }
                ]}
                image="/images/corporate.jpg"
            />
            <ServiceCardies services={corporateBenefits} />
            <div id="how-it-works">
                <HowItWorks {...howItWorksData} />
            </div>
            <SomeWords
                title="What Our Corporate Clients Say"
                personImage="/images/individual.jpg"
                companyImage="/logo.png"
                personName="Thaiyal Nayaki Sathyamoorthy"
                personTitle="Assistant Manager of L&D for Data and AI, Genpact"
                personWords="The Knowledge Center for Corporates made it incredibly easy to purchase and distribute courses to our teams. The admin dashboard gives us full visibility into employee progress and engagement."
            />
            <OrganizationCourses forCorporate={true} />
            <section className="bg-gray-50 pb-12">
                <div className="container mx-auto bg-white rounded-lg p-8">
                    <div className="container mx-auto text-center">
                        <h3 className="text-2xl font-semibold mb-4">Ready to Upskill Your Organization?</h3>
                        <p className="mb-6 text-gray-700">Get started today and see how easy it is to manage learning for your entire workforce.</p>
                        <a
                            href="/contact"
                            className="inline-block px-8 py-3 rounded-lg text-white font-semibold shadow-lg hover:scale-105 transition"
                            style={{
                                background: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)",
                                color: "#fff"
                            }}
                        >
                            Book a Corporate Demo
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
