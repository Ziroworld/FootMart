// client/src/context/orderContext.jsx
import React, { createContext, useContext, useState } from 'react';
import {
  createOrderApi,
  getAllOrdersApi,
  getUserOrdersApi,
  updateOrderStatusApi,
  deleteOrderApi
} from '../server/orderApi.jsx';
import { UserContext } from './userContext.jsx';
import { CartContext } from './cartContext.jsx';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const [orders, setOrders] = useState([]);

  // Create a new order (cart is read server-side)
  const createOrder = async (orderData) => {
    if (!user?.id) {
      throw new Error('User is not logged in');
    }
    // override userId from context
    orderData.userId = user.id;
    const order = await createOrderApi(orderData);
    return order;
  };

  // Get this user’s orders
  const fetchUserOrders = async () => {
    if (!user?.id) {
      throw new Error('User is not logged in');
    }
    const userOrders = await getUserOrdersApi(user.id);
    setOrders(userOrders);
    return userOrders;
  };

  // Get all orders (admin)
  const fetchAllOrders = async () => {
    const all = await getAllOrdersApi();
    setOrders(all);
    return all;
  };

  // Update status (admin)
  const updateOrderStatus = async (orderId, status) => {
    const updated = await updateOrderStatusApi(orderId, status);
    return updated;
  };

  // Delete an order
  const deleteOrder = async (orderId) => {
    await deleteOrderApi(orderId);
    // optionally refresh or remove from state
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        fetchUserOrders,
        fetchAllOrders,
        updateOrderStatus,
        deleteOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return ctx;
};

export default OrderContext;
