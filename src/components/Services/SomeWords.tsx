"use client"
import React from 'react'

export default function SomeWords(data: {
    title: string;
    personImage: string;
    companyImage: string;
    personName: string;
    personTitle: string;
    personWords: string;
}) {
    return (
        <div className="bg-[#f5f0e8] py-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-gray-900">{data.title}</h2>

                <div className="flex flex-col items-center">
                    {/* Profile Images */}
                    <div className="relative mb-12">
                        {/* Company Logo */}
                        <div className="absolute -left-16 top-1/2 -translate-y-1/2 bg-black rounded-full w-24 h-24 flex items-center justify-center z-10 shadow-lg">
                            <img
                                src={data.companyImage}
                                alt="Company logo"
                                className="w-16 h-16 object-contain"
                            />
                        </div>

                        {/* Person Image */}
                        <div className="w-28 h-28 rounded-full border-4 border-teal-400 overflow-hidden shadow-lg">
                            <img
                                src={data.personImage}
                                alt={data.personName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Quote */}
                    <div className="text-center max-w-3xl">
                        <p className="text-xl md:text-2xl font-medium mb-10 leading-relaxed text-gray-800">
                            "{data.personWords}"
                        </p>

                        {/* Person Info */}
                        <div className="mt-8">
                            <h4 className="text-xl font-bold text-gray-900">{data.personName}</h4>
                            <p className="text-gray-600 mt-1">{data.personTitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
