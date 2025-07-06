"use client"
import { useAuth } from '@/context/AuthContext';
import { getLearnings } from '@/utils/learnings';
import { Learning } from '@/types/learning';
import React, { useEffect, useState } from 'react'

export default function page() {
    const [learnings, setLearnings] = useState<Learning[]>([]);
    const [filteredLearnings, setFilteredLearnings] = useState<Learning[]>([]);
    const [filter, setFilter] = useState<"in-progress" | "completed" | "all">("all");
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchLearnings = async () => {
            if (user?.uid) {
                setLoading(true);
                try {
                    const data = await getLearnings(user.uid);
                    setLearnings(data);
                    setFilteredLearnings(data); // Initialize filtered learnings with all data
                } catch (error) {
                    console.error('Error fetching learnings:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchLearnings();
    }, [user?.uid]);

    // Update filtered learnings when learnings data changes
    useEffect(() => {
        if (filter === "all") {
            setFilteredLearnings(learnings);
        } else if (filter === "in-progress") {
            setFilteredLearnings(learnings.filter(l => l.progress < 100));
        } else if (filter === "completed") {
            setFilteredLearnings(learnings.filter(l => l.progress === 100));
        }
    }, [learnings, filter]);

    const handleFilterChange = (newFilter: "in-progress" | "completed" | "all") => {
        setFilter(newFilter);
    };

    const getButtonClasses = (buttonFilter: string) => {
        const baseClasses = "px-3 py-1.5 rounded-full font-normal border transition-all duration-200";
        const activeClasses = "border-[#8D1A5F] text-white bg-[#8D1A5F]";
        const inactiveClasses = "border-[#8D1A5F] text-[#8D1A5F] bg-transparent hover:bg-[#8D1A5F] hover:text-white";

        return `${baseClasses} ${filter === buttonFilter ? activeClasses : inactiveClasses}`;
    };

    return (
        <div className="mx-auto py-12 px-4 bg-slate-50">
            <div className="container mx-auto pt-[10vh]">
                <h1 className="text-4xl font-bold mb-8">MY LEARNINGS</h1>
                <div className="flex gap-2 mb-8">
                    <button
                        className={getButtonClasses("in-progress")}
                        onClick={() => handleFilterChange("in-progress")}
                    >
                        In Progress
                    </button>
                    <button
                        className={getButtonClasses("completed")}
                        onClick={() => handleFilterChange("completed")}
                    >
                        Completed
                    </button>
                    <button
                        className={getButtonClasses("all")}
                        onClick={() => handleFilterChange("all")}
                    >
                        All
                    </button>
                </div>
                <div className="flex flex-col gap-8">
                    {loading ? (
                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8D1A5F] mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading your courses...</p>
                        </div>
                    ) : filteredLearnings.length > 0 ? (
                        filteredLearnings.map((item) => (
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
                                        <h3 className="text-xl font-medium mb-2">
                                            {item.courseName}
                                        </h3>
                                        {item.courseType !== "individual" && (
                                            <p
                                                className="p-1 px-2 rounded-full text-sm font-semibold w-fit mb-2"
                                                style={{
                                                    background: "linear-gradient(90deg, #F3E6F1 0%, #FDE6F1 100%)",
                                                    color: "#8D1A5F"
                                                }}
                                            >
                                                For {item.courseType.charAt(0).toUpperCase() + item.courseType.slice(1)} ({item.assignCount}/{item.assignLimit}) left
                                            </p>
                                        )}
                                        <p className="text-gray-600 mb-3">{item.courseDescription}</p>
                                        <div className="w-full">
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
                                            className="text-white bg-[#8D1A5F] text-sm font-medium px-4 py-2 rounded transition w-[150px] hover:bg-white hover:text-[#8D1A5F] hover:border hover:border-[#8D1A5F] cursor-pointer"
                                            onClick={() => window.location.href = `/learn?course_id=${item.courseId}&enrollment_id=${item.enrollmentId}`}
                                        >
                                            {item.progress === 100 ? 'View Certificate' : 'Resume'}
                                        </button>
                                        {item.courseType !== "individual" && (
                                            <button
                                                className="text-white bg-[#8D1A5F] text-sm font-medium px-4 py-2 rounded transition w-[150px] hover:bg-white hover:text-[#8D1A5F] hover:border hover:border-[#8D1A5F] cursor-pointer"
                                            >
                                                Assign to {item.courseType === "institution" ? "Student" : "Employee"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                            <h3 className="text-xl font-medium mb-2">
                                {filter === "all" ? "No courses found" :
                                    filter === "in-progress" ? "No courses in progress" :
                                        "No completed courses"}
                            </h3>
                            <p className="text-gray-600">
                                {filter === "all" ? "Start learning by enrolling in some courses!" :
                                    filter === "in-progress" ? "You don't have any courses in progress." :
                                        "You haven't completed any courses yet."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
