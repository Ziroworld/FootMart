import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import staticBoot from "../../../assets/offer-images/static-boot.png";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    title: "Nike Air Zoom Mercurial Vapor 16 X Air Max 95 Pro",
    price: "NPR 3000.00",
    img: staticBoot,
  },
  {
    id: 2,
    title: "Nike Air Zoom Mercurial Vapor 1 FG Regen CR7 Origins",
    price: "NPR 3500.00",
    img: staticBoot,
  },
  {
    id: 3,
    title: "Adidas F50 Elite Adizero 2010 FG Leather Remake",
    price: "NPR 5000.00",
    img: staticBoot,
  },
  {
    id: 4,
    title: "Adidas Predator Elite Fold-over Tongue FG Vivid Horizon",
    price: "NPR 4000.00",
    img: staticBoot,
  },
];

const BRANDS = ["Nike", "Addidas", "Puma", "Reebok"];
const SIZES = ["Small", "Medium", "Large", "Extra Large", "XX Large"];

function ShopComponent({ products = DUMMY_PRODUCTS }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Repeat products to fill pages
  const productList = Array(12)
    .fill(0)
    .map((_, i) => ({
      ...products[i % products.length],
      id: i + 1,
    }));

  const paginated = productList.slice((page - 1) * 8, page * 8);
  const totalPages = Math.ceil(productList.length / 8);

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
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-8">
        {/* Filter Sidebar */}
        <aside className="w-60 flex-shrink-0">
          <div className="mb-6">
            <div className="font-bold mb-2">Filter</div>
            <div>
              <label className="flex items-center mb-1">
                <input type="checkbox" className="mr-2" /> Jersey
              </label>
              <label className="flex items-center mb-1">
                <input type="checkbox" className="mr-2" /> Boots
              </label>
              <label className="flex items-center mb-1">
                <input type="checkbox" className="mr-2" /> Accessories
              </label>
            </div>
          </div>
          <div className="mb-6">
            <div className="font-bold mb-2">Price</div>
            <div className="flex gap-2 mb-2">
              <input type="number" placeholder="Min" className="border px-2 py-1 rounded w-16" />
              <input type="number" placeholder="Max" className="border px-2 py-1 rounded w-16" />
            </div>
            <button className="border px-3 py-1 rounded text-sm">Filter</button>
          </div>
          <div className="mb-6">
            <div className="font-bold mb-2">Brand</div>
            {BRANDS.map(b => (
              <label key={b} className="flex items-center mb-1">
                <input type="checkbox" className="mr-2" /> {b}
              </label>
            ))}
          </div>
          <div className="mb-6">
            <div className="font-bold mb-2">Size</div>
            {SIZES.map(s => (
              <label key={s} className="flex items-center mb-1">
                <input type="checkbox" className="mr-2" /> {s}
              </label>
            ))}
          </div>
        </aside>
        {/* Products Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {paginated.map(prod => (
              <div
                key={prod.id}
                className="border rounded-lg p-4 flex flex-col items-center relative group cursor-pointer"
                onClick={() => navigate(`/product/${prod.id}`)}
              >
                <img
                  src={prod.img}
                  alt={prod.title}
                  className="w-32 h-32 object-contain mb-3"
                />
                <span className="font-bold mb-1">{prod.price}</span>
                <span className="text-center text-sm mb-2">{prod.title}</span>
                <button
                  className="btn btn-ghost btn-sm absolute top-2 right-2 opacity-70 group-hover:opacity-100 transition"
                  onClick={e => e.stopPropagation()}
                >
                  ♥
                </button>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between mt-8">
            <button
              className="border border-black text-black bg-white px-8 py-2 rounded-[30px] font-semibold transition hover:bg-black hover:text-white"
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
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
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              style={{ minWidth: "120px" }}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ShopComponent;
