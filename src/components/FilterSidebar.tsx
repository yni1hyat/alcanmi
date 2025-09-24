import React from 'react';
import { X, Star } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  freeShippingOnly: boolean;
  onFreeShippingChange: (value: boolean) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onRatingChange,
  freeShippingOnly,
  onFreeShippingChange
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed lg:relative top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 overflow-y-auto ${
        isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Filtreler</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Kategori</h4>
            <div className="space-y-2">
              <button
                onClick={() => onCategoryChange('')}
                className={`block w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                  selectedCategory === '' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Tüm Kategoriler
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                    selectedCategory === category 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Fiyat Aralığı</h4>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value) || 10000])}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="text-sm text-gray-500">
                {priceRange[0]}₺ - {priceRange[1]}₺
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Minimum Puan</h4>
            <div className="space-y-2">
              {[4, 3, 2, 1, 0].map((rating) => (
                <button
                  key={rating}
                  onClick={() => onRatingChange(rating)}
                  className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors duration-200 ${
                    minRating === rating 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm">
                    {rating > 0 ? `${rating}+ yıldız` : 'Tümü'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Free Shipping */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={freeShippingOnly}
                onChange={(e) => onFreeShippingChange(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Sadece Ücretsiz Kargo</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};