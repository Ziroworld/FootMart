// client/src/components/customer/home/ViewOrderModal.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiEdit, FiTrash2 } from "react-icons/fi";
import { useOrder } from "../../../../context/orderContext.jsx";

// Light green toast with #00754A theme
function Toast({ message, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="
          fixed z-50
          left-1/2 bottom-6
          -translate-x-1/2
          bg-[#00754A]/10 border border-[#00754A] text-[#00754A]
          rounded-2xl px-6 py-3
          flex items-center gap-3 shadow-lg
        "
      >
        <svg width="22" height="22" viewBox="0 0 24 24" className="text-[#00754A]">
          <circle cx="12" cy="12" r="10" fill="#E6F4EE" />
          <path
            d="M8.5 12.7l2.3 2.3 4.3-4.3"
            stroke="#00754A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <span className="font-semibold text-[16px]">{message}</span>
        <button onClick={onClose} className="ml-2 text-lg font-bold hover:text-opacity-80">
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ViewOrderModal({ open, onClose, address = "No address set" }) {
  const { orders, fetchUserOrders } = useOrder();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Fetch once on first open; afterwards use cached orders
  useEffect(() => {
    if (!open) return;
    if (orders.length === 0) {
      setLoading(true);
      fetchUserOrders()
        .catch(() => {
          setToast("Failed to load orders");
          setTimeout(() => setToast(null), 2500);
        })
        .finally(() => setLoading(false));
    }
  }, [open, orders.length, fetchUserOrders]);

  const handleCancel = (order) => {
    setToast("Order cancelled successfully");
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-4xl p-8 rounded-3xl shadow-2xl relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <FiX size={24} />
            </button>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Orders</h2>

            {/* Address section */}
            <div className="mb-6 flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div>
                <span className="text-sm text-gray-500 uppercase">Delivery Address</span>
                <p className="text-lg text-gray-800">{address}</p>
              </div>
              <button className="flex items-center gap-1 text-[#00754A] hover:text-opacity-80">
                <FiEdit /> Edit
              </button>
            </div>

            {/* Loading state */}
            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading orders...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 pb-2 text-sm font-semibold text-gray-600">Order ID</th>
                      <th className="px-4 pb-2 text-sm font-semibold text-gray-600">Date</th>
                      <th className="px-4 pb-2 text-sm font-semibold text-gray-600">Status</th>
                      <th className="px-4 pb-2 text-sm font-semibold text-gray-600">Items</th>
                      <th className="px-4 pb-2 text-sm font-semibold text-gray-600">Total</th>
                      <th className="px-4 pb-2 text-sm font-semibold text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map((order) => {
                      const created = new Date(order.createdAt);
                      const totalValue =
                        order.total != null
                          ? order.total
                          : (order.cartItems || []).reduce(
                              (sum, item) =>
                                sum + (item.productId?.price ?? 0) * (item.quantity ?? 1),
                              0
                            );
                      const itemsList = (order.cartItems || [])
                        .map(ci => `${ci.productId?.name || "Unknown"} x${ci.quantity || 1}`)
                        .join(", ");
                      const ageMs = Date.now() - created.getTime();
                      const canCancel = ageMs < 3600_000;

                      return (
                        <tr key={order._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-800">{order._id}</td>
                          <td className="px-4 py-3 text-gray-800">{created.toLocaleString()}</td>
                          <td className="px-4 py-3 text-gray-800">{order.status}</td>
                          <td className="px-4 py-3 text-gray-800">{itemsList}</td>
                          <td className="px-4 py-3 text-gray-800">${totalValue.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleCancel(order)}
                              disabled={!canCancel}
                              className={`
                                flex items-center gap-1 px-3 py-1
                                text-sm font-medium rounded-full transition
                                ${canCancel
                                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                }
                              `}
                            >
                              <FiTrash2 />
                              {canCancel ? "Cancel" : "Expired"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Footer CTA */}
            <div className="mt-8 text-center">
              <button
                onClick={onClose}
                className="
                  px-6 py-3 bg-[#00754A] text-white rounded-full
                  font-semibold hover:bg-opacity-90 transition
                "
              >
                Close
              </button>
            </div>
          </motion.div>

          {/* Toast */}
          {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
