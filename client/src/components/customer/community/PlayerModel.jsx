import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

export default function PlayerModel({
  player,
  onReviewChange,
  onRatingChange,
  review,
  rating,
  onSubmitReview,
  isSubmitting
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl border border-[#e3f5ed] p-5 flex flex-col items-center w-full max-w-xs m-2"
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(20,100,60,0.17)" }}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
    >
      <img
        src={player.image}
        alt={player.fullName}
        className="rounded-xl shadow-lg border-2 border-[#e3f5ed] mb-3 w-32 h-36 object-cover"
        loading="lazy"
      />
      <div className="font-bold text-lg text-[#26323c] text-center">{player.fullName}</div>
      <div className="text-sm text-[#00754A] font-medium mb-2">{player.position} &bull; {player.nationality}</div>
      <div className="w-full mb-2">
        <textarea
          rows={2}
          value={review}
          placeholder="Write a review for this player"
          onChange={e => onReviewChange(e.target.value)}
          className="w-full border border-[#e3f5ed] rounded-lg px-3 py-2 mb-1 focus:outline-[#00754A] resize-none"
          disabled={isSubmitting}
        />
      </div>
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map(i => (
          <button
            key={i}
            type="button"
            onClick={() => onRatingChange(i)}
            disabled={isSubmitting}
            className="focus:outline-none"
          >
            <FaStar
              size={24}
              className={`transition-all ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
            />
          </button>
        ))}
      </div>
      <button
        className="w-full mt-2 px-4 py-1.5 rounded-lg bg-[#00754A] text-white font-bold hover:bg-[#008f5a] shadow transition-all"
        onClick={onSubmitReview}
        disabled={isSubmitting || !review || !rating}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
      {player.averageRating > 0 && (
        <div className="mt-2 flex items-center gap-1 text-yellow-500 font-semibold">
          <FaStar className="text-yellow-400" /> {player.averageRating.toFixed(1)}
          <span className="text-sm text-gray-500">({player.reviews.length} reviews)</span>
        </div>
      )}
    </motion.div>
  );
}
