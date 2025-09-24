import React from 'react';
import { ShoppingCart, Heart, User, Menu } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  favoriteCount: number;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount, favoriteCount }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">LifeStyle</div>
            <div className="hidden sm:block text-sm text-gray-500 ml-2">
              Hayatı Kolaylaştıran Çözümler
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Ana Sayfa</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Ürünler</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Kategoriler</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Hakkımızda</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">İletişim</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Favorites */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <Heart size={20} />
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User */}
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <User size={20} />
            </button>

            {/* Mobile menu */}
            <button className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};