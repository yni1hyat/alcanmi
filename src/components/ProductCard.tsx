import React, { useState } from 'react';
import { Star, Heart, Eye, Truck, ShoppingCart } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToFavorites: (productId: string) => void;
  isFavorite?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onQuickView, 
  onAddToFavorites, 
  isFavorite = false 
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          %{discountPercentage} İndirim
        </div>
      )}

      {/* Favorite & Quick View Buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onAddToFavorites(product.id)}
          className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <button
          onClick={() => onQuickView(product)}
          className="p-2 bg-white/80 backdrop-blur-sm text-gray-600 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200 hover:scale-110"
        >
          <Eye size={16} />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.images[imageIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Image Navigation */}
        {product.images.length > 1 && isHovered && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === imageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">
          {product.category}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount} yorum)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {product.price}{product.currency}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {product.originalPrice}{product.currency}
            </span>
          )}
        </div>

        {/* Shipping Info */}
        <div className="flex items-center gap-1 text-xs">
          <Truck size={12} className={product.freeShipping ? 'text-green-600' : 'text-gray-400'} />
          <span className={product.freeShipping ? 'text-green-600' : 'text-gray-600'}>
            {product.freeShipping ? 'Ücretsiz Kargo' : `Kargo: ${product.shippingCost}${product.currency}`}
          </span>
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.inStock 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {product.inStock ? `${product.stockCount} adet stokta` : 'Tükendi'}
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button 
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
          disabled={!product.inStock}
        >
          <ShoppingCart size={16} />
          {product.inStock ? 'Sepete Ekle' : 'Tükendi'}
        </button>
      </div>
    </div>
  );
};