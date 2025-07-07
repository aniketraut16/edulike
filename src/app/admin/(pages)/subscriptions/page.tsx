'use client';

import React, { useEffect, useState } from 'react';
import { getSubscription, createSubscription, updateSubscription, deleteSubscription } from "@/app/admin/utils/subscription";
import { Subscription, SubscriptionArgs } from "@/app/admin/types/subscription";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Search, Plus, Edit2, Trash2, Eye, Calendar, IndianRupee, Users, Clock, Shield, BookOpen } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';

interface SubscriptionFormProps {
    onSubmit: (e: React.FormEvent) => void;
    title: string;
    formData: SubscriptionArgs;
    setFormData: React.Dispatch<React.SetStateAction<SubscriptionArgs>>;
    closeModals: () => void;
    isLoading?: boolean;
}

const SubscriptionForm = React.memo(({ onSubmit, title, formData, setFormData, closeModals, isLoading }: SubscriptionFormProps) => (
    <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
            <Label htmlFor="title">Subscription Title *</Label>
            <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter subscription title"
                required
                disabled={isLoading}
            />
        </div>

        <div className="flex flex-col gap-2">
            <Label htmlFor="duration">Duration (days) *</Label>
            <Input
                id="duration"
                type="number"
                min="1"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                placeholder="Enter duration in days"
                required
                disabled={isLoading}
            />
        </div>

        <div className="flex flex-col gap-2">
            <Label htmlFor="amount">Amount *</Label>
            <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                    placeholder="Enter amount"
                    className="pl-10"
                    required
                    disabled={isLoading}
                />
            </div>
        </div>

        <div className="flex flex-col gap-2">
            <Label htmlFor="currency">Currency</Label>
            <Input
                id="currency"
                type="text"
                value={formData.currency}
                placeholder="INR"
                disabled
                className="bg-gray-50"
            />
            <p className="text-sm text-gray-500">Currency is fixed to INR</p>
        </div>

        <div className="flex flex-col gap-2">
            <Label htmlFor="description">Features(comma separated) *</Label>
            <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter subscription features (comma separated)"
                rows={4}
                required
                disabled={isLoading}
            />
        </div>

        <div className="flex justify-end gap-3 pt-4">
            <Button
                type="button"
                variant="outline"
                onClick={closeModals}
                className="bg-red-500 hover:bg-red-600 text-white border-red-500"
                disabled={isLoading}
            >
                Cancel
            </Button>
            <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={isLoading}
            >
                {isLoading ? 'Processing...' : (title.includes("Create") ? "Create Subscription" : "Update Subscription")}
            </Button>
        </div>
    </form>
));

export default function SubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<SubscriptionArgs>({
        title: "",
        duration: 30,
        amount: 0,
        currency: "INR",
        description: "",
    });

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    useEffect(() => {
        const filtered = subscriptions.filter(subscription =>
            subscription.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subscription.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredSubscriptions(filtered);
    }, [subscriptions, searchQuery]);

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

    const handleCreateSubscription = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim() || formData.amount <= 0 || formData.duration <= 0) {
            toast.error("Please fill in all required fields with valid values");
            return;
        }

        setIsSubmitting(true);
        try {
            const success = await createSubscription(formData);
            if (success) {
                toast.success("Subscription created successfully");
                setIsCreateModalOpen(false);
                setFormData({ title: "", duration: 30, amount: 0, currency: "INR", description: "" });
                fetchSubscriptions();
            } else {
                toast.error("Failed to create subscription");
            }
        } catch (error) {
            toast.error("Failed to create subscription");
            console.error('Error creating subscription:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditSubscription = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingSubscription || !formData.title.trim() || !formData.description.trim() || formData.amount <= 0 || formData.duration <= 0) {
            toast.error("Please fill in all required fields with valid values");
            return;
        }

        setIsSubmitting(true);
        try {
            const success = await updateSubscription(editingSubscription.id, formData);
            if (success) {
                toast.success("Subscription updated successfully");
                setIsEditModalOpen(false);
                setEditingSubscription(null);
                setFormData({ title: "", duration: 30, amount: 0, currency: "INR", description: "" });
                fetchSubscriptions();
            } else {
                toast.error("Failed to update subscription");
            }
        } catch (error) {
            toast.error("Failed to update subscription");
            console.error('Error updating subscription:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Protected subscription IDs used on home screen
    const protectedSubscriptionIds = ['sub_X57p7pikGe', 'sub_twadXxEmVV'];

    const handleDeleteSubscription = async (id: string, title: string) => {
        // Check if this subscription is protected
        if (protectedSubscriptionIds.includes(id)) {
            toast.error(`Cannot delete "${title}" - This subscription is used on the home screen`);
            return;
        }

        if (!confirm(`Are you sure you want to delete the subscription "${title}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const success = await deleteSubscription(id);
            if (success) {
                toast.success("Subscription deleted successfully");
                fetchSubscriptions();
            } else {
                toast.error("Failed to delete subscription");
            }
        } catch (error) {
            toast.error("Failed to delete subscription");
            console.error('Error deleting subscription:', error);
        }
    };

    const handleViewSubscription = () => {
        toast("View functionality coming soon!", {
            icon: "👀",
            duration: 2000,
        });
    };

    const openEditModal = (subscription: Subscription) => {
        setEditingSubscription(subscription);
        setFormData({
            title: subscription.title || "",
            duration: subscription.duration,
            amount: parseFloat(subscription.amount),
            currency: subscription.currency as "INR",
            description: subscription.description,
        });
        setIsEditModalOpen(true);
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        setEditingSubscription(null);
        setFormData({ title: "", duration: 30, amount: 0, currency: "INR", description: "" });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount: string, currency: string) => {
        return `${currency} ${parseFloat(amount).toLocaleString()}`;
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
                <p className="text-gray-600">Manage subscription packages, pricing, and track usage across the platform.</p>
            </div>

            {/* Search and Create Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <Input
                            type="text"
                            placeholder="Search subscriptions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        <Plus size={20} />
                        Create Subscription
                    </Button>
                </div>
            </div>

            {/* Subscriptions Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <p className="mt-2 text-gray-600">Loading subscriptions...</p>
                    </div>
                ) : filteredSubscriptions.length === 0 ? (
                    <div className="p-8 text-center">
                        <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No subscriptions found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchQuery ? "No subscriptions match your search." : "Get started by creating your first subscription package."}
                        </p>
                        {!searchQuery && (
                            <Button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                <Plus size={16} className="mr-2" />
                                Create First Subscription
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Subscription Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Duration & Pricing
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Usage Stats
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredSubscriptions.map((subscription) => (
                                    <tr key={subscription.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {subscription.title || 'Untitled Subscription'}
                                                    </div>
                                                    {protectedSubscriptionIds.includes(subscription.id) && (
                                                        <div className="flex items-center gap-1">
                                                            <Shield size={14} className="text-blue-600" />
                                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                                Protected
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500 max-w-xs truncate">
                                                    {subscription.description}
                                                </div>
                                                {protectedSubscriptionIds.includes(subscription.id) && (
                                                    <div className="text-xs text-blue-600 mt-1">
                                                        Used on home screen
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Calendar size={16} className="mr-1" />
                                                    {subscription.duration < 30
                                                        ? `${subscription.duration} day${subscription.duration > 1 ? 's' : ''}`
                                                        : subscription.duration >= 365
                                                            ? `${(subscription.duration / 365).toFixed(1)} year${(subscription.duration / 365) >= 2 ? 's' : ''}`
                                                            : `${(subscription.duration / 30).toFixed(1)} month${(subscription.duration / 30) >= 2 ? 's' : ''}`
                                                    }
                                                </div>
                                                <div className="flex items-center text-sm font-medium text-gray-900">
                                                    <IndianRupee size={16} className="mr-1" />
                                                    {formatCurrency(subscription.amount, subscription.currency)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Users size={16} className="mr-1" />
                                                    {subscription._count.subscription_users} users
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Calendar size={16} className="mr-1" />
                                                    {subscription._count.subscription_courses} courses
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <Clock size={16} className="mr-1" />
                                                {formatDate(subscription.created_at)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">

                                                <Link href={`/admin/subscriptions/courses?subscriptionId=${subscription.id}`}>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        <BookOpen size={16} />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    onClick={() => openEditModal(subscription)}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    <Edit2 size={16} />
                                                </Button>

                                                <Button
                                                    onClick={() => handleDeleteSubscription(subscription.id, subscription.title || 'Untitled')}
                                                    variant="ghost"
                                                    size="sm"
                                                    disabled={protectedSubscriptionIds.includes(subscription.id)}
                                                    className={protectedSubscriptionIds.includes(subscription.id)
                                                        ? "text-gray-400 cursor-not-allowed"
                                                        : "text-red-600 hover:text-red-900"
                                                    }
                                                    title={protectedSubscriptionIds.includes(subscription.id)
                                                        ? "Cannot delete - Used on home screen"
                                                        : "Delete subscription"
                                                    }
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Create Modal */}
            <Modal
                isOpen={isCreateModalOpen}
                onClose={closeModals}
                title="Create New Subscription"
                className="max-w-lg"
            >
                <SubscriptionForm
                    onSubmit={handleCreateSubscription}
                    title="Create Subscription"
                    formData={formData}
                    setFormData={setFormData}
                    closeModals={closeModals}
                    isLoading={isSubmitting}
                />
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={closeModals}
                title="Edit Subscription"
                className="max-w-lg"
            >
                <SubscriptionForm
                    onSubmit={handleEditSubscription}
                    title="Edit Subscription"
                    formData={formData}
                    setFormData={setFormData}
                    closeModals={closeModals}
                    isLoading={isSubmitting}
                />
            </Modal>
        </div>
    );
}
