// client/src/server/WishlistApi.jsx
import axios from "axios";
const WISHLIST_API_BASE_URL = "http://localhost:8080/api/wishlist";

const getUserId = (providedId) => providedId || localStorage.getItem("userId");

// Get wishlist
export const getWishlistApi = async (userId) => {
  userId = getUserId(userId);
  const response = await axios.get(`${WISHLIST_API_BASE_URL}/${userId}`);
  return response.data.wishlist;  // adjusted for server response structure
};

// Add to wishlist
export const addToWishlistApi = async (userId, productId) => {
  userId = getUserId(userId);
  const response = await axios.post(`${WISHLIST_API_BASE_URL}/add`, {
    userId,
    productId,
  });
  return response.data.wishlist;
};

// Remove from wishlist
export const removeFromWishlistApi = async (userId, productId) => {
  userId = getUserId(userId);
  const response = await axios.post(`${WISHLIST_API_BASE_URL}/remove`, {
    userId,
    productId,
  });
  return response.data.wishlist;
};

// Clear wishlist
export const clearWishlistApi = async (userId) => {
  userId = getUserId(userId);
  const response = await axios.post(`${WISHLIST_API_BASE_URL}/clear`, {
    userId,
  });
  return response.data.wishlist;
};
