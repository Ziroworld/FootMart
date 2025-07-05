import React from "react";
import { FaMoneyBillWave, FaCertificate, FaUsers, FaChartLine } from "react-icons/fa";

const features = [
  {
    title: "Affordable Gear Promise",
    desc: "Unbeatable prices on top-quality football merchandise.",
    icon: <FaMoneyBillWave className="text-[#00754A] text-3xl mb-3" />,
  },
  {
    title: "Premium Quality Assurance",
    desc: "Guaranteed high standards for every product.",
    icon: <FaCertificate className="text-[#00754A] text-3xl mb-3" />,
  },
  {
    title: "Local Football Unity",
    desc: "Connect with your local football community effortlessly.",
    icon: <FaUsers className="text-[#00754A] text-3xl mb-3" />,
  },
  {
    title: "Tournament Engagement Boost",
    desc: "Stay updated with live standings and player profiles.",
    icon: <FaChartLine className="text-[#00754A] text-3xl mb-3" />,
  },
];

function FeaturesBar() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 max-w-7xl mx-auto py-8 px-2">
      {features.map((f, i) => (
        <div
          key={i}
          className="
            group relative bg-white/80
            rounded-2xl p-6 flex flex-col items-center
            shadow-xl
            backdrop-blur-[5px]
            border border-[#d7f5ea] transition-all duration-300
            hover:shadow-2xl hover:-translate-y-2 hover:bg-white
            hover:border-[#00754A]/40
            before:content-[''] before:absolute before:inset-0 before:rounded-2xl
            before:bg-gradient-to-br before:from-[#E6F8F1]/70 before:to-[#f4fff9]/50
            before:opacity-60 before:pointer-events-none
            animate-fade-in
          "
          style={{
            boxShadow: "0 6px 32px 0 rgba(0,117,74,0.10)",
          }}
        >
          {f.icon}
          <h3 className="font-bold text-lg sm:text-xl mb-2 text-black drop-shadow-sm">
            {f.title}
          </h3>
          <p className="text-base sm:text-lg text-black font-medium tracking-wide leading-relaxed">
            {f.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

export default FeaturesBar;
