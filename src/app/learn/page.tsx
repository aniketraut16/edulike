"use client"
import { useAuth } from '@/context/AuthContext';
import { CourseWithProgress, ModuleWithProgress, MaterialWithProgress } from '@/types/learning';
import { getCourseWithProgress, MakeProgress } from '@/utils/learnings';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import {
    FaPlay,
    FaFileAlt,
    FaExternalLinkAlt,
    FaVideo,
    FaCheckCircle,
    FaCircle,
    FaBook,
    FaClock,
    FaGraduationCap,
    FaCalendarAlt,
    FaBars,
    FaTimes,
    FaChevronLeft,
    FaChevronRight,
    FaInfoCircle
} from 'react-icons/fa';
import { MdVideoCall, MdDescription } from 'react-icons/md';
import { BiLoaderAlt } from 'react-icons/bi';

function Learning() {
    const searchParams = useSearchParams();
    const course_id = searchParams.get("course_id");
    const enrollment_id = searchParams.get("enrollment_id");
    const { user } = useAuth();
    const [course, setCourse] = useState<CourseWithProgress | null>(null);
    const [selectedModule, setSelectedModule] = useState<ModuleWithProgress | null>(null);
    const [loading, setLoading] = useState(true);
    const [progressLoading, setProgressLoading] = useState<{ [key: string]: boolean }>({});
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showProgressInfo, setShowProgressInfo] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            if (course_id && user?.uid) {
                setLoading(true);
                try {
                    const courseData = await getCourseWithProgress(course_id, user.uid);
                    setCourse(courseData);
                    // Auto-select first module
                    if (courseData?.modules && courseData.modules.length > 0) {
                        setSelectedModule(courseData.modules[0]);
                    }
                } catch (error) {
                    console.error('Error fetching course:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCourse();
    }, [course_id, user?.uid]);

    // Check localStorage for dismissed progress info
    useEffect(() => {
        const dismissed = localStorage.getItem('progressInfoDismissed');
        if (dismissed === 'true') {
            setShowProgressInfo(false);
        }
    }, []);

    const dismissProgressInfo = () => {
        setShowProgressInfo(false);
        localStorage.setItem('progressInfoDismissed', 'true');
    };

    const handleMaterialProgress = async (material: MaterialWithProgress, newStatus: "completed" | "not completed") => {
        if (!enrollment_id) return;

        const progressKey = material.materialId;
        setProgressLoading(prev => ({ ...prev, [progressKey]: true }));

        try {
            const success = await MakeProgress({
                enrollment_id,
                material_id: material.materialId,
                status: newStatus
            });

            if (success && selectedModule) {
                // Update local state without refetching
                const updatedMaterials = selectedModule.materials.map(m =>
                    m.materialId === material.materialId
                        ? { ...m, status: newStatus }
                        : m
                );

                const completedCount = updatedMaterials.filter(m => m.status === "completed").length;
                const moduleStatus = completedCount === updatedMaterials.length ? "completed" : "not completed";

                const updatedModule = {
                    ...selectedModule,
                    materials: updatedMaterials,
                    completedMaterials: completedCount,
                    status: moduleStatus
                } as ModuleWithProgress;

                setSelectedModule(updatedModule);

                // Update course modules list
                if (course) {
                    const updatedModules = course.modules.map(m =>
                        m.moduleId === selectedModule.moduleId ? updatedModule : m
                    );
                    setCourse({ ...course, modules: updatedModules });
                }
            }
        } catch (error) {
            console.error('Error updating progress:', error);
        } finally {
            setProgressLoading(prev => ({ ...prev, [progressKey]: false }));
        }
    };

    const handleModuleSelect = (module: ModuleWithProgress) => {
        setSelectedModule(module);
        setSidebarOpen(false); // Close sidebar on mobile after selection
    };

    const getCurrentModuleIndex = () => {
        if (!course || !selectedModule) return -1;
        return course.modules.findIndex(m => m.moduleId === selectedModule.moduleId);
    };

    const navigateToModule = (direction: 'prev' | 'next') => {
        if (!course || !selectedModule) return;

        const currentIndex = getCurrentModuleIndex();
        let newIndex;

        if (direction === 'prev' && currentIndex > 0) {
            newIndex = currentIndex - 1;
        } else if (direction === 'next' && currentIndex < course.modules.length - 1) {
            newIndex = currentIndex + 1;
        } else {
            return;
        }

        setSelectedModule(course.modules[newIndex]);
    };

    const renderMaterialIcon = (type: string) => {
        switch (type) {
            case 'video':
                return <FaVideo className="text-red-500" />;
            case 'live_session':
                return <MdVideoCall className="text-blue-500" />;
            case 'document':
                return <FaFileAlt className="text-green-500" />;
            case 'external_link':
                return <FaExternalLinkAlt className="text-purple-500" />;
            default:
                return <FaBook className="text-gray-500" />;
        }
    };

    const renderMaterialContent = (material: MaterialWithProgress) => {
        switch (material.materialType) {
            case 'video':
                if (!material.filePath) {
                    return <p className="text-gray-500 mt-4">Video not available</p>;
                }

                // Helper to check if the filePath is a YouTube URL
                const isYouTubeUrl = (url: string) => {
                    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
                };

                // Helper to check if the filePath is a direct video file
                const isDirectVideo = (url: string) => {
                    return /\.(mp4|mkv|webm|mov|avi|flv|wmv)$/i.test(url);
                };

                if (isYouTubeUrl(material.filePath)) {
                    // Extract YouTube video ID
                    const match = material.filePath.match(
                        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
                    );
                    const videoId = match ? match[1] : null;
                    if (!videoId) {
                        return <p className="text-gray-500 mt-4">Invalid YouTube link</p>;
                    }
                    return (
                        <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden shadow-lg bg-black">
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    );
                } else if (isDirectVideo(material.filePath)) {
                    // Render direct video file
                    return (
                        <div className="mt-4">
                            <video
                                controls
                                className="w-full rounded-lg shadow-lg"
                                style={{ maxHeight: '400px' }}
                            >
                                <source src={material.filePath} />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    );
                } else {
                    // Unknown video type
                    return <p className="text-gray-500 mt-4">Video format not supported</p>;
                }

            case 'live_session':
                return material.meetLink ? (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                            <MdVideoCall className="text-blue-500 text-xl" />
                            <span className="font-medium text-blue-800">Live Session</span>
                        </div>
                        {material.scheduledAt && (
                            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                                <FaCalendarAlt />
                                <span>Scheduled: {new Date(material.scheduledAt).toLocaleString()}</span>
                            </div>
                        )}
                        <button
                            onClick={() => window.open(material.meetLink!, '_blank')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                            <MdVideoCall />
                            Join Meeting
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">Meeting link not available</p>
                );

            case 'document':
                return material.filePath ? (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                            <FaFileAlt className="text-green-500 text-xl" />
                            <span className="font-medium text-green-800">Document</span>
                        </div>
                        <button
                            onClick={() => window.open(material.filePath!, '_blank')}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                            <FaFileAlt />
                            Open Document
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">Document not available</p>
                );

            case 'external_link':
                return material.externalUrl ? (
                    <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center gap-2 mb-2">
                            <FaExternalLinkAlt className="text-purple-500 text-xl" />
                            <span className="font-medium text-purple-800">External Resource</span>
                        </div>
                        <button
                            onClick={() => window.open(material.externalUrl!, '_blank')}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                            <FaExternalLinkAlt />
                            Open Link
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">External link not available</p>
                );

            default:
                return <p className="text-gray-500 mt-4">Content not available</p>;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <BiLoaderAlt className="animate-spin text-4xl text-[#8D1A5F] mx-auto mb-4" />
                    <p className="text-gray-600">Loading course content...</p>
                </div>
            </div>
        );
    }

    if (!course || !course.modules.length) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <FaGraduationCap className="text-6xl text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No Course Content</h2>
                    <p className="text-gray-600">This course doesn't have any modules yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-[10vh]">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky top-[10vh] z-20">
                <div className="flex items-center justify-between">
                    <button
                        // onClick={() => setSidebarOpen(true)}
                        className="flex items-center gap-2 text-[#8D1A5F] font-medium"
                    >
                        <FaBook className="text-lg" />
                        <span className="text-sm">Modules</span>
                    </button>

                    {selectedModule && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                                Module {getCurrentModuleIndex() + 1} of {course.total_modules}
                            </span>
                        </div>
                    )}
                </div>

                {selectedModule && (
                    <div className="mt-2">
                        <h2 className="text-lg font-semibold text-gray-800 truncate">
                            {selectedModule.moduleTitle}
                        </h2>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <span>{selectedModule.completedMaterials}/{selectedModule.totalMaterials} completed</span>
                            <span>
                                {selectedModule.totalMaterials > 0
                                    ? Math.round((selectedModule.completedMaterials / selectedModule.totalMaterials) * 100)
                                    : 0
                                }%
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex relative">
                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Left Sidebar - Modules */}
                <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 fixed lg:relative lg:w-80 w-80 bg-white shadow-lg min-h-screen z-40 transition-transform duration-300 ease-in-out`}>

                    {/* Mobile Close Button */}
                    <div className="lg:hidden flex justify-end p-4">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>

                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#8D1A5F] to-[#B91C8C] text-white">
                        <h1 className="text-xl font-bold mb-2">Course Modules</h1>
                        <div className="flex items-center gap-2 text-sm opacity-90">
                            <FaBook />
                            <span>{course.total_modules} Modules</span>
                        </div>
                    </div>

                    <div className="p-4 overflow-y-auto">
                        {course.modules.map((module, index) => {
                            const isActive = selectedModule?.moduleId === module.moduleId;
                            const progressPercentage = module.totalMaterials > 0
                                ? (module.completedMaterials / module.totalMaterials) * 100
                                : 0;

                            return (
                                <div
                                    key={module.moduleId}
                                    onClick={() => handleModuleSelect(module)}
                                    className={`p-4 rounded-lg mb-3 cursor-pointer transition-all duration-200 border ${isActive
                                        ? 'bg-[#8D1A5F] text-white border-[#8D1A5F] shadow-md'
                                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            {module.status === "completed" ? (
                                                <FaCheckCircle className={`text-lg ${isActive ? 'text-white' : 'text-green-500'}`} />
                                            ) : (
                                                <FaCircle className={`text-lg ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                            )}
                                            <span className="font-medium">Module {index + 1}</span>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${isActive
                                            ? 'bg-white bg-opacity-20 text-[#8D1A5F]'
                                            : 'bg-gray-200 text-gray-600'
                                            }`}>
                                            {module.completedMaterials}/{module.totalMaterials}
                                        </span>
                                    </div>

                                    <h3 className={`font-medium mb-2 text-sm ${isActive ? 'text-white' : 'text-gray-800'}`}>
                                        {module.moduleTitle}
                                    </h3>

                                    {/* Progress Bar */}
                                    <div className={`w-full h-2 rounded-full mb-2 ${isActive ? 'bg-white bg-opacity-20' : 'bg-gray-200'}`}>
                                        <div
                                            className={`h-full rounded-full transition-all duration-300 ${isActive ? 'bg-white' : 'bg-[#8D1A5F]'
                                                }`}
                                            style={{ width: `${progressPercentage}%` }}
                                        />
                                    </div>

                                    <div className="flex items-center gap-4 text-xs opacity-80">
                                        <span className="flex items-center gap-1">
                                            <FaClock />
                                            {module.totalMaterials} items
                                        </span>
                                        <span>{Math.round(progressPercentage)}% completed</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Content - Materials */}
                <div className="flex-1 p-4 lg:p-8 min-h-screen">
                    {selectedModule ? (
                        <div className="max-w-4xl">
                            {/* Module Header - Hidden on mobile (shown in mobile header) */}
                            <div className="hidden lg:block bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
                                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                                    {selectedModule.moduleTitle}
                                </h1>
                                <div className="flex items-start gap-2 text-gray-600">
                                    <MdDescription className="text-xl mt-1 flex-shrink-0" />
                                    <p className="leading-relaxed">{selectedModule.moduleDescription}</p>
                                </div>
                            </div>

                            {/* Mobile Module Description */}
                            <div className="lg:hidden bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200">
                                <div className="flex items-start gap-2 text-gray-600">
                                    <MdDescription className="text-lg mt-1 flex-shrink-0" />
                                    <p className="text-sm leading-relaxed">{selectedModule.moduleDescription}</p>
                                </div>
                            </div>

                            {/* Module Navigation */}
                            <div className="flex justify-between items-center mb-6">
                                <button
                                    onClick={() => navigateToModule('prev')}
                                    disabled={getCurrentModuleIndex() === 0}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${getCurrentModuleIndex() === 0
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-[#8D1A5F] text-white hover:bg-[#7A1850]'
                                        }`}
                                >
                                    <FaChevronLeft />
                                    <span className="hidden sm:inline">Previous</span>
                                </button>

                                <span className="text-sm text-gray-600 font-medium">
                                    Module {getCurrentModuleIndex() + 1} of {course.total_modules}
                                </span>

                                <button
                                    onClick={() => navigateToModule('next')}
                                    disabled={getCurrentModuleIndex() === course.modules.length - 1}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${getCurrentModuleIndex() === course.modules.length - 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-[#8D1A5F] text-white hover:bg-[#7A1850]'
                                        }`}
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <FaChevronRight />
                                </button>
                            </div>

                            {/* Progress Instructions */}
                            {showProgressInfo && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 relative">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 mt-0.5">
                                            <FaInfoCircle className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-medium text-blue-800 mb-1">
                                                How to Track Your Progress
                                            </h4>
                                            <p className="text-sm text-blue-700 leading-relaxed">
                                                Click the circle icon next to each material and select "Mark Complete" to track your progress.
                                                Complete all materials in a module to finish it and advance through the course.
                                            </p>
                                        </div>
                                        <button
                                            onClick={dismissProgressInfo}
                                            className="absolute top-3 right-3 text-blue-400 hover:text-blue-600 transition-colors"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Materials List */}
                            <div className="space-y-4 lg:space-y-6">
                                {selectedModule.materials && selectedModule.materials.length > 0 ? (
                                    selectedModule.materials
                                        .sort((a, b) => a.orderIndex - b.orderIndex)
                                        .map((material) => {
                                            const isCompleted = material.status === "completed";
                                            const isLoading = progressLoading[material.materialId];

                                            return (
                                                <div
                                                    key={material.materialId}
                                                    className={`bg-white rounded-lg shadow-sm border transition-all duration-200 ${isCompleted
                                                        ? 'border-green-200 bg-green-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="p-4 lg:p-6">
                                                        {/* Material Header */}
                                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                                                            <div className="flex items-start gap-3 flex-1">
                                                                <div className="mt-1">
                                                                    {renderMaterialIcon(material.materialType)}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2 break-words">
                                                                        {material.materialTitle}
                                                                    </h3>
                                                                    {material.content && (
                                                                        <p className="text-gray-600 text-sm leading-relaxed mb-3 break-words">
                                                                            {material.content}
                                                                        </p>
                                                                    )}
                                                                    {material.duration > 0 && (
                                                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                                                            <FaClock />
                                                                            <span>{material.duration} minutes</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Progress Checkbox */}
                                                            <div className="flex items-center gap-2 sm:ml-4 self-start">
                                                                {isLoading ? (
                                                                    <BiLoaderAlt className="animate-spin text-[#8D1A5F] text-xl" />
                                                                ) : (
                                                                    <button
                                                                        onClick={() => handleMaterialProgress(
                                                                            material,
                                                                            isCompleted ? "not completed" : "completed"
                                                                        )}
                                                                        className={`text-2xl transition-colors ${isCompleted
                                                                            ? 'text-green-500 hover:text-green-600'
                                                                            : 'text-gray-300 hover:text-[#8D1A5F]'
                                                                            }`}
                                                                    >
                                                                        {isCompleted ? <FaCheckCircle /> : <FaCircle />}
                                                                    </button>
                                                                )}
                                                                <span className={`text-sm font-medium ${isCompleted ? 'text-green-600' : 'text-gray-500'
                                                                    }`}>
                                                                    {isCompleted ? 'Completed' : 'Mark Complete'}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Material Content */}
                                                        {renderMaterialContent(material)}
                                                    </div>
                                                </div>
                                            );
                                        })
                                ) : (
                                    /* No Materials Available */
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                                        <div className="max-w-md mx-auto">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
                                                No Materials Available
                                            </h3>
                                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                                No material is available for this module. It will be updated soon.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <FaBook className="text-6xl text-gray-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Select a Module</h2>
                            <p className="text-gray-600">Choose a module from the sidebar to start learning</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function page() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <BiLoaderAlt className="animate-spin text-4xl text-[#8D1A5F] mx-auto mb-4" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <Learning />
        </Suspense>
    );
}

