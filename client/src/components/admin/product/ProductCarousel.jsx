import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProductCarousel({ images = [] }) {
  const [current, setCurrent] = useState(0);
  if (!images.length) return null;

  const prev = () => setCurrent(c => (c - 1 + images.length) % images.length);
  const next = () => setCurrent(c => (c + 1) % images.length);

  return (
    <div className="relative group w-40 h-40 flex items-center justify-center overflow-hidden rounded-xl border border-green-200 shadow-lg bg-green-50/60 mb-4">
      <img
        src={images[current]}
        alt="Product"
        className="object-cover w-full h-full transition-all duration-300"
      />
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-green-100 text-[#0c6836] rounded-full p-2 opacity-80 group-hover:opacity-100 transition hover:bg-green-200"
            onClick={prev}
            type="button"
          >
            <FaChevronLeft />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-100 text-[#0c6836] rounded-full p-2 opacity-80 group-hover:opacity-100 transition hover:bg-green-200"
            onClick={next}
            type="button"
          >
            <FaChevronRight />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`block w-2 h-2 rounded-full ${i === current ? 'bg-[#0c6836]' : 'bg-green-200'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
