import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlus, FaTrash, FaUpload, FaImages } from "react-icons/fa";
import useProduct from "../../../hooks/UseProduct";
import { createProduct, deleteProduct } from "../../../server/ProductApi";
import { uploadImagesToCloudinary } from "../../../utils/cloudinaryUploader";
import ProductCarousel from "./ProductCarousel";

function Toast({ message, show, onClose }) {
  React.useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, 2100);
    return () => clearTimeout(timer);
  }, [show, onClose]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.33 }}
          className="
            fixed z-[500] left-1/2 bottom-8
            -translate-x-1/2
            bg-green-100 border border-green-300 text-green-900
            rounded-2xl px-8 py-5
            flex items-center gap-4 shadow-xl
            font-bold text-lg backdrop-blur-xl
          "
        >
          <FaImages className="text-2xl text-green-700" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function parseSizes(sizeStr) {
  return sizeStr
    .split(",")
    .map((val) => val.trim())
    .filter(Boolean)
    .map((val) => (/^[0-9]+$/.test(val) ? Number(val) : val.toUpperCase()));
}

export default function ProductSection() {
  const { products, setProducts } = useProduct();
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    size: "",
    quantity: "",
    brand: "",
    category: "boots",
    images: [],
    specs: {
      material: "",
      weight: "",
      studType: "",
      fit: "",
      playerVersion: false,
      palmMaterial: "",
      closure: "",
      fingerProtection: ""
    }
  });
  const [imgFiles, setImgFiles] = useState([]);
  const fileInputRef = useRef();

  function handleImageChange(e) {
    let files = Array.from(e.target.files);
    setImgFiles(files);
    setForm((prev) => ({ ...prev, images: files }));
  }
  function handleDrop(e) {
    e.preventDefault();
    let files = Array.from(e.dataTransfer.files);
    setImgFiles(files);
    setForm((prev) => ({ ...prev, images: files }));
  }

  async function handleCreateProduct(e) {
    e.preventDefault();
    if (
      !form.name ||
      !form.price ||
      !form.description ||
      !form.size ||
      !form.quantity ||
      !form.brand ||
      !imgFiles.length
    ) {
      setToast({ show: true, message: "Please fill all required fields and upload images!" });
      return;
    }
    try {
      const productId = String(products.length + 1).padStart(3, "0");
      const cloudUrls = await uploadImagesToCloudinary(imgFiles, {
        category: form.category,
        productId
      });
      const payload = {
        ...form,
        images: cloudUrls,
        price: Number(form.price),
        quantity: Number(form.quantity),
        size: parseSizes(form.size),
        specs: {
          material: form.specs.material,
          weight: form.specs.weight,
          studType: form.specs.studType,
          fit: form.specs.fit,
          playerVersion: !!form.specs.playerVersion,
          palmMaterial: form.specs.palmMaterial,
          closure: form.specs.closure,
          fingerProtection: form.specs.fingerProtection
        }
      };
      await createProduct(payload);
      setToast({ show: true, message: "Product created! 🚀" });
      setShowForm(false);
      setImgFiles([]);
      setForm({
        name: "",
        price: "",
        description: "",
        size: "",
        quantity: "",
        brand: "",
        category: "boots",
        images: [],
        specs: {
          material: "",
          weight: "",
          studType: "",
          fit: "",
          playerVersion: false,
          palmMaterial: "",
          closure: "",
          fingerProtection: ""
        }
      });
      setTimeout(() => window.location.reload(), 1100);
    } catch (err) {
      setToast({ show: true, message: "Error creating product!" });
    }
  }

  async function handleDeleteProduct(productId) {
    setDeleting(productId);
    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      setToast({ show: true, message: "Product deleted!" });
    } catch {
      setToast({ show: true, message: "Error deleting product" });
    }
    setDeleting(null);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="min-h-screen bg-gradient-to-br from-[#f6fff6] via-[#e6faf1] to-[#e9fbff] px-2 pt-10 pb-24"
    >
      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#00754A] drop-shadow tracking-tight">
          Product Management
        </h1>
        <button
          className="flex gap-2 items-center text-lg px-5 py-3 font-bold rounded-2xl bg-[#e8ffe5] hover:bg-[#c6f7d7] shadow border border-[#c8eec6] text-[#0c6836] transition focus:ring-2 focus:ring-[#a1ffce]"
          onClick={() => setShowForm((v) => !v)}
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* --- Product Form Modal --- */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#101f33]/40 backdrop-blur-[2.5px]"
          >
            <motion.form
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 border-2 border-[#e3f5ed] flex flex-col gap-6 relative"
              onSubmit={handleCreateProduct}
            >
              <h2 className="text-2xl font-extrabold text-[#00754A] mb-1">
                Add New Product
              </h2>
              <div className="text-[#26323c]/70 font-semibold mb-2 text-base">
                Fill all required fields. Separate sizes with commas (e.g. 39, 40, 41 or S, M, L).
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" className="input" placeholder="Name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                <input type="number" className="input" placeholder="Price" required value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                <input type="text" className="input" placeholder="Brand" required value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} />
                <select className="input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  <option value="boots">Boots</option>
                  <option value="jersey">Jersey</option>
                  <option value="accessories">Accessories</option>
                </select>
                <input
                  type="text"
                  className="input"
                  placeholder="Sizes (comma separated, e.g. 38,39,40 or M,L,XL)"
                  required
                  value={form.size}
                  onChange={e => setForm(f => ({ ...f, size: e.target.value }))}
                />
                <input type="number" className="input" placeholder="Quantity" required value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} />
              </div>
              <textarea className="input" placeholder="Description" required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />

              {/* --- All 8 specs --- */}
              <div className="grid grid-cols-2 gap-2">
                <input type="text" className="input" placeholder="Material" value={form.specs.material || ""} onChange={e => setForm(f => ({ ...f, specs: { ...f.specs, material: e.target.value } }))} />
                <input type="text" className="input" placeholder="Weight" value={form.specs.weight || ""} onChange={e => setForm(f => ({ ...f, specs: { ...f.specs, weight: e.target.value } }))} />
                <input type="text" className="input" placeholder="Stud Type" value={form.specs.studType || ""} onChange={e => setForm(f => ({ ...f, specs: { ...f.specs, studType: e.target.value } }))} />
                <input type="text" className="input" placeholder="Fit" value={form.specs.fit || ""} onChange={e => setForm(f => ({ ...f, specs: { ...f.specs, fit: e.target.value } }))} />
                <label className="flex items-center gap-2 mt-2 font-semibold text-[#0c6836]">
                  <input type="checkbox"
                    checked={form.specs.playerVersion || false}
                    onChange={e => setForm(f => ({ ...f, specs: { ...f.specs, playerVersion: e.target.checked } }))}
                  /> Player Version
                </label>
                <input type="text" className="input" placeholder="Palm Material" value={form.specs.palmMaterial || ""} onChange={e => setForm(f => ({ ...f, specs: { ...f.specs, palmMaterial: e.target.value } }))} />
                <input type="text" className="input" placeholder="Closure" value={form.specs.closure || ""} onChange={e => setForm(f => ({ ...f, specs: { ...f.specs, closure: e.target.value } }))} />
                <input type="text" className="input" placeholder="Finger Protection" value={form.specs.fingerProtection || ""} onChange={e => setForm(f => ({ ...f, specs: { ...f.specs, fingerProtection: e.target.value } }))} />
              </div>

              {/* --- Image Upload --- */}
              <div
                className="relative group border-2 border-dashed border-green-300 rounded-xl py-4 px-5 flex flex-col items-center bg-green-50/60 cursor-pointer transition-all"
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImageChange}
                />
                <FaUpload className="text-2xl text-green-600 mb-2" />
                <div className="text-green-800 font-bold mb-2">Drag & drop images or click to select</div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {imgFiles.map((img, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-xl border-2 border-green-200 shadow-xl"
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-end mt-4">
                <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn bg-[#a1ffce] text-[#015e30] font-extrabold hover:bg-[#7af3ac] transition">Create</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PRODUCT LIST --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
        <AnimatePresence>
          {products.map((prod, i) => (
            <motion.div
              key={prod._id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="rounded-3xl p-5 bg-white/90 shadow-xl border border-[#e3f5ed] hover:border-[#a1ffce] transition group overflow-hidden"
            >
              <ProductCarousel images={prod.images || []} />
              <div className="mb-2 text-xl font-bold text-[#00754A]">{prod.name}</div>
              <div className="mb-2 text-lg text-[#26323c]/90 font-bold">₨ {prod.price}</div>
              <div className="mb-3 text-[#16e087] text-xs uppercase tracking-wide font-extrabold">{prod.category}</div>
              <div className="mb-2 text-[#7b8c9b] line-clamp-3">{prod.description}</div>
              <div className="flex flex-wrap gap-2 text-xs mb-3">
                <span className="bg-green-100 border border-green-200 px-2 py-1 rounded-lg">Brand: {prod.brand}</span>
                <span className="bg-[#e3f5ed] border border-[#a1ffce]/40 px-2 py-1 rounded-lg">Size: {Array.isArray(prod.size) ? prod.size.join(", ") : prod.size}</span>
                <span className="bg-green-50 border border-green-200 px-2 py-1 rounded-lg">Stock: {prod.quantity}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {prod.specs && Object.entries(prod.specs).map(([k, v]) => v && (
                  <span key={k} className="bg-green-50 border border-green-100 px-2 py-1 rounded-lg text-[12px] text-[#01935f]">{k}: {v === true ? "Yes" : v}</span>
                ))}
              </div>
              <div className="flex gap-3 justify-end mt-4">
                <button
                  className="btn bg-[#ffbdbd] text-[#e4002b] font-extrabold hover:bg-[#ffe9e6] transition"
                  disabled={deleting === prod._id}
                  onClick={() => handleDeleteProduct(prod._id)}
                >
                  {deleting === prod._id ? "Deleting..." : <><FaTrash /> Delete</>}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
