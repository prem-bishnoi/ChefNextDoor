import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import PrivateRoute from "./routes/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Profile from "./pages/Profile/Profile";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";
import AuthNavbar from "./components/AuthNavbar/AuthNavbar";

const App = () => {
  const location = useLocation();

  // Define auth pages where we only want minimal navbar
  const authPages = ["/login", "/signup", "/verify-email", "/forgot-password"];

  return (
    <>
      {/* Conditional Navbar */}
      {authPages.includes(location.pathname) ? <AuthNavbar /> : <Navbar />}

      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
