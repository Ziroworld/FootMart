import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useProduct from "../../../hooks/UseProduct";
import ProductCard from "../product/productcard";
import { FiSearch } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const BRANDS = ["Nike", "Adidas", "Puma", "Reebok"];
const CATEGORIES = ["boots", "jersey", "accessories"];

function ShopComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { products, loading, error } = useProduct();

  const query = new URLSearchParams(location.search);
  const initialCat = query.get("category");

  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(() =>
    initialCat && CATEGORIES.includes(initialCat) ? [initialCat] : []
  );
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (selectedCategories.length === 1) {
      navigate(`/shop?category=${selectedCategories[0]}`, { replace: true });
    } else if (selectedCategories.length === 0) {
      navigate("/shop", { replace: true });
    }
  }, [selectedCategories, navigate]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter((p) =>
        selectedBrands.length ? selectedBrands.includes(p.brand) : true
      )
      .filter((p) =>
        selectedCategories.length
          ? selectedCategories.includes(p.category)
          : true
      )
      .filter((p) => {
        const minOk =
          priceRange.min === "" || p.price >= parseFloat(priceRange.min);
        const maxOk =
          priceRange.max === "" || p.price <= parseFloat(priceRange.max);
        return minOk && maxOk;
      });
  }, [products, search, selectedBrands, selectedCategories, priceRange]);

  const itemsPerPage = 8;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage)
  );
  const paginated = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const toggleFilter = (value, setFn, state) => {
    setFn(
      state.includes(value)
        ? state.filter((v) => v !== value)
        : [...state, value]
    );
    setPage(1);
  };

  // Responsive, glassy sidebar with **vertical filter options**
  function FiltersSidebar() {
    return (
      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18, duration: 0.6 }}
        className="
          hidden md:block bg-white/80 backdrop-blur-md border-none
          rounded-3xl shadow-2xl px-7 py-8 min-w-[200px] max-w-[220px]
          mt-2
        "
      >
        <div className="mb-7">
          <div className="font-bold text-[#00754A] mb-2 text-lg tracking-wide">Category</div>
          <div className="flex flex-col gap-1">
            {CATEGORIES.map((c) => (
              <label key={c} className="flex items-center gap-2 cursor-pointer select-none py-1 rounded hover:bg-[#f4f9f6] transition">
                <input
                  type="checkbox"
                  className="accent-[#00754A] w-4 h-4"
                  checked={selectedCategories.includes(c)}
                  onChange={() => toggleFilter(c, setSelectedCategories, selectedCategories)}
                />
                <span className="text-gray-700">{c.charAt(0).toUpperCase() + c.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-7">
          <div className="font-bold text-[#00754A] mb-2 text-lg tracking-wide">Price</div>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              placeholder="Min"
              className="border border-gray-300 rounded-xl px-2 py-1 w-16 focus:border-[#00754A] focus:ring-[#00754A]/20"
              value={priceRange.min}
              onChange={(e) => {
                setPriceRange((prev) => ({
                  ...prev,
                  min: e.target.value,
                }));
                setPage(1);
              }}
            />
            <input
              type="number"
              placeholder="Max"
              className="border border-gray-300 rounded-xl px-2 py-1 w-16 focus:border-[#00754A] focus:ring-[#00754A]/20"
              value={priceRange.max}
              onChange={(e) => {
                setPriceRange((prev) => ({
                  ...prev,
                  max: e.target.value,
                }));
                setPage(1);
              }}
            />
          </div>
        </div>
        <div>
          <div className="font-bold text-[#00754A] mb-2 text-lg tracking-wide">Brand</div>
          <div className="flex flex-col gap-1">
            {BRANDS.map((b) => (
              <label key={b} className="flex items-center gap-2 cursor-pointer select-none py-1 rounded hover:bg-[#f4f9f6] transition">
                <input
                  type="checkbox"
                  className="accent-[#00754A] w-4 h-4"
                  checked={selectedBrands.includes(b)}
                  onChange={() => toggleFilter(b, setSelectedBrands, selectedBrands)}
                />
                <span className="text-gray-700">{b}</span>
              </label>
            ))}
          </div>
        </div>
      </motion.aside>
    );
  }

  // Modern search bar (no change)
  function SearchBar() {
    return (
      <div className="flex items-center mb-7 w-full md:w-[420px] mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products, brands or categories"
            className="
              border-none shadow-lg pl-12 pr-4 py-3 rounded-full w-full
              text-lg bg-white/80 backdrop-blur focus:ring-2 focus:ring-[#00754A] focus:outline-none
              placeholder:text-gray-400
              transition
            "
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-[#00754A]">
            <FiSearch />
          </span>
        </div>
      </div>
    );
  }

  // Pagination - rounded with shadow, icons, highlight
  function Pagination() {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
        <button
          className={`
            px-4 py-2 flex items-center gap-2 rounded-full
            font-bold transition border-2
            ${page === 1
              ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-white border-[#00754A] text-[#00754A] hover:bg-[#00754A] hover:text-white shadow"}
          `}
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          <FaChevronLeft size={17} />
          Previous
        </button>
        <span className="text-center font-semibold tracking-wide text-lg text-[#00754A] w-full sm:w-auto">
          Page {page} of {totalPages}
        </span>
        <button
          className={`
            px-4 py-2 flex items-center gap-2 rounded-full
            font-bold transition border-2
            ${page === totalPages
              ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-white border-[#00754A] text-[#00754A] hover:bg-[#00754A] hover:text-white shadow"}
          `}
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
          <FaChevronRight size={17} />
        </button>
      </div>
    );
  }

  // --- RENDER ---
  if (loading)
    return <div className="text-center py-20 text-xl text-[#00754A]">Loading products...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto py-8 px-2 sm:px-4">
      {/* Breadcrumb */}
      <div className="text-xs sm:text-sm text-gray-500 mb-4 flex items-center gap-1">
        <button
          className="text-[#00754A] font-semibold hover:underline"
          onClick={() => navigate("/home")}
        >
          Home
        </button>
        <span>&gt;</span>
        <span className="text-black font-semibold">Shop</span>
      </div>

      {/* Section Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-5 sm:mb-7 text-[#00754A] tracking-tight border-b-2 border-[#00754A] inline-block pb-1 px-2 shadow-[0_4px_14px_-6px_rgba(0,117,74,0.10)]">
        Shop
      </h1>

      {/* SearchBar */}
      <SearchBar />

      <div className="flex flex-col md:flex-row gap-7">
        {/* Sidebar */}
        <FiltersSidebar />

        {/* Product grid */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-gray-400 text-lg text-center pt-20">No products found.</div>
          ) : (
            <AnimatePresence>
              <motion.div
                key={page}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 sm:gap-8 md:gap-9 xl:gap-12"
              >
                {paginated.map((prod) => (
                  <ProductCard key={prod._id} product={prod} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
          <Pagination />
        </main>
      </div>
    </div>
  );
}

export default ShopComponent;
