import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaUpload, FaUserAlt } from "react-icons/fa";
import { useCommunity } from "../../../hooks/UseCommunity";
import { uploadImagesToCloudinary } from "../../../utils/cloudinaryUploader";

// Toast (same as User/Product for consistent UX)
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
          className="fixed z-[500] left-1/2 bottom-8 -translate-x-1/2 bg-green-50 border border-[#a1ffce] text-[#176c35] rounded-2xl px-8 py-5 flex items-center gap-4 shadow-xl font-bold text-lg backdrop-blur-md"
        >
          <FaUserAlt className="text-xl text-[#00754A]" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PlayerSection() {
  const { players, createPlayer, deletePlayer, loading } = useCommunity();

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [deleting, setDeleting] = useState(null);
  const [imgFiles, setImgFiles] = useState([]);
  const fileInputRef = useRef();

  const [form, setForm] = useState({
    fullName: "",
    nationality: "",
    position: "",
    image: "",
  });

  // Upload Image
  function handleImageChange(e) {
    let files = Array.from(e.target.files);
    setImgFiles(files);
  }
  function handleDrop(e) {
    e.preventDefault();
    let files = Array.from(e.dataTransfer.files);
    setImgFiles(files);
  }

  // --- Create Player Handler ---
  async function handleCreatePlayer(e) {
    e.preventDefault();
    if (!form.fullName || !form.nationality || !form.position || imgFiles.length === 0) {
      setToast({ show: true, message: "Fill all player details & upload an image!" });
      return;
    }
    try {
      // 1. Upload to Cloudinary ("Player-Images" folder)
      const cloudUrls = await uploadImagesToCloudinary(imgFiles, {
        category: "Player-Images",
        playerName: form.fullName.replace(/\s+/g, "_"),
      });
      // 2. Save to DB
      const payload = {
        ...form,
        image: cloudUrls[0], // Only first image is used for player
      };
      await createPlayer(payload);
      setToast({ show: true, message: "Player created!" });
      setShowForm(false);
      setImgFiles([]);
      setForm({ fullName: "", nationality: "", position: "", image: "" });
    } catch (err) {
      setToast({ show: true, message: "Failed to create player" });
    }
  }

  // --- Delete Handler ---
  async function handleDeletePlayer(playerId) {
    setDeleting(playerId);
    try {
      await deletePlayer(playerId);
      setToast({ show: true, message: "Player deleted!" });
    } catch {
      setToast({ show: true, message: "Failed to delete player" });
    }
    setDeleting(null);
  }

  // Card animation for grid
  const cardAnim = {
    hidden: { opacity: 0, scale: 0.94, y: 24 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: 0.05 * i, type: "spring", stiffness: 88 },
    }),
  };

  // Responsive grid
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="min-h-screen bg-gradient-to-br from-[#f6fff6] via-[#e9fbff] to-[#e6fff5] px-2 pt-10 pb-20"
    >
      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />

      <div className="flex flex-wrap items-center gap-7 mb-10">
        <h1 className="text-4xl font-extrabold text-[#00754A] drop-shadow tracking-tight">
          Player Management
        </h1>
        <span className="text-[#26323c]/70 font-semibold">
          Manage, add and delete all registered football players.
        </span>
        <button
          className="ml-auto flex gap-2 items-center text-lg px-5 py-3 font-bold rounded-2xl bg-[#e8ffe5] hover:bg-[#c9ffe3] shadow-lg border border-[#a1ffce]/80 text-[#00754A] hover:text-[#176c35] transition"
          onClick={() => setShowForm((v) => !v)}
        >
          <FaPlus /> Add Player
        </button>
      </div>

      {/* --- Player Form Modal --- */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.21 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#101f33]/40 backdrop-blur-sm"
          >
            <motion.form
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border-2 border-[#a1ffce] flex flex-col gap-5 relative"
              onSubmit={handleCreatePlayer}
            >
              <h2 className="text-2xl font-extrabold text-[#00754A] mb-1">Add New Player</h2>
              <input type="text" className="input" placeholder="Full Name" required value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
              <input type="text" className="input" placeholder="Nationality" required value={form.nationality} onChange={e => setForm(f => ({ ...f, nationality: e.target.value }))} />
              <input type="text" className="input" placeholder="Position (e.g. Forward, GK)" required value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} />

              {/* Image Upload */}
              <div
                className="relative group border-2 border-dashed border-[#a1ffce] rounded-xl py-4 px-5 flex flex-col items-center bg-[#e8ffe5]/40 cursor-pointer transition-all"
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple={false}
                  hidden
                  onChange={handleImageChange}
                />
                <FaUpload className="text-2xl text-[#00754A] mb-2" />
                <div className="text-[#176c35] font-bold mb-2">Drag & drop a player image or click to select</div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {imgFiles.map((img, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded-xl border-2 border-[#a1ffce] shadow-xl"
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-end mt-3">
                <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn bg-[#00754A] text-white font-extrabold hover:bg-[#176c35] transition">Create</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Player Card Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <AnimatePresence>
          {loading ? (
            <div className="col-span-full text-xl font-bold text-[#00754A] py-20 text-center">Loading players...</div>
          ) : players && players.length ? (
            players.map((player, i) => (
              <motion.div
                key={player._id}
                custom={i}
                variants={cardAnim}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.98 }}
                className="rounded-3xl p-5 bg-white/95 shadow-xl border-2 border-[#a1ffce]/30 hover:border-[#00754A]/40 transition group overflow-hidden flex flex-col items-center"
              >
                <img
                  src={player.image}
                  alt={player.fullName}
                  className="w-32 h-32 object-cover rounded-full border-4 border-[#a1ffce] shadow-lg mb-4"
                  loading="lazy"
                />
                <div className="mb-1 text-xl font-bold text-[#176c35] text-center">{player.fullName}</div>
                <div className="mb-1 text-[#00754A] font-semibold text-sm">{player.nationality}</div>
                <div className="mb-2 text-[#26323c]/80 text-xs">{player.position}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-[#e8ffe5] text-[#176c35] px-2 py-1 rounded-lg text-xs font-semibold border border-[#a1ffce]/60">Reviews: {player.reviews.length}</span>
                  <span className="bg-[#d4fc79] text-[#3e720a] px-2 py-1 rounded-lg text-xs font-semibold border border-[#b2ed98]/50">Avg. Rating: {player.averageRating?.toFixed(1) || "0"}</span>
                </div>
                <button
                  className="mt-auto w-full inline-flex gap-2 items-center justify-center px-3 py-2 rounded-xl font-bold bg-gradient-to-br from-[#ffbdbd] to-[#fff8f6] text-[#e4002b] border border-[#fae1e6] hover:bg-[#ffe9e6] shadow hover:scale-105 transition"
                  disabled={deleting === player._id}
                  onClick={() => handleDeletePlayer(player._id)}
                >
                  {deleting === player._id ? "Deleting..." : <><FaTrash /> Delete</>}
                </button>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-lg text-[#00754A]/60 py-14 text-center">No players registered yet.</div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
