import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function Login() {
  const { loginAsGuest, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  return <button onClick={loginAsGuest}>Login as Guest</button>;
}
