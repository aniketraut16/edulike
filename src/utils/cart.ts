import { AddToCart, updateCart, CartItem } from "@/types/cart";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// Export CartItem type for use in other files
export type { CartItem };

export const addToCart = async (data: AddToCart, cartId: string) => {
  try {
    if (!cartId) {
      const randomStr = Math.random().toString(36).substring(2, 7);
      cartId = `cart_${Date.now()}${randomStr}`;
      localStorage.setItem("kc-device-token", cartId);
      data.cartId = cartId;
    }

    const response = await axios.post(`${baseUrl}/cart/add`, data);
    return {
      success: true,
      message: "Course added to cart successfully",
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message || "Failed to add course to cart",
      error: error,
    };
  }
};

export const getCart = async (cartId: string) => {
  try {
    if (!cartId) {
      return {
        success: false,
        message: "Cart not found",
        count: 0,
        data: [],
      };
    }
    const response = await axios.get(`${baseUrl}/cart/items?cartId=${cartId}`);
    return {
      success: true,
      message: "Cart items fetched successfully",
      count: response.data.cartItems.length,
      data: response.data.cartItems,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get cart",
      count: 0,
      data: [],
      error: error,
    };
  }
};

export const updateCartItem = async (data: updateCart, cartId: string) => {
  try {
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
  newQuantity: number,
  cartId: string
): Promise<CartItem[]> => {
  try {
    if (!cartId) {
      return [];
    }

    await updateCartItem(
      {
        cartId,
        courseId,
        quantity: newQuantity,
      },
      cartId
    );

    // Get updated cart
    const cartResponse = await getCart(cartId);
    return cartResponse.success ? cartResponse.data : [];
  } catch (error) {
    console.error("Failed to update cart item quantity:", error);
    return [];
  }
};

// Helper function to remove item from cart (by setting quantity to 0)
export const removeFromCart = async (
  courseId: string,
  cartId: string
): Promise<CartItem[]> => {
  try {
    if (!cartId) {
      return [];
    }

    await updateCartItem(
      {
        cartId,
        courseId,
        quantity: 0,
      },
      cartId
    );

    // Get updated cart
    const cartResponse = await getCart(cartId);
    return cartResponse.success ? cartResponse.data : [];
  } catch (error) {
    console.error("Failed to remove item from cart:", error);
    return [];
  }
};
