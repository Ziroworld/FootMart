import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import { UserProvider, UserContext } from "./context/userContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AddressProvider } from "./context/addressContext.jsx";
import { WishlistProvider } from "./context/wishlistContext.jsx";
import { OrderProvider } from "./context/orderContext.jsx";
import { CommunityProvider } from "./context/commmunityContext.jsx";

// Customer Layout and Pages
import MainLayout from "./pages/customer/layout/MainLayout.jsx";
import HomePage from "./pages/customer/home/HomePage.jsx";
import ShopPage from "./pages/customer/shop/ShopPage.jsx";
import SingleProductPage from "./pages/customer/product/SingleProductPage.jsx";
import AddToCartPage from "./pages/customer/cart/AddToCartPage.jsx";
import OrderPage from "./pages/customer/order/OrderPage.jsx";
import ContactUsPage from "./pages/customer/contactus/ContactUsPage.jsx";
import CommunityPage from "./pages/customer/community/CommunityPage.jsx";
import AboutUsPage from "./pages/customer/aboutus/AboutUsPage.jsx";
import FaqPage from "./pages/customer/faq/FaqPage.jsx";
import WishlistPage from "./pages/customer/wishlist/Wishlistpage.jsx";

import SignInPage from "./pages/customer/auth/LoginPage.jsx";
import RegisterPage from "./pages/customer/auth/RegisterPage.jsx";

// --- ADMIN ---
import AdminMainLayout from "./pages/admin/layout/MainLayout.jsx";
import AdminDashboardPage from "./pages/admin/dashboard/AdminDashboardPage.jsx";
import UserPage from "./pages/admin/user/UserPage.jsx";
import ProductPage from "./pages/admin/product/ProductPage.jsx";
import PlayerPage from "./pages/admin/player/PlayerPage.jsx";
import OrderPageAdmin from "./pages/admin/order/orderPage.jsx"; 

// --- Inline Admin Route Wrapper ---
function AdminRoute() {
  const { user } = useContext(UserContext);
  const role = user?.role || localStorage.getItem("userRole");

  if (!role) {
    return <Navigate to="/auth/login" />;
  }
  return role === "admin" ? <Outlet /> : <Navigate to="/home" />;
}

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <AddressProvider>
            <WishlistProvider>
              <OrderProvider>
                <CommunityProvider>
                  <Routes>
                    {/* Redirect root to /home */}
                    <Route path="/" element={<Navigate replace to="/home" />} />

                    {/* Customer-facing app with MainLayout */}
                    <Route element={<MainLayout />}>
                      <Route path="/home" element={<HomePage />} />
                      <Route path="/shop" element={<ShopPage />} />
                      <Route path="/product/:id" element={<SingleProductPage />} />
                      <Route path="/cart" element={<AddToCartPage />} />
                      <Route path="/order" element={<OrderPage />} />
                      <Route path="/contactus" element={<ContactUsPage />} />
                      <Route path="/community" element={<CommunityPage />} />
                      <Route path="/aboutus" element={<AboutUsPage />} />
                      <Route path="/faq" element={<FaqPage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                    </Route>

                    {/* Auth pages (outside of MainLayout) */}
                    <Route path="/auth/login" element={<SignInPage />} />
                    <Route path="/auth/register" element={<RegisterPage />} />

                    {/* ----------- ADMIN ROUTES (Protected, using new layout) ----------- */}
                    <Route path="/admin" element={<AdminRoute />}>
                      <Route
                        path="dashboard"
                        element={
                          <AdminMainLayout>
                            <AdminDashboardPage />
                          </AdminMainLayout>
                        }
                      />
                      <Route
                        path="dashboard/users"
                        element={
                          <AdminMainLayout>
                            <UserPage />
                          </AdminMainLayout>
                        }
                      />
                      <Route
                        path="dashboard/products"
                        element={
                          <AdminMainLayout>
                            <ProductPage />
                          </AdminMainLayout>
                        }
                      />
                      <Route
                        path="dashboard/players"
                        element={
                          <AdminMainLayout>
                            <PlayerPage />
                          </AdminMainLayout>
                        }
                      />
                      <Route
                        path="dashboard/orders"
                        element={
                          <AdminMainLayout>
                            <OrderPageAdmin />
                          </AdminMainLayout>
                        }
                      />
                    </Route>

                    {/* ----------- CATCH ALL: 404 redirect to "/" ----------- */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </CommunityProvider>
              </OrderProvider>
            </WishlistProvider>
          </AddressProvider>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
