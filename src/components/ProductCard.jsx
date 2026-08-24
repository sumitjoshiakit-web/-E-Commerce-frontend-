import { useNavigate } from 'react-router-dom';

export function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/product/${product.id}`)} className="...">
      {/* image, title, price, rating */}
    </div>
  );
}
