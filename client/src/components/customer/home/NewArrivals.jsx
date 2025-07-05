import React from "react";
import { useNavigate } from "react-router-dom";
import useProduct from "../../../hooks/UseProduct";
import ProductCarousel from "../product/ProductCarousel";

function NewArrivals() {
  const { products, loading, error } = useProduct();
  const arrivals = products.slice(0, 12);
  const navigate = useNavigate();  // ← added

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto text-left">
      <ProductCarousel
        products={arrivals}
        title="New Arrivals"
        subtitle="Fresh drops, premium picks."
        visible={4}
      />
      {/* View All button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => navigate("/shop")}
          className="
            px-6 py-2
            bg-white text-black border border-black
            rounded-full font-semibold uppercase
            hover:bg-black hover:text-white
            transition
          "
        >
          View All
        </button>
      </div>
    </div>
  );
}

export default NewArrivals;
