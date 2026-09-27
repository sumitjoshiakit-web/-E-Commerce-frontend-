import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllProducts } from '../utils/api';
import { ProductCard } from '../components/ProductCard';

export function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sort, setSort] = useState('default');

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

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = normalizedQuery
      ? products.filter((product) =>
          [product.title, product.description, product.category, product.brand]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(normalizedQuery))
        )
      : [...products];

    if (sort === 'price-low') return result.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') return result.sort((a, b) => b.price - a.price);
    if (sort === 'rating') return result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [products, query, sort]);

  const clearSearch = () => setSearchParams({});

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
      <div className="rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 sm:p-8 text-white mb-7">
        <p className="text-sm font-medium text-gray-300">Discover something you’ll love</p>
        <div className="mt-2 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Shop Products</h1>
            <p className="text-gray-300 mt-2 max-w-xl">Search by product name, brand, category or description.</p>
          </div>
          <div className="text-sm text-gray-300">
            Showing <span className="font-semibold text-white">{filteredProducts.length}</span> of {products.length} products
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 mb-7 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                const value = event.target.value;
                setSearchParams(value.trim() ? { q: value } : {});
              }}
              placeholder="Search products, brands or categories..."
              aria-label="Filter products"
              className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
            />
          </div>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort products"
            className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 outline-none focus:border-gray-400"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>

        {query && (
          <div className="mt-3 flex items-center justify-between gap-3 text-sm">
            <p className="text-gray-500">Search results for <span className="font-semibold text-gray-900">“{query}”</span></p>
            <button onClick={clearSearch} className="font-semibold text-gray-700 hover:text-black">Clear</button>
          </div>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-2xl">
          <div className="text-5xl">🔎</div>
          <h2 className="text-xl font-bold text-gray-900 mt-4">No products found</h2>
          <p className="text-gray-500 mt-2">Try a different product name, brand or category.</p>
          <button onClick={clearSearch} className="mt-5 btn-outline">View All Products</button>
        </div>
      )}
    </section>
  );
}