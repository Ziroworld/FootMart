import React from "react";
import { useNavigate } from "react-router-dom";
import offer2 from "../../../assets/offer-images/offer-2.png";

function PromoBanner() {
  const navigate = useNavigate();

  return (
    <div
      className="relative mx-auto my-12"
      style={{
        height: "80vh",          // 80% of viewport height
        width: "80vw",           // 80% of viewport width
        maxWidth: "1000px",      // Optional: max width for very large screens
        minWidth: "320px",       // Optional: min width for tiny screens
        borderRadius: "1rem",    // Rounded corners
        overflow: "hidden",      // Keeps button/image inside
        background: "#fff"       // fallback bg
      }}
    >
      <img
        src={offer2}
        alt="Promo Cleats"
        className="w-full h-full object-contain bg-white"
      />
      <button
        className="absolute left-8 bottom-8 px-6 py-2 bg-white text-black border border-black rounded-[30px] font-semibold uppercase hover:bg-black hover:text-white transition"
        onClick={() => navigate("/shop")}
      >
        Shop now
      </button>
    </div>
  );
}

export default PromoBanner;
