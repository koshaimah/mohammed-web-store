
import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, Star, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { enhanceProductDescription } from '../services/geminiService';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentDesc, setCurrentDesc] = useState(product.description);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhance = async () => {
    setIsEnhancing(true);
    const newDesc = await enhanceProductDescription(product.name, product.description);
    setCurrentDesc(newDesc);
    setIsEnhancing(false);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden border border-gray-100 shadow-lg bg-white">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden border border-gray-200 cursor-pointer hover:border-blue-500 transition">
                <img src={`https://picsum.photos/400/400?random=${i + 10}`} alt="Thumb" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8 flex flex-col justify-center">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">{product.category}</span>
            <h1 className="text-4xl font-black text-gray-900 mt-2 mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-lg font-black text-gray-800">{product.rating}</span>
                <span className="text-sm text-gray-400 font-medium">({product.reviews.length} تقييمات)</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {product.stock > 0 ? `متوفر في المخزون (${product.stock})` : 'نفذت الكمية'}
              </span>
            </div>

            <div className="relative group bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-800">وصف المنتج</h3>
                <button 
                  onClick={handleEnhance}
                  disabled={isEnhancing}
                  className="flex items-center gap-2 text-xs font-bold bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 transition disabled:opacity-50"
                >
                  <Sparkles className={`w-3 h-3 ${isEnhancing ? 'animate-spin' : ''}`} />
                  {isEnhancing ? 'جاري التحسين...' : 'تحسين الوصف بذكاء'}
                </button>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">{currentDesc}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-blue-600">{product.price}</span>
              <span className="text-xl text-gray-500 mb-1">ر.س</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center bg-gray-100 rounded-xl p-1 w-32 justify-between">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center font-black text-gray-600 hover:text-blue-600"
                >-</button>
                <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center font-black text-gray-600 hover:text-blue-600"
                >+</button>
              </div>
              <button 
                onClick={() => onAddToCart(product, quantity)}
                disabled={product.stock === 0}
                className="flex-grow bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-[1.02] disabled:bg-gray-300 disabled:scale-100"
              >
                <ShoppingCart className="w-5 h-5" />
                إضافة إلى السلة
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck className="w-8 h-8 text-blue-500 p-1.5 bg-blue-50 rounded-lg" />
              <div>
                <p className="font-bold text-gray-800">توصيل سريع</p>
                <p className="text-xs">خلال 2-3 أيام</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ShieldCheck className="w-8 h-8 text-blue-500 p-1.5 bg-blue-50 rounded-lg" />
              <div>
                <p className="font-bold text-gray-800">ضمان سنة</p>
                <p className="text-xs">استبدال فوري</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RefreshCw className="w-8 h-8 text-blue-500 p-1.5 bg-blue-50 rounded-lg" />
              <div>
                <p className="font-bold text-gray-800">إرجاع مجاني</p>
                <p className="text-xs">خلال 14 يوم</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="bg-white rounded-3xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">مراجعات العملاء ({product.reviews.length})</h2>
        {product.reviews.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map(review => (
              <div key={review.id} className="pb-6 border-b border-gray-50 last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {review.userName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{review.userName}</h4>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mt-3 pr-13">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">لا توجد مراجعات لهذا المنتج بعد. كن أول من يقيمه!</p>
        )}
      </section>
    </div>
  );
};

export default ProductDetail;
