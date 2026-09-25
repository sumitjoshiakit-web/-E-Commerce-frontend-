import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const { loginAsGuest, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const from = location.state?.from?.pathname || null;

  const handleGuestLogin = () => {
    loginAsGuest();

    if (from) {
      navigate(from, { replace: true });
      return;
    }

    setLoginSuccess(true);
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {loginSuccess ? 'Login Successful' : 'Welcome Back'}
        </h2>

        {loginSuccess ? (
          <>
            <div className="mt-5 rounded-xl bg-green-50 border border-green-200 p-4 text-center">
              <p className="font-semibold text-green-800">You are logged in as Guest.</p>
              <p className="text-sm text-green-700 mt-1">
                Your account state is active and your cart is still available.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              <Link
                to="/shop"
                className="w-full bg-gray-900 hover:bg-gray-700 text-white py-3 rounded-full flex items-center justify-center transition font-medium"
              >
                Continue Shopping
              </Link>
              <Link
                to="/checkout"
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 rounded-full flex items-center justify-center transition font-medium"
              >
                View Cart / Checkout
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 text-center mt-1">
              Sign in to continue to checkout
            </p>

            <div className="mt-8 space-y-4">
              <button
                onClick={handleGuestLogin}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-full flex items-center justify-center gap-2 transition font-medium"
              >
                🚪 Login as Guest
              </button>
              <p className="text-xs text-gray-400 text-center">
                No password required — just click to continue.
              </p>
            </div>

            <div className="mt-6 text-center text-sm text-gray-400">
              <p>Protected routes will be available after login.</p>
              <Link to="/" className="text-gray-600 hover:underline mt-2 inline-block">
                ← Back to Home
              </Link>
            </div>
          </>
        )}

        {isAuthenticated && !loginSuccess && user && (
          <p className="mt-4 text-xs text-center text-gray-400">
            Currently signed in as {user.name}.
          </p>
        )}
      </div>
    </div>
  );
}
