import React from 'react'

export default function HowItWorks(data: {
    title: string,
    description: string,
    steps: {
        title: string,
        description: string,
        icon: React.ReactNode
    }[]
}) {
    return (
        <div className="w-full py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="flex justify-center mb-4">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 6L7.5 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 10L12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16.5 14L16.5 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-bold mb-4">{data.title}</h2>
                    <p className="text-gray-500 max-w-2xl">{data.description}</p>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                    {data.steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center w-full md:w-1/3 relative">
                            {/* Step Number */}
                            <div className="absolute top-0 left-0 text-2xl font-bold text-gray-200">
                                {index + 1}
                            </div>

                            {/* Icon Circle */}
                            <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center mb-6 relative z-10">
                                <div className="w-16 h-16 text-teal-600">
                                    {step.icon}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>

                            {/* Description */}
                            <p className="text-gray-500 px-4">{step.description}</p>
                        </div>
                    ))}

                    {/* Connecting Lines */}
                    <div className="hidden md:block absolute top-1/3 left-1/4 w-1/4 border-t-2 border-dashed border-gray-300"></div>
                    <div className="hidden md:block absolute top-1/3 right-1/4 w-1/4 border-t-2 border-dashed border-gray-300"></div>
                </div>
            </div>
        </div>
    )
}
