"use client";
import SideNavbar from "@/app/admin/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isAdmin, isLoading } = useAuth();

    // Show loading state while authentication is being determined
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Only redirect after loading is complete and user is confirmed not admin
    if (!isAdmin) {
        return redirect("/");
    }

    return (
        <SideNavbar children={children} />
    );
}