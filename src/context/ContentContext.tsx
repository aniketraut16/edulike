"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Course } from "@/types/courses";
import { getNavbarCourses, Course as NavbarCourse } from "@/utils/navbar";
import axios from "axios";
import { CartItem, getCart, updateCartItemQuantity, removeFromCart } from "@/utils/cart";
import toast from 'react-hot-toast';
import { useAuth } from "./AuthContext";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type ContentContextType = {
    navbarCourses: NavbarCourse[];
    topCourses: Course[];
    cartCount: number;
    cart: CartItem[];
    cartId: string;
    updateCartQuantity: (courseId: string, newQuantity: number) => Promise<void>;
    removeCartItem: (courseId: string) => Promise<void>;
    refreshCart: () => Promise<void>;
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
    const [navbarCourses, setNavbarCourses] = useState<NavbarCourse[]>([]);
    const [topCourses, setTopCourses] = useState<Course[]>([]);
    const [cartCount, setCartCount] = useState<number>(0);
    const [cart, setCart] = useState<CartItem[]>([]);
    const { user } = useAuth();
    const [cartId, setCartId] = useState("");

    useEffect(() => {
        if (user) {
            setCartId(`cart_${user.uid}`);
        } else {
            setCartId(localStorage.getItem("kc-device-token") || "");
        }
    }, [user]);


    const refreshCart = async () => {
        try {
            const cartResponse = await getCart(cartId);
            if (cartResponse.success) {
                setCart(cartResponse.data);
                setCartCount(cartResponse.count);
            } else {
                setCart([]);
                setCartCount(0);
            }
        } catch (error) {
            console.error("Error refreshing cart:", error);
            setCart([]);
            setCartCount(0);
        }
    };

    const updateCartQuantity = async (courseId: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        try {
            toast.loading("Updating cart...", { id: 'cart-update' });
            const updatedCart = await updateCartItemQuantity(courseId, newQuantity, cartId);
            setCart(updatedCart);
            setCartCount(updatedCart.length);
            toast.success("Cart updated successfully", { id: 'cart-update' });
        } catch (error) {
            console.error("Failed to update cart:", error);
            toast.error("Failed to update cart", { id: 'cart-update' });
        }
    };

    const removeCartItem = async (courseId: string) => {
        try {
            toast.loading("Removing item...", { id: 'cart-remove' });
            const updatedCart = await removeFromCart(courseId, cartId);
            setCart(updatedCart);
            setCartCount(updatedCart.length);
            toast.success("Item removed from cart", { id: 'cart-remove' });
        } catch (error) {
            console.error("Failed to remove item:", error);
            toast.error("Failed to remove item", { id: 'cart-remove' });
        }
    };

    useEffect(() => {
        const getContent = async () => {
            try {
                const response = await axios.get(`${baseUrl}/courses/dashboard`);
                const categories = response.data.categories;
                const topCourses = response.data.courses as Course[];
                const navbarCourses = getNavbarCourses(categories);
                setNavbarCourses(navbarCourses);
                setTopCourses(topCourses);
                await refreshCart();
            } catch (error) {
                console.error("Error fetching navbar courses:", error);
                return [];
            }
        };
        getContent();
    }, []);

    return (
        <ContentContext.Provider
            value={{
                navbarCourses,
                topCourses,
                cartCount,
                cart,
                cartId,
                updateCartQuantity,
                removeCartItem,
                refreshCart,
            }}
        >
            {children}
        </ContentContext.Provider>
    );
}

export function useContent() {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error("useContent must be used within an ContentProvider");
    }
    return context;
} 