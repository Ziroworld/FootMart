
const Cart = require('../models/cart-model');
const Product = require('../models/product-model');


const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;            // JWT middleware sets this
    const { productId, quantity } = req.body;

    if (!productId || quantity == null) {
      return res.status(400).json({ message: 'productId and quantity are required.' });
    }
    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingIndex > -1) {
      // Update quantity
      cart.items[existingIndex].quantity += quantity;
    } else {
      // Add as a new item
      cart.items.push({
        productId,
        productName: product.name,
        productImage: product.imageUrl,
        quantity,
        price: product.price
      });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    // Return only items array (as in your reference)
    return res.status(200).json({ message: 'Product added to cart', cart: cart.items });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      // If cart doesn’t exist yet, return empty array
      return res.status(200).json({ cart: [] });
    }

    return res.status(200).json({ cart: cart.items });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'productId is required.' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const originalCount = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    if (cart.items.length === originalCount) {
      return res.status(404).json({ message: 'Product not in cart.' });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    return res.status(200).json({ message: 'Product removed from cart', cart: cart.items });
  } catch (error) {
    console.error('Error removing from cart:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();

    return res.status(200).json({ message: 'Cart cleared successfully', cart: [] });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  clearCart
};
