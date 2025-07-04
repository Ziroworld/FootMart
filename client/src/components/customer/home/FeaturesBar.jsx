import React from "react";

const features = [
  {
    title: "Affordable Gear Promise",
    desc: "Unbeatable prices on top-quality football merchandise."
  },
  {
    title: "Premium Quality Assurance",
    desc: "Guaranteed high standards for every product."
  },
  {
    title: "Local Football Unity",
    desc: "Connect with your local football community effortlessly."
  },
  {
    title: "Tournament Engagement Boost",
    desc: "Stay updated with live standings and player profiles."
  },
];

function FeaturesBar() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto py-6 sm:py-8">
      {features.map((f, i) => (
        <div key={i} className="text-center p-3 sm:p-4">
          <h3 className="font-bold text-base sm:text-lg mb-1">{f.title}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
export default FeaturesBar;
