import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlus, FaTrash, FaUpload, FaImages } from "react-icons/fa";
import useProduct from "../../../hooks/UseProduct";
import { createProduct, deleteProduct } from "../../../server/ProductApi";
import { uploadImagesToCloudinary } from "../../../utils/cloudinaryUploader";
import ProductCarousel from "./ProductCarousel";

function NeonGlow({ children }) {
  return (
    <div className="relative group">
      <div className="absolute -inset-2 blur-[8px] opacity-70 group-hover:opacity-100 transition pointer-events-none z-0 bg-gradient-to-tr from-[#21d4fd] via-[#b721ff] to-[#ff21b3] rounded-3xl" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

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
            bg-[#1b1836] border border-[#38ffe3]/70 text-[#38ffe3]
            rounded-2xl px-8 py-5
            flex items-center gap-4 shadow-xl
            font-bold text-lg backdrop-blur-md
          "
        >
          <FaImages className="text-2xl text-[#38ffe3]" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ProductSection() {
  const { products, setProducts, loading, error } = useProduct();
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

  // --- Size String => Array Conversion Logic ---
  function parseSizes(sizeStr) {
    return sizeStr
      .split(",")
      .map((val) => val.trim())
      .filter(Boolean)
      .map((val) =>
        /^[0-9]+$/.test(val)
          ? Number(val)
          : val.toUpperCase()
      );
  }

  // --- Create Product ---
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
      // Cloudinary image upload (with category/product structure)
      const productId = String(products.length + 1).padStart(3, "0");
      const cloudUrls = await uploadImagesToCloudinary(imgFiles, {
        category: form.category,
        productId
      });
      // --- Prepare Payload ---
      const payload = {
        ...form,
        images: cloudUrls,
        price: Number(form.price),
        quantity: Number(form.quantity),
        size: parseSizes(form.size), // 💡 Here
        specs: {
          material: form.specs.material,
          weight: form.specs.weight,
          studType: form.specs.studType,
          fit: form.specs.fit,
          playerVersion: Boolean(form.specs.playerVersion), // Cast to boolean
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

  const cardAnim = {
    hidden: { opacity: 0, scale: 0.92, y: 18 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: 0.05 * i, type: "spring", stiffness: 90 }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 38 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, type: "spring" }}
      className="min-h-screen bg-gradient-to-br from-[#090613] via-[#12062b] to-[#051521] px-2 pt-10 pb-24"
    >
      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
      <div className="flex items-center gap-7 mb-12">
        <h1 className="text-4xl font-extrabold bg-gradient-to-tr from-[#21d4fd] via-[#b721ff] to-[#ff21b3] text-transparent bg-clip-text drop-shadow-lg tracking-tight">
          Product Management
        </h1>
        <NeonGlow>
          <button
            className="flex gap-2 items-center text-xl px-5 py-3 font-bold rounded-2xl bg-[#0b011c] hover:bg-[#211c30]/80 shadow-lg border border-[#21d4fd]/40 text-[#38ffe3] hover:text-[#fff] transition focus:ring-2 focus:ring-[#38ffe3]"
            onClick={() => setShowForm((v) => !v)}
          >
            <FaPlus /> Add Product
          </button>
        </NeonGlow>
      </div>

      {/* --- Product Form Modal --- */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.21 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#090613cc] backdrop-blur-sm"
          >
            <motion.form
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              className="bg-[#19122f]/95 rounded-3xl shadow-2xl max-w-2xl w-full p-8 border-2 border-[#21d4fd] flex flex-col gap-6 relative"
              onSubmit={handleCreateProduct}
            >
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-[#21d4fd] to-[#ff21b3] text-transparent bg-clip-text mb-4">
                Add New Product
              </h2>
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
                <label className="flex items-center gap-2 mt-2 font-semibold text-[#21d4fd]">
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
                className="relative group border-2 border-dashed border-[#38ffe3] rounded-xl py-4 px-5 flex flex-col items-center bg-[#0e1622]/40 cursor-pointer transition-all"
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
                <FaUpload className="text-2xl text-[#38ffe3] mb-2" />
                <div className="text-[#38ffe3] font-bold mb-2">Drag & drop images or click to select</div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {imgFiles.map((img, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-xl border-2 border-[#21d4fd] shadow-xl"
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-end mt-4">
                <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn bg-[#21d4fd] text-[#19122f] font-extrabold hover:bg-[#b721ff] transition">Create</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PRODUCT LIST --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        <AnimatePresence>
          {products.map((prod, i) => (
            <motion.div
              key={prod._id}
              custom={i}
              variants={cardAnim}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <NeonGlow>
                <div className="relative rounded-3xl p-6 bg-[#120a1a]/95 shadow-2xl border-2 border-[#38ffe3]/10 hover:border-[#38ffe3]/40 transition group overflow-hidden">
                  <ProductCarousel images={prod.images || []} />
                  <div className="mb-2 text-xl font-bold text-[#38ffe3]">{prod.name}</div>
                  <div className="mb-2 text-lg text-[#fff]/80 font-bold">₨ {prod.price}</div>
                  <div className="mb-3 text-[#ff21b3] text-xs uppercase tracking-wide font-extrabold">{prod.category}</div>
                  <div className="mb-2 text-[#bbb]/80 line-clamp-3">{prod.description}</div>
                  <div className="flex flex-wrap gap-2 text-xs mb-3">
                    <span className="bg-[#0cfff9]/10 border border-[#21d4fd]/40 px-2 py-1 rounded-lg">Brand: {prod.brand}</span>
                    <span className="bg-[#d8b4fe]/10 border border-[#b721ff]/30 px-2 py-1 rounded-lg">Size: {Array.isArray(prod.size) ? prod.size.join(", ") : prod.size}</span>
                    <span className="bg-[#38ffe3]/10 border border-[#38ffe3]/30 px-2 py-1 rounded-lg">Stock: {prod.quantity}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {prod.specs && Object.entries(prod.specs).map(([k, v]) => v && (
                      <span key={k} className="bg-[#1b1836]/80 border border-[#38ffe3]/20 px-2 py-1 rounded-lg text-[12px] text-[#38ffe3]">{k}: {v === true ? "Yes" : v}</span>
                    ))}
                  </div>
                  <div className="flex gap-3 justify-end mt-4">
                    <button
                      className="btn bg-[#ff21b3] text-white font-extrabold hover:bg-[#b721ff] transition"
                      disabled={deleting === prod._id}
                      onClick={() => handleDeleteProduct(prod._id)}
                    >
                      {deleting === prod._id ? "Deleting..." : <><FaTrash /> Delete</>}
                    </button>
                  </div>
                </div>
              </NeonGlow>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
