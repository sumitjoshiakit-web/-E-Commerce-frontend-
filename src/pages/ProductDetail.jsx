import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../utils/api';
import { useCart } from '../context/CartContext';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500 text-lg">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center text-red-500 py-12">
        <p>⚠️ {error || 'Product not found'}</p>
        <button onClick={() => navigate('/shop')} className="mt-4 btn-outline">
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/shop')}
        className="text-gray-500 hover:text-gray-800 mb-6 inline-block"
      >
        ← Back to Shop
      </button>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden md:flex">
        <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-8 min-h-[300px]">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-80 object-contain"
          />
        </div>
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-500 text-sm mt-1">{product.brand}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">
              ★ {product.rating.toFixed(1)} ({product.reviews?.length || 0})
            </span>
          </div>
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags?.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium flex-1 flex items-center justify-center gap-2 transition"
            >
              🛒 {added ? '✓ Added!' : 'Add to Cart'}
            </button>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-full font-medium flex-1 text-center transition"
            >
              Checkout
            </button>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            {product.stock > 0 ? `✅ ${product.stock} in stock` : '❌ Out of stock'}
          </div>
        </div>
      </div>
    </div>
  );
}
