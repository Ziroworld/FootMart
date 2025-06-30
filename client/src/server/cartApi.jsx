import axios from "axios";
const CART_API_BASE_URL = "http://localhost:8080/api/cart";

// Helper to pull userId from localStorage if not passed
const getUserId = (providedId) =>
  providedId || localStorage.getItem("userId");

// Add to cart (POST)
export const addToCartApi = async (userId, productId, quantity) => {
  try {
    userId = getUserId(userId);
    console.log("[API] addToCartApi:", { userId, productId, quantity });
    if (!userId) throw new Error("No userId for addToCartApi");
    const response = await axios.post(`${CART_API_BASE_URL}/add`, {
      userId,
      productId,
      quantity,
    });
    console.log("[API] addToCartApi response:", response.data);
    return response.data.cart;
  } catch (error) {
    console.error("[API] Error in addToCartApi:", error);
    throw error;
  }
};

// Get cart (GET with userId as path param)
export const getCartApi = async (userId) => {
  try {
    userId = getUserId(userId);
    console.log("[API] getCartApi:", { userId });
    if (!userId) throw new Error("No userId for getCartApi");
    const response = await axios.get(`${CART_API_BASE_URL}/${userId}`);
    console.log("[API] getCartApi response:", response.data);
    return response.data.cart;
  } catch (error) {
    console.error("[API] Error in getCartApi:", error);
    throw error;
  }
};

// Remove one item (POST)
export const removeFromCartApi = async (userId, productId) => {
  try {
    userId = getUserId(userId);
    console.log("[API] removeFromCartApi:", { userId, productId });
    if (!userId) throw new Error("No userId for removeFromCartApi");
    const response = await axios.post(`${CART_API_BASE_URL}/remove`, {
      userId,
      productId,
    });
    console.log("[API] removeFromCartApi response:", response.data);
    return response.data.cart;
  } catch (error) {
    console.error("[API] Error in removeFromCartApi:", error);
    throw error;
  }
};

// Clear entire cart (POST)
export const clearCartApi = async (userId) => {
  try {
    userId = getUserId(userId);
    console.log("[API] clearCartApi:", { userId });
    if (!userId) throw new Error("No userId for clearCartApi");
    const response = await axios.post(`${CART_API_BASE_URL}/clear`, {
      userId,
    });
    console.log("[API] clearCartApi response:", response.data);
    return response.data.cart;
  } catch (error) {
    console.error("[API] Error in clearCartApi:", error);
    throw error;
  }
};

export const updateCartItemApi = async (userId, productId, quantity) => {
  userId = getUserId(userId);
  if (!userId) throw new Error('No userId for updateCartItemApi');
  const { data } = await axios.patch(`${CART_API_BASE_URL}/update`, {
    userId, productId, quantity
  });
  return data.cart;
};
