import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="text-xl font-bold text-gray-800 tracking-tight">
            🛍️ Shop
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`nav-link ${isActive('/shop') ? 'active' : ''}`}
            >
              Shop
            </Link>

            {/* Auth / user */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">👤 {user.name}</span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-500 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )}

            {/* Cart Icon with badge */}
            <Link to="/checkout" className="relative flex items-center">
              <span className="text-2xl">🛒</span>
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  key={totalItems}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
