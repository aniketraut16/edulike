'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserSubscription } from '@/types/subscription';
import { getSubscription } from '@/utils/subscribe';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, CreditCard, Package, ArrowRight, Loader2 } from 'lucide-react';

export default function MySubscriptionPage() {
    const { user, isLoading: authLoading } = useAuth();
    const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth');
            return;
        }

        if (user?.uid) {
            fetchUserSubscriptions();
        }
    }, [user, authLoading, router]);

    const fetchUserSubscriptions = async () => {
        if (!user?.uid) return;

        try {
            setLoading(true);
            const userSubscriptions = await getSubscription(user.uid);
            console.log('Raw API response:', userSubscriptions);

            // Filter out subscriptions that don't have the required subscription data
            const validSubscriptions = userSubscriptions.filter(sub =>
                sub && sub.subscriptions && sub.subscriptions.title
            );

            if (validSubscriptions.length !== userSubscriptions.length) {
                console.warn('Some subscriptions were filtered out due to missing data:',
                    userSubscriptions.filter(sub => !sub || !sub.subscriptions || !sub.subscriptions.title)
                );
            }

            setSubscriptions(validSubscriptions);
        } catch (err) {
            setError('Failed to load subscriptions');
            console.error('Error fetching subscriptions:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDuration = (duration: number) => {
        if (duration < 30) {
            return `${duration} days`;
        } else if (duration < 365) {
            const months = Math.floor(duration / 30);
            return `${months} ${months === 1 ? 'month' : 'months'}`;
        } else {
            const years = Math.floor(duration / 365);
            return `${years} ${years === 1 ? 'year' : 'years'}`;
        }
    };

    const getStatusColor = (status: string, expiryDate: string) => {
        const isExpired = new Date(expiryDate) < new Date();

        if (isExpired) {
            return 'bg-red-100 text-red-800 border-red-200';
        }

        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'expired':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-blue-100 text-blue-800 border-blue-200';
        }
    };

    const getStatusText = (status: string, expiryDate: string) => {
        const isExpired = new Date(expiryDate) < new Date();

        if (isExpired) {
            return 'Expired';
        }

        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const isSubscriptionActive = (status: string, expiryDate: string) => {
        const isNotExpired = new Date(expiryDate) >= new Date();
        return status.toLowerCase() === 'active' && isNotExpired;
    };

    const handleViewCourses = (subscriptionId: string) => {
        router.push(`/subscriptions/courses?subscription_id=${subscriptionId}`);
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
                    <p className="mt-4 text-gray-600">Loading your subscriptions...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <Package className="mx-auto h-12 w-12 text-red-500" />
                    <p className="mt-4 text-red-600">{error}</p>
                    <button
                        onClick={fetchUserSubscriptions}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 pt-[15vh]">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        My Subscriptions
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Manage your active subscriptions and access your learning content
                    </p>
                </div>

                {subscriptions.length === 0 ? (
                    <div className="text-center py-16">
                        <Package className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No subscriptions found</h3>
                        <p className="mt-2 text-gray-500">
                            You haven't subscribed to any plans yet. Browse our available subscription plans.
                        </p>
                        <button
                            onClick={() => router.push('/subscriptions')}
                            className="mt-6 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            View Subscription Plans
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {subscriptions.map((userSub) => (
                            <div
                                key={`${userSub.subscription_id}-${userSub.user_id}`}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
                            >
                                {/* Card Header */}
                                <div className=" p-6" style={{
                                    background: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)",
                                    color: "#fff"
                                }}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">
                                                {userSub.subscriptions?.title || 'Subscription Plan'}
                                            </h3>
                                            <div className="flex items-center space-x-1">
                                                <span className="text-2xl font-bold">₹{userSub.subscriptions?.amount || '0'}</span>
                                                <span className="text-blue-100">/ {formatDuration(userSub.subscriptions?.duration || 30)}</span>
                                            </div>
                                        </div>
                                        <div
                                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                                userSub.status,
                                                userSub.expiry_date
                                            )}`}
                                        >
                                            {getStatusText(userSub.status, userSub.expiry_date)}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                    {/* Description */}
                                    <p className="text-gray-600 mb-6 line-clamp-3">
                                        {userSub.subscriptions?.description || 'No description available'}
                                    </p>

                                    {/* Subscription Details */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                                            <span>Expires: {formatDate(userSub.expiry_date)}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Clock className="h-4 w-4 mr-2 text-blue-500" />
                                            <span>Duration: {formatDuration(userSub.subscriptions?.duration || 30)}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
                                            <span>Currency: {userSub.subscriptions?.currency || 'INR'}</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => handleViewCourses(userSub.subscription_id)}
                                        disabled={!isSubscriptionActive(userSub.status, userSub.expiry_date)}
                                        className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isSubscriptionActive(userSub.status, userSub.expiry_date)
                                            ? 'text-white hover:shadow-md'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                        style={
                                            isSubscriptionActive(userSub.status, userSub.expiry_date)
                                                ? {
                                                    background: "linear-gradient(90deg, #8D1A5F 0%, #C13584 100%)",
                                                    color: "#fff"
                                                }
                                                : undefined
                                        }
                                    >
                                        {isSubscriptionActive(userSub.status, userSub.expiry_date) ? (
                                            <>
                                                View Available Courses
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </>
                                        ) : (
                                            'Subscription Inactive'
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Additional Actions */}
                {subscriptions.length > 0 && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={() => router.push('/subscriptions')}
                            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
                        >
                            Browse More Plans
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
