// client/src/context/wishlistContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getWishlistApi, addToWishlistApi, removeFromWishlistApi, clearWishlistApi } from "../server/WishlistApi.jsx";
import { UserContext } from "./userContext.jsx";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = user?.id;

  const fetchWishlist = useCallback(async () => {
    if (!userId) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const response = await getWishlistApi(userId);
      setItems(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const addToWishlist = async (productId) => {
    if (!userId) return;
    setLoading(true);
    try {
      const updatedWishlist = await addToWishlistApi(userId, productId);
      setItems(updatedWishlist);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!userId) return;
    setLoading(true);
    try {
      const updatedWishlist = await removeFromWishlistApi(userId, productId);
      setItems(updatedWishlist);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const clearWishlist = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const updatedWishlist = await clearWishlistApi(userId);
      setItems(updatedWishlist);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <WishlistContext.Provider value={{
      items,
      loading,
      error,
      fetchWishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContext;
