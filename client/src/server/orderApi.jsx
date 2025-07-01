// client/src/server/orderApi.jsx
import axios from "axios";

const ORDER_API_BASE_URL = "http://localhost:8080/api/orders";

export const createOrderApi = async (orderData) => {
  try {
    const { data } = await axios.post(
      `${ORDER_API_BASE_URL}/create`,
      orderData
    );
    return data.order;
  } catch (error) {
    console.error("Error in createOrderApi:", error);
    throw error;
  }
};

export const getUserOrdersApi = async (userId) => {
  try {
    const { data } = await axios.get(
      `${ORDER_API_BASE_URL}/user/${userId}`
    );
    return data.orders;
  } catch (error) {
    console.error("Error in getUserOrdersApi:", error);
    throw error;
  }
};

export const getAllOrdersApi = async () => {
  try {
    const { data } = await axios.get(`${ORDER_API_BASE_URL}/`);
    return data.orders;
  } catch (error) {
    console.error("Error in getAllOrdersApi:", error);
    throw error;
  }
};

export const updateOrderStatusApi = async (orderId, status) => {
  try {
    const { data } = await axios.put(
      `${ORDER_API_BASE_URL}/update/${orderId}`,
      { status }
    );
    return data.order;
  } catch (error) {
    console.error("Error in updateOrderStatusApi:", error);
    throw error;
  }
};

export const deleteOrderApi = async (orderId) => {
  try {
    const { data } = await axios.delete(
      `${ORDER_API_BASE_URL}/delete/${orderId}`
    );
    return data.message;
  } catch (error) {
    console.error("Error in deleteOrderApi:", error);
    throw error;
  }
};
