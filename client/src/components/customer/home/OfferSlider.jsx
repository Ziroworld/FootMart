// client/src/components/customer/home/OfferSlider.jsx

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import offer1 from "../../../assets/offer-images/offer-101.png";
import offer2 from "../../../assets/offer-images/offer-202.png";
import offer3 from "../../../assets/offer-images/offer-101.png";

const offers = [offer1, offer2, offer3];

export default function OfferSlider() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const directionRef = useRef(1); // 1 = forward, -1 = backward
  const navigate = useNavigate();

  // Auto‐cycle when not hovered
  useEffect(() => {
    if (isHovered) return; // pause on hover

    const interval = setInterval(() => {
      setCurrent((prev) => {
        let next;
        if (prev === offers.length - 1) {
          directionRef.current = -1;
          next = prev - 1;
        } else if (prev === 0) {
          directionRef.current = 1;
          next = prev + 1;
        } else {
          next = prev + directionRef.current;
        }
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Button placement per slide
  const getButtonPosition = (index) =>
    index === 0 || index === 2
      ? { left: "18%", bottom: "8%" }
      : { left: "15%", bottom: "20%" };

  const { left, bottom } = getButtonPosition(current);

  return (
    <div
      className="relative mx-auto my-6 sm:my-10"
      style={{
        width: "60%",
        height: "55vw",
        maxHeight: "700px",
        borderRadius: "1.5rem",
        overflow: "hidden",
        background: "#000",
        boxShadow: "0 6px 40px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={offers[current]}
            alt={`offer-${current}`}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => navigate("/shop")}
            className="
              absolute
              px-6 py-3
              bg-white text-black border border-black
              rounded-full font-semibold uppercase shadow-xl
              text-base sm:text-lg
              hover:bg-black hover:text-white
              transition
            "
            style={{ left, bottom }}
          >
            SHOP NOW
          </button>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {offers.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition ${
              i === current ? "bg-white" : "bg-gray-500/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
