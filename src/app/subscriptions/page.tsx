'use client';

import React, { useEffect, useState } from 'react';
import { Subscription } from '../admin/types/subscription';
import { getSubscription } from '../admin/utils/subscription';
import { toast, Toaster } from 'react-hot-toast';
import { IndianRupee, Clock, Users, BookOpen, Check, Star, Crown, Zap } from 'lucide-react';

export default function SubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSubscriptions = async () => {
        setIsLoading(true);
        try {
            const fetchedSubscriptions = await getSubscription();
            setSubscriptions(fetchedSubscriptions);
        } catch (error) {
            toast.error("Failed to fetch subscriptions");
            console.error('Error fetching subscriptions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const formatDuration = (days: number) => {
        if (days < 30) {
            return `${days} day${days > 1 ? 's' : ''}`;
        } else if (days >= 365) {
            const years = (days / 365).toFixed(1);
            return `${years} year${parseFloat(years) >= 2 ? 's' : ''}`;
        } else {
            const months = Math.floor(days / 30);
            return `${months} month${months >= 2 ? 's' : ''}`;
        }
    };

    const formatPrice = (amount: string) => {
        return parseFloat(amount).toLocaleString('en-IN');
    };

    const getGradientClass = (index: number) => {
        const gradients = [
            'from-blue-500/80 via-blue-600/70 to-blue-900/80 border-blue-700/40',
            'from-purple-500/80 via-purple-600/70 to-purple-900/80 border-purple-700/40',
            'from-green-500/80 via-green-600/70 to-green-900/80 border-green-700/40',
            'from-yellow-400/80 via-yellow-500/70 to-yellow-700/80 border-yellow-600/40',
            'from-red-500/80 via-red-600/70 to-red-900/80 border-red-700/40',
            'from-[#8D1A5F]/80 via-[#8D1A5F]/70 to-[#8D1A5F]-900/80 border-[#8D1A5F]-700/40',
        ];
        return gradients[index % gradients.length];
    };

    const getIcon = (index: number) => {
        const icons = [Zap, Star, Crown, BookOpen, Users, Clock];
        const IconComponent = icons[index % icons.length];
        return <IconComponent size={24} className="text-white drop-shadow-sm" />;
    };

    const handleSubscribe = (subscription: Subscription) => {
        // Store subscription data for checkout
        localStorage.setItem('selectedSubscription', JSON.stringify(subscription));

        // Navigate to subscription checkout
        window.location.href = '/subscription-checkout';

        toast.success(`Selected ${subscription.title || 'subscription'} plan!`, {
            icon: "🎉",
            duration: 2000,
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading subscription plans...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-[10vh]">
            <Toaster position="top-right" />

            {/* Header Section */}
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 sm:mb-16">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-800 px-2" style={{
                            textWrap: "balance"
                        }}>
                            Choose Your Learning Path
                        </h1>
                        <p className="text-gray-600 max-w-3xl mx-auto text-lg sm:text-xl px-2 leading-relaxed" style={{
                            textWrap: "balance"
                        }}>
                            Unlock your potential with our flexible subscription plans. Each plan is designed to fit your learning style and goals.
                        </p>
                    </div>

                    {subscriptions.length === 0 ? (
                        <div className="text-center py-16">
                            <BookOpen className="mx-auto h-16 w-16 text-gray-400 mb-6" />
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No subscription plans available</h3>
                            <p className="text-gray-600">Check back later for new subscription options.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                            {subscriptions.map((subscription, index) => (
                                <div
                                    key={subscription.id}
                                    className={`bg-gradient-to-br ${getGradientClass(index)} backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-300 hover:scale-105 flex flex-col`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none"></div>
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-white/20 rounded-full">
                                                {getIcon(index)}
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-sm font-raleway">
                                                {subscription.title || 'Premium Plan'}
                                            </h3>
                                        </div>

                                        <div className="flex items-center mb-6">
                                            <IndianRupee size={20} className="text-white drop-shadow-sm" />
                                            <span className="text-3xl sm:text-4xl font-bold text-white drop-shadow-sm">
                                                {formatPrice(subscription.amount)}
                                            </span>
                                            <span className="text-white/90 ml-2 text-sm">
                                                / {formatDuration(subscription.duration)}
                                            </span>
                                        </div>

                                        <div className="space-y-2 mb-6 flex-grow">
                                            <div className="flex items-center text-sm text-white/90 mb-3">
                                                <Clock size={16} className="mr-2" />
                                                {formatDuration(subscription.duration)} access
                                            </div>
                                            <div className="flex items-center text-sm text-white/90 mb-3">
                                                <Users size={16} className="mr-2" />
                                                {subscription._count?.subscription_users || 0} active users
                                            </div>
                                            <div className="flex items-center text-sm text-white/90 mb-3">
                                                <BookOpen size={16} className="mr-2" />
                                                {subscription._count?.subscription_courses || 0} courses included
                                            </div>
                                            {subscription.description.split(',').map((feature, featureIndex) => (
                                                <div key={featureIndex} className="flex items-center text-sm text-white/90">
                                                    <Check size={16} className="mr-2 text-green-300" />
                                                    {feature.trim()}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-auto">
                                            <button
                                                onClick={() => handleSubscribe(subscription)}
                                                className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-3 px-6 rounded-full text-sm font-medium transition-all duration-300 border border-white/30 hover:border-white/50"
                                            >
                                                Choose {subscription.title || 'Plan'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Features Section */}
                    <div className="mt-16 sm:mt-20 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
                            Why Choose Our Subscriptions?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="flex flex-col items-center text-center">
                                <div className="p-4 bg-blue-100 rounded-full mb-4">
                                    <BookOpen size={32} className="text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Unlimited Access
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Get access to our entire course library with your subscription plan.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="p-4 bg-green-100 rounded-full mb-4">
                                    <Users size={32} className="text-green-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Expert Support
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Get help from our expert instructors and dedicated support team.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="p-4 bg-purple-100 rounded-full mb-4">
                                    <Star size={32} className="text-purple-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Certificates
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Earn verified certificates upon course completion to boost your career.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
