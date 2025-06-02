
const Product = require('../models/product-model');

const createProduct = async (req, res) => {
  try {
    // Destructure payload. If req.body is undefined, this will throw.
    const {
      imageUrl,
      name,
      price,
      description,
      size,
      quantity,
      brand,
      category
    } = req.body;

    // Basic validation
    if (!imageUrl || !name || price == null || !description || size == null ||
        quantity == null || !brand || !category) {
      return res.status(400).json({ message: 'All product fields are required.' });
    }

    // Verify category is valid
    const allowed = ['boots', 'jersey', 'accessories'];
    if (!allowed.includes(category)) {
      return res.status(400).json({ message: `Category must be one of ${allowed.join(', ')}` });
    }

    const newProduct = new Product({
      imageUrl,
      name,
      price,
      description,
      size,
      quantity,
      brand,
      category
    });

    const saved = await newProduct.save();
    return res.status(201).json({ message: 'Product created', product: saved });

  } catch (err) {
    console.error('Error in createProduct:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

/**
 * Get all products.
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (err) {
    console.error('Error in getAllProducts:', err);
    return res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const prod = await Product.findById(id);
    if (!prod) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    return res.status(200).json(prod);
  } catch (err) {
    console.error('Error in getProductById:', err);
    return res.status(500).json({ message: err.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // could be partial

    // If category is present in updates, validate it
    if (updates.category) {
      const allowed = ['boots', 'jersey', 'accessories'];
      if (!allowed.includes(updates.category)) {
        return res.status(400).json({ message: `Invalid category. Must be one of ${allowed.join(', ')}` });
      }
    }

    // Find + update
    const updated = await Product.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    return res.status(200).json({ message: 'Product updated', product: updated });
  } catch (err) {
    console.error('Error in updateProduct:', err);
    return res.status(500).json({ message: err.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Product.findByIdAndDelete(id);
    if (!removed) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    return res.status(200).json({ message: 'Product deleted.' });
  } catch (err) {
    console.error('Error in deleteProduct:', err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
