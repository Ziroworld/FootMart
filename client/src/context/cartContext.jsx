import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  addToCartApi,
  getCartApi,
  removeFromCartApi,
  updateCartItemApi,
  clearCartApi
} from '../server/cartApi.jsx';
import { UserContext } from './userContext.jsx';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState({ items: [] });

  // Grab the current userId (or undefined for guest)
  const getUserId = () => user?.id;

  // On logout: clear both state & guest storage
  useEffect(() => {
    if (!getUserId()) {
      setCart({ items: [] });
      localStorage.removeItem('cart');
    }
  }, [user]);

  // On login (or initial load), merge any guest cart then fetch backend cart
  useEffect(() => {
    const uid = getUserId();
    if (!uid) return;

    // persist for API helpers
    localStorage.setItem('userId', uid);

    const guestCart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
    if (guestCart.items.length > 0) {
      // merge guest items
      Promise.all(
        guestCart.items.map(item =>
          addToCartApi(uid, item.productId, item.quantity)
        )
      )
        .then(() => {
          localStorage.removeItem('cart');
          return getCartApi(uid);
        })
        .then(items => setCart({ items }))
        .catch(() => setCart({ items: [] }));
    } else {
      // just fetch
      getCartApi(uid)
        .then(items => setCart({ items }))
        .catch(() => setCart({ items: [] }));
    }
  }, [user]);

  // Persist guest cart
  useEffect(() => {
    if (!getUserId()) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  // Add/increment
  const addToCart = async (product, qty = 1) => {
    const uid = getUserId();
    if (uid) {
      const items = await addToCartApi(uid, product._id, qty);
      setCart({ items });
    } else {
      // guest
      const exists = cart.items.find(i => i.productId === product._id);
      const newItems = exists
        ? cart.items.map(i =>
            i.productId === product._id
              ? { ...i, quantity: i.quantity + qty }
              : i
          )
        : [
            ...cart.items,
            {
              productId: product._id,
              productName: product.name,
              productImage: product.imageUrl,
              quantity: qty,
              price: product.price,
            },
          ];
      setCart({ items: newItems });
    }
  };

  // Remove entirely
  const removeFromCart = async productId => {
    const uid = getUserId();
    if (uid) {
      const items = await removeFromCartApi(uid, productId);
      setCart({ items });
    } else {
      setCart({ items: cart.items.filter(i => i.productId !== productId) });
    }
  };

  // Clear all
  const clearCart = async () => {
    const uid = getUserId();
    if (uid) {
      const items = await clearCartApi(uid);
      setCart({ items });
    } else {
      setCart({ items: [] });
      localStorage.removeItem('cart');
    }
  };

  // Set exact quantity (or remove if <1)
  const updateItemQuantity = async (productId, qty) => {
    if (qty < 1) return removeFromCart(productId);
    const uid = getUserId();
    if (uid) {
      const items = await updateCartItemApi(uid, productId, qty);
      setCart({ items });
    } else {
      setCart({
        items: cart.items.map(i =>
          i.productId === productId ? { ...i, quantity: qty } : i
        )
      });
    }
  };

  // Convenience
  const incrementItem = id => {
    const i = cart.items.find(x => x.productId === id);
    if (i) updateItemQuantity(id, i.quantity + 1);
  };
  const decrementItem = id => {
    const i = cart.items.find(x => x.productId === id);
    if (i) updateItemQuantity(id, i.quantity - 1);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      updateItemQuantity,
      incrementItem,
      decrementItem
    }}>
      {children}
    </CartContext.Provider>
  );
};
