
const Player = require('../models/player-model');

const createPlayer = async (req, res) => {
  try {
    const { fullName, nationality, position, image } = req.body;

    // Validate required fields
    if (!fullName || !nationality || !position || !image) {
      return res.status(400).json({ message: 'All player fields are required.' });
    }

    const newPlayer = new Player({
      fullName,
      nationality,
      position,
      image,
      reviews: [] // initially empty
    });

    await newPlayer.save();
    return res.status(201).json({
      message: 'Player created successfully',
      player: newPlayer
    });
  } catch (error) {
    console.error('Error creating player:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find().sort({ createdAt: -1 });
    return res.status(200).json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findById(id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found.' });
    }
    return res.status(200).json(player);
  } catch (error) {
    console.error('Error fetching player by ID:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // may contain any player fields

    const updated = await Player.findByIdAndUpdate(
      id,
      { ...updates },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Player not found.' });
    }

    return res.status(200).json({ message: 'Player updated successfully', player: updated });
  } catch (error) {
    console.error('Error updating player:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Player.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Player not found.' });
    }
    return res.status(200).json({ message: 'Player deleted successfully.' });
  } catch (error) {
    console.error('Error deleting player:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, rating } = req.body;

    if (!text || rating == null) {
      return res.status(400).json({ message: 'Both text and rating are required.' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    const player = await Player.findById(id);
    if (!player) {
      return res.status(404).json({ message: 'Player not found.' });
    }

    player.reviews.push({ text, rating });
    await player.save();

    return res.status(200).json({ message: 'Review added successfully', player });
  } catch (error) {
    console.error('Error adding review:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


const getPopularPlayers = async (req, res) => {
  try {
    // Fetch all players, sort in memory by .averageRating virtual
    const players = await Player.find().lean(); // .lean() to get plain objects including virtual
    // Compute averageRating for each (virtual is included because of schema settings)
    const sorted = players.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    return res.status(200).json(sorted);
  } catch (error) {
    console.error('Error fetching popular players:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
  addReview,
  getPopularPlayers
};
