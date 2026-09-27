import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Login } from './pages/Login';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';

function Layout({ children }) {
  return <><Navbar /><main className="page-container py-8">{children}</main></>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider><CartProvider><OrderProvider><Layout>
        <Routes>
          <Route path="/" element={<Home />} /><Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} /><Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout></OrderProvider></CartProvider></AuthProvider>
    </BrowserRouter>
  );
}