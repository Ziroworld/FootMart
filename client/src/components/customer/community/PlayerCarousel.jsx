import React, { useState, useEffect } from "react";
import PlayerModel from "./PlayerModel";
import { ImSpinner8 } from "react-icons/im";

export default function PlayerCarousel({
  players,
  playerLoading,
  reviewInputs,
  setReviewInputs,
  handleSubmitReview,
}) {
  const [page, setPage] = useState(1);
  const PLAYERS_PER_PAGE = 6;

  useEffect(() => {
    setPage(1);
  }, [players.length]);

  const totalPages = Math.ceil(players.length / PLAYERS_PER_PAGE);
  const displayedPlayers = players.slice(
    (page - 1) * PLAYERS_PER_PAGE,
    page * PLAYERS_PER_PAGE
  );

  return (
    <>
      {playerLoading ? (
        <div className="py-10 flex flex-col items-center">
          <ImSpinner8 className="text-[#00754A] animate-spin mb-3 text-4xl" />
          <span className="font-bold text-xl text-[#00754A]">
            Loading Players...
          </span>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-5 w-full">
            {displayedPlayers.length === 0 ? (
              <div className="text-[#26323c] font-semibold">
                No players found.
              </div>
            ) : (
              displayedPlayers.map((player) => (
                <PlayerModel
                  key={player._id}
                  player={player}
                  review={reviewInputs[player._id]?.review || ""}
                  rating={reviewInputs[player._id]?.rating || 0}
                  isSubmitting={reviewInputs[player._id]?.isSubmitting}
                  onReviewChange={(val) =>
                    setReviewInputs((inputs) => ({
                      ...inputs,
                      [player._id]: { ...inputs[player._id], review: val },
                    }))
                  }
                  onRatingChange={(val) =>
                    setReviewInputs((inputs) => ({
                      ...inputs,
                      [player._id]: { ...inputs[player._id], rating: val },
                    }))
                  }
                  onSubmitReview={() => handleSubmitReview(player._id)}
                />
              ))
            )}
          </div>
          {players.length > PLAYERS_PER_PAGE && (
            <div className="flex justify-center items-center gap-6 mt-8">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-[#00754A] text-white font-bold disabled:bg-gray-300 disabled:text-gray-500 transition"
              >
                Previous
              </button>
              <span className="text-[#26323c] font-semibold">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-[#00754A] text-white font-bold disabled:bg-gray-300 disabled:text-gray-500 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
