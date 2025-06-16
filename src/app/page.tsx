'use client'
import Image from 'next/image';
import { FaChalkboardTeacher, FaBookOpen, FaUserGraduate } from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import CourseCard from '@/components/CourseCard';
import EnhancedServicesSection from '@/components/ServiceSection';

export default function Home() {
  const [ref, inView] = useInView({ triggerOnce: true });
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero-section py-16 md:py-24 min-h-[97vh] flex items-center" style={{ borderBottomRightRadius: '35%' }}>
        {/* Background elements */}
        <div className="hero-background">
          <Image
            src="/hero-background.svg"
            alt="Background decoration"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center hero-content">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Learn Anything. From Anywhere.
            </h1>
            <p className="text-lg md:text-xl text-purple-100 mb-8">
              Live sessions or self-paced courses—choose how you want to grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white hover:bg-purple-50 text-purple-700 font-medium py-3 px-6 rounded-lg transition-all">
                Explore Courses
              </button>
              <button className="bg-transparent hover:bg-purple-800 text-white border border-white font-medium py-3 px-6 rounded-lg transition-all">
                Join a Free Demo
              </button>
            </div>
          </div>
          <div className="md:w-2/3 flex justify-center">
            <div className="relative w-full max-w-lg h-96 md:h-[28rem]">
              <Image
                src="/hero-illustration.svg"
                alt="Person learning online"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Platform Highlights */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-16">
            Why Students Love EduLike
          </h2>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            ref={ref}
          >
            {/* Feature 1 */}
            <div className="bg-white shadow-lg hover:shadow-xl transition rounded-2xl p-8 text-center border border-orange-100">
              <div className="text-5xl text-orange-400 mb-4 mx-auto">
                <FaBookOpen />
              </div>
              <h3 className="text-3xl font-bold text-orange-500 mb-2">
                {inView && <CountUp end={500} duration={2} />}+
              </h3>
              <p className="text-gray-600 font-medium">Courses to Explore</p>
              <p className="text-sm text-gray-500 mt-2">Choose from tech, business, design, and more—available anytime.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white shadow-lg hover:shadow-xl transition rounded-2xl p-8 text-center border border-blue-100">
              <div className="text-5xl text-blue-400 mb-4 mx-auto">
                <FaChalkboardTeacher />
              </div>
              <h3 className="text-3xl font-bold text-blue-500 mb-2">
                {inView && <CountUp end={100} duration={2} />}+
              </h3>
              <p className="text-gray-600 font-medium">Expert Instructors</p>
              <p className="text-sm text-gray-500 mt-2">Learn from top industry professionals with real-world experience.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white shadow-lg hover:shadow-xl transition rounded-2xl p-8 text-center border border-green-100">
              <div className="text-5xl text-green-400 mb-4 mx-auto">
                <FaUserGraduate />
              </div>
              <h3 className="text-3xl font-bold text-green-500 mb-2">
                {inView && <CountUp end={25000} duration={2} separator="," />}+
              </h3>
              <p className="text-gray-600 font-medium">Happy Learners</p>
              <p className="text-sm text-gray-500 mt-2">Join a thriving community of students learning together every day.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Courses Section */}
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
              <CourseCard key={index} item={item} />
            ))}
          </div>
        </div>
      </section>

      <EnhancedServicesSection />


      {/* Blog Section */}
      <section id="blog" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
            Latest from Our Blog
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Stay updated with our latest articles and learning resources
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-48 bg-purple-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-purple-500 font-medium">
                    Blog Image
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">June 10, 2023</div>
                  <h3 className="font-bold text-lg mb-2">Blog Post Title {item}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <a href="#" className="text-purple-600 font-medium hover:text-purple-700 flex items-center">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4">EduLike</h3>
              <p className="text-gray-400 mb-4">
                Making quality education accessible to everyone, everywhere.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span>FB</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span>TW</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span>IG</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span>LI</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Courses</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">All Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Web Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Data Science</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Business</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Design</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Become an Instructor</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Accessibility</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} EduLike. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
