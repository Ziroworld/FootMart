// controllers/cart-controller.js
const Cart    = require('../models/cart-model');
const Product = require('../models/product-model');

// Add product to cart
const addToCart = async (req, res) => {
  console.log('[Cart] addToCart called with:', req.body);
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity == null) {
      console.warn('[Cart] Missing parameters:', { userId, productId, quantity });
      return res
        .status(400)
        .json({ message: 'userId, productId and quantity are required.' });
    }
    if (quantity < 1) {
      console.warn('[Cart] Invalid quantity:', quantity);
      return res
        .status(400)
        .json({ message: 'Quantity must be at least 1.' });
    }

    // Verify product exists
    const product = await Product.findById(productId).lean();
    if (!product) {
      console.warn('[Cart] Product not found:', productId);
      return res.status(404).json({ message: 'Product not found.' });
    }
    console.log('[Cart] Found product:', product.name);

    // Pick image (first of `images[]` or fallback to `imageUrl`)
    const imageUrl = Array.isArray(product.images) && product.images.length
      ? product.images[0]
      : product.imageUrl || '';

    // Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      console.log('[Cart] No existing cart for user, creating new for:', userId);
      cart = await Cart.create({ userId, items: [] });
    }

    // Upsert the item
    const existing = cart.items.find(
      item => item.productId.toString() === productId
    );
    if (existing) {
      console.log('[Cart] Updating quantity for existing item');
      existing.quantity      += quantity;
      existing.productImage   = imageUrl;
      existing.productName    = product.name;
      existing.price          = product.price;
    } else {
      console.log('[Cart] Adding new item to cart');
      cart.items.push({
        productId,
        productName:  product.name,
        productImage: imageUrl,
        quantity,
        price:        product.price,
      });
    }

    cart.updatedAt = Date.now();
    await cart.save();
    console.log('[Cart] Cart saved, items count:', cart.items.length);
    return res
      .status(200)
      .json({ message: 'Product added to cart', cart: cart.items });
  } catch (err) {
    console.error('[Cart] Error adding to cart:', err.message);
    return res.status(500).json({ message: err.message });
  }
};

// Get cart items (userId from URL param)
const getCart = async (req, res) => {
  console.log('[Cart] getCart called for userId:', req.params.userId);
  try {
    const { userId } = req.params;
    if (!userId) {
      console.warn('[Cart] Missing userId param');
      return res.status(400).json({ message: 'userId param is required.' });
    }

    const cart = await Cart
      .findOne({ userId })
      .populate('items.productId', 'name price images imageUrl')
      .lean();

    if (!cart) {
      console.log('[Cart] No cart found, returning empty array');
      return res.status(200).json({ cart: [] });
    }

    const items = cart.items.map(item => {
      // if we stored image on the item, use it; otherwise take from populated product
      const fallback = Array.isArray(item.productId.images) && item.productId.images.length
        ? item.productId.images[0]
        : item.productId.imageUrl || '';

      return {
        productId:    item.productId._id.toString(),
        productName:  item.productName || item.productId.name,
        productImage: item.productImage  || fallback,
        price:        item.price         || item.productId.price,
        quantity:     item.quantity
      };
    });

    console.log('[Cart] Retrieved items count:', items.length);
    return res.status(200).json({ cart: items });
  } catch (err) {
    console.error('[Cart] Error fetching cart:', err.message);
    return res.status(500).json({ message: err.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  console.log('[Cart] removeFromCart called with:', req.body);
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      console.warn('[Cart] Missing userId or productId');
      return res
        .status(400)
        .json({ message: 'userId and productId are required.' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      console.warn('[Cart] Cart not found for user:', userId);
      return res.status(404).json({ message: 'Cart not found' });
    }

    const beforeCount = cart.items.length;
    cart.items = cart.items.filter(item =>
      item.productId.toString() !== productId &&
      item._id.toString()       !== productId
    );

    if (cart.items.length === beforeCount) {
      console.warn('[Cart] Product not in cart:', productId);
      return res.status(404).json({ message: 'Product not in cart.' });
    }

    await cart.save();
    console.log('[Cart] Item removed, new items count:', cart.items.length);
    return res
      .status(200)
      .json({ message: 'Product removed from cart', cart: cart.items });
  } catch (err) {
    console.error('[Cart] Error removing from cart:', err.message);
    return res.status(500).json({ message: err.message });
  }
};

// Clear the cart
const clearCart = async (req, res) => {
  console.log('[Cart] clearCart called for userId:', req.body.userId);
  try {
    const { userId } = req.body;
    if (!userId) {
      console.warn('[Cart] Missing userId');
      return res.status(400).json({ message: 'userId is required.' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      console.warn('[Cart] Cart not found for clearCart:', userId);
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();
    console.log('[Cart] Cart cleared for user:', userId);
    return res
      .status(200)
      .json({ message: 'Cart cleared successfully', cart: [] });
  } catch (err) {
    console.error('[Cart] Error clearing cart:', err.message);
    return res.status(500).json({ message: err.message });
  }
};

// Update exact quantity (or remove if <1)
const updateCartItem = async (req, res) => {
  console.log('[Cart] updateCartItem called with:', req.body);
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity == null) {
      console.warn('[Cart] Missing parameters:', { userId, productId, quantity });
      return res.status(400).json({ message: 'userId, productId and quantity are required.' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      console.warn('[Cart] No cart found for user:', userId);
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const idx = cart.items.findIndex(i => i.productId.toString() === productId);
    if (idx === -1) {
      console.warn('[Cart] Item not in cart:', productId);
      return res.status(404).json({ message: 'Product not in cart.' });
    }

    if (quantity < 1) {
      cart.items.splice(idx, 1);
      console.log('[Cart] Quantity < 1; item removed');
    } else {
      // re-fetch product for any updated image/price
      const product = await Product.findById(productId).lean();
      const imageUrl = Array.isArray(product.images) && product.images.length
        ? product.images[0]
        : product.imageUrl || '';

      cart.items[idx].quantity    = quantity;
      cart.items[idx].productImage = imageUrl;
      cart.items[idx].productName  = product.name;
      cart.items[idx].price        = product.price;
      console.log('[Cart] Quantity updated to', quantity);
    }

    cart.updatedAt = Date.now();
    await cart.save();
    console.log('[Cart] Cart saved, items count:', cart.items.length);
    return res.status(200).json({ cart: cart.items });
  } catch (err) {
    console.error('[Cart] Error updating cart item:', err.message);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateCartItem
};
