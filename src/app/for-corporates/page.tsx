import React from 'react'
import Hero from '@/components/Services/Hero'
import ServiceCardies from '@/components/Services/ServiceCardies'
import SomeWords from '@/components/Services/SomeWords'

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
            <SomeWords
                title="Don't just take it from us"
                personImage="/images/individual.jpg"
                companyImage="/logo.png"
                personName="Thaiyal Nayaki Sathyamoorthy"
                personTitle="Assistant Manager of L&D for Data and AI, Genpact"
                personWords="We wanted a holistic, easy- to-use, cloud-based platform where we could curate our own GenAI program — all from a partner who understood the industry landscape. We chose Udemy."
            />
        </div>
    )
}
