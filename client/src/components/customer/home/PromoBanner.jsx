import React from "react";
import { useNavigate } from "react-router-dom";
import promoImg from "../../../assets/offer-images/offer-202.png";

function PromoBanner() {
  const navigate = useNavigate();

  return (
    <div
      className="relative mx-auto my-8 sm:my-12"
      style={{
        width: "95vw",
        maxWidth: "1100px",
        height: "45vw",
        maxHeight: "550px",
        borderRadius: "1.3rem",
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 6px 40px 0 rgba(40,60,90,0.05)",
      }}
    >
      <img src={promoImg} alt="Promo Cleats" className="w-full h-full object-cover" />

      {/* Professionally aligned button */}
      <button
        onClick={() => navigate("/shop")}
        className="
          absolute left-[13%] bottom-[18%]
          px-4 py-2
          bg-white text-black border border-black
          rounded-full font-semibold uppercase shadow-lg
          text-sm hover:bg-black hover:text-white transition
        "
      >
        SHOP NOW
      </button>
    </div>
  );
}

export default PromoBanner;
