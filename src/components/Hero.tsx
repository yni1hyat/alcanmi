import React from 'react';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Hayatı <span className="text-blue-300">Kolaylaştıran</span> 
                <br />Akıllı Çözümler
              </h1>
              <p className="text-xl text-blue-100 mt-4 leading-relaxed">
                Günlük yaşamınızı daha verimli, pratik ve keyifli hale getirecek 
                yenilikçi ürünleri keşfedin.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2">
                Ürünleri Keşfet
                <ArrowRight size={20} />
              </button>
              <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Kategoriler
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center gap-3">
                <Truck className="text-blue-300" size={24} />
                <div>
                  <div className="font-semibold">Hızlı Kargo</div>
                  <div className="text-sm text-blue-100">24 saat içinde</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-blue-300" size={24} />
                <div>
                  <div className="font-semibold">2 Yıl Garanti</div>
                  <div className="text-sm text-blue-100">Güvenli alışveriş</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="text-blue-300" size={24} />
                <div>
                  <div className="font-semibold">Yenilikçi</div>
                  <div className="text-sm text-blue-100">Son teknoloji</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <img
                src="https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Akıllı Ürünler"
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-orange-400 text-white p-4 rounded-lg shadow-lg">
              <div className="text-2xl font-bold">%50</div>
              <div className="text-sm">İndirim</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};