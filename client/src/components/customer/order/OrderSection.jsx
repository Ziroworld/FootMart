// client/src/components/customer/order/OrderSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/usecarts';

const stateOptions = [
  'Koshi',
  'Madhesh',
  'Bagmati',
  'Gandaki',
  'Lumbini',
  'Karnali',
  'Sudurpashchim'
];

const OrderSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { removeFromCart } = useCart();

  // Initialize cartItems from router state
  const [cartItems, setCartItems] = useState(() => {
    return location.state?.cartItems || [];
  });

  // Redirect to cart if no items
  useEffect(() => {
    if (!cartItems.length) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  // Billing form state
  const [billingDetails, setBillingDetails] = useState({
    fullName: '',
    phone: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    country: ''
  });
  const [deliveryInside, setDeliveryInside] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // State dropdown helpers
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState('');
  const dropdownRef = useRef(null);
  useEffect(() => {
    const onClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setStateDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setBillingDetails(prev => ({ ...prev, [name]: value }));
  };

  // Remove one item
  const handleRemoveItem = productId => {
    removeFromCart(productId);
    setCartItems(items => items.filter(i => (i.productId || i.id) !== productId));
  };

  // Totals
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryCharge = deliveryInside ? 100 : 170;
  const grandTotal = subtotal + deliveryCharge;

  // Filtered states
  const filteredStates = stateOptions.filter(opt =>
    opt.toLowerCase().includes(stateSearch.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-4">
        <ol className="flex list-reset">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link to="/cart" className="hover:underline">Cart</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-gray-900">Checkout</li>
        </ol>
      </nav>

      {/* Title & Info */}
      <h1 className="text-3xl font-bold mb-2">Checkout</h1>
      <p className="text-gray-600 mb-6">
        At FootMart, we deliver top-quality footwear directly to your doorstep. Enjoy fast shipping, hassle-free returns, and exceptional service.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Cart & Billing */}
        <div className="lg:col-span-2 space-y-8">
          {/* Cart */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
            </h2>
            {cartItems.length > 0 ? (
              <ul className="space-y-4">
                {cartItems.map(item => {
                  const id = item.productId || item.id;
                  const name = item.productName || item.name;
                  const image = item.productImage || item.image;
                  return (
                    <li key={id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <img src={image} alt={name} className="w-16 h-16 object-cover rounded-md mr-4" />
                        <div>
                          <p className="font-medium">{name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="font-semibold text-sm">
                          NRP {(item.price * item.quantity).toLocaleString()}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </section>

          {/* Billing */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
            <form className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  name="fullName"
                  value={billingDetails.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <input
                  name="phone"
                  value={billingDetails.phone}
                  onChange={handleInputChange}
                  placeholder="+977 98XXXXXXXX"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm font-medium mb-1">Street Address *</label>
                <input
                  name="address"
                  value={billingDetails.address}
                  onChange={handleInputChange}
                  placeholder="e.g. Sitapaila - 4"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              {/* Landmark */}
              <div>
                <label className="block text-sm font-medium mb-1">Landmark *</label>
                <input
                  name="landmark"
                  value={billingDetails.landmark}
                  onChange={handleInputChange}
                  placeholder="e.g. Temple, Apartment, Colony"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              {/* City & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* City */}
                <div>
                  <label className="block text-sm font-medium mb-1">City *</label>
                  <input
                    name="city"
                    value={billingDetails.city}
                    onChange={handleInputChange}
                    placeholder="Kathmandu"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>

                {/* State */}
                <div className="relative" ref={dropdownRef}>
                  <label className="block text-sm font-medium mb-1">State *</label>
                  <div
                    className="w-full border rounded-lg px-3 py-2 flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-300"
                    onClick={() => setStateDropdownOpen(open => !open)}
                  >
                    <span>{billingDetails.state || 'Select state'}</span>
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {stateDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-md">
                      <input
                        type="text"
                        placeholder="Search state..."
                        value={stateSearch}
                        onChange={e => setStateSearch(e.target.value)}
                        className="w-full px-3 py-2 border-b focus:outline-none"
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
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {opt}
                          </li>
                        ))}
                        {!filteredStates.length && (
                          <li className="px-3 py-2 text-gray-500">No matches</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-1">Country *</label>
                <input
                  name="country"
                  value={billingDetails.country}
                  onChange={handleInputChange}
                  placeholder="Nepal"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              {/* Save & Note */}
              <button
                type="button"
                className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:opacity-90"
              >
                Save Details
              </button>
              <p className="mt-2 text-sm text-gray-600">
                We handle your order with care and pack each item to ensure it arrives in perfect condition.
              </p>
            </form>
          </section>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-4">
            <div className="p-3 bg-[#DDEDE6] border-l-4 border-[#6FBF92] text-green-700 text-sm rounded">
              You’ll receive an email & SMS confirmation once your order is placed.
            </div>
            <div className="bg-white p-4 border rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">NRP {subtotal.toLocaleString()}</span>
                </div>
                <div>
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={deliveryInside}
                      onChange={() => setDeliveryInside(d => !d)}
                      className="mr-2"
                    />
                    Inside Valley Delivery: NRP 100
                  </label>
                  {!deliveryInside && (
                    <p className="ml-6 text-sm text-gray-600">Outside Valley: NRP 170</p>
                  )}
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-base">
                  <span>Grand Total</span>
                  <span>NRP {grandTotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500">(inclusive of all taxes)</p>
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Payment method *</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPaymentMethod('cod')}
                      className={`px-3 py-1 border rounded-full text-sm ${
                        paymentMethod === 'cod' ? 'border-[#6FBF92] bg-[#DDEDE6]' : ''
                      }`}
                    >
                      Cash on Delivery
                    </button>
                    <button
                      onClick={() => setPaymentMethod('khalti')}
                      className={`px-3 py-1 border rounded-full text-sm ${
                        paymentMethod === 'khalti' ? 'border-[#6FBF92] bg-[#DDEDE6]' : ''
                      }`}
                    >
                      Khalti
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-4 w-full text-sm bg-black text-white py-2 rounded-full hover:opacity-90"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSection;
