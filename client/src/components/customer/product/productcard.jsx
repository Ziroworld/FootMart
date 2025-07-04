import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ["https://via.placeholder.com/150?text=No+Image"];

  const [imgIndex, setImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 1100);
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  useEffect(() => {
    if (isHovered) return;
    const timeout = setTimeout(() => setImgIndex(0), 500);
    return () => clearTimeout(timeout);
  }, [isHovered]);

  const handleImageClick = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="border rounded-lg px-2 py-3 flex flex-col items-center relative group cursor-pointer bg-white shadow-sm hover:shadow-lg transition"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div
        className="relative w-24 h-24 sm:w-28 sm:h-28 mb-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleImageClick}
      >
        <img
          src={images[imgIndex]}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <span className="font-bold text-sm mb-1">
        NPR {product.price?.toLocaleString()}
      </span>
      <span className="text-center text-xs sm:text-sm mb-1">{product.name}</span>
      <button
        className="btn btn-ghost btn-xs absolute top-2 right-2 opacity-70 group-hover:opacity-100 transition"
        style={{ fontSize: "1rem", color: "#111" }}
        onClick={(e) => e.stopPropagation()}
      >
        ♥
      </button>
    </div>
  );
};
export default ProductCard;
