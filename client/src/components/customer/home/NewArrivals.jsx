import React from "react";
import staticBoot from "../../../assets/offer-images/static-boot.png";
import { useNavigate } from "react-router-dom";

const newArrivals = [
  {
    title: "Nike Air Zoom Mercurial Vapor 16 X Air Max 95 Pro",
    price: "NPR 3000.00",
    img: staticBoot,
  },
  {
    title: "Nike Air Zoom Mercurial Vapor 1 FG Regen CR7 Origins",
    price: "NPR 3500.00",
    img: staticBoot,
  },
  {
    title: "Adidas F50 Elite Adizero 2010 FG Leather Remake",
    price: "NPR 5000.00",
    img: staticBoot,
  },
  {
    title: "Adidas Predator Elite Fold-over Tongue FG Vivid Horizon",
    price: "NPR 4000.00",
    img: staticBoot,
  },
];

function NewArrivals() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {newArrivals.map((card, i) => (
          <div key={i} className="border rounded-lg p-4 flex flex-col items-center">
            <img src={card.img} alt={card.title} className="w-28 h-28 object-contain mb-3" />
            <span className="font-bold">{card.price}</span>
            <span className="text-center text-sm">{card.title}</span>
            <button className="btn btn-ghost btn-sm mt-2">♥</button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
       <button className="btn btn-outline" onClick={() => navigate("/shop")}>
    View All
  </button>
      </div>
    </div>
  );
}
export default NewArrivals;
