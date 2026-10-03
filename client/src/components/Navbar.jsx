import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Compass, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 ${
      isActive ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
    }`;

  const navLinks = [
    { to: '/',           label: 'Home' },
    { to: '/explore',    label: 'Career Explorer' },
    { to: '/about',      label: 'About' },
    ...(isAuthenticated
      ? [
          { to: '/assessment', label: 'Assessment' },
          { to: '/dashboard',  label: 'My Dashboard' },
        ]
      : []),
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary-700">
            <Compass className="w-6 h-6" />
            <span>CareerPath</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === '/'}>
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Auth buttons - desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {user?.name?.split(' ')[0]}
                </span>
                <button onClick={handleLogout} className="btn-ghost text-sm py-1.5 px-3">
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            ) : (
              <>
                <Link to="/login"    className="btn-ghost text-sm py-2 px-3">Sign in</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Get started</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-1 animate-fade-in">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-gray-200 space-y-2">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4" /> Sign out ({user?.name?.split(' ')[0]})
                </button>
              ) : (
                <>
                  <Link to="/login"    onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100">Sign in</Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="block px-3 py-2.5 text-sm text-white bg-primary-600 rounded-lg hover:bg-primary-700">Get started</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
