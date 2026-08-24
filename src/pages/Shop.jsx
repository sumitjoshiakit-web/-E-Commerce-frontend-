import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../utils/api';
import { ProductCard } from '../components/ProductCard';

export function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <section>
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="aspect-square bg-gray-100 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3" />
                <div className="h-10 bg-gray-100 rounded-xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="text-center py-16">
        <div className="text-5xl">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 mt-4">Couldn’t load products</h1>
        <p className="text-gray-500 mt-2">{error}</p>
        <button onClick={loadProducts} className="mt-6 btn-outline">Try Again</button>
      </section>
    );
  }

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">
        <div>
          <p className="text-sm font-medium text-gray-500">Our catalog</p>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">Shop Products</h1>
        </div>
        <span className="text-sm text-gray-500">{products.length} products</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
