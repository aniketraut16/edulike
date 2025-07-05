'use client';
import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState, useCallback } from 'react'
import { getAllUsers, User, Pagination } from '../../utils/users';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

function UsersPage() {
    const { token } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        hasNextPage: false,
        hasPreviousPage: false,
    });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 200);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const fetchUsers = useCallback(async (page: number = 1, query: string = '') => {
        if (!token) return;

        setLoading(true);
        try {
            const response = await getAllUsers(token, page, query);
            setUsers(response.users);
            setPagination(response.pagination);
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Fetch users when debounced search query or page changes
    useEffect(() => {
        if (token) {
            fetchUsers(currentPage, debouncedSearchQuery);
        }
    }, [token, currentPage, debouncedSearchQuery, fetchUsers]);

    // Reset to page 1 when search query changes
    useEffect(() => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [debouncedSearchQuery]);

    const handleViewDetails = (userId: string) => {
        toast.success('Coming soon!');
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePreviousPage = () => {
        if (pagination.hasPreviousPage) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (pagination.hasNextPage) {
            handlePageChange(currentPage + 1);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-lg">Loading users...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Users Management</h1>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Users List */}
            {users.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">
                        {searchQuery ? 'No users found matching your search' : 'No users found'}
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid gap-4">
                        {users.map((user) => (
                            <div key={user.firebase_uid} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                            {user.profile_image ? (
                                                <img
                                                    src={user.profile_image}
                                                    alt={user.name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-gray-600 font-medium">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-800">{user.name}</h3>
                                            <p className="text-gray-600">{user.email}</p>
                                            <p className="text-sm text-gray-500">{user.phone}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleViewDetails(user.firebase_uid)}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Showing {users.length} of {pagination.totalItems} users
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handlePreviousPage}
                                disabled={!pagination.hasPreviousPage}
                            >
                                Previous
                            </Button>
                            <span className="text-sm text-gray-700">
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleNextPage}
                                disabled={!pagination.hasNextPage}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default UsersPage;