import Hero from "@/components/Home/Hero";
import Stats from "@/components/Home/Stats";
import FewCourses from "@/components/Home/FewCourses";
import FewBlogs from "@/components/Home/FewBlogs";
import EnhancedServicesSection from "@/components/Home/ServiceSection";
import Subscriptions from "./Subscriptions";
import Testimonials from "./Testimonials";
import HowitWorks from "./HowitWorks";

export const Home = () => {
    return (
        <main className="min-h-screen bg-white" >
            <Hero />
            <div className="block lg:hidden">
                <HowitWorks isMobile={true} />
            </div>

            <FewCourses />
            <Stats />
            <Subscriptions />
            <EnhancedServicesSection />
            <FewBlogs />
            <Testimonials />
        </main>
    )
}