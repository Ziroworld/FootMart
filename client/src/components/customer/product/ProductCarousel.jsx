// src/components/customer/product/ProductCarousel.jsx
import React, { useState } from "react";
import ProductCard from "./productcard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function ProductCarousel({ products, title, subtitle, visible = 4 }) {
  const [start, setStart] = useState(0);

  const canPrev = start > 0;
  const canNext = start + visible < products.length;

  const currentProducts = products.slice(start, start + visible);

  const handlePrev = () => {
    if (canPrev) setStart(start - 1);
  };

  const handleNext = () => {
    if (canNext) setStart(start + 1);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 relative">
      <h2 className="text-3xl font-bold mb-2 text-center">{title}</h2>
      {subtitle && <p className="text-center text-gray-500 mb-6">{subtitle}</p>}

      <div className="relative flex items-center">
        {canPrev && (
          <button
            className="absolute -left-6 z-10 p-2 rounded-full bg-white border shadow hover:bg-gray-100 transition"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <FaChevronLeft size={18} />
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {canNext && (
          <button
            className="absolute -right-6 z-10 p-2 rounded-full bg-white border shadow hover:bg-gray-100 transition"
            onClick={handleNext}
            aria-label="Next"
          >
            <FaChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCarousel;
