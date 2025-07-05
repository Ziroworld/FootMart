// client/src/hooks/useWishlist.jsx
import { useContext } from "react";
import WishlistContext from "../context/wishlistContext.jsx";

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};
