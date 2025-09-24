export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  freeShipping: boolean;
  shippingCost?: number;
  variants: ProductVariant[];
  features: string[];
  inStock: boolean;
  stockCount: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: VariantOption[];
}

export interface VariantOption {
  id: string;
  name: string;
  value: string;
  price?: number;
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  variantSelections: { [variantId: string]: string };
  quantity: number;
}