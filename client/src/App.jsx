// client/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { UserProvider } from "./context/userContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import { AddressProvider } from "./context/addressContext.jsx";
import { OrderProvider } from "./context/orderContext.jsx";

import MainLayout        from "./pages/customer/layout/MainLayout.jsx";
import HomePage          from "./pages/customer/home/HomePage.jsx";
import ShopPage          from "./pages/customer/shop/ShopPage.jsx";
import SingleProductPage from "./pages/customer/product/SingleProductPage.jsx";
import AddToCartPage     from "./pages/customer/cart/AddToCartPage.jsx";
import OrderPage         from "./pages/customer/order/OrderPage.jsx";
import ContactUsPage     from "./pages/customer/contactus/ContactUsPage.jsx";
import CommunityPage     from "./pages/customer/community/CommunityPage.jsx";
import AboutUsPage       from "./pages/customer/aboutus/AboutUsPage.jsx";


import SignInPage        from "./pages/customer/auth/LoginPage.jsx";
import RegisterPage      from "./pages/customer/auth/RegisterPage.jsx";

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <AddressProvider>
            <OrderProvider>
              <Routes>
                {/* Redirect root to /home */}
                <Route path="/" element={<Navigate replace to="/home" />} />

                {/* Main layout wrapper */}
                <Route element={<MainLayout />}>
                  <Route path="/home"        element={<HomePage />} />
                  <Route path="/shop"        element={<ShopPage />} />
                  <Route path="/product/:id" element={<SingleProductPage />} />
                  <Route path="/cart"        element={<AddToCartPage />} />
                  <Route path="/order"       element={<OrderPage />} />
                  <Route path="/contactus"   element={<ContactUsPage />} />
                  <Route path="/community"   element={<CommunityPage />} />
                  <Route path="/aboutus"     element={<AboutUsPage />} />
                  
                </Route>

                {/* Auth routes */}
                <Route path="/auth/login"    element={<SignInPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
              </Routes>
            </OrderProvider>
          </AddressProvider>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
