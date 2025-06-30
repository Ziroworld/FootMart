import useProduct from "../../../hooks/UseProduct";
import ProductCarousel from "../product/ProductCarousel";

function NewArrivals() {
  const { products, loading, error } = useProduct();
  const arrivals = products.slice(0, 12);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <ProductCarousel
      products={arrivals}
      title="New Arrivals"
      subtitle="Fresh drops, premium picks."
      visible={4} // shows 4 at a time, slides by 1 per click
    />
  );
}
export default NewArrivals;
