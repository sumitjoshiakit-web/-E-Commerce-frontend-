import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../utils/api';
import { ProductCard } from '../components/ProductCard';

export function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // ... fetch and render ProductCard for each
}
