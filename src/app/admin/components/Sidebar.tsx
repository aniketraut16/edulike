"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import {
    FaUsers,
    FaCreditCard,
    FaBlog,
    FaQuestionCircle,
    FaBookOpen
} from "react-icons/fa";
import { BiExit, BiMenu, BiX } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const routes = [
    {
        name: "Courses",
        icon: <FaBookOpen />,
        path: "/admin/courses"
    },
    {
        name: "Users",
        icon: <FaUsers />,
        path: "/admin/users"
    },
    {
        name: "Transactions",
        icon: <FaCreditCard />,
        path: "/admin/transactions"
    },
    {
        name: "Blogs",
        icon: <FaBlog />,
        path: "/admin/blogs"
    },
    {
        name: "Inquiries",
        icon: <FaQuestionCircle />,
        path: "/admin/inquiries"
    }
];

export default function SideNavbar({
    children,
}: {
    children: ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        toast.success("Logged out Successfully!");
        router.push("/");
    };

    const { user } = useAuth();

    const isItemActive = (path: string) => {
        // Exact match or startsWith for subroutes
        return pathname === path || pathname.startsWith(path + "/");
    };

    const renderNavigation = (isMobile = false) => (
        <div className="space-y-2">
            {routes.map((route, idx) => {
                const active = isItemActive(route.path);

                const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm border";

                const stylingClasses = active
                    ? "bg-slate-200 border-slate-300 text-slate-800 font-semibold shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-250 hover:text-slate-700";

                return (
                    <Link
                        key={route.name}
                        href={route.path}
                        className={`${baseClasses} ${stylingClasses}`}
                        onClick={() => isMobile && setSidebarOpen(false)}
                    >
                        <span className="text-lg">{route.icon}</span>
                        <span>{route.name}</span>
                    </Link>
                );
            })}
        </div>
    );

    return (
        <>
            {/* Top Navbar - unchanged */}
            <nav className="flex justify-between items-center p-4 bg-slate-50 border-b border-slate-200">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden text-2xl text-gray-700"
                >
                    <BiMenu />
                </button>
                <span className="font-bold text-lg">
                    {user ? `Welcome back ${user.displayName?.split(' ')[0]} (${user.email})` : "Admin Panel"}
                </span>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white font-bold bg-red-400 hover:bg-red-500 rounded-md transition-colors"
                >
                    <BiExit className="text-lg" />
                    Logout
                </button>
            </nav>

            <div className="flex h-[90vh]">
                {/* Desktop Sidebar */}
                <nav className="hidden lg:flex w-[280px] h-full bg-white text-gray-800 flex-col p-4 border-r border-gray-200 overflow-y-auto">
                    {renderNavigation()}
                </nav>

                {/* Mobile Sidebar */}
                <div
                    className={`fixed top-0 left-0 w-[280px] h-full bg-white p-4 border-r border-gray-200 flex flex-col gap-4 transition-transform duration-300 overflow-y-auto
                        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden z-50`}
                >
                    {/* Close Button */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <span className="font-bold text-lg">Admin Panel</span>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <BiX className="text-xl" />
                        </button>
                    </div>

                    {renderNavigation(true)}
                </div>

                {/* Main Content */}
                <main className={`transition-all duration-300 ${isSidebarOpen ? "w-0" : "w-full lg:w-[calc(100vw-280px)]"
                    } overflow-y-scroll overflow-x-hidden`}>
                    {children}
                </main>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </>
    );
}