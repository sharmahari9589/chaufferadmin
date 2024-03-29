import React, { useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";

import { Navigate, useNavigate } from "react-router-dom";
import JwtLogin from "./authPages/JwtLogin";
import ForgotPassword from "./authPages/ForgotPassword";
import Otp from "./authPages/Otp";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import SellCar from "./pages/SellCar";
import Vandors from "./pages/Vandors";
import Cars from "./pages/Cars";
import Settings from "./pages/Settings";
import Bookings from "./pages/Bookings";
import Email from "./authPages/Email";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/email" element={<Email />} />

        <Route path="/otp" element={<Otp />} />
        <Route path="/login" element={<JwtLogin />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route
            path="/"
            element={<Navigate to="/dashboard" element={<Dashboard />} />}
          />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/customer" element={<SellCar />} />
          <Route path="/vandors" element={<Vandors />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
