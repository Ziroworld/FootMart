// server/src/controllers/address-controller.js
const Address = require('../models/address-model');

const MS_IN_24H = 24 * 60 * 60 * 1000;

const upsertAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      fullName,
      phoneNumber,
      streetAddress,
      landmark,
      city,
      state,
      country
    } = req.body;

    // 1) Validate required fields
    if (
      !fullName ||
      !phoneNumber ||
      !streetAddress ||
      !landmark ||
      !city ||
      !state ||
      !country
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 2) Check for existing address
    let address = await Address.findOne({ user: userId });
    if (address) {
      // 2a) Enforce 24-hour edit window
      const age = Date.now() - address.createdAt.getTime();
      if (age > MS_IN_24H) {
        return res
          .status(403)
          .json({ message: "Address can only be updated within 24 hours of creation." });
      }

      // 2b) Perform update
      address.fullName      = fullName;
      address.phoneNumber   = phoneNumber;
      address.streetAddress = streetAddress;
      address.landmark      = landmark;
      address.city          = city;
      address.state         = state;
      address.country       = country;
      address.updatedAt     = Date.now();

      await address.save();
      return res
        .status(200)
        .json({ message: "Address updated successfully", address });
    }

    // 3) No existing address → create new
    const newAddress = new Address({
      user: userId,
      fullName,
      phoneNumber,
      streetAddress,
      landmark,
      city,
      state,
      country
    });
    await newAddress.save();

    return res
      .status(201)
      .json({ message: "Address created successfully", address: newAddress });
  } catch (error) {
    console.error("Error in upsertAddress:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const address = await Address.findOne({ user: userId });

    if (!address) {
      return res.status(404).json({ message: "Address not found." });
    }
    return res.status(200).json({ address });
  } catch (error) {
    console.error("Error in getAddress:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const deleted = await Address.findOneAndDelete({ user: userId });

    if (!deleted) {
      return res.status(404).json({ message: "Address not found." });
    }
    return res.status(200).json({ message: "Address deleted successfully." });
  } catch (error) {
    console.error("Error in deleteAddress:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  upsertAddress,
  getAddress,
  deleteAddress
};
