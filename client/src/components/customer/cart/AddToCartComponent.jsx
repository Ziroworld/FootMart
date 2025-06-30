import React, { useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../../../hooks/usecarts';
import { useNavigate } from 'react-router-dom';

const AddToCartComponent = () => {
  const navigate = useNavigate();
  const { cart, updateItemQuantity, removeFromCart, clearCart } = useCart();
  const [deliveryOption, setDeliveryOption] = useState('inside');

  const subTotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = deliveryOption === 'inside' ? 100 : 170;
  const grandTotal = subTotal + deliveryCharge;

  const handleProceedToOrder = () => {
    navigate('/customer/order');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-2">
          <span
            className="hover:underline cursor-pointer"
            onClick={() => navigate('/home')}
          >
            Home
          </span>
          <span className="mx-1">&gt;</span>
          <span
            className="hover:underline cursor-pointer"
            onClick={() => navigate('/shop')}
          >
            Shop
          </span>
          <span className="mx-1">&gt;</span>
          <span>Cart</span>
        </nav>

        {/* Title & Note */}
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Your Cart</h1>
        <p className="text-sm text-gray-500 mb-6">
          *Items in your cart are not reserved — check out now to make them
          yours.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Table */}
          <div className="flex-grow">
            <div className="overflow-x-auto border border-gray-300 rounded-lg bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Total
                    </th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.items.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        Your cart is empty
                      </td>
                    </tr>
                  ) : (
                    cart.items.map((item) => (
                      <tr key={item.productId}>
                        <td className="px-6 py-4 flex items-center gap-4">
                          <img
                            src={item.productImage || item.imageUrl}
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
                              onClick={() =>
                                updateItemQuantity(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                              className="px-2 py-1"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-2 text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateItemQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
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
                            onClick={() => removeFromCart(item.productId)}
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

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Order Summary
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                *You are one step away from making these items yours
              </p>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-900 mb-4">
                  Details
                </h3>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Sub total</span>
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
                    Inside Valley Delivery Charge: NRP 100.00
                  </label>
                  <label className="flex items-center text-sm">
                    <input
                      type="radio"
                      name="delivery"
                      className="mr-2"
                      checked={deliveryOption === 'outside'}
                      onChange={() => setDeliveryOption('outside')}
                    />
                    Outside Valley Delivery Charge: NRP 170.00
                  </label>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>
                    Grand Total{' '}
                    <span className="font-normal text-xs">
                      (Inclusive of all taxes)
                    </span>
                  </span>
                  <span>NRP {grandTotal.toLocaleString()}</span>
                </div>
                <div className="mt-4 flex">
                  <input
                    type="text"
                    placeholder="Enter your promo code"
                    className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:outline-none"
                  />
                  <button className="border border-gray-300 border-l-0 rounded-r px-4">
                    <Plus size={20} />
                  </button>
                </div>
                <button
                  onClick={handleProceedToOrder}
                  className="w-full mt-4 bg-black text-white py-3 rounded-full hover:bg-gray-800 transition"
                >
                  Proceed to order
                </button>
                {cart.items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="w-full mt-2 px-6 py-3 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartComponent;
