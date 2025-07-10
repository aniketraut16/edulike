"use client"
import { useAuth } from '@/context/AuthContext';
import { getLearnings, shareCourse } from '@/utils/learnings';
import { Learning } from '@/types/learning';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function page() {
    const [learnings, setLearnings] = useState<Learning[]>([]);
    const [filteredLearnings, setFilteredLearnings] = useState<Learning[]>([]);
    const [filter, setFilter] = useState<"in-progress" | "completed" | "all">("all");
    const [loading, setLoading] = useState(true);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Learning | null>(null);
    const [shareEmails, setShareEmails] = useState<string[]>([]);
    const [currentEmail, setCurrentEmail] = useState('');
    const [shareLoading, setShareLoading] = useState(false);
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

    const handleShareCourse = (course: Learning) => {
        setSelectedCourse(course);
        setShareModalOpen(true);
        setShareEmails([]);
        setCurrentEmail('');
    };

    const addEmail = () => {
        if (!currentEmail.trim()) {
            toast.error('Please enter a valid email address');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(currentEmail.trim())) {
            toast.error('Please enter a valid email format');
            return;
        }

        if (shareEmails.includes(currentEmail.trim())) {
            toast.error('This email is already added');
            return;
        }

        const remainingLimit = selectedCourse ? (selectedCourse.assignLimit || 0 - (selectedCourse.assignCount || 0)) : 0;
        if (shareEmails.length >= remainingLimit) {
            toast.error(`You can only assign to ${remainingLimit} more ${selectedCourse?.courseType === "institution" ? "students" : "employees"}`);
            return;
        }

        setShareEmails([...shareEmails, currentEmail.trim()]);
        setCurrentEmail('');
    };

    const removeEmail = (index: number) => {
        setShareEmails(shareEmails.filter((_, i) => i !== index));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addEmail();
        }
    };

    const handleShareSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (shareEmails.length === 0) {
            toast.error('Please add at least one email address');
            return;
        }

        if (!selectedCourse) {
            toast.error('No course selected');
            return;
        }

        setShareLoading(true);
        try {
            const { success, message } = await shareCourse({
                enrollment_id: selectedCourse.enrollmentId,
                email_list: shareEmails
            });

            if (success) {
                toast.success(message);
                setShareModalOpen(false);
                setShareEmails([]);
                setCurrentEmail('');
                setSelectedCourse(null);
                // Refresh learnings to update assign counts
                if (user?.uid) {
                    const data = await getLearnings(user.uid);
                    setLearnings(data);
                }
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.error('Error sharing course:', error);
            toast.error('An error occurred while sharing the course. Please try again.');
        } finally {
            setShareLoading(false);
        }
    };

    const closeShareModal = () => {
        setShareModalOpen(false);
        setShareEmails([]);
        setCurrentEmail('');
        setSelectedCourse(null);
    };

    const getButtonClasses = (buttonFilter: string) => {
        const baseClasses = "px-3 py-1.5 rounded-full font-normal border transition-all duration-200 text-sm sm:text-base";
        const activeClasses = "border-[#8D1A5F] text-white bg-[#8D1A5F]";
        const inactiveClasses = "border-[#8D1A5F] text-[#8D1A5F] bg-transparent hover:bg-[#8D1A5F] hover:text-white";

        return `${baseClasses} ${filter === buttonFilter ? activeClasses : inactiveClasses}`;
    };

    const remainingAssignLimit = selectedCourse ? (selectedCourse.assignLimit || 0 - (selectedCourse.assignCount || 0)) : 0;

    return (
        <div className="min-h-screen py-8 sm:py-12 px-4 bg-white">
            <Toaster position="top-right" />

            {/* Share Course Modal */}
            {shareModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Share Course
                                </h3>
                                <button
                                    onClick={closeShareModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Course:</p>
                                <p className="font-medium text-gray-800 mb-2">{selectedCourse?.courseName}</p>
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-gray-600">
                                        Remaining assignments: <span className="font-semibold text-[#8D1A5F]">{remainingAssignLimit}</span>
                                    </span>
                                    <span className="text-gray-600">
                                        Selected: <span className="font-semibold text-blue-600">{shareEmails.length}</span>
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleShareSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="currentEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                        Add {selectedCourse?.courseType === "institution" ? "Student" : "Employee"} Email Addresses
                                    </label>

                                    {/* Email Input */}
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            type="email"
                                            id="currentEmail"
                                            value={currentEmail}
                                            onChange={(e) => setCurrentEmail(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8D1A5F] focus:border-transparent"
                                            placeholder="Enter email address..."
                                            disabled={shareLoading || shareEmails.length >= remainingAssignLimit}
                                        />
                                        <button
                                            type="button"
                                            onClick={addEmail}
                                            className="px-4 py-2 bg-[#8D1A5F] text-white rounded-lg hover:bg-[#7A1850] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                            disabled={shareLoading || shareEmails.length >= remainingAssignLimit || !currentEmail.trim()}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add
                                        </button>
                                    </div>

                                    {/* Added Emails List */}
                                    {shareEmails.length > 0 && (
                                        <div className="border border-gray-200 rounded-lg p-3 max-h-40 overflow-y-auto">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Added Email Addresses:</p>
                                            <div className="space-y-2">
                                                {shareEmails.map((email, index) => (
                                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                                                        <span className="text-sm text-gray-700 flex-1 break-all">{email}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeEmail(index)}
                                                            className="ml-2 text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                                                            disabled={shareLoading}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Helper Text */}
                                    <p className="text-xs text-gray-500 mt-2">
                                        Press Enter or click Add to include an email. You can add up to {remainingAssignLimit} email addresses.
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={closeShareModal}
                                        className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                        disabled={shareLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-[#8D1A5F] text-white rounded-lg hover:bg-[#7A1850] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        disabled={shareLoading || shareEmails.length === 0}
                                    >
                                        {shareLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Sharing...
                                            </>
                                        ) : (
                                            <>
                                                Share with {shareEmails.length} {shareEmails.length === 1 ? 'recipient' : 'recipients'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto pt-[10vh]">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center sm:text-left">MY LEARNINGS</h1>

                {/* Filter Buttons - Responsive */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center sm:justify-start">
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

                <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                    {loading ? (
                        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm text-center">
                            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#8D1A5F] mx-auto mb-4"></div>
                            <p className="text-gray-600 text-sm sm:text-base">Loading your courses...</p>
                        </div>
                    ) : filteredLearnings.length > 0 ? (
                        filteredLearnings.map((item) => (
                            <div key={item.courseId} className="rounded-lg shadow-sm bg-white p-4 sm:p-6 border border-gray-100 hover:border-gray-200 transition-colors">
                                {/* Mobile Layout - Vertical Stack */}
                                <div className="block sm:hidden">
                                    {/* Course Image */}
                                    <div className="w-full h-48 relative mb-4">
                                        <img
                                            src={item.courseImage}
                                            alt={item.courseName}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>

                                    {/* Course Content */}
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                            {item.courseName}
                                        </h3>
                                        {item.courseType !== "individual" && (
                                            <div
                                                className="inline-block p-1 px-3 rounded-full text-xs font-semibold mb-3"
                                                style={{
                                                    background: "linear-gradient(90deg, #F3E6F1 0%, #FDE6F1 100%)",
                                                    color: "#8D1A5F"
                                                }}
                                            >
                                                For {item.courseType.charAt(0).toUpperCase() + item.courseType.slice(1)} ({item.assignCount}/{item.assignLimit}) left
                                            </div>
                                        )}
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.courseDescription}</p>

                                        {/* Progress Bar */}
                                        <div className="w-full mb-4">
                                            <div className="flex items-center justify-between mb-2">
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

                                    {/* Action Buttons */}
                                    <div className="space-y-3">
                                        <button
                                            className="w-full text-white bg-[#8D1A5F] text-sm font-medium px-4 py-3 rounded-lg transition-colors hover:bg-[#7A1850] active:bg-[#6B1544]"
                                            onClick={() => window.location.href = `/learn?course_id=${item.courseId}&enrollment_id=${item.enrollmentId}`}
                                        >
                                            {item.progress === 100 ? 'View Certificate' : 'Resume Learning'}
                                        </button>
                                        {item.courseType !== "individual" && (
                                            <button
                                                className="w-full text-[#8D1A5F] bg-white border border-[#8D1A5F] text-sm font-medium px-4 py-3 rounded-lg transition-colors hover:bg-[#8D1A5F] hover:text-white"
                                                onClick={() => handleShareCourse(item)}
                                            >
                                                Assign to {item.courseType === "institution" ? "Student" : "Employee"}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Desktop/Tablet Layout - Horizontal */}
                                <div className="hidden sm:flex items-start gap-4 lg:gap-6">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 relative flex-shrink-0">
                                        <img
                                            src={item.courseImage}
                                            alt={item.courseName}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
                                            {item.courseName}
                                        </h3>
                                        {item.courseType !== "individual" && (
                                            <div
                                                className="inline-block p-1 px-2 rounded-full text-xs sm:text-sm font-semibold mb-2"
                                                style={{
                                                    background: "linear-gradient(90deg, #F3E6F1 0%, #FDE6F1 100%)",
                                                    color: "#8D1A5F"
                                                }}
                                            >
                                                For {item.courseType.charAt(0).toUpperCase() + item.courseType.slice(1)} (
                                                {typeof item.assignLimit === "number" && typeof item.assignCount === "number"
                                                    ? `${item.assignLimit - item.assignCount}/${item.assignLimit}`
                                                    : "N/A"
                                                } left
                                                )
                                            </div>
                                        )}
                                        <p className="text-gray-600 text-sm sm:text-base mb-3 leading-relaxed">{item.courseDescription}</p>
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

                                    <div className="flex flex-col items-end justify-start gap-3 flex-shrink-0">
                                        <button
                                            className="text-white bg-[#8D1A5F] text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:bg-[#7A1850] w-full sm:w-auto min-w-[140px] lg:min-w-[150px]"
                                            onClick={() => window.location.href = `/learn?course_id=${item.courseId}&enrollment_id=${item.enrollmentId}`}
                                        >
                                            {item.progress === 100 ? 'View Certificate' : 'Resume'}
                                        </button>
                                        {item.courseType !== "individual" && (
                                            <button
                                                className={`text-[#8D1A5F] bg-white border border-[#8D1A5F] text-sm font-medium px-4 py-2 rounded-lg transition-colors w-full sm:w-auto min-w-[140px] lg:min-w-[150px] ${item.assignCount === item.assignLimit
                                                    ? 'opacity-60 cursor-not-allowed bg-gray-100 border-gray-300 text-gray-400 hover:bg-gray-100 hover:text-gray-400 hover:border-gray-300'
                                                    : 'hover:bg-[#8D1A5F] hover:text-white'
                                                    }`}
                                                onClick={() => handleShareCourse(item)}
                                                disabled={item.assignCount === item.assignLimit}
                                            >
                                                Assign to {item.courseType === "institution" ? "Student" : "Employee"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm text-center">
                            <div className="max-w-md mx-auto">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
                                    {filter === "all" ? "No courses found" :
                                        filter === "in-progress" ? "No courses in progress" :
                                            "No completed courses"}
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                    {filter === "all" ? "Start learning by enrolling in some courses!" :
                                        filter === "in-progress" ? "You don't have any courses in progress." :
                                            "You haven't completed any courses yet."}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
