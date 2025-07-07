'use client';

import React, { useEffect, useState } from 'react';
import { Subscription } from '@/app/admin/types/subscription';
import { getSubscription } from '@/app/admin/utils/subscription';
import { IndianRupee } from 'lucide-react';

export default function Subscriptions() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            const fetchedSubscriptions = await getSubscription();
            setSubscriptions(fetchedSubscriptions);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        } finally {
            setLoading(false);
        }
    };

    // Get specific subscriptions by ID
    const plusSubscription = subscriptions.find(sub => sub.id === 'sub_X57p7pikGe');
    const premiumSubscription = subscriptions.find(sub => sub.id === 'sub_twadXxEmVV');

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

    const handleSubscriptionClick = (subscription: Subscription) => {
        localStorage.setItem('selectedSubscription', JSON.stringify(subscription));
        window.location.href = '/subscription-checkout';
    };

    const handleViewAllClick = () => {
        window.location.href = '/subscriptions';
    };

    if (loading) {
        return (
            <section className="py-10 sm:py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-gray-800 px-2" style={{
                            textWrap: "balance"
                        }}>Your Pace, Your Plan</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto px-2" style={{
                            textWrap: "balance"
                        }}>
                            Choose the plan that fits your learning style and goals.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-10 sm:py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-gray-800 px-2" style={{
                        textWrap: "balance"
                    }}>Your Pace, Your Plan</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto px-2" style={{
                        textWrap: "balance"
                    }}>
                        Choose the plan that fits your learning style and goals.
                    </p>
                </div>

                <div className="flex flex-col gap-6 mx-auto justify-evenly items-center lg:flex-row lg:items-stretch">
                    {/* Free Plan */}
                    <div className="bg-gray-100/50 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-300 hover:scale-105 flex-1 flex flex-col w-full max-w-sm">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <h3 className="text-2xl sm:text-3xl font-bold text-[#461217] mb-2 sm:mb-3 font-raleway">Free</h3>
                            <p className="text-gray-700 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed">
                                <span className="font-semibold">Default plan.</span> Browse all courses and purchase only what you want, when you want. Pay as you go, no monthly commitment.
                            </p>
                            <div className="flex items-end mb-6 sm:mb-8">
                                <div className="flex items-center">
                                    <IndianRupee size={20} className="text-[#461217]" />
                                    <span className="text-3xl sm:text-4xl font-bold text-[#461217]">0</span>
                                </div>
                                <span className="text-gray-600 ml-1 text-xs sm:text-sm">/ forever</span>
                            </div>
                            <div className="mt-auto">
                                <button className="w-full bg-gray-500/80 backdrop-blur-sm hover:bg-gray-600/90 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-sm font-medium transition-all duration-300 border border-gray-400/30">
                                    Start with Free
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Plus Plan */}
                    {plusSubscription ? (
                        <div className="bg-gradient-to-br from-blue-500/80 via-blue-600/70 to-blue-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-700/40 shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-300 hover:scale-105 flex-1 flex flex-col w-full max-w-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-blue-600/20 to-blue-900/20 pointer-events-none"></div>
                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 drop-shadow-sm font-raleway">
                                    {plusSubscription.title || 'Plus'}
                                </h3>
                                <p className="text-white/95 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed drop-shadow-sm">
                                    {plusSubscription.description}
                                </p>
                                <div className="flex items-end mb-6 sm:mb-8">
                                    <div className="flex items-center">
                                        <IndianRupee size={20} className="text-white drop-shadow-sm" />
                                        <span className="text-3xl sm:text-4xl font-bold text-white drop-shadow-sm">
                                            {formatPrice(plusSubscription.amount)}
                                        </span>
                                    </div>
                                    <span className="text-white/90 ml-1 text-xs sm:text-sm">
                                        / {formatDuration(plusSubscription.duration)}
                                    </span>
                                </div>
                                <div className="mt-auto">
                                    <button
                                        onClick={() => handleSubscriptionClick(plusSubscription)}
                                        className="w-full bg-gradient-to-r from-blue-700/80 to-blue-900/80 backdrop-blur-sm hover:from-blue-800/90 hover:to-blue-900/90 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-sm font-medium transition-all duration-300 border border-blue-800/30"
                                    >
                                        Upgrade to {plusSubscription.title || 'Plus'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-blue-500/80 via-blue-600/70 to-blue-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-700/40 shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-300 hover:scale-105 flex-1 flex flex-col w-full max-w-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-blue-600/20 to-blue-900/20 pointer-events-none"></div>
                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 drop-shadow-sm font-raleway">Plus</h3>
                                <p className="text-white/95 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed drop-shadow-sm">
                                    <span className="font-semibold">Get free access to a selection of our top courses.</span> Perfect for regular learners who want more value and variety.
                                </p>
                                <div className="flex items-end mb-6 sm:mb-8">
                                    <div className="flex items-center">
                                        <IndianRupee size={20} className="text-white drop-shadow-sm" />
                                        <span className="text-3xl sm:text-4xl font-bold text-white drop-shadow-sm">999</span>
                                    </div>
                                    <span className="text-white/90 ml-1 text-xs sm:text-sm">/ month</span>
                                </div>
                                <div className="mt-auto">
                                    <button className="w-full bg-gradient-to-r from-blue-700/80 to-blue-900/80 backdrop-blur-sm hover:from-blue-800/90 hover:to-blue-900/90 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-sm font-medium transition-all duration-300 border border-blue-800/30">
                                        Upgrade to Plus
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Premium Plan */}
                    {premiumSubscription ? (
                        <div className="bg-gradient-to-br from-yellow-300/80 via-yellow-400/70 to-yellow-600/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-yellow-300/40 shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-300 hover:scale-105 flex-1 flex flex-col w-full max-w-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-yellow-400/20 to-yellow-700/20 pointer-events-none"></div>
                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-2xl sm:text-3xl font-bold text-yellow-900 mb-2 sm:mb-3 font-raleway">
                                    {premiumSubscription.title || 'Premium'}
                                </h3>
                                <p className="text-yellow-900/90 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed">
                                    {premiumSubscription.description}
                                </p>
                                <div className="flex items-end mb-6 sm:mb-8">
                                    <div className="flex items-center">
                                        <IndianRupee size={20} className="text-yellow-900" />
                                        <span className="text-3xl sm:text-4xl font-bold text-yellow-900">
                                            {formatPrice(premiumSubscription.amount)}
                                        </span>
                                    </div>
                                    <span className="text-yellow-800/80 ml-1 text-xs sm:text-sm">
                                        / {formatDuration(premiumSubscription.duration)}
                                    </span>
                                </div>
                                <div className="mt-auto">
                                    <button
                                        onClick={() => handleSubscriptionClick(premiumSubscription)}
                                        className="w-full bg-gradient-to-r from-yellow-700/80 to-yellow-900/80 backdrop-blur-sm hover:from-yellow-800/90 hover:to-yellow-900/90 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-sm font-medium transition-all duration-300 border border-yellow-800/30"
                                    >
                                        Go {premiumSubscription.title || 'Premium'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-yellow-300/80 via-yellow-400/70 to-yellow-600/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-yellow-300/40 shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-300 hover:scale-105 flex-1 flex flex-col w-full max-w-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-yellow-400/20 to-yellow-700/20 pointer-events-none"></div>
                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-2xl sm:text-3xl font-bold text-yellow-900 mb-2 sm:mb-3 font-raleway">Premium</h3>
                                <p className="text-yellow-900/90 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed">
                                    <span className="font-semibold">Unlock access to our full course library and exclusive features.</span> Enjoy many more courses, advanced tools, and priority support.
                                </p>
                                <div className="flex items-end mb-6 sm:mb-8">
                                    <div className="flex items-center">
                                        <IndianRupee size={20} className="text-yellow-900" />
                                        <span className="text-3xl sm:text-4xl font-bold text-yellow-900">1,999</span>
                                    </div>
                                    <span className="text-yellow-800/80 ml-1 text-xs sm:text-sm">/ month</span>
                                </div>
                                <div className="mt-auto">
                                    <button className="w-full bg-gradient-to-r from-yellow-700/80 to-yellow-900/80 backdrop-blur-sm hover:from-yellow-800/90 hover:to-yellow-900/90 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-sm font-medium transition-all duration-300 border border-yellow-800/30">
                                        Go Premium
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* View All Subscription Plans Button */}
                <div className="text-center mt-8 sm:mt-12">
                    <button
                        onClick={handleViewAllClick}
                        className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white py-3 sm:py-4 px-8 sm:px-12 rounded-full text-sm sm:text-base font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        View All Subscription Plans
                    </button>
                </div>
            </div>
        </section>
    );
}