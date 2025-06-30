import useProduct from "../../../hooks/UseProduct";
import ProductCarousel from "../product/ProductCarousel";

function getRandomSubset(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function BestSellers() {
  const { products, loading, error } = useProduct();

  // For demo: pick up to 12 random best sellers
  const bestSellers = getRandomSubset(products, 12);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <ProductCarousel
      products={bestSellers}
      title="Best Selling Products"
      subtitle="Our all-time favorites, handpicked for you."
      visible={4} // Change to 1 or 3 if you want less visible at once
    />
  );
}
export default BestSellers;
