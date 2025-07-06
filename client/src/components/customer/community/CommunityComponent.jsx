import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCrown, FaMedal, FaFutbol } from "react-icons/fa";
import { TbSoccerField } from "react-icons/tb";
import { MdGroups } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";

const API_URL = "http://localhost:8080/api/community/standings"; // your backend

const trophyColors = ["#ffd700", "#c0c0c0", "#cd7f32"]; // Gold, Silver, Bronze

function rankIcon(position) {
  if (position === 1) return <FaCrown size={28} className="text-[#ffd700] drop-shadow" title="Champions!" />;
  if (position === 2 || position === 3)
    return (
      <FaMedal
        size={22}
        className={`drop-shadow`}
        style={{ color: trophyColors[position - 1] }}
        title={position === 2 ? "Runner-up" : "Third Place"}
      />
    );
  return <span className="font-extrabold text-lg text-[#00754A]">{position}</span>;
}

export default function CommunityComponent() {
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(data => {
        setTable((data?.standings?.[0]?.table) || []);
        setErr(null);
      })
      .catch(() => setErr("Could not fetch Premier League standings."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      className="min-h-[85vh] flex flex-col items-center justify-center px-2 sm:px-4 py-12 bg-gradient-to-br from-[#e8ffe5] via-[#e4f9ef] to-[#eaf4ff]"
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring" }}
    >
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
          Live English Premier League Table &mdash; powered by <b>football-data.org</b>
        </span>
      </motion.div>

      {/* Loading/Error */}
      {loading && (
        <div className="flex flex-col items-center py-16">
          <ImSpinner8 className="text-[#00754A] animate-spin mb-3 text-4xl" />
          <span className="font-bold text-xl text-[#00754A]">Loading Standings...</span>
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
                <th className="px-2 py-3 rounded-tl-3xl text-left font-bold text-base sm:text-lg">#</th>
                <th className="px-2 py-3 text-left font-bold text-base sm:text-lg">Club</th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">P</th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">W</th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">D</th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">L</th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">GF</th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">GA</th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">GD</th>
                <th className="px-2 py-3 text-center font-bold text-base sm:text-lg">Pts</th>
                <th className="px-2 py-3 rounded-tr-3xl text-center font-bold text-base sm:text-lg">Form</th>
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
                    className={`
                      ${idx % 2 === 0 ? "bg-[#f7fcf8]/60" : "bg-[#eef9f3]/60"}
                      hover:bg-[#e8ffe5]/80 transition
                    `}
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
                      <span className="hidden sm:inline">{club.team.name}</span>
                      <span className="inline sm:hidden">{club.team.shortName}</span>
                    </td>
                    <td className="px-2 py-3 text-center">{club.playedGames}</td>
                    <td className="px-2 py-3 text-center">{club.won}</td>
                    <td className="px-2 py-3 text-center">{club.draw}</td>
                    <td className="px-2 py-3 text-center">{club.lost}</td>
                    <td className="px-2 py-3 text-center">{club.goalsFor}</td>
                    <td className="px-2 py-3 text-center">{club.goalsAgainst}</td>
                    <td className="px-2 py-3 text-center">{club.goalDifference}</td>
                    <td className="px-2 py-3 text-center font-extrabold text-[#00754A]">{club.points}</td>
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

      {/* Footer or CTA */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.7 }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#00754A]/90 text-white rounded-full font-bold shadow">
          <FaFutbol className="text-yellow-300" /> Premier League <span className="text-white/80">x</span> FootMart Community
        </span>
        <p className="text-black/70 font-semibold mt-3">Enjoy the action, join the chat, and stay tuned for more features!</p>
      </motion.div>
    </motion.div>
  );
}
