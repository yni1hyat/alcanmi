import React, { useState } from 'react';
import { X, Star, Truck, Shield, ChevronLeft, ChevronRight, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product } from '../types/product';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleVariantChange = (variantId: string, optionId: string) => {
    setSelectedVariants(prev => ({ ...prev, [variantId]: optionId }));
  };

  const calculateTotalPrice = () => {
    let totalPrice = product.price;
    
    product.variants.forEach(variant => {
      const selectedOption = selectedVariants[variant.id];
      if (selectedOption) {
        const option = variant.options.find(opt => opt.id === selectedOption);
        if (option?.price) {
          totalPrice += option.price;
        }
      }
    });
    
    return totalPrice * quantity;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="text-sm text-blue-600 font-medium uppercase tracking-wide">
                  {product.category}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h2>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                    <span className="ml-1 font-medium">{product.rating}</span>
                  </div>
                  <span className="text-gray-500">({product.reviewCount} yorum)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  {calculateTotalPrice()}{product.currency}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {product.originalPrice}{product.currency}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{product.description}</p>

              {/* Features */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Özellikler</h4>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Variants */}
              {product.variants.map((variant) => (
                <div key={variant.id}>
                  <h4 className="font-medium text-gray-900 mb-2">{variant.name}</h4>
                  <div className="flex gap-2 flex-wrap">
                    {variant.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleVariantChange(variant.id, option.id)}
                        disabled={!option.inStock}
                        className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                          selectedVariants[variant.id] === option.id
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : option.inStock
                            ? 'border-gray-200 hover:border-gray-300'
                            : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {option.value}
                        {option.price && (
                          <span className="text-xs ml-1">
                            (+{option.price}{product.currency})
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Adet</h4>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-medium text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Shipping & Stock Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Truck size={16} className={product.freeShipping ? 'text-green-600' : 'text-gray-400'} />
                  <span className={product.freeShipping ? 'text-green-600' : 'text-gray-600'}>
                    {product.freeShipping ? 'Ücretsiz Kargo' : `Kargo: ${product.shippingCost}${product.currency}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield size={16} className="text-blue-600" />
                  <span className="text-gray-600">2 yıl garanti</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className={`text-sm px-3 py-2 rounded-lg ${
                product.inStock 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {product.inStock ? `${product.stockCount} adet stokta` : 'Ürün tükendi'}
              </div>

              {/* Add to Cart Button */}
              <button
                disabled={!product.inStock}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
              >
                <ShoppingCart size={20} />
                {product.inStock ? `Sepete Ekle - ${calculateTotalPrice()}${product.currency}` : 'Stokta Yok'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};