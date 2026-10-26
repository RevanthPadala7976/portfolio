import React from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Sun, Moon } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = ['Home', 'Education', 'Experience', 'Projects', 'Skills', 'Contact'];

export default function Navbar({ darkMode, setDarkMode, isMenuOpen, setIsMenuOpen }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          <div className="navbar-logo">
            RP.
          </div>

          {/* Desktop Nav */}
          <div className="navbar-desktop-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link}
                to={link.toLowerCase()}
                smooth={true}
                duration={500}
                className="navbar-link"
              >
                {link}
              </Link>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="navbar-theme-btn"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="navbar-mobile-controls">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="navbar-theme-btn"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="navbar-menu-btn"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="navbar-mobile-menu">
          {NAV_LINKS.map((link) => (
            <Link
              key={link}
              to={link.toLowerCase()}
              smooth={true}
              duration={500}
              onClick={() => setIsMenuOpen(false)}
              className="navbar-mobile-link"
            >
              {link}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
