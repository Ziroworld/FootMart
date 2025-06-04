import React from "react";
import staticBoot from "../../../assets/offer-images/static-boot.png";

const categories = [
  { name: "Boots", img: staticBoot },
  { name: "Jersey", img: staticBoot },
  { name: "Accessories", img: staticBoot },
];

function CategoryGrid() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-xl font-bold mb-6 text-center">Browse By Category</h2>
      <div className="flex justify-center gap-8">
        {categories.map((cat, i) => (
          <div key={i} className="flex flex-col items-center">
            <img src={cat.img} alt={cat.name} className="w-24 h-24 rounded-full border mb-2" />
            <span className="font-bold">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CategoryGrid;
