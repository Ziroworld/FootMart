import React from "react";
import OfferSlider from "./OfferSlider";
import FeaturesBar from "./FeaturesBar";
import NewArrivals from "./NewArrivals";
import CategoryGrid from "./CategoryGrid";
import PromoBanner from "./PromoBanner";
import BestSellers from "./BestSellers";
import AboutSection from "./AboutSection";

function HomePageComponent() {
  return (
    <div className="bg-white">
      <OfferSlider />
      <FeaturesBar />
      <NewArrivals />
      <CategoryGrid />
      <PromoBanner />
      <BestSellers />
      <AboutSection />
    </div>
  );
}

export default HomePageComponent;
