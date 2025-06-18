import AnimatedText from "./AnimatedText";

export default function EnhancedServicesSection() {
    const services = [
        {
            id: 'individuals',
            title: 'For Individuals',
            subtitle: 'Accelerate Your Learning Journey',
            description: 'Unlock your potential with personalized learning paths and expert guidance tailored to your academic goals.',
            gradient: 'from-pink-400 to-rose-500',
            bgGradient: 'from-pink-50 to-rose-100',
            cardBg: 'bg-gradient-to-br from-pink-50/80 to-rose-100/80',
            offerings: [
                {
                    icon: (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    ),
                    title: 'Personalized Learning Paths',
                    description: 'Custom curricula designed for your learning style and pace'
                },
                {
                    icon: (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2c0 .74-.4 1.38-1 1.72v.78h-2v-.78c-.6-.34-1-.98-1-1.72zM15.5 17c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z" />
                        </svg>
                    ),
                    title: '1-on-1 Mentorship',
                    description: 'Direct access to industry experts and career guidance'
                },
                {
                    icon: (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                        </svg>
                    ),
                    title: 'Project-Based Learning',
                    description: 'Build real-world projects for your portfolio'
                }
            ],
            image: '/images/individuals.png',
            cta: 'Start Learning'
        },
        {
            id: 'corporates',
            title: 'For Corporates',
            subtitle: 'Transform Your Team',
            description: 'Scale your organization with comprehensive training programs and custom solutions.',
            gradient: 'from-emerald-400 to-teal-500',
            bgGradient: 'from-emerald-50 to-teal-100',
            cardBg: 'bg-gradient-to-br from-emerald-50/80 to-teal-100/80',
            offerings: [
                {
                    icon: (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2c0 .74-.4 1.38-1 1.72v.78h-2v-.78c-.6-.34-1-.98-1-1.72z" />
                        </svg>
                    ),
                    title: 'Team Training Programs',
                    description: 'Comprehensive upskilling for your entire workforce'
                },
                {
                    icon: (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                        </svg>
                    ),
                    title: 'Custom Curriculum',
                    description: 'Tailored learning paths for your business needs'
                },
                {
                    icon: (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19V5h14v14H5z" />
                        </svg>
                    ),
                    title: 'Performance Analytics',
                    description: 'Track progress and ROI with detailed reporting'
                }
            ],
            image: '/images/corporates.png',
            cta: 'Transform Team'
        },
        {
            id: 'institutions',
            title: 'For Institutions',
            subtitle: 'Scale Innovation',
            description: 'Enterprise-grade solutions with dedicated support and strategic consulting services.',
            gradient: 'from-purple-400 to-violet-500',
            bgGradient: 'from-purple-50 to-violet-100',
            cardBg: 'bg-gradient-to-br from-purple-50/80 to-violet-100/80',
            offerings: [
                {
                    icon: (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    ),
                    title: 'Strategic Consulting',
                    description: 'Digital transformation and technology roadmaps'
                },
                {
                    icon: (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    ),
                    title: 'Dedicated Support',
                    description: '24/7 enterprise support with dedicated account managers'
                },
                {
                    icon: (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                        </svg>
                    ),
                    title: 'Global Deployment',
                    description: 'Multi-region support with localized content delivery'
                }
            ],
            image: '/images/institutions.png',
            cta: 'Institution Solutions'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-100/30 to-rose-100/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-br from-purple-100/30 to-violet-100/30 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <AnimatedText as="div" className="inline-block mb-4">
                        <span className="bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                            Our Services
                        </span>
                    </AnimatedText>
                    <AnimatedText as="h2" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight" delay={0.1}>
                        Tailored Solutions for
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Everyone</span>
                    </AnimatedText>
                    <AnimatedText className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" delay={0.2}>
                        From individual learners to global enterprises, we provide comprehensive solutions that drive success
                    </AnimatedText>
                </div>

                {/* Services Grid */}
                <div className="space-y-16">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            {/* Visual Side */}
                            {index % 2 !== 0 ? (
                                <div className="relative">
                                    <img src={service.image} alt={service.title} className="w-[85%] object-cover" />
                                </div>
                            ) : null}

                            {/* Content Side */}
                            <div className="space-y-8">
                                <div>
                                    <AnimatedText as="div" className="inline-block mb-4" delay={0.1 * (index + 1)}>
                                        <div className={`px-4 py-2 bg-gradient-to-r ${service.bgGradient} rounded-full`}>
                                            <span className={`text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                                                {service.title}
                                            </span>
                                        </div>
                                    </AnimatedText>
                                    <AnimatedText as="h3" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" delay={0.15 * (index + 1)}>
                                        {service.subtitle}
                                    </AnimatedText>
                                    <AnimatedText className="text-lg text-gray-600 leading-relaxed" delay={0.2 * (index + 1)}>
                                        {service.description}
                                    </AnimatedText>
                                </div>

                                {/* Offerings */}
                                <div className="space-y-4">
                                    {service.offerings.map((offering, idx) => (
                                        <AnimatedText as="div" key={idx} delay={0.1 * (idx + 1) + 0.2 * (index + 1)}>
                                            <div
                                                className="flex items-start space-x-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 hover:bg-white/80 transition-all duration-300"
                                            >
                                                <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center text-white`}>
                                                    {offering.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-1">
                                                        {offering.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        {offering.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </AnimatedText>
                                    ))}
                                </div>

                                {/* CTA */}
                                <AnimatedText as="div" delay={0.3 * (index + 1)}>
                                    <button className={`bg-gradient-to-r ${service.gradient} text-white px-6 py-3 rounded-xl text-sm font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95`}>
                                        {service.cta}
                                    </button>
                                </AnimatedText>
                            </div>

                            {/* Visual Side (Alternate) */}
                            {index % 2 === 0 ? (
                                <div className="relative">
                                    <img src={service.image} alt={service.title} className="w-[85%] ml-auto object-cover" />
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}