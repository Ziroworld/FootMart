import React from "react";
import staticBoot from "../../../assets/offer-images/boots2.avif";
import staticBall from "../../../assets/offer-images/ball.jpg";
import staticJersey from "../../../assets/offer-images/jersey2.jpeg";

const categories = [
  { name: "Boots", img: staticBoot },
  { name: "Jersey", img: staticJersey },
  { name: "Accessories", img: staticBall },
];

function CategoryGrid() {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Browse By Category</h2>
      <div className="flex flex-col xs:flex-row sm:flex-row justify-center items-center gap-6 sm:gap-10">
        {categories.map((cat, i) => (
          <div key={i} className="flex flex-col items-center mb-4 sm:mb-0">
            <img
              src={cat.img}
              alt={cat.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-200 shadow mb-2 object-cover"
            />
            <span className="font-semibold">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CategoryGrid;
