import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSync, FaTrash, FaCheckCircle, FaShippingFast, FaBoxOpen } from "react-icons/fa";
import { useOrder } from "../../../context/orderContext";

// Theme status colors (soft, readable)
const statusColors = {
  Pending:    "bg-green-100 text-green-700 border-green-200",
  Processing: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Shipped:    "bg-blue-100 text-blue-700 border-blue-200",
  Delivered:  "bg-[#d7fff4] text-[#03795e] border-[#8cf2da]",
  Cancelled:  "bg-red-100 text-red-700 border-red-200"
};

const statusIcons = {
  Pending:    <FaBoxOpen />,
  Processing: <FaSync />,
  Shipped:    <FaShippingFast />,
  Delivered:  <FaCheckCircle />,
  Cancelled:  <FaTrash />
};

const ORDER_STATUS = [
  "Pending", "Processing", "Shipped", "Delivered", "Cancelled"
];

// Toast matches UserSection look
function Toast({ message, show, onClose, type = "info" }) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onClose, 2300);
    return () => clearTimeout(timer);
  }, [show, onClose]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.96 }}
          transition={{ duration: 0.33 }}
          className={`
            fixed z-50 left-1/2 bottom-8
            -translate-x-1/2
            bg-green-100 border border-green-200 text-green-900 rounded-2xl px-8 py-5
            flex items-center gap-4 shadow-2xl drop-shadow-xl
            backdrop-blur-xl
          `}
        >
          <FaCheckCircle className="text-green-600 text-2xl" />
          <span className="font-extrabold text-xl drop-shadow">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-xl font-bold text-green-900 hover:text-green-700 px-3"
            aria-label="Close notification"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function OrderSection() {
  const { orders, fetchAllOrders, updateOrderStatus } = useOrder();
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "info" });

  useEffect(() => {
    setLoading(true);
    fetchAllOrders()
      .catch(() => setToast({ show: true, message: "Failed to load orders!", type: "error" }))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  // Row animation (matches User table smoothness)
  const rowVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: i => ({
      opacity: 1, y: 0,
      transition: { delay: 0.03 * i, type: "spring", stiffness: 80 }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="relative"
    >
      {/* Toast */}
      <Toast {...toast} onClose={() => setToast({ ...toast, show: false })} />

      <h2 className="text-3xl font-extrabold bg-gradient-to-tr from-[#20bf6b] via-[#38ffe3] to-[#00754A] text-transparent bg-clip-text mb-2 flex items-center gap-2">
        🧾 Order Management
      </h2>
      <div className="text-[#26323c]/70 font-semibold mb-10">
        Monitor all orders placed on the platform.<span className="text-[#20bf6b]"> Update order status as the process advances.</span>
      </div>

      <div className="w-full overflow-x-auto bg-gradient-to-br from-[#f6fff6] to-[#e9fbff] rounded-2xl p-3 shadow-2xl border border-[#e3f5ed]">
        <motion.table
          className="w-full rounded-xl text-left bg-white shadow-xl border border-[#e3f5ed]"
          initial="hidden"
          animate="visible"
        >
          <thead>
            <tr className="bg-[#e8ffe5] text-[#00754A] text-lg">
              <th className="py-4 px-4 font-bold rounded-tl-xl">Customer</th>
              <th className="py-4 px-4 font-bold">Products</th>
              <th className="py-4 px-4 font-bold">Total</th>
              <th className="py-4 px-4 font-bold">Payment</th>
              <th className="py-4 px-4 font-bold">Address</th>
              <th className="py-4 px-4 font-bold">Status</th>
              <th className="py-4 px-4 font-bold rounded-tr-xl text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-[#00754A] text-xl animate-pulse">
                    Loading orders...
                  </td>
                </tr>
              ) : orders && orders.length ? (
                orders.map((order, i) => (
                  <motion.tr
                    key={order._id}
                    custom={i}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.97 }}
                    className={`border-b last:border-b-0 border-[#e3f5ed] hover:bg-[#f2fff9] transition-all group`}
                  >
                    <td className="py-3 px-4 font-bold text-[#1e2746]">
                      {order.addressId?.fullName || "Unknown"}
                    </td>
                    <td className="py-3 px-4 text-[#3d4d5d]">
                      <ul>
                        {order.cartItems.map((item, idx) => (
                          <li key={item.productId + "_" + idx}>
                            <span className="font-semibold text-[#20bf6b]">{item.productName}</span>
                            <span className="ml-2 text-[#7cdbae]/90">x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-4 font-bold text-lg text-[#00754A]">₨ {order.totalPrice}</td>
                    <td className="py-3 px-4 text-[#00754A]">{order.payment}</td>
                    <td className="py-3 px-4 text-[#00754A]">
                      {order.addressId ? (
                        <div>
                          <div className="font-semibold">{order.addressId.fullName} ({order.addressId.phoneNumber})</div>
                          <div>{order.addressId.streetAddress}, {order.addressId.landmark}</div>
                          <div>{order.addressId.city}, {order.addressId.state}, {order.addressId.country}</div>
                        </div>
                      ) : <span className="opacity-50">N/A</span>}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-xl border text-sm font-semibold flex items-center gap-2 ${statusColors[order.status]}`}>
                        {statusIcons[order.status]} {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <select
                        className="bg-white border border-[#20bf6b] text-[#20bf6b] px-3 py-2 rounded-xl outline-none font-bold"
                        value={order.status}
                        disabled={updatingId === order._id}
                        onChange={async (e) => {
                          setUpdatingId(order._id);
                          try {
                            const updated = await updateOrderStatus(order._id, e.target.value);
                            order.status = updated.status;
                            setToast({ show: true, message: "Order status updated!", type: "success" });
                          } catch (err) {
                            setToast({ show: true, message: "Update failed!", type: "error" });
                          }
                          setUpdatingId(null);
                        }}
                      >
                        {ORDER_STATUS.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-[#00754A]/60 text-xl">
                    No orders yet.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </motion.table>
      </div>
    </motion.div>
  );
}
