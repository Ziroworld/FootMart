import React from "react";
import offer2 from "../../../assets/offer-images/offer-2.png";

function PromoBanner() {
  return (
    <div className="max-w-6xl mx-auto my-12 p-6 rounded-lg bg-[#6DBDE5] flex flex-col md:flex-row items-center gap-8">
      <img src={offer2} alt="Promo Cleats" className="w-40 md:w-72" />
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Branded Cleats Sale 15% Off
        </h2>
        <span className="text-white">Limited time offer • Nike Puma Adidas &amp; More!</span>
        <div>
          <button className="btn btn-white text-black mt-4">Shop Now</button>
        </div>
      </div>
    </div>
  );
}
export default PromoBanner;
