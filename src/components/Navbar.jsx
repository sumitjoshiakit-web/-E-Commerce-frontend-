import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(location.pathname === '/shop' ? params.get('q') || '' : '');
  }, [location.pathname, location.search]);

  const isActive = (path) => location.pathname === path;

  const handleSearch = (event) => {
    event.preventDefault();
    const value = query.trim();
    navigate(value ? `/shop?q=${encodeURIComponent(value)}` : '/shop');
  };

  return (
    <nav className="bg-white/95 backdrop-blur border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-16 py-3 flex flex-wrap items-center gap-3 lg:gap-5">
          <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight shrink-0">
            🛍️ Shop
          </Link>

          <form onSubmit={handleSearch} role="search" className="order-3 lg:order-none w-full lg:flex-1 lg:max-w-md lg:mx-auto">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">⌕</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full h-10 rounded-full border border-gray-200 bg-gray-50 pl-10 pr-20 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-900 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-700"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
            <Link to="/shop" className={`nav-link ${isActive('/shop') ? 'active' : ''}`}>Shop</Link>
            {user && <Link to="/orders" className={`nav-link ${isActive('/orders') ? 'active' : ''}`}>Orders</Link>}

            {user ? (
              <div className="hidden sm:flex items-center gap-3 ml-1">
                <span className="text-sm text-gray-600">👤 {user.name}</span>
                <button onClick={logout} className="text-sm text-gray-500 hover:text-red-600 transition">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}

            <Link to="/checkout" className="relative flex items-center px-2" aria-label="Cart">
              <span className="text-2xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 min-w-5 px-1 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {user && (
          <div className="sm:hidden flex items-center justify-end gap-3 pb-3 -mt-1">
            <span className="text-xs text-gray-500">👤 {user.name}</span>
            <button onClick={logout} className="text-xs font-medium text-gray-500 hover:text-red-600 transition">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}