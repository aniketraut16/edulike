import React from 'react'
import Hero from '@/components/Services/Hero'
import ServiceCardies from '@/components/Services/ServiceCardies'
import SomeWords from '@/components/Services/SomeWords'
import OrganizationCourses from '@/components/Services/OrganizationCourses';
import HowItWorks from '@/components/Services/HowItWorks';

export default function CorporatePage() {
    const corporateServices = [
        {
            tag: "Enterprise-wide training",
            title: "Upskill your entire organization",
            description: "Comprehensive training programs designed to elevate skills across your entire workforce, ensuring everyone stays ahead in a rapidly evolving business landscape.",
            image: "/images/corporate.jpg"
        },
        {
            tag: "Certification preparation",
            title: "Develop and validate skills",
            description: "Prepare your team for industry-recognized certifications with structured learning paths and practice assessments that ensure high pass rates.",
            image: "/images/institution.jpg"
        },
        {
            tag: "AI Upskilling",
            title: "Partner with us on your learning strategy",
            description: "Leverage our expertise to create a customized learning strategy that aligns with your business goals and prepares your workforce for the AI-driven future.",
            image: "/images/individual.jpg"
        }
    ];

    const howItWorksData = {
        title: "Learn More About Process",
        description: "Was are delightful solicitude discovered collecting man day. Resolving neglected sir tolerably.",
        steps: [
            {
                title: "Register",
                description: "It more shed went up is roof if loud case. Delay music in lived noise an.",
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )
            },
            {
                title: "Complete Setup",
                description: "Beyond genius really enough passed is up. Up maids me an ample stood given.",
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="8" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )
            },
            {
                title: "Utilize App",
                description: "Certainty say suffering his him collected intention promotion. Hill sold ham men.",
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L3 7L12 12L21 7L12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )
            }
        ]
    };

    return (
        <div>
            <Hero
                title="Online training today for the skills you need tomorrow"
                buttons={[
                    {
                        text: "Book a demo",
                        link: "/contact"
                    },
                    {
                        text: "Guided tour",
                        link: "/tour"
                    }
                ]}
                image="/images/corporate.jpg"
            />
            <ServiceCardies services={corporateServices} />
            <HowItWorks {...howItWorksData} />
            <SomeWords
                title="Don't just take it from us"
                personImage="/images/individual.jpg"
                companyImage="/logo.png"
                personName="Thaiyal Nayaki Sathyamoorthy"
                personTitle="Assistant Manager of L&D for Data and AI, Genpact"
                personWords="We wanted a holistic, easy- to-use, cloud-based platform where we could curate our own GenAI program — all from a partner who understood the industry landscape. We chose Udemy."
            />
            <OrganizationCourses forCorporate={true} />
        </div>
    )
}
