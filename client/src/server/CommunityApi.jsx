import axios from "axios";

const COMMUNITY_API_BASE_URL = "http://localhost:8080/api/players";

// Get all players
export const getAllPlayersApi = async () => {
  try {
    const res = await axios.get(`${COMMUNITY_API_BASE_URL}/`);
    return res.data;
  } catch (error) {
    console.error("Error fetching all players:", error);
    throw error;
  }
};

// Get player by ID
export const getPlayerByIdApi = async (id) => {
  try {
    const res = await axios.get(`${COMMUNITY_API_BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching player by id:", error);
    throw error;
  }
};

// Create new player
export const createPlayerApi = async (payload) => {
  try {
    const res = await axios.post(`${COMMUNITY_API_BASE_URL}/`, payload);
    return res.data;
  } catch (error) {
    console.error("Error creating player:", error);
    throw error;
  }
};

// Update player
export const updatePlayerApi = async (id, updates) => {
  try {
    const res = await axios.put(`${COMMUNITY_API_BASE_URL}/${id}`, updates);
    return res.data;
  } catch (error) {
    console.error("Error updating player:", error);
    throw error;
  }
};

// Delete player
export const deletePlayerApi = async (id) => {
  try {
    const res = await axios.delete(`${COMMUNITY_API_BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting player:", error);
    throw error;
  }
};

// Add review to player
export const addReviewApi = async (id, { text, rating }) => {
  try {
    const res = await axios.post(`${COMMUNITY_API_BASE_URL}/${id}/review`, { text, rating });
    return res.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

// Get popular players (by average rating)
export const getPopularPlayersApi = async () => {
  try {
    const res = await axios.get(`${COMMUNITY_API_BASE_URL}/popular`);
    return res.data;
  } catch (error) {
    console.error("Error fetching popular players:", error);
    throw error;
  }
};
