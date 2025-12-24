
import React from 'react';
import { Category, Product } from '../types';
import { ArrowLeft, Star, ShoppingBag } from 'lucide-react';

interface HomeProps {
  products: Product[];
  categories: Category[];
  onProductClick: (id: string) => void;
  onCategoryClick: (slug: string) => void;
}

const Home: React.FC<HomeProps> = ({ products, categories, onProductClick, onCategoryClick }) => {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src="https://picsum.photos/1200/500?random=50" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent flex items-center pr-12">
          <div className="max-w-xl text-white space-y-6">
            <h1 className="text-5xl font-black leading-tight">تسوق أفضل المنتجات التقنية والأزياء</h1>
            <p className="text-lg text-gray-200">اكتشف تشكيلة واسعة من أحدث الأجهزة والإكسسوارات بأسعار لا تقبل المنافسة مع خدمة توصيل سريعة.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => onCategoryClick('')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-transform hover:scale-105"
              >
                تسوق الآن
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-8 py-3 rounded-xl font-bold transition-all">
                العروض الحالية
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">تصفح حسب التصنيف</h2>
            <p className="text-gray-500 mt-1">اختر التصنيف المفضل لديك وابدأ التسوق</p>
          </div>
          <button onClick={() => onCategoryClick('')} className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
            مشاهدة الكل <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => onCategoryClick(cat.slug)}
              className="group cursor-pointer bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              </div>
              <h3 className="text-center font-bold text-gray-800 text-lg">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">منتجات مختارة لك</h2>
            <p className="text-gray-500 mt-1">أفضل المنتجات مبيعاً والأعلى تقييماً</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              onClick={() => onProductClick(product.id)}
              className="group cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <button className="absolute bottom-4 left-4 p-3 bg-white/90 hover:bg-blue-600 hover:text-white rounded-xl shadow-lg transition-all opacity-0 group-hover:opacity-100">
                  <ShoppingBag className="w-5 h-5" />
                </button>
                {product.rating > 4.5 && (
                  <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> الأكثر تميزاً
                  </span>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">{product.category}</p>
                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-blue-600">{product.price} <span className="text-sm font-normal">ر.س</span></span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="mr-1 text-sm font-bold text-gray-600">{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-blue-600 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
        <div className="relative z-10 space-y-4">
          <h2 className="text-4xl font-black">خصم حتى 50% على الإلكترونيات</h2>
          <p className="text-xl text-blue-100">استخدم الكود: PRO2024 عند إتمام الطلب</p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold shadow-lg hover:bg-gray-100 transition-colors">تسوق الآن</button>
        </div>
        <div className="mt-8 md:mt-0 relative z-10">
          <div className="bg-white/20 p-8 rounded-full border border-white/30 backdrop-blur-sm">
             <ShoppingCartIcon className="w-24 h-24" />
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-50" />
      </section>
    </div>
  );
};

// Simple icon for placeholder
const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export default Home;
