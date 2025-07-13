import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProductCarousel({ images = [] }) {
  const [current, setCurrent] = useState(0);
  if (!images.length) return null;

  const prev = () => setCurrent(c => (c - 1 + images.length) % images.length);
  const next = () => setCurrent(c => (c + 1) % images.length);

  return (
    <div className="relative group w-40 h-40 flex items-center justify-center overflow-hidden rounded-xl border border-[#38ffe3]/40 shadow-lg bg-[#111223]">
      <img
        src={images[current]}
        alt="Product"
        className="object-cover w-full h-full transition-all duration-300"
      />
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#181c29] text-[#38ffe3] rounded-full p-2 opacity-70 group-hover:opacity-100 transition hover:bg-[#282c3d]"
            onClick={prev}
            type="button"
          >
            <FaChevronLeft />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#181c29] text-[#38ffe3] rounded-full p-2 opacity-70 group-hover:opacity-100 transition hover:bg-[#282c3d]"
            onClick={next}
            type="button"
          >
            <FaChevronRight />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`block w-2 h-2 rounded-full ${i === current ? 'bg-[#38ffe3]' : 'bg-[#38ffe333]'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
