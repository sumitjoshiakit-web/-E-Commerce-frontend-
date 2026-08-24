import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <h1>Welcome to Your Shop 🛍️</h1>
      <Link to="/shop">Start Shopping</Link>
      <Link to="/login">Login as Guest</Link>
    </div>
  );
}


