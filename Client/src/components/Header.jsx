import React, { useState, useEffect } from "react";
// Header component
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import "../stylesheets/Header.css";

const Navbar = () => {
  console.log("Header component loaded");
  // Use react-router location to detect current path
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth();
  const path = typeof location !== 'undefined' ? location.pathname : '/'
  const isHome = path === '/' || path.toLowerCase().includes('home')

  const [scrolled, setScrolled] = useState(isHome ? false : true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return // no scroll listener on non-home pages

    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true)
      else setScrolled(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""} ${!isHome ? "static-page" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo z-50 relative">QuickStay</Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 relative text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ color: (scrolled || !isHome || isMenuOpen) ? 'black' : 'white' }}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <nav className={`navbar-nav ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/rooms" onClick={() => setIsMenuOpen(false)}>Rooms</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          {user && <Link to="/my-bookings" onClick={() => setIsMenuOpen(false)}>My Bookings</Link>}

          {/* Mobile Login/Logout Button inside menu */}
          <div className="md:hidden mt-4">
            {user ? (
              <button className="navbar-login-btn w-full" onClick={handleLogout}>Logout</button>
            ) : (
              <button className="navbar-login-btn w-full" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>Login</button>
            )}
          </div>
        </nav>

        {/* Desktop Login/Logout Button */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className={`text-sm font-medium ${scrolled || !isHome ? 'text-black' : 'text-white'}`}>Hi, {user.name || user.username}</span>
              <button className="navbar-login-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className="navbar-login-btn" onClick={() => navigate('/login')}>Login</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
