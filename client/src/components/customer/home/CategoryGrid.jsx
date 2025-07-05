import React from "react";
import { useNavigate } from "react-router-dom";
import staticBoot from "../../../assets/offer-images/boots2.avif";
import staticBall from "../../../assets/offer-images/ball.jpg";
import staticJersey from "../../../assets/offer-images/jersey2.jpeg";

const categories = [
  { name: "Boots", img: staticBoot },
  { name: "Jersey", img: staticJersey },
  { name: "Accessories", img: staticBall },
];

function CategoryGrid() {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/shop?category=${category.toLowerCase()}`);
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-center tracking-tight text-black">
        Browse By Category
      </h2>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-20">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => handleClick(cat.name)}
            className="
              group bg-white shadow-lg relative
              rounded-2xl flex flex-col items-center
              px-7 py-7 w-40 h-56
              border-2 border-[#d6f5e8] outline-none focus:ring-4 focus:ring-[#00754A]/20
              transition-all duration-300 hover:scale-105 hover:shadow-2xl
              hover:border-[#00754A] cursor-pointer
              active:scale-98
              animate-fade-in
            "
            style={{
              minWidth: 160,  // for large screens, visually sharper
              maxWidth: 160,
              minHeight: 224, // h-56 (14*16)
              maxHeight: 224,
            }}
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="
                w-24 h-24 rounded-full object-cover border-4 border-white
                shadow-xl mb-4 group-hover:border-[#00754A] group-hover:shadow-emerald-100
                transition-all duration-300
              "
              style={{
                boxShadow: "0 6px 24px 0 rgba(0,117,74,0.10)",
              }}
            />
            <span
              className="
                text-lg font-bold text-black
                rounded-full px-6 py-2 mt-2 shadow
                bg-[#e3f5ed]
                group-hover:bg-[#00754A] group-hover:text-white
                transition-all duration-300
                tracking-wide
              "
              style={{
                letterSpacing: ".02em"
              }}
            >
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryGrid;
