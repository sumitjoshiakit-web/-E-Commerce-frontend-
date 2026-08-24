import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export function Checkout() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  // ... cart list, quantity controls, place order
}
