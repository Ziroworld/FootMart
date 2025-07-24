import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/usecarts';
import { useOrder } from '../../../hooks/useOrder';
import { motion, AnimatePresence } from 'framer-motion';

const stateOptions = [
  'Koshi', 'Madhesh', 'Bagmati', 'Gandaki', 'Lumbini', 'Karnali', 'Sudurpashchim'
];

// Toast with animated check (unchanged)
function Toast({ message, type = 'success', onClose }) {
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
            borderColor: type === 'success' ? '#16e087' : '#ef4444',
            color: type === 'success' ? '#1e7e5c' : '#dc2626',
            backdropFilter: "blur(10px)"
          }}
        >
          <span className="text-2xl">
            {type === 'success' ? '✅' : '⚠️'}
          </span>
          <span className="font-bold text-lg">{message}</span>
          <button onClick={onClose} className="ml-3 text-xl font-black hover:scale-125 transition">✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Success Modal (light green, animated, with cross & shop more)
function SuccessModal({ onClose, onShop }) {
  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'rgba(0,0,0,0.25)' }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0.7, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0.5, y: 24 }}
        transition={{ type: "spring", duration: 0.36 }}
        className="relative bg-[#f0fff5] border-2 border-[#b4f0ce] rounded-3xl shadow-2xl px-8 py-10 max-w-xs sm:max-w-md w-full flex flex-col items-center"
      >
        {/* Cross button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-[#36ba78] hover:text-[#1c7e53] text-2xl font-black rounded-full bg-white bg-opacity-70 shadow p-1 transition hover:scale-110"
          aria-label="Close"
        >
          ×
        </button>
        {/* Animated check */}
        <motion.div
          className="mb-5 flex items-center justify-center"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: [0, 15, -8, 8, 0]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            type: "tween"
          }}
        >
          <svg className="w-16 h-16 text-[#15c576]" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" fill="#dcfce7" />
            <path
              d="M8.5 12.7l2.3 2.3 4.3-4.3"
              stroke="#15c576"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </motion.div>
        <div className="text-[#108751] font-black text-2xl mb-1 text-center drop-shadow">
          Order Placed!
        </div>
        <div className="text-gray-700 text-base font-semibold mb-6 text-center">
          Thank you for your purchase.<br />
          A confirmation email and SMS have been sent.<br />
          <span className="block mt-2 text-[#15c576] font-bold">Welcome to the FootMart family!</span>
        </div>
        <button
          onClick={onShop}
          className="mt-2 px-6 py-2.5 rounded-full bg-[#dcfce7] border-2 border-[#15c576] text-[#108751] font-extrabold text-lg flex items-center gap-2 shadow-md hover:bg-[#bbf7d0] hover:text-[#0c5636] transition"
        >
          Shop more <span className="text-xl">🛒</span>
        </button>
      </motion.div>
    </motion.div>
  );
}

const OrderSection = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();
  const { createOrder } = useOrder();

  // Form state
  const [billingDetails, setBillingDetails] = useState({
    fullName: '', phone: '', address: '', landmark: '', city: '', state: '', country: ''
  });
  const [deliveryInside, setDeliveryInside] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [saveNotification, setSaveNotification] = useState({ show: false, type: 'success', message: '' });
  const [orderError, setOrderError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // State dropdown helpers
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setStateDropdownOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Only redirect to cart if cart is empty *and* not in success modal
  useEffect(() => {
    if (!cart.items.length && !orderSuccess) navigate('/cart');
  }, [cart, navigate, orderSuccess]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setBillingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleRemoveItem = productId => removeFromCart(productId);

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = deliveryInside ? 100 : 170;
  const grandTotal = subtotal + deliveryCharge;

  const filteredStates = stateOptions.filter(opt =>
    opt.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const handleSaveDetails = () => {
    const { fullName, phone, address, landmark, city, state, country } = billingDetails;
    if (!fullName || !phone || !address || !landmark || !city || !state || !country) {
      setSaveNotification({ show: true, type: 'error', message: 'Please fill all required fields.' });
    } else {
      setSaveNotification({ show: true, type: 'success', message: 'Details saved successfully.' });
    }
    setTimeout(() => setSaveNotification({ show: false, type: 'success', message: '' }), 2300);
  };

  // ORDER PLACEMENT - Don't clear cart yet!
  const handlePlaceOrder = async () => {
    setOrderError(null);
    try {
      const orderData = {
        payment: paymentMethod === 'cod' ? 'COD' : 'Khalti',
        fullName: billingDetails.fullName,
        phoneNumber: billingDetails.phone,
        streetAddress: billingDetails.address,
        landmark: billingDetails.landmark,
        city: billingDetails.city,
        state: billingDetails.state,
        country: billingDetails.country
      };
      await createOrder(orderData);
      setOrderSuccess(true); // Show modal only, don't clear cart!
    } catch (error) {
      let msg = 'Failed to place order.';
      if (error.response && error.response.data && error.response.data.message) {
        msg = error.response.data.message;
      }
      setOrderError(msg);
    }
  };

  // When user closes modal, THEN clear cart and redirect to home/shop
  const handleSuccessOkay = async () => {
    setOrderSuccess(false);
    await clearCart();
    navigate('/home');
  };
  const handleShopMore = async () => {
    setOrderSuccess(false);
    await clearCart();
    navigate('/shop');
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-10">
      {/* ORDER SUCCESS MODAL */}
      <AnimatePresence>
        {orderSuccess && (
          <SuccessModal
            onClose={handleSuccessOkay}
            onShop={handleShopMore}
          />
        )}
      </AnimatePresence>

      {/* Animated Toast for Save Notification */}
      <Toast
        message={saveNotification.show ? saveNotification.message : ''}
        type={saveNotification.type}
        onClose={() => setSaveNotification({ ...saveNotification, show: false })}
      />

      {/* Breadcrumb */}
      <nav className="text-sm flex gap-1 mb-7 font-semibold tracking-wide text-[#16e087]">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link to="/cart" className="hover:underline">Cart</Link>
        <span>/</span>
        <span className="text-black">Checkout</span>
      </nav>

      <h1 className="text-3xl font-black mb-3 text-black">Checkout</h1>
      <p className="text-gray-600 mb-8 text-lg">
        We deliver top-quality football gear directly to your doorstep. Enjoy fast shipping, easy returns, and exceptional support.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT: Cart & Billing */}
        <div className="lg:col-span-2 flex flex-col gap-12">
          {/* Cart Section */}
          <section>
            <h2 className="text-xl font-bold mb-4">Your Cart <span className="text-[#16e087]">({cart.items.length})</span></h2>
            {cart.items.length > 0 ? (
              <motion.ul
                className="space-y-4"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08 } }
                }}
              >
                {cart.items.map(item => {
                  const id = item.productId || item.id;
                  const name = item.productName || item.name;
                  const image = item.productImage || item.image;
                  return (
                    <motion.li
                      key={id}
                      className="flex items-center justify-between p-4 border-2 border-[#e3f5ed] rounded-xl bg-white/90 shadow transition"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.32 }}
                    >
                      <div className="flex items-center">
                        <img src={image} alt={name} className="w-16 h-16 object-cover rounded-xl border-2 border-[#e3f5ed] shadow" />
                        <div className="ml-4">
                          <div className="font-bold text-black">{name}</div>
                          <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-bold text-base text-black">NRP {(item.price * item.quantity).toLocaleString()}</div>
                        <button
                          onClick={() => handleRemoveItem(id)}
                          className="text-red-500 hover:text-red-700 px-2 font-bold rounded-full transition"
                        >Remove</button>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            ) : (
              <motion.p className="text-gray-400 text-base font-medium py-8">Your cart is empty.</motion.p>
            )}
          </section>

          {/* Billing Details Section */}
          <section>
            <h2 className="text-2xl font-bold mb-5 text-black">Billing Details</h2>
            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              {/* Full Name */}
              <div>
                <label className="block text-base font-bold mb-1 text-black">Full Name *</label>
                <input
                  name="fullName"
                  value={billingDetails.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Ramesh Basnet"
                  className="w-full border-2 border-[#e3f5ed] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#16e087]/60 bg-white text-black font-medium"
                />
              </div>
              {/* Phone */}
              <div>
                <label className="block text-base font-bold mb-1 text-black">Phone Number *</label>
                <input
                  name="phone"
                  value={billingDetails.phone}
                  onChange={handleInputChange}
                  placeholder="+977 98XXXXXXXX"
                  className="w-full border-2 border-[#e3f5ed] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#16e087]/60 bg-white text-black font-medium"
                />
              </div>
              {/* Street Address */}
              <div>
                <label className="block text-base font-bold mb-1 text-black">Street Address *</label>
                <input
                  name="address"
                  value={billingDetails.address}
                  onChange={handleInputChange}
                  placeholder="e.g. Sitapaila - 4"
                  className="w-full border-2 border-[#e3f5ed] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#16e087]/60 bg-white text-black font-medium"
                />
              </div>
              {/* Landmark */}
              <div>
                <label className="block text-base font-bold mb-1 text-black">Landmark *</label>
                <input
                  name="landmark"
                  value={billingDetails.landmark}
                  onChange={handleInputChange}
                  placeholder="e.g. Temple, Apartment, Colony"
                  className="w-full border-2 border-[#e3f5ed] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#16e087]/60 bg-white text-black font-medium"
                />
              </div>
              {/* City & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* City */}
                <div>
                  <label className="block text-base font-bold mb-1 text-black">City *</label>
                  <input
                    name="city"
                    value={billingDetails.city}
                    onChange={handleInputChange}
                    placeholder="Kathmandu"
                    className="w-full border-2 border-[#e3f5ed] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#16e087]/60 bg-white text-black font-medium"
                  />
                </div>
                {/* State (Dropdown) */}
                <div className="relative" ref={dropdownRef}>
                  <label className="block text-base font-bold mb-1 text-black">State *</label>
                  <div
                    className="w-full border-2 border-[#e3f5ed] rounded-xl px-3 py-2 flex justify-between items-center cursor-pointer focus:outline-none bg-white"
                    onClick={() => setStateDropdownOpen(open => !open)}
                  >
                    <span className={billingDetails.state ? "text-black font-bold" : "text-gray-400"}>{billingDetails.state || 'Select state'}</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {stateDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border-2 border-[#e3f5ed] rounded-xl shadow-xl">
                      <input
                        type="text"
                        placeholder="Search state..."
                        value={stateSearch}
                        onChange={e => setStateSearch(e.target.value)}
                        className="w-full px-3 py-2 border-b focus:outline-none rounded-t-xl"
                      />
                      <ul className="max-h-40 overflow-auto">
                        {filteredStates.map(opt => (
                          <li
                            key={opt}
                            onClick={() => {
                              setBillingDetails(prev => ({ ...prev, state: opt }));
                              setStateDropdownOpen(false);
                              setStateSearch('');
                            }}
                            className="px-3 py-2 hover:bg-[#e3f5ed] cursor-pointer font-medium text-black"
                          >
                            {opt}
                          </li>
                        ))}
                        {!filteredStates.length && (
                          <li className="px-3 py-2 text-gray-400">No matches</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* Country */}
              <div>
                <label className="block text-base font-bold mb-1 text-black">Country *</label>
                <input
                  name="country"
                  value={billingDetails.country}
                  onChange={handleInputChange}
                  placeholder="Nepal"
                  className="w-full border-2 border-[#e3f5ed] rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#16e087]/60 bg-white text-black font-medium"
                />
              </div>
              {/* Save & Notification */}
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#16e087" }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={handleSaveDetails}
                className="mt-4 bg-black text-white px-8 py-2.5 rounded-full font-bold text-lg shadow hover:bg-[#16e087] hover:text-black transition"
              >
                Save Details
              </motion.button>
              <p className="mt-3 text-sm text-gray-500">
                We handle your order with care and pack each item to ensure it arrives in perfect condition.
              </p>
            </form>
          </section>
        </div>
        {/* RIGHT: Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            className="sticky top-8 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            <div className="p-3 bg-[#e7fcf4] border-2 border-[#16e087] text-green-800 text-sm font-bold rounded-xl shadow">
              Email & SMS confirmation after order placement.
            </div>
            <div className="bg-white p-6 border-2 border-[#e3f5ed] rounded-2xl shadow-xl">
              <h2 className="text-xl font-black mb-3 text-black">Order Summary</h2>
              <div className="text-base space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">NRP {subtotal.toLocaleString()}</span>
                </div>
                <div>
                  <label className="flex items-center text-sm font-bold">
                    <input
                      type="checkbox"
                      checked={deliveryInside}
                      onChange={() => setDeliveryInside(d => !d)}
                      className="mr-2 accent-[#16e087]"
                    />
                    Inside Valley Delivery: <span className="ml-2">NRP 100</span>
                  </label>
                  {!deliveryInside && (
                    <p className="ml-6 text-sm text-gray-500">Outside Valley: NRP 170</p>
                  )}
                </div>
                <hr className="my-3 border-[#e3f5ed]" />
                <div className="flex justify-between font-bold text-xl">
                  <span>Grand Total</span>
                  <span>NRP {grandTotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500">(incl. all taxes)</p>
                <div className="mt-5">
                  <p className="text-base font-bold mb-2 text-black">Payment method *</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPaymentMethod('cod')}
                      className={`px-4 py-1.5 border-2 rounded-full text-sm font-bold transition ${
                        paymentMethod === 'cod' ? 'border-[#16e087] bg-[#e7fcf4] text-black' : 'border-[#e3f5ed] bg-white text-gray-600'
                      }`}
                    >Cash on Delivery</button>
                    <button
                      onClick={() => setPaymentMethod('khalti')}
                      className={`px-4 py-1.5 border-2 rounded-full text-sm font-bold transition ${
                        paymentMethod === 'khalti' ? 'border-[#16e087] bg-[#e7fcf4] text-black' : 'border-[#e3f5ed] bg-white text-gray-600'
                      }`}
                    >Khalti</button>
                  </div>
                </div>
                {orderError && (
                  <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-base rounded font-bold">
                    {orderError}
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#16e087", color: "#004425" }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={handlePlaceOrder}
                  className="mt-6 w-full text-lg bg-black text-white py-3 rounded-full font-black shadow hover:bg-[#16e087] hover:text-black transition"
                >
                  Place Order
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderSection;
