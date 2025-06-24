"use client"
import { getLearnings, Learning } from '@/utils/learnings';
import Link from 'next/link';
import React, { useState } from 'react'

export default function page() {
    const [learnings, setLearnings] = useState<Learning[]>(getLearnings());
    return (
        <div className="mx-auto py-12 px-4 bg-slate-50">
            <div className="container mx-auto pt-[10vh]">
                <h1 className="text-4xl font-bold mb-8"> MY LEARNINGS</h1>
                <div className="flex gap-2 mb-8">
                    <button
                        className="px-3 py-1.5 rounded-full font-normal border border-[#8D1A5F] text-[#8D1A5F] bg-transparent"
                        onClick={() => setLearnings(getLearnings().filter(l => l.status === "in-progress"))}
                    >
                        In Progress
                    </button>
                    <button
                        className="px-3 py-1.5 rounded-full font-normal border border-[#8D1A5F] text-[#8D1A5F] bg-transparent"
                        onClick={() => setLearnings(getLearnings().filter(l => l.status === "completed"))}
                    >
                        Completed
                    </button>
                    <button
                        className="px-3 py-1.5 rounded-full font-normal border border-[#8D1A5F] text-[#8D1A5F] bg-transparent"
                        onClick={() => setLearnings(getLearnings())}
                    >
                        All
                    </button>
                </div>
                <div className="flex flex-col gap-8">

                    {learnings.length > 0 ? (
                        learnings.map((item) => (
                            <>
                                <div key={item.courseId} className="mb-4 rounded-lg shadow-sm bg-white p-6">

                                    <div className="flex items-start gap-6">
                                        <div className="w-24 h-24 relative">
                                            <img
                                                src={item.courseImage}
                                                alt={item.courseName}
                                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                                className="rounded-md"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-xl font-medium">
                                                {item.courseName}
                                                {item.courseType !== "individual" && (
                                                    <p
                                                        className="p-1 px-2 rounded-full text-sm font-semibold w-fit"
                                                        style={{
                                                            background: "linear-gradient(90deg, #F3E6F1 0%, #FDE6F1 100%)",
                                                            color: "#8D1A5F"
                                                        }}
                                                    >
                                                        For {item.courseType.charAt(0).toUpperCase() + item.courseType.slice(1)} ({item.assignCount}/{item.assignLimit}) left
                                                    </p>
                                                )}
                                            </h3>
                                            <p className="text-gray-600">{item.courseDescription}</p>
                                            <div className="w-full mt-2">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-gray-600 text-sm font-medium">Progress</span>
                                                    <span className="text-gray-600 text-sm font-medium">{item.progress}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-[#6a1347] to-[#8D1A5F] h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${item.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="flex flex-col items-center justify-between mt-2 gap-3">
                                            <button
                                                className="text-white bg-[#8D1A5F] text-sm font-medium px-4 py-2 rounded  hover:bg-blue-50 transition  w-[150px]"
                                                onClick={() => window.location.href = `/learning/${item.courseId}`}
                                            >
                                                Resume
                                            </button>
                                            {item.courseType !== "individual" && (
                                                <button
                                                    className="text-white bg-[#8D1A5F] text-sm font-medium px-4 py-2 rounded  hover:bg-blue-50 transition  w-[150px]"
                                                >
                                                    Assign to {item.courseType === "institution" ? "Student" : "Employee"}
                                                </button>
                                            )}
                                        </div>


                                    </div>
                                </div>
                            </>
                        ))
                    ) : (
                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                            <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                            <p className="text-gray-600">Add some products to get started!</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
