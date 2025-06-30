import React, { useState } from "react";
import ProductCard from "./productcard"; // Your reusable card

// Use FaChevronLeft and FaChevronRight from react-icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function RelatedProducts({ allProducts, currentProduct }) {
  // Filter by same category, exclude self, max 12 products
  const related = allProducts
    .filter(
      p => p.category === currentProduct.category && p._id !== currentProduct._id
    )
    .slice(0, 12);

  // Carousel state
  const [start, setStart] = useState(0);

  const handlePrev = () => setStart(s => Math.max(0, s - 1));
  const handleNext = () => setStart(s => Math.min(related.length - 5, s + 1));

  // Always 5 products in view if possible
  const visible = related.slice(start, start + 5);

  if (related.length === 0) return null;

  return (
    <div className="w-full mt-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Related Products</h2>
      <div className="flex items-center">
        {/* Left Arrow: Only show if not at start */}
        {start > 0 && (
          <button
            className="mr-2 p-2 rounded-full border hover:bg-gray-100"
            onClick={handlePrev}
          >
            <FaChevronLeft size={26} />
          </button>
        )}

        <div className="flex gap-4 flex-1">
          {visible.map((p) => (
            <div key={p._id} className="min-w-[210px]">
              {/* Pass through to your ProductCard, which handles hover/click */}
              <ProductCard product={p} heartSize={28} />
            </div>
          ))}
        </div>

        {/* Right Arrow: Only show if not at end */}
        {start + 5 < related.length && (
          <button
            className="ml-2 p-2 rounded-full border hover:bg-gray-100"
            onClick={handleNext}
          >
            <FaChevronRight size={26} />
          </button>
        )}
      </div>
    </div>
  );
}

export default RelatedProducts;
