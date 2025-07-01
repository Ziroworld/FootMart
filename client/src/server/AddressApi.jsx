// client/src/server/AddressApi.jsx
import axios from "axios";

const ADDRESS_API_BASE_URL = "http://localhost:8080/api/address";

/**
 * Create or update the current user's address.
 * Returns the saved address document.
 */
export const upsertAddressApi = async (addressData) => {
  try {
    const response = await axios.post(
      `${ADDRESS_API_BASE_URL}/`,
      addressData,
      { withCredentials: true } // include auth cookie / token
    );
    return response.data.address;
  } catch (error) {
    console.error("Error in upsertAddressApi:", error);
    throw error;
  }
};

/**
 * Fetch the current user's saved address.
 */
export const getAddressApi = async () => {
  try {
    const response = await axios.get(
      `${ADDRESS_API_BASE_URL}/`,
      { withCredentials: true }
    );
    return response.data.address;
  } catch (error) {
    console.error("Error in getAddressApi:", error);
    throw error;
  }
};

/**
 * Delete the current user's saved address.
 */
export const deleteAddressApi = async () => {
  try {
    const response = await axios.delete(
      `${ADDRESS_API_BASE_URL}/`,
      { withCredentials: true }
    );
    return response.data.message;
  } catch (error) {
    console.error("Error in deleteAddressApi:", error);
    throw error;
  }
};
