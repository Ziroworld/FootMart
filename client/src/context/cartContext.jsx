import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  addToCartApi,
  getCartApi,
  removeFromCartApi,
  clearCartApi
} from '../server/cartApi.jsx';
import { UserContext } from './userContext.jsx';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState({ items: [] });

  // Helper to get current userId
  const getUserId = () => user?.id;

  // Clear on logout
  useEffect(() => {
    if (!getUserId()) {
      console.log('[CART CONTEXT] LOGOUT: clearing cart and guest storage');
      setCart({ items: [] });
      localStorage.removeItem('cart');
      localStorage.removeItem('userId');
    }
  }, [user]);

  // On login or initial user load, fetch and merge carts
  useEffect(() => {
    const uid = getUserId();
    if (uid) {
      // persist userId for guest-cart merge
      localStorage.setItem('userId', uid);
      const localCart = JSON.parse(localStorage.getItem('cart') || '{"items":[]}');
      if (localCart.items.length) {
        console.log('[CART CONTEXT] merging guest cart into backend for', uid);
        Promise.all(
          localCart.items.map(item =>
            addToCartApi(uid, item.productId, item.quantity)
          )
        )
          .then(() => {
            localStorage.removeItem('cart');
            return getCartApi(uid);
          })
          .then(data => {
            console.log('[CART CONTEXT] backend cart after merge:', data);
            setCart({ items: data.cart || data });
          })
          .catch(err => {
            console.error('[CART CONTEXT] merge error:', err);
            setCart({ items: [] });
          });
      } else {
        getCartApi(uid)
          .then(data => {
            console.log('[CART CONTEXT] fetched backend cart for', uid, data);
            setCart({ items: data.cart || data });
          })
          .catch(err => {
            console.error('[CART CONTEXT] fetch error:', err);
            setCart({ items: [] });
          });
      }
    }
  }, [user]);

  // Persist guest cart
  useEffect(() => {
    if (!getUserId()) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  // Add to cart
  const addToCart = async (product, qty = 1) => {
    const uid = getUserId();
    console.log('[CART CONTEXT] addToCart called:', product, qty, 'user:', uid);
    if (uid) {
      try {
        const updated = await addToCartApi(uid, product._id, qty);
        console.log('[CART CONTEXT] addToCartApi returned:', updated);
        setCart({ items: updated.cart || updated });
      } catch (e) {
        console.error('[CART CONTEXT] add error:', e);
      }
    } else {
      // guest flow
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
      console.log('[CART CONTEXT] updated guest cart:', newItems);
    }
  };

  // Remove from cart
  const removeFromCart = async id => {
    const uid = getUserId();
    console.log('[CART CONTEXT] removeFromCart called:', id, 'user:', uid);
    if (uid) {
      try {
        const updated = await removeFromCartApi(uid, id);
        setCart({ items: updated.cart || updated });
      } catch (e) {
        console.error('[CART CONTEXT] remove error:', e);
      }
    } else {
      setCart({ items: cart.items.filter(item => item.productId !== id) });
    }
  };

  // Clear cart
  const clearCart = async () => {
    const uid = getUserId();
    console.log('[CART CONTEXT] clearCart called, user:', uid);
    if (uid) {
      try {
        const cleared = await clearCartApi(uid);
        setCart({ items: cleared.cart || cleared });
      } catch (e) {
        console.error('[CART CONTEXT] clear error:', e);
      }
    } else {
      setCart({ items: [] });
      localStorage.removeItem('cart');
    }
  };

  // Update quantity
  const updateItemQuantity = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    const currentQty = cart.items.find(i => i.productId === id)?.quantity || 0;
    addToCart({ _id: id }, qty - currentQty);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateItemQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
