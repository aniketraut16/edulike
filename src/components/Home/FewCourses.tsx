import EnhancedCourseCard from "@/components/Home/CourseCard";

export default function FewCourses() {
    return (
        <section id="courses" className="py-16 bg-gray-50">
            <div className="container">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
                    Our Popular Courses
                </h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Explore our most in-demand courses that have helped thousands of students achieve their goals
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        {
                            title: "Course 1",
                            description: "Description for Course 1",
                            image: "image1.jpg",
                            instructor: "Instructor 1",
                            price: 100,
                            originalPrice: 150,
                            lessons: 10,
                            updated: "2023-01-01"
                        },
                        {
                            title: "Course 2",
                            description: "Description for Course 2",
                            image: "image2.jpg",
                            instructor: "Instructor 2",
                            price: 120,
                            originalPrice: 180,
                            lessons: 12,
                            updated: "2023-02-01"
                        },
                        {
                            title: "Course 3",
                            description: "Description for Course 3",
                            image: "image3.jpg",
                            instructor: "Instructor 3",
                            price: 90,
                            originalPrice: 130,
                            lessons: 8,
                            updated: "2023-03-01"
                        },
                        {
                            title: "Course 4",
                            description: "Description for Course 4",
                            image: "image4.jpg",
                            instructor: "Instructor 4",
                            price: 110,
                            originalPrice: 160,
                            lessons: 11,
                            updated: "2023-04-01"
                        },
                        {
                            title: "Course 5",
                            description: "Description for Course 5",
                            image: "image5.jpg",
                            instructor: "Instructor 5",
                            price: 95,
                            originalPrice: 140,
                            lessons: 9,
                            updated: "2023-05-01"
                        },
                        {
                            title: "Course 6",
                            description: "Description for Course 6",
                            image: "image6.jpg",
                            instructor: "Instructor 6",
                            price: 105,
                            originalPrice: 155,
                            lessons: 10,
                            updated: "2023-06-01"
                        }
                    ].map((item, index) => (
                        <EnhancedCourseCard key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    )
}
