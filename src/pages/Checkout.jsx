import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export function Checkout() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();

  if (items.length === 0) {
    return (
      <section className="max-w-2xl mx-auto text-center py-16">
        <div className="text-6xl">🛒</div>
        <h1 className="mt-5 text-3xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mt-2 text-gray-500">Add some products before checking out.</p>
        <Link to="/shop" className="inline-block mt-7 bg-gray-900 text-white px-7 py-3 rounded-full font-semibold hover:bg-gray-700 transition">
          Browse Products
        </Link>
      </section>
    );
  }

  const handlePlaceOrder = () => {
    window.alert(`Thanks, ${user?.name || 'Guest'}! Your demo order has been placed.`);
    clearCart();
  };

  return (
    <section className="max-w-5xl mx-auto">
      <div className="flex items-end justify-between gap-4 mb-7">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-500 mt-1">{totalItems} item{totalItems === 1 ? '' : 's'} ready for checkout.</p>
        </div>
        <button onClick={clearCart} className="text-sm text-red-600 hover:underline">Clear cart</button>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        <div className="space-y-4">
          {items.map((item) => (
            <article key={item.id} className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 flex gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gray-50 flex items-center justify-center p-2 shrink-0">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-3">
                  <h2 className="font-semibold text-gray-900 line-clamp-2">{item.title}</h2>
                  <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-600" aria-label={`Remove ${item.title}`}>
                    ✕
                  </button>
                </div>
                <p className="text-lg font-bold mt-2">${Number(item.price).toFixed(2)}</p>
                <div className="flex items-center gap-3 mt-3">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full border hover:bg-gray-100">−</button>
                  <span className="font-medium w-5 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full border hover:bg-gray-100">+</button>
                  <span className="text-sm text-gray-500 ml-auto">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="bg-white border border-gray-200 rounded-2xl p-6 h-fit lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Items</span><span>{totalItems}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>Free</span></div>
          </div>
          <div className="border-t mt-5 pt-5 flex justify-between text-lg font-bold">
            <span>Total</span><span>${totalPrice.toFixed(2)}</span>
          </div>
          <button onClick={handlePlaceOrder} className="w-full mt-6 bg-gray-900 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition">
            Place Demo Order
          </button>
          <p className="text-xs text-gray-400 mt-3 text-center">Demo checkout — no real payment is processed.</p>
        </aside>
      </div>
    </section>
  );
}
