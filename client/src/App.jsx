import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./pages/customer/layout/MainLayout";
import HomePage from "./pages/customer/home/HomePage";
import ShopPage from "./pages/customer/shop/ShopPage";
import SignInPage from "./pages/customer/auth/LoginPage";
import RegisterPage from "./pages/customer/auth/RegisterPage";
import ContactUsPage from "./pages/customer/contactus/ContactUsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/contactus" element={<ContactUsPage />} />
          <Route path="/auth/login" element={<SignInPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



