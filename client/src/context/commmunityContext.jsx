import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAllPlayersApi,
  getPlayerByIdApi,
  createPlayerApi,
  updatePlayerApi,
  deletePlayerApi,
  addReviewApi,
  getPopularPlayersApi
} from "../server/CommunityApi.jsx";

export const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all players on mount
  useEffect(() => {
    getAllPlayers();
  }, []);

  const getAllPlayers = async () => {
    setLoading(true);
    try {
      const data = await getAllPlayersApi();
      setPlayers(data);
    } catch (err) {
      setPlayers([]);
    }
    setLoading(false);
  };

  const getPlayerById = async (id) => {
    return getPlayerByIdApi(id);
  };

  const createPlayer = async (player) => {
    const data = await createPlayerApi(player);
    await getAllPlayers();
    return data;
  };

  const updatePlayer = async (id, updates) => {
    const data = await updatePlayerApi(id, updates);
    await getAllPlayers();
    return data;
  };

  const deletePlayer = async (id) => {
    const data = await deletePlayerApi(id);
    await getAllPlayers();
    return data;
  };

  const addReview = async (playerId, review) => {
    const data = await addReviewApi(playerId, review);
    await getAllPlayers();
    return data;
  };

  const getPopularPlayers = async () => {
    return getPopularPlayersApi();
  };

  return (
    <CommunityContext.Provider
      value={{
        players,
        loading,
        getAllPlayers,
        getPlayerById,
        createPlayer,
        updatePlayer,
        deletePlayer,
        addReview,
        getPopularPlayers
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};
