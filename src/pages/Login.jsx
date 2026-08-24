import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const { loginAsGuest, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Welcome Back</h2>
        <p className="text-gray-500 text-center mt-1">Sign in to continue to checkout</p>

        <div className="mt-8 space-y-4">
          <button
            onClick={loginAsGuest}
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
      </div>
    </div>
  );
}
