import React from 'react'
import Hero from '@/components/Services/Hero'
import ServiceCardies from '@/components/Services/ServiceCardies'
import SomeWords from '@/components/Services/SomeWords'
import OrganizationCourses from '@/components/Services/OrganizationCourses'
import HowItWorks from '@/components/Services/HowItWorks'
import { FiCreditCard, FiCheckSquare, FiUserPlus } from 'react-icons/fi'

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
                icon: <FiCreditCard size={48} />
            },
            {
                title: "Select & Assign Courses",
                description: "Choose which courses to assign, set the number of seats per course, and allocate them to specific employees or teams.",
                icon: <FiCheckSquare size={48} />
            },
            {
                title: "Share with Employees",
                description: "Send course invitations to your employees. They can start learning right away, and you can monitor their progress in real time.",
                icon: <FiUserPlus size={48} />
            }
        ]
    };

    // Function to handle smooth scrolling for anchor links
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div>
            <Hero
                title="Knowledge Center for Corporates"
                buttons={[
                    {
                        text: "Get Started",
                        link: "/courses?for=corporates"
                    },
                    {
                        text: "How It Works",
                        link: "#how-it-works"
                    }
                ]}
                image="/images/corporate.jpg"
            />
            <OrganizationCourses forCorporate={true} />
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

            <section className="bg-gray-50 pb-12">
                <div className="container mx-auto bg-white rounded-lg p-8">
                    <div className="container mx-auto text-center">
                        <h3 className="text-2xl font-semibold mb-4">Ready to Upskill Your Organization?</h3>
                        <p className="mb-6 text-gray-700">Get started today and see how easy it is to manage learning for your entire workforce.</p>
                        <a
                            href="/courses?for=corporates"
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
