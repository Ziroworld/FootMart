import axios from "axios";

const PRODUCT_API_BASE_URL = 'http://localhost:8080/api/products';

// Create a product
export const createProduct = async (payload) => {
  try {
    console.log("Sending payload to create product:", payload);
    const response = await axios.post(`${PRODUCT_API_BASE_URL}/save`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${PRODUCT_API_BASE_URL}/findall`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${PRODUCT_API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

// Update product
export const updateProduct = async (productId, updates) => {
  try {
    const response = await axios.put(`${PRODUCT_API_BASE_URL}/${productId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product (with optional Bearer token)
export const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem('token'); // Only if you use JWT auth
    const response = await axios.delete(`${PRODUCT_API_BASE_URL}/${productId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
