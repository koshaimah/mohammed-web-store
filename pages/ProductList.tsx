
import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { Filter, Star, Search, SlidersHorizontal, Grid, List } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string | null;
  onProductClick: (id: string) => void;
  onCategoryChange: (category: string | null) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, categories, selectedCategory, onProductClick, onCategoryChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState(1000);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => !selectedCategory || p.category === selectedCategory)
      .filter(p => p.price <= priceRange)
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // Default: newest (mocked by array order)
      });
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-20">
      {/* Sidebar Filters */}
      <aside className="lg:w-72 flex-shrink-0 space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            الفلاتر
          </h3>
          
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">التصنيف</label>
              <div className="space-y-2">
                <button 
                  onClick={() => onCategoryChange(null)}
                  className={`w-full text-right px-3 py-2 rounded-lg text-sm transition ${!selectedCategory ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  جميع التصنيفات
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => onCategoryChange(cat.slug)}
                    className={`w-full text-right px-3 py-2 rounded-lg text-sm transition ${selectedCategory === cat.slug ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">السعر الأقصى: {priceRange} ر.س</label>
              <input 
                type="range" 
                min="0" 
                max="2000" 
                step="50" 
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0 ر.س</span>
                <span>2000+ ر.س</span>
              </div>
            </div>

            {/* Rating Filter (Mock) */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">الحد الأدنى للتقييم</label>
              <div className="flex gap-2">
                {[4, 3, 2, 1].map(star => (
                  <button key={star} className="flex-1 border border-gray-200 py-1 rounded-lg flex items-center justify-center gap-1 hover:border-blue-400 text-gray-600 text-sm">
                    {star} <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => { setSearchTerm(''); setPriceRange(2000); onCategoryChange(null); }}
          className="w-full py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl border border-dashed border-red-200 transition"
        >
          إعادة تعيين الكل
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-grow space-y-6">
        {/* Header Controls */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="ابحث عن اسم المنتج أو الماركة..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 pr-10 focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setViewType('grid')}
                className={`p-2 rounded-lg transition ${viewType === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewType('list')}
                className={`p-2 rounded-lg transition ${viewType === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none flex-grow sm:flex-grow-0"
            >
              <option value="newest">الأحدث</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
              <option value="rating">الأعلى تقييماً</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className={viewType === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredProducts.map(product => (
              <div 
                key={product.id}
                onClick={() => onProductClick(product.id)}
                className={`group cursor-pointer bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden ${viewType === 'list' ? 'flex flex-row h-48' : ''}`}
              >
                <div className={`${viewType === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'} overflow-hidden bg-gray-100 relative`}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {product.stock <= 5 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">كمية محدودة!</span>
                  )}
                </div>
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-blue-600 uppercase">{product.category}</span>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs mr-1 text-gray-500 font-bold">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition truncate">{product.name}</h3>
                    {viewType === 'list' && <p className="text-sm text-gray-500 line-clamp-2 mt-2">{product.description}</p>}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-black text-gray-900">{product.price} <span className="text-sm font-normal text-gray-500">ر.س</span></span>
                    <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-colors">
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
              <Search className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">لا توجد نتائج بحث</h3>
            <p className="text-gray-500 mt-2">جرب البحث بكلمات مختلفة أو تغيير الفلاتر المحددة</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
