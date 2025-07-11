"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { Subscription } from '../admin/types/subscription';
import { subscribe } from '@/utils/subscribe';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IndianRupee, Calendar, Users, BookOpen, Check, Clock } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

function SubscriptionCheckout() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, dbUser, isLoading: authLoading, needsCompleteSetup } = useAuth();
    const [processing, setProcessing] = useState(false);
    const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'gateway' | 'success'>('form');
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: 'male',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        termsAccepted: false
    });

    useEffect(() => {
        // Check authentication first
        if (!authLoading) {
            if (!user) {
                toast.error('Please log in to purchase a subscription');
                router.push('/auth');
                return;
            }

            if (needsCompleteSetup) {
                toast.error('Please complete your profile setup first');
                router.push('/complete-setup');
                return;
            }

            if (!dbUser) {
                toast.error('Unable to load user profile. Please try again.');
                router.push('/auth');
                return;
            }
        }

        // Get subscription data from URL params or localStorage
        const subscriptionData = searchParams.get('subscription');
        if (subscriptionData) {
            try {
                const parsedSubscription = JSON.parse(decodeURIComponent(subscriptionData));
                setSubscription(parsedSubscription);
            } catch (error) {
                console.error('Error parsing subscription data:', error);
                toast.error('Invalid subscription data');
                router.push('/subscriptions');
            }
        } else {
            // Check if subscription data is in localStorage
            const storedSubscription = localStorage.getItem('selectedSubscription');
            if (storedSubscription) {
                try {
                    const parsedSubscription = JSON.parse(storedSubscription);
                    setSubscription(parsedSubscription);
                } catch (error) {
                    console.error('Error parsing stored subscription data:', error);
                    toast.error('No subscription selected');
                    router.push('/subscriptions');
                }
            } else {
                toast.error('No subscription selected');
                router.push('/subscriptions');
            }
        }
    }, [searchParams, router, user, dbUser, authLoading, needsCompleteSetup]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData({
                ...formData,
                [name]: checked
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!subscription) {
            toast.error("No subscription selected");
            return;
        }

        if (!user || !dbUser) {
            toast.error("Please log in to continue");
            return;
        }

        setProcessing(true);
        setPaymentStep('processing');

        try {
            // Step 1: Process payment simulation
            toast.loading("Processing payment...", { id: 'payment' });

            // Simulate payment processing time
            await new Promise(resolve => setTimeout(resolve, 2000));

            setPaymentStep('gateway');
            toast.loading("Connecting to payment gateway...", { id: 'payment' });

            // Step 2: Gateway simulation (additional 3 seconds)
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Step 3: Process subscription enrollment using actual API
            toast.loading("Activating subscription...", { id: 'payment' });

            // Calculate expiry date based on subscription duration
            const currentDate = new Date();
            const expiryDate = new Date(currentDate.getTime() + (subscription.duration * 24 * 60 * 60 * 1000));

            const subscriptionData = {
                user_id: dbUser.firebase_uid,
                expiry_date: expiryDate.toISOString(),
                subscription_id: subscription.id
            };

            // Call the actual subscription API
            const subscribeSuccess = await subscribe(subscriptionData);

            if (!subscribeSuccess) {
                throw new Error("Failed to activate subscription");
            }

            setPaymentStep('success');
            toast.success("Payment successful! Subscription activated!", { id: 'payment' });

            // Payment gateway simulation after successful API call (3-5 seconds)
            await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 3000)); // 3-5 seconds

            // Clear stored subscription data
            localStorage.removeItem('selectedSubscription');

            // Wait a moment to show success message then redirect
            setTimeout(() => {
                toast.success("Redirecting to your subscriptions...");
                router.push('/my-subscription');
            }, 1000);

        } catch (error: any) {
            console.error("Subscription enrollment error:", error);
            toast.error(error.message || "Payment failed. Please try again.", { id: 'payment' });
            setPaymentStep('form');
            setProcessing(false);
        }
    };

    const formatDuration = (days: number) => {
        if (days < 30) {
            return `${days} day${days > 1 ? 's' : ''}`;
        } else if (days >= 365) {
            const years = (days / 365).toFixed(1);
            return `${years} year${parseFloat(years) >= 2 ? 's' : ''}`;
        } else {
            const months = (days / 30).toFixed(1);
            return `${months} month${parseFloat(months) >= 2 ? 's' : ''}`;
        }
    };

    const formatPrice = (price: string | number) => {
        const num = typeof price === "string" ? parseFloat(price) : price;
        if (isNaN(num)) return "0";
        return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Calculate costs
    const subtotal = subscription ? parseFloat(subscription.amount) : 0;
    const total = subtotal;

    // Payment processing overlay
    if (processing) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <Toaster position="top-center" />
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
                    <div className="mb-6">
                        {paymentStep === 'processing' && (
                            <>
                                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#8D1A5F] mx-auto mb-4"></div>
                                <h2 className="text-xl font-bold text-gray-800 mb-2">Processing Payment</h2>
                                <p className="text-gray-600">Please wait while we process your payment...</p>
                            </>
                        )}

                        {paymentStep === 'gateway' && (
                            <>
                                <div className="animate-pulse">
                                    <div className="w-16 h-16 bg-gradient-to-r from-[#8D1A5F] to-[#B91C8C] rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 mb-2">Secure Payment Gateway</h2>
                                <p className="text-gray-600">Connecting to secure payment gateway...</p>
                                <div className="mt-4 flex justify-center">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-[#8D1A5F] rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-[#8D1A5F] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-[#8D1A5F] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </>
                        )}

                        {paymentStep === 'success' && (
                            <>
                                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-green-800 mb-2">Payment Successful!</h2>
                                <p className="text-gray-600">Activating your subscription...</p>
                            </>
                        )}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-2">Total Amount</div>
                        <div className="text-2xl font-bold text-[#8D1A5F] flex items-center justify-center">
                            <IndianRupee size={20} className="mr-1" />
                            {formatPrice(total)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Show loading state while checking authentication
    if (authLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <Toaster position="top-right" />
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    // Show error state if not authenticated or no subscription
    if (!user || !dbUser || !subscription) {
        return (
            <div className="min-h-screen bg-slate-50 py-4 sm:py-8 lg:py-12 px-4">
                <Toaster position="top-right" />
                <div className="container mx-auto pt-[8vh] sm:pt-[10vh]">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            {!user ? (
                                <>
                                    <h1 className="text-xl sm:text-2xl font-bold mb-4">Authentication Required</h1>
                                    <p className="text-gray-600 mb-6">Please log in to purchase a subscription</p>
                                    <Button
                                        onClick={() => router.push('/auth')}
                                        className="bg-[#8D1A5F] hover:bg-[#8D1A5F]/90 text-white px-6 py-3"
                                    >
                                        Log In
                                    </Button>
                                </>
                            ) : !subscription ? (
                                <>
                                    <h1 className="text-xl sm:text-2xl font-bold mb-4">No subscription selected</h1>
                                    <p className="text-gray-600 mb-6">Please select a subscription plan to proceed</p>
                                    <Button
                                        onClick={() => router.push('/subscriptions')}
                                        className="bg-[#8D1A5F] hover:bg-[#8D1A5F]/90 text-white px-6 py-3"
                                    >
                                        Browse Subscriptions
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-xl sm:text-2xl font-bold mb-4">Profile Setup Required</h1>
                                    <p className="text-gray-600 mb-6">Please complete your profile to continue</p>
                                    <Button
                                        onClick={() => router.push('/complete-setup')}
                                        className="bg-[#8D1A5F] hover:bg-[#8D1A5F]/90 text-white px-6 py-3"
                                    >
                                        Complete Setup
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-4 sm:py-8 lg:py-12 px-4">
            <Toaster position="top-right" />
            <div className="container mx-auto pt-[8vh] sm:pt-[10vh]">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">SUBSCRIPTION CHECKOUT</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
                        {/* Left side - Customer details form */}
                        <div className="lg:col-span-3 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Customer Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="John Doe"
                                        className="h-10 sm:h-11"
                                        disabled={processing}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="john@example.com"
                                        className="h-10 sm:h-11"
                                        disabled={processing}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="+91 98765 43210"
                                        className="h-10 sm:h-11"
                                        disabled={processing}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full h-10 sm:h-11 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8D1A5F] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                        required
                                        disabled={processing}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                        <option value="prefer_not_to_say">Prefer not to say</option>
                                    </select>
                                </div>
                            </div>

                            <h3 className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4">Billing Address</h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="address">Street Address</Label>
                                    <Textarea
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="123 Main Street, Apt 4B"
                                        className="min-h-[80px] resize-none"
                                        disabled={processing}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Mumbai"
                                            className="h-10 sm:h-11"
                                            disabled={processing}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="state">State/Province</Label>
                                        <Input
                                            id="state"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Maharashtra"
                                            className="h-10 sm:h-11"
                                            disabled={processing}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="zipCode">PIN Code</Label>
                                        <Input
                                            id="zipCode"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="400001"
                                            className="h-10 sm:h-11"
                                            disabled={processing}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="country">Country</Label>
                                        <Input
                                            id="country"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="India"
                                            className="h-10 sm:h-11"
                                            disabled={processing}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Subscription summary */}
                        <div className="lg:col-span-2">
                            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sticky top-4">
                                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Subscription Summary</h2>

                                {/* Subscription details */}
                                <div className="mb-6">
                                    <div className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-[#8D1A5F]-50 border-blue-200">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 bg-blue-100 rounded-full">
                                                <Calendar size={20} className="text-blue-600" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800">
                                                {subscription.title || 'Premium Subscription'}
                                            </h3>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center text-gray-600">
                                                <Clock size={16} className="mr-2" />
                                                <span>Duration: {formatDuration(subscription.duration)}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Users size={16} className="mr-2" />
                                                <span>{subscription._count?.subscription_users || 0} active users</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <BookOpen size={16} className="mr-2" />
                                                <span>{subscription._count?.subscription_courses || 0} courses included</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-blue-200">
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                                            <div className="space-y-1">
                                                {subscription.description.split(',').map((feature, index) => (
                                                    <div key={index} className="flex items-center text-xs text-gray-600">
                                                        <Check size={12} className="mr-2 text-green-600" />
                                                        {feature.trim()}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-blue-200">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">Subscription Price:</span>
                                                <div className="flex items-center text-lg font-bold text-gray-800">
                                                    <IndianRupee size={16} className="mr-1" />
                                                    {formatPrice(subscription.amount)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 border-t pt-4">
                                    <div className="flex justify-between">
                                        <span className="font-bold text-base sm:text-lg">Total</span>
                                        <div className="flex items-center font-bold text-lg sm:text-xl">
                                            <IndianRupee size={20} className="mr-1" />
                                            {formatPrice(total)}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="flex items-start">
                                        <input
                                            type="checkbox"
                                            id="termsAccepted"
                                            name="termsAccepted"
                                            checked={formData.termsAccepted}
                                            onChange={handleInputChange}
                                            required
                                            className="mr-3 h-4 w-4 mt-0.5 flex-shrink-0"
                                            disabled={processing}
                                        />
                                        <label htmlFor="termsAccepted" className="text-xs sm:text-sm leading-relaxed">
                                            I agree to the <a href="/terms-and-conditions" className="text-[#8D1A5F] underline">Terms and Conditions</a>
                                        </label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-[#8D1A5F]/90 text-white hover:bg-[#8D1A5F] py-4 sm:py-6 flex items-center justify-center gap-2 rounded-full text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!formData.termsAccepted || !subscription || processing}
                                    >
                                        {processing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <IndianRupee size={20} />
                                                Pay {formatPrice(total)}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default function page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SubscriptionCheckout />
        </Suspense>
    )
}
