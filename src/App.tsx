import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { sampleProducts } from './data/products';
import { Product } from './types/product';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [cartItemCount] = useState(0);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(sampleProducts.map(product => product.category)));
  }, []);

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter(product => {
      // Search query filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.category.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (product.rating < minRating) {
        return false;
      }

      // Free shipping filter
      if (freeShippingOnly && !product.freeShipping) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, priceRange, minRating, freeShippingOnly]);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToFavorites = (productId: string) => {
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={cartItemCount} favoriteCount={favoriteIds.size} />
      
      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          onSearch={setSearchQuery}
          onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
          searchQuery={searchQuery}
        />

        <div className="flex gap-8">
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            minRating={minRating}
            onRatingChange={setMinRating}
            freeShippingOnly={freeShippingOnly}
            onFreeShippingChange={setFreeShippingOnly}
          />

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchQuery ? `"${searchQuery}" için sonuçlar` : 'Tüm Ürünler'}
              </h2>
              <div className="text-gray-600">
                {filteredProducts.length} ürün bulundu
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <ProductGrid
                products={filteredProducts}
                onQuickView={handleQuickView}
                onAddToFavorites={handleAddToFavorites}
                favoriteIds={favoriteIds}
              />
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aradığınız kriterlere uygun ürün bulunamadı
                </h3>
                <p className="text-gray-600 mb-4">
                  Farklı arama terimleri veya filtreler deneyebilirsiniz
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setPriceRange([0, 10000]);
                    setMinRating(0);
                    setFreeShippingOnly(false);
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;