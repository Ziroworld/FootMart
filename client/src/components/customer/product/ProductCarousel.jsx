// src/components/customer/product/ProductCarousel.jsx
import React, { useState } from "react";
import ProductCard from "./productcard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function ProductCarousel({ products = [], title, subtitle, visible = 4 }) {
  // Responsive: change visible per screen width
  // 1 on mobile, 2 on sm-tablet, 4 on desktop
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      const w = window.innerWidth;
      if (w < 640) return 1;        // mobile
      if (w < 900) return 2;        // small tablet
      return visible;               // desktop default (usually 4)
    }
    return visible;
  };

  const [start, setStart] = useState(0);
  const [currVisible, setCurrVisible] = useState(getVisibleCount());

  React.useEffect(() => {
    const onResize = () => setCurrVisible(getVisibleCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [visible]);

  // Clamp start so we never scroll out of bounds
  React.useEffect(() => {
    if (start > products.length - currVisible) {
      setStart(Math.max(0, products.length - currVisible));
    }
  }, [currVisible, products.length]);

  // Calculate actual visible now (maybe < currVisible if not enough products)
  const maxVisible = Math.min(currVisible, products.length);

  const canPrev = start > 0;
  const canNext = start + maxVisible < products.length;

  const currentProducts = products.slice(start, start + maxVisible);

  const handlePrev = () => {
    if (canPrev) setStart((s) => Math.max(0, s - 1));
  };

  const handleNext = () => {
    if (canNext) setStart((s) => Math.min(products.length - maxVisible, s + 1));
  };

  return (
    <div className="max-w-6xl mx-auto py-8 relative px-2">
      {title && (
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center">{title}</h2>
      )}
      {subtitle && (
        <p className="text-center text-gray-500 mb-6">{subtitle}</p>
      )}
      <div className="relative flex items-center">
        {/* Left Arrow */}
        {canPrev && (
          <button
            className="absolute left-0 sm:-left-6 z-10 p-2 rounded-full bg-white border shadow hover:bg-gray-100 transition"
            onClick={handlePrev}
            aria-label="Previous"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            <FaChevronLeft size={18} />
          </button>
        )}
        {/* Product Grid */}
        <div
          className={`grid gap-4 w-full
            grid-cols-1
            ${maxVisible === 2 ? "sm:grid-cols-2" : ""}
            ${maxVisible === 4 ? "md:grid-cols-4" : ""}
          `}
        >
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {/* Right Arrow */}
        {canNext && (
          <button
            className="absolute right-0 sm:-right-6 z-10 p-2 rounded-full bg-white border shadow hover:bg-gray-100 transition"
            onClick={handleNext}
            aria-label="Next"
            style={{ top: "50%", transform: "translateY(-50%)" }}
          >
            <FaChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCarousel;
