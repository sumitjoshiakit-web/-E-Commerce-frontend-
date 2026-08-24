import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../utils/api';
import { ProductCard } from '../components/ProductCard';

export function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500 text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-12">
        <p>⚠️ {error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 btn-outline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        All Products ({products.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
