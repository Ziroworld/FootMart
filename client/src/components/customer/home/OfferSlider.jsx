import React, { useState } from "react";
import offer1 from "../../../assets/offer-images/offer-1.png";
import offer2 from "../../../assets/offer-images/offer-2.png";
import offer3 from "../../../assets/offer-images/offer-1.png"; // replace with offer-3.png if you have it

const offers = [
  {
    img: offer1,
    title: "25% Flash Sale",
    sub: "Today Only",
    priceOld: "Rs. 8000",
    priceNew: "Rs. 5999",
    btn: "SHOP NOW",
    bg: "bg-[#E1583E]",
  },
  {
    img: offer2,
    title: "Branded Cleats Sale 15% Off",
    sub: "Limited time offer",
    priceOld: "Rs. 12000",
    priceNew: "Rs. 9500",
    btn: "SHOP NOW",
    bg: "bg-[#6DBDE5]",
  },
  {
    img: offer3,
    title: "Summer Sale",
    sub: "Hurry Up!",
    priceOld: "Rs. 6000",
    priceNew: "Rs. 4499",
    btn: "SHOP NOW",
    bg: "bg-[#E1583E]",
  },
];

function OfferSlider() {
  const [current, setCurrent] = useState(0);
  return (
    <div className={`w-full flex items-center justify-center py-8 relative ${offers[current].bg}`}>
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl w-full">
        <img
          src={offers[current].img}
          alt="offer"
          className="max-w-[270px] md:max-w-[320px] w-full object-contain"
        />
        <div className="flex flex-col justify-center items-start gap-2">
          <h2 className="text-4xl font-black text-white">{offers[current].title}</h2>
          <span className="text-lg font-bold text-white">{offers[current].sub}</span>
          <div className="flex gap-3 mt-2">
            <span className="text-2xl font-bold line-through text-white/70">{offers[current].priceOld}</span>
            <span className="text-2xl font-black text-green-400">{offers[current].priceNew}</span>
          </div>
          <button className="btn btn-sm btn-primary mt-4">{offers[current].btn}</button>
        </div>
      </div>
      {/* Slider Dots */}
      <div className="absolute right-6 top-1/2 flex flex-col gap-2">
        {offers.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${i === current ? "bg-black" : "bg-white/70"}`}
            onClick={() => setCurrent(i)}
          ></button>
        ))}
      </div>
    </div>
  );
}
export default OfferSlider;
