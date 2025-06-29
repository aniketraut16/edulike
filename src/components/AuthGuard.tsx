"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, dbUser, isLoading, isDBUserLoading, needsCompleteSetup } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Don't redirect if still loading
        if (isLoading || isDBUserLoading) {
            return;
        }

        // Don't redirect if user is not logged in
        if (!user) {
            return;
        }

        // Don't redirect if already on complete-setup page
        if (pathname === '/complete-setup') {
            return;
        }

        // Don't redirect if already on auth page
        if (pathname === '/auth') {
            return;
        }

        // Redirect to complete-setup if user needs to complete setup
        if (needsCompleteSetup && !dbUser) {
            router.push('/complete-setup');
        }
    }, [user, dbUser, isLoading, isDBUserLoading, needsCompleteSetup, router, pathname]);

    return <>{children}</>;
} 