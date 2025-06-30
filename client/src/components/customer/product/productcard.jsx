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

  // Auto cycle every 1 sec when hovered
  useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  // Reset to first image after 0.5 sec when mouse leaves
  useEffect(() => {
    if (isHovered) return;
    const timeout = setTimeout(() => {
      setImgIndex(0);
    }, 500);
    return () => clearTimeout(timeout);
  }, [isHovered]);

  const handleImageClick = (e) => {
    e.stopPropagation(); // prevent card navigation
    setImgIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="border rounded-lg p-4 flex flex-col items-center relative group cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div
        className="relative w-32 h-32 mb-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleImageClick}
      >
        <img
          src={images[imgIndex]}
          alt={product.name}
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* $ sign in price */}
      <span className="font-bold mb-1">${product.price}</span>
      <span className="text-center text-sm mb-2">{product.name}</span>

      <button
        className="btn btn-ghost btn-sm absolute top-2 right-2 opacity-70 group-hover:opacity-100 transition"
        style={{ fontSize: "1.2rem", lineHeight: 1, color: "#111" }}
        onClick={(e) => e.stopPropagation()}
      >
        ♥
      </button>
    </div>
  );
};

export default ProductCard;
