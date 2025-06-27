import { AddToCart, updateCart, CartItem } from "@/types/cart";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Export CartItem type for use in other files
export type { CartItem };

export const addToCart = async (data: AddToCart) => {
  try {
    let cartId = localStorage.getItem("kc-device-token");
    if (!cartId) {
      const randomStr = Math.random().toString(36).substring(2, 7);
      cartId = `cart_${Date.now()}${randomStr}`;
      localStorage.setItem("kc-device-token", cartId);
    }
    data.cartId = cartId;
    const response = await axios.post(`${baseUrl}/cart/add`, data);
    return {
      success: true,
      message: "Course added to cart successfully",
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to add course to cart",
      error: error,
    };
  }
};

export const getCart = async () => {
  try {
    const cartId = localStorage.getItem("kc-device-token");
    if (!cartId) {
      return {
        success: false,
        message: "Cart not found",
        data: [],
      };
    }
    const response = await axios.get(`${baseUrl}/cart/items?cartId=${cartId}`);
    return {
      success: true,
      message: "Cart items fetched successfully",
      data: response.data.cartItems,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get cart",
      data: [],
      error: error,
    };
  }
};

export const getCartItemsNumber = async () => {
  try {
    const cartId = localStorage.getItem("kc-device-token");
    if (!cartId) {
      return 0;
    }
    const response = await axios.get(`${baseUrl}/cart/items?cartId=${cartId}`);
    return response.data.cartItems.length;
  } catch (error) {
    return 0;
  }
};

export const updateCartItem = async (data: updateCart) => {
  try {
    const cartId = localStorage.getItem("kc-device-token");
    if (!cartId) {
      return {
        success: false,
        message: "Cart not found",
      };
    }
    data.cartId = cartId;
    await axios.put(`${baseUrl}/cart/update`, data);
    return {
      success: true,
      message: "Cart item updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update cart",
    };
  }
};

// Helper function to update cart item quantity
export const updateCartItemQuantity = async (
  courseId: string,
  newQuantity: number
): Promise<CartItem[]> => {
  try {
    const cartId = localStorage.getItem("kc-device-token");
    if (!cartId) {
      return [];
    }

    await updateCartItem({
      cartId,
      courseId,
      quantity: newQuantity,
    });

    // Get updated cart
    const cartResponse = await getCart();
    return cartResponse.success ? cartResponse.data : [];
  } catch (error) {
    console.error("Failed to update cart item quantity:", error);
    return [];
  }
};

// Helper function to remove item from cart (by setting quantity to 0)
export const removeFromCart = async (courseId: string): Promise<CartItem[]> => {
  try {
    const cartId = localStorage.getItem("kc-device-token");
    if (!cartId) {
      return [];
    }

    await updateCartItem({
      cartId,
      courseId,
      quantity: 0,
    });

    // Get updated cart
    const cartResponse = await getCart();
    return cartResponse.success ? cartResponse.data : [];
  } catch (error) {
    console.error("Failed to remove item from cart:", error);
    return [];
  }
};
