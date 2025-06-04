import React from "react";
import OfferSlider from "./OfferSlider";
import FeaturesBar from "./FeaturesBar";
import NewArrivals from "./NewArrivals";
import CategoryGrid from "./CategoryGrid";
import PromoBanner from "./PromoBanner";
import AboutSection from "./AboutSection";
import BestSellers from "./BestSellers";
import Footer from "./Footer";

function HomePageComponent() {
  return (
    <div className="bg-white">
      <OfferSlider />
      <FeaturesBar />
      <NewArrivals />
      <CategoryGrid />
      <PromoBanner />
      <AboutSection />
      <BestSellers />
      <Footer />
    </div>
  );
}

export default HomePageComponent;
