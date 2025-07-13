const Product = require('../models/product-model');

function validateProductFields(body) {
  const requiredFields = ['images', 'name', 'price', 'description', 'size', 'quantity', 'brand', 'category'];
  for (const field of requiredFields) {
    if (body[field] === undefined || body[field] === null || body[field] === '') {
      return false;
    }
  }
  if (!Array.isArray(body.images) || body.images.length === 0) {
    return false;
  }
  if (!Array.isArray(body.size) || body.size.length === 0) {
    return false; // size must be array now!
  }
  return true;
}

const createProduct = async (req, res) => {
  try {
    const {
      images,
      name,
      price,
      description,
      size,
      quantity,
      brand,
      category,
      specs
    } = req.body;

    // Basic validation
    if (!validateProductFields(req.body)) {
      return res.status(400).json({ message: 'All product fields are required.' });
    }

    // Category validation
    const allowed = ['boots', 'jersey', 'accessories'];
    if (!allowed.includes(category)) {
      return res.status(400).json({ message: `Category must be one of ${allowed.join(', ')}` });
    }

    // Validate sizes array (for good error reporting)
    const validSize = size.every(val =>
      typeof val === 'number'
        ? Number.isInteger(val) && val >= 30 && val <= 50 // adjust as you want
        : typeof val === 'string' && ['S', 'M', 'L', 'XL', 'XXL'].includes(val.toUpperCase())
    );
    if (!validSize) {
      return res.status(400).json({ message: 'Invalid size(s). Use numbers (shoe size) or S, M, L, XL, XXL.' });
    }

    const newProduct = new Product({
      images,
      name,
      price,
      description,
      size,
      quantity,
      brand,
      category,
      specs
    });

    const saved = await newProduct.save();
    return res.status(201).json({ message: 'Product created', product: saved });

  } catch (err) {
    console.error('Error in createProduct:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// ... (rest of the code unchanged)
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
    const updates = req.body;

    if (updates.category) {
      const allowed = ['boots', 'jersey', 'accessories'];
      if (!allowed.includes(updates.category)) {
        return res.status(400).json({ message: `Invalid category. Must be one of ${allowed.join(', ')}` });
      }
    }
    // Optional: Validate updated size if provided
    if (updates.size) {
      if (!Array.isArray(updates.size) || updates.size.length === 0) {
        return res.status(400).json({ message: 'Size must be an array.' });
      }
      const validSize = updates.size.every(val =>
        typeof val === 'number'
          ? Number.isInteger(val) && val >= 30 && val <= 50
          : typeof val === 'string' && ['S', 'M', 'L', 'XL', 'XXL'].includes(val.toUpperCase())
      );
      if (!validSize) {
        return res.status(400).json({ message: 'Invalid size(s). Use numbers (shoe size) or S, M, L, XL, XXL.' });
      }
    }

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
