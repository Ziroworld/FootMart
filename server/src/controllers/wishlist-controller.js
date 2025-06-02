
const Wishlist = require('../models/wishlist-model');
const Product = require('../models/product-model');


async function getOrCreateWishlist(userId) {
  let list = await Wishlist.findOne({ userId });
  if (!list) {
    list = new Wishlist({ userId, items: [] });
    await list.save();
  }
  return list;
}


const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'productId is required.' });
    }

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Get or create this user's wishlist
    const wishlist = await getOrCreateWishlist(userId);

    // Prevent duplicates
    const already = wishlist.items.some(item => item.productId.toString() === productId);
    if (already) {
      return res.status(400).json({ message: 'Product already in wishlist.' });
    }

    wishlist.items.push({ productId });
    wishlist.updatedAt = Date.now();
    await wishlist.save();

    // Populate product details in response
    const populated = await Wishlist.findById(wishlist._id)
      .populate('items.productId', 'name price imageUrl');

    // Return only items array (with product info)
    return res.status(200).json({ message: 'Product added to wishlist', wishlist: populated.items });
  } catch (err) {
    console.error('Error in addToWishlist:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne({ userId })
      .populate('items.productId', 'name price imageUrl');

    if (!wishlist) {
      // If no wishlist yet, return empty array
      return res.status(200).json({ wishlist: [] });
    }

    return res.status(200).json({ wishlist: wishlist.items });
  } catch (err) {
    console.error('Error in getWishlist:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'productId is required.' });
    }

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found.' });
    }

    const originalCount = wishlist.items.length;
    wishlist.items = wishlist.items.filter(
      item => item.productId.toString() !== productId
    );

    if (wishlist.items.length === originalCount) {
      return res.status(404).json({ message: 'Product not in wishlist.' });
    }

    wishlist.updatedAt = Date.now();
    await wishlist.save();

    // Populate to send product details back
    const populated = await Wishlist.findById(wishlist._id)
      .populate('items.productId', 'name price imageUrl');

    return res.status(200).json({ message: 'Product removed from wishlist', wishlist: populated.items });
  } catch (err) {
    console.error('Error in removeFromWishlist:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const clearWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found.' });
    }

    wishlist.items = [];
    wishlist.updatedAt = Date.now();
    await wishlist.save();

    return res.status(200).json({ message: 'Wishlist cleared successfully', wishlist: [] });
  } catch (err) {
    console.error('Error in clearWishlist:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist
};
