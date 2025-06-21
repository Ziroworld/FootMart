import React from "react";

export default function ViewOrderModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-24 z-50">
      <div className="bg-base-100 w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-base-content/70 hover:text-base-content"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold mb-4">Your orders</h3>
        <p>Order history will appear here.</p>
      </div>
    </div>
  );
}
