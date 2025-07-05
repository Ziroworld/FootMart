import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getProducts } from '../../../server/ProductApi';
import { useCart } from '../../../hooks/usecarts';
import { useWishlist } from '../../../hooks/useWishlist';
import { FaHeart, FaCheckCircle } from 'react-icons/fa';
import RelatedProducts from './RelatedProduct';
import { motion, AnimatePresence } from 'framer-motion';

// Animated Toast with Football
function Toast({ message, onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 48 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 48 }}
          transition={{ duration: 0.45, type: "spring", bounce: 0.23 }}
          className="fixed z-[999] left-1/2 bottom-8 -translate-x-1/2
            bg-white border-4 border-[#16e087] text-[#00754A] rounded-3xl px-8 py-5
            flex items-center gap-5 shadow-2xl"
          style={{ backdropFilter: "blur(12px)", boxShadow: "0 4px 44px #16e08733" }}
        >
          <motion.span
            initial={{ y: 0, rotate: 0 }}
            animate={{ y: [0, -7, 0], rotate: [0, 35, 0] }}
            transition={{ duration: 1.25, repeat: Infinity, repeatType: "reverse" }}
            className="text-3xl"
            style={{ filter: "drop-shadow(0 4px 8px #16e08766)" }}
          >⚽</motion.span>
          <span className="font-black text-lg tracking-wide drop-shadow-sm">{message}</span>
          <button
            onClick={onClose}
            className="ml-3 text-2xl font-black text-[#00b97d] hover:text-[#005d38] px-2 rounded-full bg-[#e6f8f1] hover:bg-[#c1f8e7] transition"
            aria-label="Close notification"
          >✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function SingleProductComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  // Toast state
  const [toast, setToast] = useState({ show: false, message: '' });
  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  };

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((data) => {
        setProduct(data);
        // default size if only one
        const sizes = Array.isArray(data.sizes) && data.sizes.length
          ? data.sizes
          : typeof data.size === 'string'
            ? data.size.split(/[,\s/]+/).filter(Boolean)
            : data.size
              ? [data.size]
              : [];
        if (sizes.length === 1) setSelectedSize(sizes[0]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setProduct(null);
      });
  }, [id]);

  useEffect(() => {
    getProducts()
      .then((data) => setRelated(data.filter((p) => p._id !== id)))
      .catch(() => setRelated([]));
  }, [id]);

  if (loading)
    return <div className="py-20 text-center text-lg font-bold text-gray-700 animate-pulse">Loading...</div>;
  if (!product)
    return (
      <div className="py-20 text-center text-red-600 text-xl font-bold animate-pulse">Product not found.</div>
    );

  // Prepare images
  const images = Array.isArray(product.images) && product.images.length
    ? product.images
    : [product.imageUrl || 'https://via.placeholder.com/400x400'];

  // Sizes array
  let SIZES = Array.isArray(product.sizes) && product.sizes.length
    ? product.sizes
    : product.size
      ? (typeof product.size === 'string'
          ? product.size.split(/[,\s/]+/).filter(Boolean)
          : [product.size])
      : [];

  // --- Animation Variants
  const imgAnim = {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.94 }
  };

  // --- Action Handlers
  const handleAddToCart = () => {
    addToCart(
      {
        _id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: images[imgIndex],
        size: selectedSize,
      },
      qty
    );
    showToast('Added to cart!');
  };

  const handleAddWishlist = () => {
    addToWishlist({
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: images[imgIndex],
      size: selectedSize,
    });
    showToast('Added to wishlist!');
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-3">

      {/* Breadcrumb */}
      <motion.nav
        className="text-sm flex flex-wrap gap-1 mb-6 tracking-wide"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button onClick={() => navigate('/home')} className="font-bold text-[#16e087] hover:underline underline-offset-4 transition">Home</button>
        <span>&gt;</span>
        <button onClick={() => navigate('/shop')} className="font-bold text-[#16e087] hover:underline underline-offset-4 transition">Shop</button>
        <span>&gt;</span>
        <span className="font-bold text-black">{product.name}</span>
      </motion.nav>

      <div className="flex flex-col md:flex-row gap-14">
        {/* --- GALLERY --- */}
        <div className="flex-1 flex flex-col gap-6">
          <motion.div
            className="rounded-2xl bg-white border-4 border-[#f2fdfa] shadow-xl p-2 min-h-[320px] flex items-center justify-center"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={imgAnim}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={images[imgIndex]}
                src={images[imgIndex]}
                alt={product.name}
                className="max-h-[390px] object-contain rounded-xl transition-all duration-400 shadow-2xl"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                draggable={false}
              />
            </AnimatePresence>
          </motion.div>
          <div className="flex gap-3 mt-3 justify-center overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                alt={`${product.name} ${idx + 1}`}
                whileHover={{ scale: 1.12, boxShadow: "0 4px 18px #16e08755" }}
                className={`w-16 h-16 object-contain rounded-xl border cursor-pointer transition
                  ${idx === imgIndex
                    ? 'border-[#16e087] ring-4 ring-[#16e08788]'
                    : 'border-gray-300'
                  }`}
                style={{
                  background: idx === imgIndex ? "linear-gradient(90deg,#e7fcf4,#f2fff9)" : ""
                }}
                onClick={() => setImgIndex(idx)}
                tabIndex={0}
              />
            ))}
          </div>
        </div>

        {/* --- PRODUCT DETAILS --- */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-gray-400 text-sm mb-2 tracking-wide font-semibold">{product.brand}</div>
          <h1 className="text-3xl sm:text-4xl font-black mb-2 text-black drop-shadow"> {product.name} </h1>
          <div className="text-2xl font-bold text-black mb-1 tracking-wide">
            NPR {product.price.toLocaleString()}
          </div>
          <div className="text-gray-500 text-xs mb-3">Inclusive of all taxes</div>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[#16e087] flex items-center gap-1 font-bold">
              <FaCheckCircle /> In Stock
            </span>
            <span className="text-xs text-gray-400">({product.quantity} available)</span>
          </div>

          {SIZES.length > 0 && (
            <div className="mb-7">
              <div className="font-bold mb-2 text-black tracking-wide">Size</div>
              <div className="flex gap-2 flex-wrap max-w-full overflow-x-auto">
                {SIZES.map((sz, idx) => (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={selectedSize == sz ? {} : { scale: 1.1, boxShadow: "0 2px 16px #00b97d33" }}
                    key={idx}
                    className={`border-2 px-5 py-2 text-lg rounded-xl font-extrabold transition-all
                      ${selectedSize == sz
                        ? 'bg-[#16e087] border-[#16e087] text-black shadow-[0_4px_24px_0_rgba(22,224,135,0.17)]'
                        : 'bg-white border-gray-300 text-black hover:border-[#16e087]'
                      }`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 mb-8">
            <span className="font-bold text-black text-lg">Qty</span>
            <motion.button
              whileTap={{ scale: 0.85 }}
              className="border-2 rounded-lg px-3 py-1 text-lg font-black disabled:opacity-50 bg-white border-[#16e087] text-black shadow"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
            >
              −
            </motion.button>
            <span className="px-3 text-xl font-bold text-black">{qty}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="border-2 rounded-lg px-3 py-1 text-lg font-black disabled:opacity-50 bg-white border-[#16e087] text-black shadow"
              onClick={() => setQty((q) => Math.min(product.quantity, q + 1))}
              disabled={qty >= product.quantity}
            >
              ＋
            </motion.button>
          </div>

          <div className="flex gap-5 mb-9 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 4px 16px #00b97d33" }}
              whileTap={{ scale: 0.97 }}
              className="bg-black text-white px-10 py-3 rounded-2xl font-bold text-lg shadow-lg hover:bg-[#0f1f16] transition"
              onClick={handleAddToCart}
            >
              Add to cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: "#e6f8f1" }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-[#16e087] px-7 py-3 rounded-2xl flex items-center gap-3 font-bold text-black bg-white hover:text-[#16e087] transition shadow-lg"
              onClick={handleAddWishlist}
            >
              <FaHeart className="text-[#16e087] text-xl" /> Add to wishlist
            </motion.button>
          </div>
        </div>
      </div>

      {/* --- DESCRIPTION --- */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <h2 className="text-2xl font-bold mb-5 text-black">Product Description</h2>
        <p className="text-gray-700 text-lg leading-7 mb-8 whitespace-pre-line font-medium">
          {product.description}
        </p>
        {product.specs && (
          <div className="grid md:grid-cols-2 gap-5">
            {Object.entries(product.specs).map(
              ([key, val]) =>
                val && (
                  <motion.div
                    key={key}
                    className="bg-[#f7fcfa] border-2 border-[#e3f5ed] rounded-xl px-6 py-4 text-black shadow hover:shadow-xl transition font-medium"
                    whileHover={{ scale: 1.025, borderColor: "#16e087" }}
                  >
                    <span className="font-extrabold capitalize text-[#16e087]">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="ml-2">{val}</span>
                  </motion.div>
                )
            )}
          </div>
        )}
      </motion.div>

      {/* --- RELATED PRODUCTS --- */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <RelatedProducts allProducts={related} currentProduct={product} />
      </motion.div>

      {/* --- TOAST --- */}
      <Toast
        message={toast.show ? toast.message : ""}
        onClose={() => setToast({ ...toast, show: false })}
        key={toast.show ? "on" : "off"}
      />
    </div>
  );
}
