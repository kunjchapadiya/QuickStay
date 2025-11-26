import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import ViewRooms from './pages/ViewRooms';
import DeluxeRoom from './pages/DeluxeRoom';
import Payment from './pages/Payment';
import PaymentSucess from './pages/PaymentSucess';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- Admin Pages Import ---
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
// import AdminLogin from './pages/Admin/AdminLogin';
import ManageRooms from './pages/Admin/ManageRooms';
import ManageBookings from './pages/Admin/ManageBookings';
import ManageUsers from './pages/Admin/ManageUsers';
import AddRoom from './components/Admin/AddRoom';
import UpdateRoom from './pages/Admin/UpdateRoom';
import ManagePayments from './pages/Admin/ManagePayments';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import { AuthProvider } from './context/AuthContext';



const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Show Header only for user side (NOT admin) */}
      {!isAdminRoute && <Header />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover={false}
      />

      <main>
        <Routes>

          {/* ------------------- Frontend Routes -------------------- */}
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<ViewRooms />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/deluxe-room" element={<DeluxeRoom />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSucess />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />


          {/* ------------------- Admin Routes -------------------- */}
          {/* <Route path="/admin/login" element={<AdminLogin />} /> */}

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="rooms" element={<ManageRooms />} />
            <Route path="bookings" element={<ManageBookings />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="update-room/:id" element={<UpdateRoom />} />
            <Route path="payments" element={<ManagePayments />} />
          </Route>

        </Routes>
      </main>

      {/* Hide footer on admin pages if needed */}
      {!isAdminRoute && <Footer />}

      <ToastContainer />
    </>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
