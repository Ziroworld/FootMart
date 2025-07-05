const Wishlist = require('../models/wishlist-model');
const Product = require('../models/product-model');

// Helper to always flatten/populate product fields for each wishlist item
function cleanWishlistItems(items) {
  return items.map(item => {
    let product = item.productId;
    if (!product) return null;

    // Pick image (array OR single field)
    const imageUrl = Array.isArray(product.images) && product.images.length
      ? product.images[0]
      : product.imageUrl || '';

    return {
      productId:    product._id.toString(),
      productName:  product.name,
      productImage: imageUrl,
      price:        product.price,
      // Add more fields as needed
    };
  }).filter(Boolean);
}

// Get or create
async function getOrCreateWishlist(userId) {
  let list = await Wishlist.findOne({ userId });
  if (!list) {
    list = new Wishlist({ userId, items: [] });
    await list.save();
  }
  return list;
}

// Add to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { productId } = req.body;

    if (!userId) return res.status(400).json({ message: 'userId is required.' });
    if (!productId) return res.status(400).json({ message: 'productId is required.' });

    const product = await Product.findById(productId).lean();
    if (!product) return res.status(404).json({ message: 'Product not found.' });

    const wishlist = await getOrCreateWishlist(userId);

    // Prevent duplicates
    const already = wishlist.items.some(item => item.productId.toString() === productId);
    if (already) {
      return res.status(400).json({ message: 'Product already in wishlist.' });
    }

    wishlist.items.push({ productId });
    wishlist.updatedAt = Date.now();
    await wishlist.save();

    // Populate and clean
    const populated = await Wishlist.findById(wishlist._id)
      .populate('items.productId', 'name price imageUrl images')
      .lean();

    const flatItems = cleanWishlistItems(populated.items);

    return res.status(200).json({ message: 'Product added to wishlist', wishlist: flatItems });
  } catch (err) {
    console.error('Error in addToWishlist:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get Wishlist
const getWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ message: 'userId is required.' });

    const wishlist = await Wishlist.findOne({ userId })
      .populate('items.productId', 'name price imageUrl images')
      .lean();

    if (!wishlist) return res.status(200).json({ wishlist: [] });

    const flatItems = cleanWishlistItems(wishlist.items);

    return res.status(200).json({ wishlist: flatItems });
  } catch (err) {
    console.error('Error in getWishlist:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Remove from Wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { productId } = req.body;

    if (!userId) return res.status(400).json({ message: 'userId is required.' });
    if (!productId) return res.status(400).json({ message: 'productId is required.' });

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found.' });

    const originalCount = wishlist.items.length;
    wishlist.items = wishlist.items.filter(
      item => item.productId.toString() !== productId
    );

    if (wishlist.items.length === originalCount) {
      return res.status(404).json({ message: 'Product not in wishlist.' });
    }

    wishlist.updatedAt = Date.now();
    await wishlist.save();

    const populated = await Wishlist.findById(wishlist._id)
      .populate('items.productId', 'name price imageUrl images')
      .lean();

    const flatItems = cleanWishlistItems(populated.items);

    return res.status(200).json({ message: 'Product removed from wishlist', wishlist: flatItems });
  } catch (err) {
    console.error('Error in removeFromWishlist:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Clear Wishlist
const clearWishlist = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) return res.status(400).json({ message: 'userId is required.' });
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found.' });

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
