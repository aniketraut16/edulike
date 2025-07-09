import { HiArrowRight } from "react-icons/hi";
import { FaUserGraduate, FaChalkboardTeacher, FaProjectDiagram, FaRegLightbulb, FaUsers, FaChartLine, FaClipboardList, FaCogs, FaUniversity, FaHeadset, FaGlobe, FaHandsHelping } from "react-icons/fa";
import { BoxReveal } from "../magicui/box-reveal";

export default function ServiceSection() {


    const services = [
        {
            image: "/images/individual.jpg",
            title: "For Individual Learners",
            link: "/courses",
            subtitle: "Accelerate Your Personal Learning Journey Today",
            description: "Unlock your full potential with personalized learning paths, expert mentorship, and hands-on projects. Our platform empowers you to achieve your academic and career goals with flexible, engaging, and practical content designed just for you.",
            features: [
                { icons: <FaUserGraduate className="text-[#461217] w-5 h-5" />, text: "Personalized Learning Paths", subtext: "Custom curricula designed for your learning style and pace" },
                { icons: <FaChalkboardTeacher className="text-[#461217] w-5 h-5" />, text: "1-on-1 Mentorship", subtext: "Direct access to industry experts and career guidance" },
                { icons: <FaProjectDiagram className="text-[#461217] w-5 h-5" />, text: "Project-Based Learning", subtext: "Build real-world projects for your portfolio" },
                { icons: <FaRegLightbulb className="text-[#461217] w-5 h-5" />, text: "Skill Assessments", subtext: "Track your progress with regular quizzes and feedback" }
            ],
            cta: "Start Learning"
        },
        {
            image: "/images/corporate.jpg",
            title: "For Corporate Teams",
            link: "/for-corporates",
            subtitle: "Transform Your Team with Powerful Upskilling",
            description: "Scale your organization with comprehensive training programs, custom solutions, and actionable analytics. Empower your workforce to stay ahead in a rapidly evolving business landscape with our tailored corporate learning experiences.",
            features: [
                { icons: <FaUsers className="text-[#461217] w-5 h-5" />, text: "Team Training Programs", subtext: "Comprehensive upskilling for your entire workforce" },
                { icons: <FaClipboardList className="text-[#461217] w-5 h-5" />, text: "Custom Curriculum", subtext: "Tailored learning paths for your business needs" },
                { icons: <FaChartLine className="text-[#461217] w-5 h-5" />, text: "Performance Analytics", subtext: "Track progress and ROI with detailed reporting" },
                { icons: <FaCogs className="text-[#461217] w-5 h-5" />, text: "Integration Support", subtext: "Seamless integration with your existing HR and LMS systems" }
            ],
            cta: "Transform Team"
        },
        {
            image: "/images/institution.jpg",
            title: "For Educational Institutions",
            link: "/courses",
            subtitle: "Scale Innovation Across Your Institution",
            description: "Leverage enterprise-grade solutions with dedicated support, strategic consulting, and global deployment. Drive digital transformation and foster innovation at scale with our robust platform and expert services for institutions.",
            features: [
                { icons: <FaUniversity className="text-[#461217] w-5 h-5" />, text: "Strategic Consulting", subtext: "Digital transformation and technology roadmaps" },
                { icons: <FaHeadset className="text-[#461217] w-5 h-5" />, text: "Dedicated Support", subtext: "24/7 enterprise support with dedicated account managers" },
                { icons: <FaGlobe className="text-[#461217] w-5 h-5" />, text: "Global Deployment", subtext: "Multi-region support with localized content delivery" },
                { icons: <FaHandsHelping className="text-[#461217] w-5 h-5" />, text: "Collaboration Tools", subtext: "Enable seamless collaboration between faculty and students" }
            ],
            cta: "Institution Solutions"
        }
    ]

    return (
        <div className="bg-[#f5f0e8]">
            <div className="w-full flex flex-col gap-4 justify-center items-center py-10 px-10 max-w-[1200px] mx-auto  ">
                {services.map((service, index) => (
                    <ServiceCard key={index} service={service} index={index} />
                ))}
            </div>
        </div>
    );
}

const ServiceCard = ({ service, index }: { service: any, index: number }) => {
    return (
        <div className="w-full flex flex-col md:flex-row gap-0 md:gap-15 py-10">
            {/* On mobile: always image first, then content. On desktop: alternate left/right */}
            {/* Mobile image (always first) */}
            <img
                src={service.image}
                alt={service.title}
                className="w-full md:hidden h-auto rounded-lg mb-6"
            />

            {/* Desktop image left (even index) */}
            {index % 2 === 0 && (
                <img
                    src={service.image}
                    alt={service.title}
                    className="hidden md:block w-[47%] h-auto rounded-lg mb-0"
                />
            )}

            <div className="flex flex-col space-y-10 w-full md:w-[53%]">
                <BoxReveal boxColor={"transparent"} duration={0.5} width="100%">
                    <div className="text-[#67180C] font-medium text-sm tracking-wide">
                        {service.title}
                    </div>
                </BoxReveal>
                <BoxReveal boxColor={"transparent"} duration={0.5} width="100%">
                    <h2 className="text-[#461217] text-5xl font-bold leading-tight"
                        style={{
                            textWrap: "balance"
                        }}
                    >
                        {service.subtitle}
                    </h2>
                </BoxReveal>

                <BoxReveal boxColor={"transparent"} duration={0.5} width="100%">
                    <p className="text-gray-700 text-lg">
                        {service.description}
                    </p>
                </BoxReveal>

                <BoxReveal boxColor={"transparent"} duration={0.5} width="100%">
                    <a href={service.link} className="inline-flex items-center text-[#67180C] font-medium bg-white px-4 py-2 rounded-full">
                        Learn More <HiArrowRight className="ml-2" />
                    </a>
                </BoxReveal>

                <div className="grid grid-cols-2 gap-y-8 mt-auto mb-20">
                    {service.features.map((feature: any, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-6 h-6 flex items-center justify-center">
                                {feature.icons || (
                                    <BoxReveal boxColor={"transparent"} duration={0.5} width="100%">
                                        <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 12H19M12 5V19" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </BoxReveal>
                                )}
                            </div>
                            <span className="text-gray-700">{feature.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop image right (odd index) */}
            {index % 2 !== 0 && (
                <img
                    src={service.image}
                    alt={service.title}
                    className="hidden md:block w-[47%] h-auto rounded-lg mt-0"
                />
            )}
        </div>
    )
}
