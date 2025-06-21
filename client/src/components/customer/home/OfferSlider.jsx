import { useState } from "react";
import { useNavigate } from "react-router-dom";

import offer1 from "../../../assets/offer-images/offer-1.png";
import offer2 from "../../../assets/offer-images/offer-2.png";
import offer3 from "../../../assets/offer-images/offer-1.png"; // or any third img

const offers = [offer1, offer2, offer3];

function OfferSlider() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  return (
    <div
      className="relative mx-auto py-8"
      style={{
        width: "80vw",
        height: "80vh",
        maxWidth: "1000px",
        minWidth: "320px",
        borderRadius: "1rem",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* Slider strip */}
      <div
        className="flex transition-transform duration-500 h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {offers.map((src, idx) => (
          <div
            key={idx}
            className="relative min-w-full h-full flex justify-center items-center"
          >
            <img
              src={src}
              alt={`offer-${idx}`}
              className="w-full h-full object-contain bg-white"
            />

            {/* SHOP NOW button –– bottom-left overlay  */}
            <button
              className="absolute left-8 bottom-8 px-6 py-2 bg-white text-black border border-black rounded-[30px] font-semibold uppercase hover:bg-black hover:text-white transition"
              onClick={() => navigate("/shop")}
            >
              Shop now
            </button>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-3">
        {offers.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-black" : "bg-gray-300"
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default OfferSlider;
