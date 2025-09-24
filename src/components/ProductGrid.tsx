import React from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToFavorites: (productId: string) => void;
  favoriteIds: Set<string>;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onQuickView,
  onAddToFavorites,
  favoriteIds
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
          onAddToFavorites={onAddToFavorites}
          isFavorite={favoriteIds.has(product.id)}
        />
      ))}
    </div>
  );
};