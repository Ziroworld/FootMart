import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCrown, FaMedal, FaFutbol, FaStar } from "react-icons/fa";
import { TbSoccerField } from "react-icons/tb";
import { MdGroups } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";
import { Link } from "react-router-dom";
import { useCommunity } from "../../../hooks/UseCommunity.jsx";
import PlayerCarousel from "../../../components/customer/community/PlayerCarousel";

const API_URL = "http://localhost:8080/api/community/standings";
const trophyColors = ["#ffd700", "#c0c0c0", "#cd7f32"];

function rankIcon(position) {
  if (position === 1)
    return (
      <FaCrown
        size={28}
        className="text-[#ffd700] drop-shadow"
        title="Champions!"
      />
    );
  if (position === 2 || position === 3)
    return (
      <FaMedal
        size={22}
        className={`drop-shadow`}
        style={{ color: trophyColors[position - 1] }}
        title={position === 2 ? "Runner-up" : "Third Place"}
      />
    );
  return (
    <span className="font-extrabold text-lg text-[#00754A]">{position}</span>
  );
}

// Toast with animated check
function Toast({ message, type = "success", onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.97 }}
          transition={{ duration: 0.4, type: "spring" }}
          className={`fixed z-[999] left-1/2 bottom-8 -translate-x-1/2 bg-white border-2 rounded-3xl px-7 py-4 flex items-center gap-3 shadow-2xl`}
          style={{
            borderColor: type === "success" ? "#16e087" : "#ef4444",
            color: type === "success" ? "#1e7e5c" : "#dc2626",
            backdropFilter: "blur(10px)",
          }}
        >
          <span className="text-2xl">
            {type === "success" ? "✅" : "⚠️"}
          </span>
          <span className="font-bold text-lg">{message}</span>
          <button
            onClick={onClose}
            className="ml-3 text-xl font-black hover:scale-125 transition"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function CommunityComponent() {
  // Standings table state
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Community player context
  const { players, addReview, loading: playerLoading } = useCommunity();

  // UI state for review form per player
  const [search, setSearch] = useState("");
  const [reviewInputs, setReviewInputs] = useState({});
  const [toast, setToast] = useState(null);

  // Filtered by search
  const filteredPlayers = players.filter(
    (p) =>
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.position.toLowerCase().includes(search.toLowerCase())
  );

  // Standings table fetch
  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setTable((data?.standings?.[0]?.table) || []);
        setErr(null);
      })
      .catch(() => setErr("Could not fetch Premier League standings."))
      .finally(() => setLoading(false));
  }, []);

  // Handle review submit
  const handleSubmitReview = async (playerId) => {
    const { review, rating } = reviewInputs[playerId] || {};
    if (!review || !rating) return;
    setReviewInputs((inputs) => ({
      ...inputs,
      [playerId]: { ...inputs[playerId], isSubmitting: true },
    }));
    try {
      await addReview(playerId, { text: review, rating });
      setReviewInputs((inputs) => ({
        ...inputs,
        [playerId]: { review: "", rating: 0, isSubmitting: false },
      }));
      setToast("Thank you for your review!");
      setTimeout(() => setToast(null), 2300);
    } catch {
      setReviewInputs((inputs) => ({
        ...inputs,
        [playerId]: { ...inputs[playerId], isSubmitting: false },
      }));
    }
  };

  // Popular Players Table (only players with rating)
  const popularPlayers = players
    .filter((p) => p.reviews && p.reviews.length > 0 && p.averageRating > 0)
    .sort((a, b) => b.averageRating - a.averageRating);

  return (
    <motion.div
      className="min-h-[85vh] flex flex-col items-center justify-center px-2 sm:px-4 py-12 bg-gradient-to-br from-[#e8ffe5] via-[#e4f9ef] to-[#eaf4ff]"
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring" }}
    >
      {/* Toast */}
      <Toast message={toast} onClose={() => setToast(null)} />

      {/* Breadcrumb */}
      <nav className="w-full max-w-6xl mb-7 text-[#00754A]">
        <ol className="flex items-center gap-2 text-md sm:text-lg font-semibold">
          <li>
            <Link
              to="/home"
              className="hover:underline hover:text-[#431c5d] transition"
            >
              Home
            </Link>
          </li>
          <li>
            <span className="mx-1 text-gray-400">/</span>
          </li>
          <li className="text-[#431c5d]">Community</li>
        </ol>
      </nav>

      {/* Header */}
      <motion.div
        className="flex flex-col items-center gap-2 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.7 }}
      >
        <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-[#431c5d]/90 shadow font-bold text-white text-sm sm:text-base backdrop-blur">
          <TbSoccerField className="text-[#a370ff] text-xl" />
          Premier League 2024/25
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#00754A] mb-1 tracking-tight flex items-center gap-2">
          <MdGroups className="text-[#431c5d] mb-1" size={40} />
          <span>Community Standings</span>
        </h1>
        <span className="text-base sm:text-lg font-semibold text-[#431c5d]">
          Live English Premier League Table &mdash; powered by{" "}
          <b>football-data.org</b>
        </span>
      </motion.div>

      {/* Loading/Error */}
      {loading && (
        <div className="flex flex-col items-center py-16">
          <ImSpinner8 className="text-[#00754A] animate-spin mb-3 text-4xl" />
          <span className="font-bold text-xl text-[#00754A]">
            Loading Standings...
          </span>
        </div>
      )}
      {err && (
        <div className="bg-red-50 border-l-4 border-red-400 px-7 py-6 rounded-2xl shadow text-red-800 font-semibold">
          {err}
        </div>
      )}

      {/* Standings Table */}
      {!loading && !err && (
        <motion.div
          className="w-full max-w-5xl bg-white/80 rounded-3xl shadow-2xl border border-[#e3f5ed] backdrop-blur-[6px] p-0 overflow-x-auto"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.7, type: "spring" }}
        >
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#00754A]/90 text-white sticky top-0 z-10">
                <th className="px-2 py-3 rounded-tl-3xl text-left font-bold text-base sm:text-lg">
                  #
                </th>
                <th className="px-2 py-3 text-left font-bold text-base sm:text-lg">
                  Club
                </th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">
                  P
                </th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">
                  W
                </th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">
                  D
                </th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">
                  L
                </th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">
                  GF
                </th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">
                  GA
                </th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">
                  GD
                </th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">
                  Pts
                </th>
                <th className="px-2 py-3 rounded-tr-3xl text-center font-bold text-base sm:text-lg">
                  Form
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {table.map((club, idx) => (
                  <motion.tr
                    key={club.team.id}
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                    className={`${
                      idx % 2 === 0
                        ? "bg-[#f7fcf8]/60"
                        : "bg-[#eef9f3]/60"
                    } hover:bg-[#e8ffe5]/80 transition`}
                  >
                    {/* Rank Icon/Number */}
                    <td className="px-2 py-3 font-bold text-lg text-center">
                      {rankIcon(club.position)}
                    </td>
                    {/* Club Logo & Name */}
                    <td className="px-2 py-3 flex items-center gap-3 font-semibold text-[#26323c]">
                      <img
                        src={club.team.crest}
                        alt={club.team.shortName}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-lg border-2 border-[#e3f5ed] bg-white object-contain"
                        loading="lazy"
                        style={{ background: "#fff" }}
                      />
                      <span className="hidden sm:inline">
                        {club.team.name}
                      </span>
                      <span className="inline sm:hidden">
                        {club.team.shortName}
                      </span>
                    </td>
                    <td className="px-2 py-3 text-center">
                      {club.playedGames}
                    </td>
                    <td className="px-2 py-3 text-center">{club.won}</td>
                    <td className="px-2 py-3 text-center">{club.draw}</td>
                    <td className="px-2 py-3 text-center">{club.lost}</td>
                    <td className="px-2 py-3 text-center">{club.goalsFor}</td>
                    <td className="px-2 py-3 text-center">
                      {club.goalsAgainst}
                    </td>
                    <td className="px-2 py-3 text-center">
                      {club.goalDifference}
                    </td>
                    <td className="px-2 py-3 text-center font-extrabold text-[#00754A]">
                      {club.points}
                    </td>
                    {/* Form */}
                    <td className="px-2 py-3 text-center font-mono">
                      {club.form
                        ? club.form.split(",").map((f, i) => (
                            <span
                              key={i}
                              className={`inline-block w-6 h-6 rounded-full mx-0.5 text-[13px] font-extrabold leading-6
                                ${
                                  f === "W"
                                    ? "bg-[#bbffd4] text-[#00754A]"
                                    : f === "D"
                                    ? "bg-[#fff2b8] text-[#d6a800]"
                                    : "bg-[#ffd0d4] text-[#e4002b]"
                                }
                                shadow
                              `}
                            >
                              {f}
                            </span>
                          ))
                        : "--"}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      )}

      {/* -- Local Community Player Section -- */}
      <motion.div
        className="w-full max-w-6xl mt-14 flex flex-col items-center"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.7 }}
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#26323c] mb-1 flex items-center gap-2">
          <FaFutbol className="text-[#00754A]" /> Local Community Player
        </h2>
        <div className="text-[#431c5d] text-lg font-semibold mb-5">
          Discover Top Talent: Check Out Player Ratings and Reviews!
        </div>
        {/* Search bar */}
        <div className="w-full max-w-lg mb-7">
          <input
            type="text"
            placeholder="Search your favorite player"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-[#e3f5ed] rounded-xl px-4 py-2 text-lg focus:outline-[#00754A] shadow-sm"
          />
        </div>
        {/* Carousel */}
        <PlayerCarousel
          players={filteredPlayers}
          playerLoading={playerLoading}
          reviewInputs={reviewInputs}
          setReviewInputs={setReviewInputs}
          handleSubmitReview={handleSubmitReview}
        />
      </motion.div>

      {/* Most Popular Player Table */}
      {popularPlayers.length > 0 && (
        <motion.div
          className="w-full max-w-5xl mt-20 mb-8 bg-white rounded-3xl shadow-2xl border border-[#e3f5ed] p-8"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-[#00754A] mb-2 flex items-center gap-2">
            <FaStar className="text-yellow-400" /> Most Popular Players
          </h3>
          <p className="mb-4 text-gray-600">
            Players are ranked based on their average rating (only players with at least one rating are shown).
          </p>
          <table className="min-w-full text-lg">
            <thead>
              <tr className="bg-[#e3f5ed] text-[#26323c]">
                <th className="px-3 py-4 text-left font-bold text-xl">Rank</th>
                <th className="px-3 py-4 text-left font-bold text-xl">Player</th>
                <th className="px-3 py-4 text-center font-bold text-xl">Position</th>
                <th className="px-3 py-4 text-center font-bold text-xl">Rating</th>
                <th className="px-3 py-4 text-center font-bold text-xl">#Reviews</th>
              </tr>
            </thead>
            <tbody>
              {popularPlayers.map((p, idx) => (
                <tr key={p._id} className={idx % 2 === 0 ? "bg-[#f7fcf8]/90" : ""}>
                  <td className="px-3 py-3 font-extrabold text-xl text-center">{idx + 1}</td>
                  <td className="px-3 py-3 flex items-center gap-3 text-lg">
                    <img src={p.image} alt={p.fullName} className="w-10 h-10 rounded-full object-cover border border-[#e3f5ed]" />
                    {p.fullName}
                  </td>
                  <td className="px-3 py-3 text-center text-lg">{p.position}</td>
                  <td className="px-3 py-3 text-center text-yellow-600 font-bold text-lg">
                    <FaStar className="inline text-yellow-400 mb-1" /> {p.averageRating?.toFixed(2)}
                  </td>
                  <td className="px-3 py-3 text-center text-lg">{p.reviews.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Footer or CTA */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.7 }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#00754A]/90 text-white rounded-full font-bold shadow">
          <FaFutbol className="text-yellow-300" /> Premier League{" "}
          <span className="text-white/80">x</span> FootMart Community
        </span>
        <p className="text-black/70 font-semibold mt-3">
          Enjoy the action, join the chat, and stay tuned for more features!
        </p>
      </motion.div>
    </motion.div>
  );
}
