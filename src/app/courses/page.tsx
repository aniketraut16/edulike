"use client"
import { Suspense, useEffect, useState } from "react"
import { Course } from "@/utils/coursemanagement"
import { getAllCourses } from "@/utils/coursemanagement"
import CourseCard from "@/components/Courses/CourseCard";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";

function AllCoursesPageContent() {
    const searchParams = useSearchParams();

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [rating, setRating] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("title");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [showAllLanguages, setShowAllLanguages] = useState(false);
    const [showAllDifficulties, setShowAllDifficulties] = useState(false);
    const [showAllKcTypes, setShowAllKcTypes] = useState(false);

    // Convert to arrays for multiple selections
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
    const [selectedKcTypes, setSelectedKcTypes] = useState<string[]>([]);

    // Available filter options
    const languages = ["English", "Spanish", "French", "Chinese"];
    const categories = [
        "Web Development", "Data Science", "Design", "Business",
        "Cloud Computing", "DevOps", "Security", "Science",
        "Mathematics", "Personal Development", "Language",
        "Creative", "Personal Finance", "Health", "Humanities",
        "Technology", "Mobile Development", "Programming"
    ];
    const difficulties = ["Beginner", "Intermediate", "Advanced"];
    const kcTypes = ["Individual", "Corporate", "Institution"];

    // Initialize state from URL parameters
    useEffect(() => {
        if (searchParams) {
            const pageParam = searchParams.get('page');
            const queryParam = searchParams.get('query');
            const ratingParam = searchParams.get('rating');
            const sortByParam = searchParams.get('sortBy');
            const categoriesParam = searchParams.get('categories');
            const languagesParam = searchParams.get('languages');
            const difficultiesParam = searchParams.get('difficulties');
            const kcTypesParam = searchParams.get('kcTypes');

            if (pageParam) setPage(parseInt(pageParam));
            if (queryParam) setQuery(queryParam);
            if (ratingParam) setRating(parseFloat(ratingParam));
            if (sortByParam) setSortBy(sortByParam);
            if (categoriesParam) setSelectedCategories(categoriesParam.split(','));
            if (languagesParam) setSelectedLanguages(languagesParam.split(','));
            if (difficultiesParam) setSelectedDifficulties(difficultiesParam.split(','));
            if (kcTypesParam) setSelectedKcTypes(kcTypesParam.split(','));
        }
    }, []);

    // Update URL with current filters
    useEffect(() => {
        const params = new URLSearchParams();

        if (page > 1) params.set('page', page.toString());
        if (query) params.set('query', query);
        if (rating > 0) params.set('rating', rating.toString());
        if (sortBy !== 'title') params.set('sortBy', sortBy);
        if (selectedCategories.length > 0) params.set('categories', selectedCategories.join(','));
        if (selectedLanguages.length > 0) params.set('languages', selectedLanguages.join(','));
        if (selectedDifficulties.length > 0) params.set('difficulties', selectedDifficulties.join(','));
        if (selectedKcTypes.length > 0) params.set('kcTypes', selectedKcTypes.join(','));

        const queryString = params.toString();
        const url = queryString ? `?${queryString}` : '';

        window.history.replaceState({}, '', `${window.location.pathname}${url}`);
    }, [page, query, selectedLanguages, selectedCategories, rating, selectedDifficulties, selectedKcTypes, sortBy]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                // Convert arrays to comma-separated strings for the API
                const categoryStr = selectedCategories.join(',');
                const languageStr = selectedLanguages.join(',');
                const difficultyStr = selectedDifficulties.join(',');
                const kcTypeStr = selectedKcTypes.join(',');

                const data = getAllCourses(page, query, languageStr, categoryStr, rating, difficultyStr, kcTypeStr);

                // Sort courses
                let sortedCourses = [...data.courses];
                switch (sortBy) {
                    case "price-low":
                        sortedCourses.sort((a, b) => a.price - b.price);
                        break;
                    case "price-high":
                        sortedCourses.sort((a, b) => b.price - a.price);
                        break;
                    case "rating":
                        sortedCourses.sort((a, b) => b.rating - a.rating);
                        break;
                    case "title":
                    default:
                        sortedCourses.sort((a, b) => a.title.localeCompare(b.title));
                        break;
                }

                setCourses(sortedCourses);
                setTotalPages(data.totalPages);
                setCurrentPage(data.currentPage);
                setLoading(false);
            } catch (error: any) {
                setError(error);
                setLoading(false);
            }
        }
        fetchCourses();
    }, [page, query, selectedLanguages, selectedCategories, rating, selectedDifficulties, selectedKcTypes, sortBy]);

    const handleFilterChange = (filterType: string, value: any) => {
        setPage(1); // Reset to first page when filters change
        switch (filterType) {
            case "language":
                handleMultiSelect(value, selectedLanguages, setSelectedLanguages);
                break;
            case "category":
                handleMultiSelect(value, selectedCategories, setSelectedCategories);
                break;
            case "rating":
                setRating(value);
                break;
            case "difficulty":
                handleMultiSelect(value, selectedDifficulties, setSelectedDifficulties);
                break;
            case "kcType":
                handleMultiSelect(value, selectedKcTypes, setSelectedKcTypes);
                break;
        }
    };

    // Helper function to handle multi-select logic
    const handleMultiSelect = (value: string, selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>) => {
        if (selected.includes(value)) {
            // Remove if already selected
            setSelected(selected.filter(item => item !== value));
        } else {
            // Add if not already selected
            setSelected([...selected, value]);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const clearAllFilters = () => {
        setQuery("");
        setSelectedLanguages([]);
        setSelectedCategories([]);
        setRating(0);
        setSelectedDifficulties([]);
        setSelectedKcTypes([]);
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-[15vh]">

            {/* Search and Sort Section */}
            <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center space-x-4 h-full">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="text-sm bg-[#8D1A5F] hover:bg-[#6B1548] text-white font-medium px-4 py-2 rounded-lg flex items-center h-full"
                            >
                                <FaFilter className="mr-2" />
                                <span>
                                    Filters
                                </span>
                                {(selectedCategories.length > 0 || selectedLanguages.length > 0 || selectedDifficulties.length > 0 || selectedKcTypes.length > 0 || rating > 0) && (
                                    <span className="ml-2 bg-white text-[#8D1A5F] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                        {selectedCategories.length + selectedLanguages.length + selectedDifficulties.length + selectedKcTypes.length + (rating > 0 ? 1 : 0)}
                                    </span>
                                )}
                            </button>
                        </div>
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8D1A5F] focus:border-transparent outline-none transition-all"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center space-x-4">
                            <label className="text-sm font-medium text-gray-700">Sort by:</label>
                            <select
                                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#8D1A5F] focus:border-transparent outline-none"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="title">Name (A-Z)</option>
                                <option value="price-low">Price (Low to High)</option>
                                <option value="price-high">Price (High to Low)</option>
                                <option value="rating">Rating (High to Low)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6">
                    {/* Filters Sidebar */}
                    <div className={`${isSidebarOpen ? 'flex' : 'hidden'} w-full h-full fixed top-0 left-0 bg-black/50 z-50 transition-all duration-800`} onClick={() => setIsSidebarOpen(false)}>
                        <div className={`w-100 max-w-[90%] flex-shrink-0 bg-white rounded-r-lg shadow-lg p-6 pl-10 pt-10 mr-auto h-full overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-3xl font-bold text-gray-900">Filters</h3>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={clearAllFilters}
                                        className="text-sm text-[#8D1A5F] hover:text-[#6B1548] font-medium"
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* KC Type Filter */}
                            <div className="mb-6">
                                <h4 className="font-bold text-gray-900 mb-3 font-raleway text-lg">
                                    KC Type
                                    {selectedKcTypes.length > 0 && (
                                        <span className="ml-2 text-sm text-[#8D1A5F]">({selectedKcTypes.length} selected)</span>
                                    )}
                                </h4>
                                <div className="space-y-2">
                                    {kcTypes.slice(0, showAllKcTypes ? kcTypes.length : 5).map((type) => (
                                        <label key={type} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                name="kcType"
                                                value={type}
                                                checked={selectedKcTypes.includes(type)}
                                                onChange={(e) => handleFilterChange("kcType", e.target.value)}
                                                className="text-[#8D1A5F] focus:ring-[#8D1A5F] border-gray-300 rounded"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">KC for {type}</span>
                                        </label>
                                    ))}
                                    {kcTypes.length > 5 && (
                                        <button
                                            onClick={() => setShowAllKcTypes(!showAllKcTypes)}
                                            className="text-sm text-[#8D1A5F] hover:text-[#6B1548] font-medium mt-2"
                                        >
                                            {showAllKcTypes ? "Show Less" : "View More"}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <h4 className="font-bold text-gray-900 mb-3 font-raleway text-lg">
                                    Category
                                    {selectedCategories.length > 0 && (
                                        <span className="ml-2 text-sm text-[#8D1A5F]">({selectedCategories.length} selected)</span>
                                    )}
                                </h4>
                                <div className="space-y-2">
                                    {categories.slice(0, showAllCategories ? categories.length : 5).map((cat) => (
                                        <label key={cat} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                name="category"
                                                value={cat}
                                                checked={selectedCategories.includes(cat)}
                                                onChange={(e) => handleFilterChange("category", e.target.value)}
                                                className="text-[#8D1A5F] focus:ring-[#8D1A5F] border-gray-300 rounded"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">{cat}</span>
                                        </label>
                                    ))}
                                    {categories.length > 5 && (
                                        <button
                                            onClick={() => setShowAllCategories(!showAllCategories)}
                                            className="text-sm text-[#8D1A5F] hover:text-[#6B1548] font-medium mt-2"
                                        >
                                            {showAllCategories ? "Show Less" : "View More"}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Language Filter */}
                            <div className="mb-6">
                                <h4 className="font-bold text-gray-900 mb-3 font-raleway text-lg">
                                    Language
                                    {selectedLanguages.length > 0 && (
                                        <span className="ml-2 text-sm text-[#8D1A5F]">({selectedLanguages.length} selected)</span>
                                    )}
                                </h4>
                                <div className="space-y-2">
                                    {languages.slice(0, showAllLanguages ? languages.length : 5).map((lang) => (
                                        <label key={lang} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                name="language"
                                                value={lang}
                                                checked={selectedLanguages.includes(lang)}
                                                onChange={(e) => handleFilterChange("language", e.target.value)}
                                                className="text-[#8D1A5F] focus:ring-[#8D1A5F] border-gray-300 rounded"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">{lang}</span>
                                        </label>
                                    ))}
                                    {languages.length > 5 && (
                                        <button
                                            onClick={() => setShowAllLanguages(!showAllLanguages)}
                                            className="text-sm text-[#8D1A5F] hover:text-[#6B1548] font-medium mt-2"
                                        >
                                            {showAllLanguages ? "Show Less" : "View More"}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Difficulty Filter */}
                            <div className="mb-6">
                                <h4 className="font-bold text-gray-900 mb-3 font-raleway text-lg">
                                    Difficulty
                                    {selectedDifficulties.length > 0 && (
                                        <span className="ml-2 text-sm text-[#8D1A5F]">({selectedDifficulties.length} selected)</span>
                                    )}
                                </h4>
                                <div className="space-y-2">
                                    {difficulties.slice(0, showAllDifficulties ? difficulties.length : 5).map((diff) => (
                                        <label key={diff} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                name="difficulty"
                                                value={diff}
                                                checked={selectedDifficulties.includes(diff)}
                                                onChange={(e) => handleFilterChange("difficulty", e.target.value)}
                                                className="text-[#8D1A5F] focus:ring-[#8D1A5F] border-gray-300 rounded"
                                            />
                                            <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">{diff}</span>
                                        </label>
                                    ))}
                                    {difficulties.length > 5 && (
                                        <button
                                            onClick={() => setShowAllDifficulties(!showAllDifficulties)}
                                            className="text-sm text-[#8D1A5F] hover:text-[#6B1548] font-medium mt-2"
                                        >
                                            {showAllDifficulties ? "Show Less" : "View More"}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div className="mb-6">
                                <h4 className="font-bold text-gray-900 mb-3 font-raleway text-lg">Minimum Rating</h4>
                                <div className="space-y-2">
                                    {[4.5, 4.0, 3.5, 3.0].map((rate) => (
                                        <label key={rate} className="flex items-center cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={rate}
                                                checked={rating === rate}
                                                onChange={(e) => handleFilterChange("rating", parseFloat(e.target.value))}
                                                className="text-[#8D1A5F] focus:ring-[#8D1A5F] border-gray-300"
                                            />
                                            <div className="ml-2 flex items-center">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className={`w-4 h-4 ${i < rate ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="ml-1 text-sm text-gray-600">& up</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">

                        {/* Loading State */}
                        {loading && (
                            <div className="flex items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8D1A5F]"></div>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="text-center py-20">
                                <div className="text-red-600 mb-4">Something went wrong!</div>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-[#8D1A5F] text-white px-4 py-2 rounded-lg hover:bg-[#6B1548] transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {/* Course Grid */}
                        {!loading && !error && (
                            <>
                                {courses.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                                        {courses.map((course, index) => (
                                            <CourseCard key={`${course.title}-${index}`} item={course} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20">
                                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.044-5.709-2.709M15 3.935A7.962 7.962 0 0112 3c-2.34 0-4.29.044-5.709 1.935M12 18h.01" />
                                        </svg>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                                        <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                                        <button
                                            onClick={clearAllFilters}
                                            className="bg-[#8D1A5F] text-white px-6 py-2 rounded-lg hover:bg-[#6B1548] transition-colors"
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                )}

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center space-x-2 py-8">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                                }`}
                                        >
                                            Previous
                                        </button>

                                        {[...Array(totalPages)].map((_, i) => {
                                            const pageNum = i + 1;
                                            const isCurrentPage = pageNum === currentPage;

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isCurrentPage
                                                        ? 'bg-[#8D1A5F] text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === totalPages
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                                }`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function AllCoursesPage() {
    return (
        <Suspense fallback={<Loader className="animate-spin" />}>
            <AllCoursesPageContent />
        </Suspense>
    );
}