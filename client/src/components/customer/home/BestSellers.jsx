import useProduct from "../../../hooks/UseProduct";
import ProductCarousel from "../product/ProductCarousel";

function getRandomSubset(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function BestSellers() {
  const { products, loading, error } = useProduct();
  const bestSellers = getRandomSubset(products, 12);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto text-left">
      <ProductCarousel
        products={bestSellers}
        title="Best Selling Products"
        subtitle="Our all-time favorites, handpicked for you."
        visible={4}
      />
    </div>
  );
}

export default BestSellers;
