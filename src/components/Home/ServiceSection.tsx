'use client'
import React, { useState } from 'react';

export default function EnhancedServicesSection() {
    const [activeSection, setActiveSection] = useState(null);

    const services = [
        {
            id: 'students',
            title: 'For Students',
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
            stats: { students: '15k+', completion: '95%', rating: '4.9' },
            cta: 'Start Learning'
        },
        {
            id: 'professionals',
            title: 'For Professionals',
            subtitle: 'Advance Your Career',
            description: 'Upskill with cutting-edge technologies and leadership training to stay ahead in your field.',
            gradient: 'from-blue-400 to-indigo-500',
            bgGradient: 'from-blue-50 to-indigo-100',
            cardBg: 'bg-gradient-to-br from-blue-50/80 to-indigo-100/80',
            offerings: [
                {
                    icon: (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    ),
                    title: 'Industry Certifications',
                    description: 'Earn recognized credentials from top tech companies'
                },
                {
                    icon: (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                        </svg>
                    ),
                    title: 'Leadership Training',
                    description: 'Develop management and team leadership skills'
                },
                {
                    icon: (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    ),
                    title: 'Career Acceleration',
                    description: 'Strategic guidance for promotions and salary growth'
                }
            ],
            stats: { professionals: '8k+', promotions: '78%', salary: '+35%' },
            cta: 'Advance Career'
        },
        {
            id: 'businesses',
            title: 'For Businesses',
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
            stats: { companies: '500+', efficiency: '+45%', retention: '92%' },
            cta: 'Transform Team'
        },
        {
            id: 'enterprises',
            title: 'For Enterprises',
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
            stats: { enterprises: '50+', countries: '15+', uptime: '99.9%' },
            cta: 'Enterprise Solutions'
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
                    <div className="inline-block mb-4">
                        <span className="bg-gradient-to-r from-purple-200 to-pink-200 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                            Our Services
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Tailored Solutions for
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Everyone</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        From individual learners to global enterprises, we provide comprehensive solutions that drive success
                    </p>
                </div>

                {/* Services Grid */}
                <div className="space-y-16">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-reverse' : ''
                                }`}
                        >
                            {/* Content Side */}
                            <div className="space-y-8">
                                <div>
                                    <div className={`inline-block mb-4 px-4 py-2 bg-gradient-to-r ${service.bgGradient} rounded-full`}>
                                        <span className={`text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                                            {service.title}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                        {service.subtitle}
                                    </h3>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Offerings */}
                                <div className="space-y-4">
                                    {service.offerings.map((offering, idx) => (
                                        <div
                                            key={idx}
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
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center space-x-8">
                                    {Object.entries(service.stats).map(([key, value]) => (
                                        <div key={key} className="text-center">
                                            <div className={`text-2xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                                                {value}
                                            </div>
                                            <div className="text-xs text-gray-500 uppercase tracking-wide">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <button className={`px-8 py-4 bg-gradient-to-r ${service.gradient} text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95`}>
                                    {service.cta}
                                    <svg className="w-5 h-5 ml-2 inline" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Visual Side */}
                            <div className="relative">
                                <div className={`${service.cardBg} backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 relative overflow-hidden`}>
                                    {/* Decorative Elements */}
                                    <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${service.gradient} rounded-full opacity-20`}></div>
                                    <div className={`absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-full opacity-10`}></div>

                                    {/* Avatar/Icon */}
                                    <div className="relative z-10">
                                        <div className={`w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-full mx-auto mb-6 flex items-center justify-center relative overflow-hidden`}>
                                            <div className="text-white text-4xl font-bold">
                                                {service.title.split(' ')[1][0]}
                                            </div>
                                            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                                        </div>

                                        <div className="text-center space-y-4">
                                            <h4 className="text-xl font-bold text-gray-900">
                                                {service.title}
                                            </h4>
                                            <div className="flex justify-center space-x-6">
                                                {Object.entries(service.stats).slice(0, 2).map(([key, value]) => (
                                                    <div key={key} className="text-center">
                                                        <div className={`text-lg font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                                                            {value}
                                                        </div>
                                                        <div className="text-xs text-gray-500 capitalize">
                                                            {key}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Elements */}
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                                        <svg className={`w-4 h-4 text-${service.gradient.split('-')[1]}-500`} viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </div>

                                    <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/80 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className={`w-5 h-5 text-${service.gradient.split('-')[1]}-500`} viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-20">
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Ready to Get Started?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Choose the perfect plan for your needs and start your journey today
                        </p>
                        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95">
                            Explore All Solutions
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}