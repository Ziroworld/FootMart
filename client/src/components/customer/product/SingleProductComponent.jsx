import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getProducts } from '../../../server/ProductApi';
import { useCart } from '../../../hooks/usecarts';
import { FaHeart, FaCheckCircle } from 'react-icons/fa';
import RelatedProducts from './RelatedProduct';

// Light Green Toast Component
function Toast({ message, onClose }) {
  return (
    <div className="
      fixed z-50
      left-1/2 bottom-6 sm:bottom-8 sm:right-8 sm:left-auto
      -translate-x-1/2 sm:translate-x-0
      bg-green-100 border border-green-300 text-green-900 rounded-2xl px-6 py-3
      flex items-center gap-3 shadow-xl
    ">
      <svg width="22" height="22" viewBox="0 0 24 24" className="text-green-600">
        <circle cx="12" cy="12" r="10" fill="#D3FAD6" />
        <path
          d="M8.5 12.7l2.3 2.3 4.3-4.3"
          stroke="#30B95D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="font-semibold text-[16px]">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-lg font-bold text-green-900 hover:text-green-700 px-2"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}

export default function SingleProductComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

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
    setTimeout(() => setToast({ show: false, message: '' }), 2700);
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
    return <div className="py-16 text-center text-lg">Loading...</div>;
  if (!product)
    return (
      <div className="py-16 text-center text-red-500">Product not found.</div>
    );

  // prepare images
  const images = Array.isArray(product.images) && product.images.length
    ? product.images
    : [product.imageUrl || 'https://via.placeholder.com/400x400'];

  // sizes array
  let SIZES = Array.isArray(product.sizes) && product.sizes.length
    ? product.sizes
    : product.size
      ? (typeof product.size === 'string'
          ? product.size.split(/[,\s/]+/).filter(Boolean)
          : [product.size])
      : [];

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
    showToast('Added to wishlist!');
    // (You could also fire a wishlist API here)
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex flex-wrap gap-1">
        <button onClick={() => navigate('/home')} className="font-semibold hover:underline">
          Home
        </button>
        <span>&gt;</span>
        <button onClick={() => navigate('/shop')} className="font-semibold hover:underline">
          Shop
        </button>
        <span>&gt;</span>
        <span className="font-semibold">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Image Gallery */}
        <div className="flex-1">
          <div className="border rounded-xl bg-gray-50 p-2 min-h-[300px] flex items-center justify-center">
            <img
              src={images[imgIndex]}
              alt={product.name}
              className="max-h-[350px] object-contain rounded-lg transition-all duration-200"
            />
          </div>
          <div className="flex gap-3 mt-4 justify-center overflow-x-auto">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} ${idx + 1}`}
                className={`flex-shrink-0 w-14 h-14 object-contain rounded-lg border cursor-pointer transition ${
                  idx === imgIndex
                    ? 'border-black ring-2 ring-black'
                    : 'border-gray-300'
                }`}
                onClick={() => setImgIndex(idx)}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col">
          <div className="text-gray-600 text-sm mb-2">{product.brand}</div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-xl font-semibold text-black mb-1">
            NPR {product.price.toLocaleString()}
          </div>
          <div className="text-gray-500 text-xs mb-3">Inclusive of all taxes</div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-green-600 flex items-center gap-1">
              <FaCheckCircle /> In Stock
            </span>
            <span className="text-xs text-gray-400">({product.quantity} available)</span>
          </div>

          {SIZES.length > 0 && (
            <div className="mb-5">
              <div className="font-semibold mb-2">Size</div>
              <div className="flex gap-2 flex-wrap">
                {SIZES.map((sz, idx) => (
                  <button
                    key={idx}
                    className={`border px-3 py-1 rounded-md font-medium ${
                      selectedSize == sz
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 mb-6">
            <span className="font-semibold">Qty</span>
            <button
              className="border rounded-md px-3 py-1 text-lg font-bold disabled:opacity-50"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
            >
              −
            </button>
            <span className="px-2">{qty}</span>
            <button
              className="border rounded-md px-3 py-1 text-lg font-bold disabled:opacity-50"
              onClick={() => setQty((q) => Math.min(product.quantity, q + 1))}
              disabled={qty >= product.quantity}
            >
              ＋
            </button>
          </div>

          <div className="flex gap-4 mb-8 flex-wrap">
            <button
              className="bg-black text-white px-8 py-3 rounded-2xl font-semibold hover:bg-gray-900 transition"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
            <button
              className="border border-black px-4 py-3 rounded-2xl flex items-center gap-2 hover:bg-gray-100 transition"
              onClick={handleAddWishlist}
            >
              <FaHeart /> Add to wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Description & Specs */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-3">Product Description</h2>
        <p className="text-gray-700 leading-7 mb-6 whitespace-pre-line">
          {product.description}
        </p>
        {product.specs && (
          <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border">
            {Object.entries(product.specs).map(
              ([key, val]) =>
                val && (
                  <div key={key} className="text-sm">
                    <span className="font-semibold capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}:
                    </span>{' '}
                    {val}
                  </div>
                )
            )}
          </div>
        )}
      </div>

      {/* Related Products */}
      <RelatedProducts allProducts={related} currentProduct={product} />

      {/* Toast Notification */}
      {toast.show && (
        <Toast message={toast.message} onClose={() => setToast({ show: false, message: '' })} />
      )}
    </div>
  );
}
