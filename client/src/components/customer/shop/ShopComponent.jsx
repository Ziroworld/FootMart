import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useProduct from "../../../hooks/UseProduct";
import ProductCard from "../product/productcard";

const BRANDS = ["Nike", "Adidas", "Puma", "Reebok"];
const CATEGORIES = ["boots", "jersey", "accessories"];

function ShopComponent() {
  const navigate = useNavigate();
  const { products, loading, error } = useProduct();

  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [page, setPage] = useState(1);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((p) =>
        selectedBrands.length ? selectedBrands.includes(p.brand) : true
      )
      .filter((p) =>
        selectedCategories.length ? selectedCategories.includes(p.category) : true
      )
      .filter((p) => {
        const minOk = priceRange.min === "" || p.price >= parseFloat(priceRange.min);
        const maxOk = priceRange.max === "" || p.price <= parseFloat(priceRange.max);
        return minOk && maxOk;
      });
  }, [products, search, selectedBrands, selectedCategories, priceRange]);

  // Pagination
  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginated = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const toggleFilter = (value, setFn, state) => {
    setFn(state.includes(value) ? state.filter((v) => v !== value) : [...state, value]);
    setPage(1); // Reset to first page on filter change
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4 flex items-center gap-1">
        <button
          className="text-black font-semibold hover:underline"
          onClick={() => navigate("/home")}
        >
          Home
        </button>
        <span>&gt;</span>
        <span className="text-black font-semibold">Shop</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">Shop</h1>

      {/* Search */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search"
          className="border px-4 py-2 rounded w-full max-w-md"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-60 flex-shrink-0">
          {/* Category */}
          <div className="mb-6">
            <div className="font-bold mb-2">Category</div>
            {CATEGORIES.map((c) => (
              <label key={c} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedCategories.includes(c)}
                  onChange={() => toggleFilter(c, setSelectedCategories, selectedCategories)}
                />
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </label>
            ))}
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="font-bold mb-2">Price</div>
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                placeholder="Min"
                className="border px-2 py-1 rounded w-16"
                value={priceRange.min}
                onChange={(e) => {
                  setPriceRange((prev) => ({ ...prev, min: e.target.value }));
                  setPage(1);
                }}
              />
              <input
                type="number"
                placeholder="Max"
                className="border px-2 py-1 rounded w-16"
                value={priceRange.max}
                onChange={(e) => {
                  setPriceRange((prev) => ({ ...prev, max: e.target.value }));
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* Brand */}
          <div className="mb-6">
            <div className="font-bold mb-2">Brand</div>
            {BRANDS.map((b) => (
              <label key={b} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedBrands.includes(b)}
                  onChange={() => toggleFilter(b, setSelectedBrands, selectedBrands)}
                />
                {b}
              </label>
            ))}
          </div>
        </aside>

        {/* Product grid */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-gray-500">No products found.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {paginated.map((prod) => (
                  <ProductCard key={prod._id} product={prod} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-8">
                <button
                  className="border border-black text-black bg-white px-8 py-2 rounded-[30px] font-semibold transition hover:bg-black hover:text-white"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  style={{ minWidth: "120px" }}
                >
                  Previous
                </button>
                <span className="text-center font-medium">
                  Page {page} of {totalPages}
                </span>
                <button
                  className="border border-black bg-black text-white px-8 py-2 rounded-[30px] font-semibold transition hover:bg-white hover:text-black"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  style={{ minWidth: "120px" }}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default ShopComponent;
