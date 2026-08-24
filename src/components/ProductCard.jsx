import { useNavigate } from 'react-router-dom';

export function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <article
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          navigate(`/product/${product.id}`);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.title}`}
    >
      <div className="aspect-square bg-gray-50 flex items-center justify-center p-5 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">
            {product.title}
          </h3>
          <span className="shrink-0 text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-gray-900">
            ${Number(product.price).toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            ★ {Number(product.rating || 0).toFixed(1)}
          </span>
        </div>

        <button
          type="button"
          className="w-full mt-4 bg-gray-900 hover:bg-gray-700 text-white py-2.5 rounded-xl font-medium transition"
          onClick={(event) => {
            event.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
        >
          View Product
        </button>
      </div>
    </article>
  );
}
