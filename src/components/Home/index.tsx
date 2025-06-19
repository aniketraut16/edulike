import Hero from "@/components/Home/Hero";
import Stats from "@/components/Home/Stats";
import FewCourses from "@/components/Home/FewCourses";
import FewBlogs from "@/components/Home/FewBlogs";
import EnhancedServicesSection from "@/components/Home/ServiceSection";
import Subscriptions from "./Subscriptions";
import Testimonials from "./Testimonials";

export const Home = () => {
    return (
        <main className="min-h-screen bg-white" >
            <Hero />
            <Stats />
            <FewCourses />
            <EnhancedServicesSection />
            <Subscriptions />
            <FewBlogs />
            <Testimonials />
        </main>
    )
}