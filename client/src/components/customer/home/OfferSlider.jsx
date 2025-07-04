import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import offer1 from "../../../assets/offer-images/offer-101.png";
import offer2 from "../../../assets/offer-images/offer-202.png";
import offer3 from "../../../assets/offer-images/offer-101.png";

const offers = [offer1, offer2, offer3];

function OfferSlider() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const getButtonPosition = (index) => {
    if (index === 0) {
      // Exact positioning based on your blue-boxed screenshot area
      return { left: "20%", bottom: "8%" };
    }
    return { left: "13%", bottom: "15%" };
  };

  return (
    <div
      className="relative mx-auto my-6 sm:my-10"
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
      <div
        className="flex w-full h-full transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {offers.map((src, idx) => {
          const { left, bottom } = getButtonPosition(idx);
          return (
            <div key={idx} className="relative min-w-full h-full bg-white">
              <img src={src} alt={`offer-${idx}`} className="w-full h-full object-cover" />

              {/* Button exactly at the position you specified */}
              <button
                onClick={() => navigate("/shop")}
                className="
                  absolute
                  px-4 py-2
                  bg-white text-black border border-black
                  rounded-full font-semibold uppercase shadow-lg
                  text-sm hover:bg-black hover:text-white transition
                "
                style={{ left, bottom }}
              >
                SHOP NOW
              </button>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {offers.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === current ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default OfferSlider;
