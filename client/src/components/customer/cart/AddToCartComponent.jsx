import React, { useState, useContext } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../../../hooks/usecarts';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../../context/userContext.jsx';

// Friendly light green toast notification
function Toast({ message, onClose }) {
  return (
    <div className="
      fixed z-50
      left-1/2 bottom-6 sm:bottom-8 sm:right-8 sm:left-auto
      -translate-x-1/2 sm:translate-x-0
      bg-green-100 border border-green-300 text-green-900 rounded-2xl px-6 py-3
      flex items-center gap-3 shadow-xl
      animate-fade-in
    ">
      <svg width="22" height="22" viewBox="0 0 24 24" className="text-green-600">
        <circle cx="12" cy="12" r="10" fill="#D3FAD6" />
        <path
          d="M8.5 12.7l2.3 2.3 4.3-4.3"
          stroke="#30B95D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="font-semibold text-[16px]">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-lg font-bold text-green-900 hover:text-green-700 px-2"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}

const AddToCartPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const {
    cart,
    incrementItem,
    decrementItem,
    removeFromCart,
    clearCart
  } = useCart();
  const [deliveryOption, setDeliveryOption] = useState('inside');
  const [alert, setAlert] = useState(null);

  // Toast state
  const [toast, setToast] = useState({ show: false, message: "" });
  const showToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const subTotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = deliveryOption === 'inside' ? 100 : 170;
  const grandTotal = subTotal + deliveryCharge;

  const handleProceed = () => {
    if (!user?.id) {
      setAlert(
        <div className="p-4 mb-4 bg-yellow-100 text-yellow-800 rounded">
          Please <Link to="/auth/login" className="underline">login</Link> to proceed with your order.
        </div>
      );
      return;
    }
    showToast("Proceeding to order page...");
    setTimeout(() => navigate('/order'), 1200);
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
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-2 sm:px-4">
        {alert}
        <nav className="text-sm text-gray-500 mb-2">
          <span onClick={() => navigate('/home')} className="hover:underline cursor-pointer">Home</span>
          <span className="mx-1">&gt;</span>
          <span onClick={() => navigate('/shop')} className="hover:underline cursor-pointer">Shop</span>
          <span className="mx-1">&gt;</span>
          <span>Cart</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Your Cart</h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-6">
          *Items in your cart are not reserved — check out now to make them yours.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items Table */}
          <div className="flex-grow">
            {/* Mobile (cards) */}
            <div className="block sm:hidden">
              {cart.items.length === 0 ? (
                <div className="bg-white border border-gray-300 rounded-lg p-8 text-center text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map(item => (
                    <div key={item.productId} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-2">
                      <div className="flex gap-3 items-center">
                        <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <div className="font-semibold">{item.productName}</div>
                          <div className="text-gray-700 text-sm">NRP {item.price.toLocaleString()}</div>
                        </div>
                        <button
                          onClick={() => handleRemove(item.productId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className="flex items-center gap-4 justify-between">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            disabled={item.quantity <= 1}
                            onClick={() => handleDecrement(item.productId)}
                            className="px-2 py-1"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => handleIncrement(item.productId)}
                            className="px-2 py-1"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="text-gray-900 font-semibold">
                          NRP {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Desktop (table) */}
            <div className="hidden sm:block overflow-x-auto border border-gray-300 rounded-lg bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Product</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Quantity</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Total</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.items.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        Your cart is empty
                      </td>
                    </tr>
                  ) : (
                    cart.items.map(item => (
                      <tr key={item.productId}>
                        <td className="px-6 py-4 flex items-center gap-4">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {item.productName}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          NRP {item.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center border border-gray-300 rounded">
                            <button
                              disabled={item.quantity <= 1}
                              onClick={() => handleDecrement(item.productId)}
                              className="px-2 py-1"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-2 text-sm">{item.quantity}</span>
                            <button
                              onClick={() => handleIncrement(item.productId)}
                              className="px-2 py-1"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          NRP {(item.price * item.quantity).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleRemove(item.productId)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={20} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:w-96">
            <div className="bg-white border border-gray-300 rounded-lg p-6 mt-6 lg:mt-0">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Order Summary</h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-4">
                *You are one step away from making these items yours
              </p>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Subtotal</span>
                  <span>NRP {subTotal.toLocaleString()}</span>
                </div>
                <div className="mt-4 space-y-2">
                  <label className="flex items-center text-sm">
                    <input
                      type="radio"
                      name="delivery"
                      className="mr-2"
                      checked={deliveryOption === 'inside'}
                      onChange={() => setDeliveryOption('inside')}
                    />
                    Inside Valley Delivery: NRP 100
                  </label>
                  <label className="flex items-center text-sm">
                    <input
                      type="radio"
                      name="delivery"
                      className="mr-2"
                      checked={deliveryOption === 'outside'}
                      onChange={() => setDeliveryOption('outside')}
                    />
                    Outside Valley Delivery: NRP 170
                  </label>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>
                    Grand Total{' '}
                    <span className="font-normal text-xs">(incl. taxes)</span>
                  </span>
                  <span>NRP {grandTotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={handleProceed}
                  className="w-full mt-4 bg-black text-white py-3 rounded-full hover:bg-gray-800 transition"
                >
                  Proceed to order
                </button>
                {cart.items.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="w-full mt-2 px-6 py-3 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Notification Toast */}
        {toast.show && (
          <Toast message={toast.message} onClose={() => setToast({ ...toast, show: false })} />
        )}
      </div>
    </div>
  );
};

export default AddToCartPage;
