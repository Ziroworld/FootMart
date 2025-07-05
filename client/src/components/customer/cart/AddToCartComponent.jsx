import React, { useState, useContext } from "react";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../../../hooks/usecarts";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

// Toast with animated football emote
function Toast({ message, onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 60 }}
          transition={{ duration: 0.36, ease: "easeOut" }}
          className="fixed z-[999] left-1/2 bottom-10 -translate-x-1/2 sm:right-8 sm:left-auto sm:translate-x-0
            bg-[#e6f8f1] border-2 border-[#00754A] text-[#00754A] rounded-3xl px-8 py-4
            flex items-center gap-4 shadow-2xl"
          style={{ backdropFilter: "blur(8px)" }}
        >
          {/* Animated Football */}
          <motion.span
            initial={{ rotate: -15 }}
            animate={{ rotate: [0, 20, -20, 10, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
            className="text-2xl"
          >
            ⚽
          </motion.span>
          <span className="font-bold text-lg">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-xl font-black text-[#00754A] hover:text-[#005d38] px-2"
            aria-label="Close notification"
          >✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const AddToCartPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { cart, incrementItem, decrementItem, removeFromCart, clearCart } = useCart();
  const [deliveryOption, setDeliveryOption] = useState("inside");
  const [alert, setAlert] = useState(null);

  // Toast state
  const [toast, setToast] = useState({ show: false, message: "" });

  // Toast logic: shows for 3 seconds, can be closed early
  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const subTotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = deliveryOption === "inside" ? 100 : 170;
  const grandTotal = subTotal + deliveryCharge;

  const handleProceed = () => {
    if (!user?.id) {
      setAlert(
        <div className="p-4 mb-4 bg-yellow-100 text-yellow-800 rounded-xl shadow">
          Please <Link to="/auth/login" className="underline">login</Link> to proceed with your order.
        </div>
      );
      return;
    }
    showToast("Proceeding to order page...");
    setTimeout(() => navigate("/order"), 1200);
  };

  const handleIncrement = (productId) => {
    incrementItem(productId);
    showToast("Stock increased!");
  };

  const handleDecrement = (productId) => {
    decrementItem(productId);
    showToast("Stock decreased!");
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    showToast("Item removed from cart.");
  };

  const handleClearCart = () => {
    clearCart();
    showToast("Cart cleared.");
  };

  return (
    <motion.div
      className="bg-white min-h-screen py-10"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-5">
        {alert}
        {/* Breadcrumb */}
        <motion.nav
          className="text-sm text-[#00754A] mb-5 flex gap-2 items-center"
          initial={{ opacity: 0, x: -22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.09, duration: 0.5 }}
        >
          <span onClick={() => navigate("/home")} className="hover:underline font-bold cursor-pointer">
            Home
          </span>
          <span className="mx-1">›</span>
          <span onClick={() => navigate("/shop")} className="hover:underline font-bold cursor-pointer">
            Shop
          </span>
          <span className="mx-1">›</span>
          <span className="font-bold text-black">Cart</span>
        </motion.nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-2 tracking-tight">
          Your Cart
        </h1>
        <p className="text-xs sm:text-base text-black/70 mb-6">
          *Items in your cart are not reserved — check out now to make them yours.
        </p>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Items Table */}
          <motion.div
            className="flex-grow"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6, type: "spring" }}
          >
            {/* Mobile (cards) */}
            <div className="block sm:hidden">
              {cart.items.length === 0 ? (
                <div className="bg-white/90 border-2 border-[#e3f5ed] rounded-2xl p-8 text-center text-black/50 shadow">
                  Your cart is empty
                </div>
              ) : (
                <div className="space-y-5">
                  {cart.items.map(item => (
                    <motion.div
                      key={item.productId}
                      className="bg-white border-2 border-[#e3f5ed] rounded-2xl p-4 flex flex-col gap-3 shadow-lg"
                      initial={{ scale: 0.98, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.22 }}
                    >
                      <div className="flex gap-3 items-center">
                        <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-cover rounded-xl border border-[#e3f5ed] shadow" />
                        <div className="flex-1">
                          <div className="font-semibold text-black">{item.productName}</div>
                          <div className="text-black text-base">NRP {item.price.toLocaleString()}</div>
                        </div>
                        <button
                          onClick={() => handleRemove(item.productId)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <X size={22} />
                        </button>
                      </div>
                      <div className="flex items-center gap-4 justify-between">
                        <div className="flex items-center border border-[#e3f5ed] rounded-lg">
                          <button
                            disabled={item.quantity <= 1}
                            onClick={() => handleDecrement(item.productId)}
                            className="px-3 py-1"
                          >
                            <Minus size={17} />
                          </button>
                          <span className="px-3 text-base">{item.quantity}</span>
                          <button
                            onClick={() => handleIncrement(item.productId)}
                            className="px-3 py-1"
                          >
                            <Plus size={17} />
                          </button>
                        </div>
                        <span className="text-black font-semibold">
                          NRP {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            {/* Desktop (table) */}
            <div className="hidden sm:block overflow-x-auto border-2 border-[#e3f5ed] rounded-2xl bg-white/95 shadow-lg">
              <table className="min-w-full divide-y divide-[#e3f5ed]">
                <thead className="bg-[#e6f8f1]">
                  <tr>
                    <th className="px-6 py-3 text-left text-base font-bold text-black">Product</th>
                    <th className="px-6 py-3 text-left text-base font-bold text-black">Price</th>
                    <th className="px-6 py-3 text-left text-base font-bold text-black">Quantity</th>
                    <th className="px-6 py-3 text-left text-base font-bold text-black">Total</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white/95 divide-y divide-[#e3f5ed]">
                  {cart.items.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-black/40 font-medium">
                        Your cart is empty
                      </td>
                    </tr>
                  ) : (
                    cart.items.map(item => (
                      <motion.tr
                        key={item.productId}
                        initial={{ opacity: 0.82, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.22 }}
                        className="group"
                      >
                        <td className="px-6 py-4 flex items-center gap-4">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-16 h-16 object-cover rounded-xl border border-[#e3f5ed] shadow"
                          />
                          <span className="text-base font-bold text-black">
                            {item.productName}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-base text-black font-semibold">
                          NRP {item.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center border border-[#e3f5ed] rounded-lg">
                            <button
                              disabled={item.quantity <= 1}
                              onClick={() => handleDecrement(item.productId)}
                              className="px-3 py-1"
                            >
                              <Minus size={17} />
                            </button>
                            <span className="px-3 text-base">{item.quantity}</span>
                            <button
                              onClick={() => handleIncrement(item.productId)}
                              className="px-3 py-1"
                            >
                              <Plus size={17} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-base text-black font-semibold">
                          NRP {(item.price * item.quantity).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleRemove(item.productId)}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <X size={22} />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div
            className="lg:w-96"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18, duration: 0.7, type: "spring" }}
          >
            <div className="bg-white/90 border-2 border-[#e3f5ed] rounded-2xl p-8 mt-7 lg:mt-0 shadow-2xl">
              <h2 className="text-2xl font-extrabold text-black mb-3">Order Summary</h2>
              <p className="text-xs sm:text-base text-black/70 mb-4">
                *You are one step away from making these items yours
              </p>
              <div className="border border-[#e3f5ed] rounded-xl p-5 bg-white/95">
                <div className="flex justify-between text-base font-bold text-black">
                  <span>Subtotal</span>
                  <span>NRP {subTotal.toLocaleString()}</span>
                </div>
                <div className="mt-5 space-y-3">
                  <label className="flex items-center text-base text-black/85 font-semibold">
                    <input
                      type="radio"
                      name="delivery"
                      className="mr-2 accent-[#00754A]"
                      checked={deliveryOption === "inside"}
                      onChange={() => setDeliveryOption("inside")}
                    />
                    Inside Valley Delivery: <span className="font-bold ml-2">NRP 100</span>
                  </label>
                  <label className="flex items-center text-base text-black/85 font-semibold">
                    <input
                      type="radio"
                      name="delivery"
                      className="mr-2 accent-[#00754A]"
                      checked={deliveryOption === "outside"}
                      onChange={() => setDeliveryOption("outside")}
                    />
                    Outside Valley Delivery: <span className="font-bold ml-2">NRP 170</span>
                  </label>
                </div>
                <hr className="my-5 border-[#e3f5ed]" />
                <div className="flex justify-between font-bold text-xl text-black">
                  <span>
                    Grand Total{" "}
                    <span className="font-normal text-xs">(incl. taxes)</span>
                  </span>
                  <span>NRP {grandTotal.toLocaleString()}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#00754A" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceed}
                  className="w-full mt-5 bg-black text-white py-3 rounded-full font-bold text-lg shadow hover:bg-[#00754A] transition"
                >
                  Proceed to order
                </motion.button>
                {cart.items.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.01, backgroundColor: "#ffeaea", color: "#ef4444" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClearCart}
                    className="w-full mt-3 px-6 py-3 border-2 border-red-400 text-red-600 rounded-full font-bold hover:bg-red-50 transition"
                  >
                    Clear Cart
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Notification Toast */}
        <Toast
          message={toast.show ? toast.message : ""}
          onClose={() => setToast({ ...toast, show: false })}
          key={toast.show ? "on" : "off"}
        />
      </div>
    </motion.div>
  );
};

export default AddToCartPage;
