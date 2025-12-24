
import React from 'react';
import { CartItem } from '../types';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, AlertCircle } from 'lucide-react';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, q: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, onUpdateQuantity, onRemove, onCheckout }) => {
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 35;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-gray-100 p-10 rounded-full mb-6">
          <ShoppingBag className="w-20 h-20 text-gray-300" />
        </div>
        <h2 className="text-3xl font-black text-gray-800 mb-4">سلة التسوق فارغة</h2>
        <p className="text-gray-500 mb-8 max-w-sm">يبدو أنك لم تضف أي منتجات إلى السلة حتى الآن. ابدأ بالتسوق الآن واكتشف أفضل العروض.</p>
        <button 
          onClick={() => window.location.hash = '#products'} 
          className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          اكتشف المنتجات
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <h1 className="text-3xl font-black text-gray-900 mb-10">سلة التسوق ({cart.length})</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="flex-grow space-y-6">
          {cart.map(item => (
            <div key={item.productId} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 group">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition">{item.product.name}</h3>
                  <button onClick={() => onRemove(item.productId)} className="text-gray-400 hover:text-red-500 transition p-1">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mb-4">{item.product.category}</p>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center bg-gray-100 rounded-xl p-1 shadow-inner">
                      <button 
                        onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)} 
                        className="w-9 h-9 flex items-center justify-center bg-white rounded-lg shadow-sm transition text-gray-600 hover:text-blue-600 active:scale-95"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-black text-gray-800 text-lg">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)} 
                        disabled={item.quantity >= item.product.stock}
                        className={`w-9 h-9 flex items-center justify-center bg-white rounded-lg shadow-sm transition active:scale-95 ${
                          item.quantity >= item.product.stock 
                          ? 'text-gray-300 cursor-not-allowed opacity-50' 
                          : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {item.quantity >= item.product.stock && (
                      <div className="flex items-center gap-1 text-[10px] text-orange-500 font-bold px-1">
                        <AlertCircle className="w-3 h-3" />
                        الكمية المتاحة بالكامل
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-black text-gray-900">
                    {item.product.price * item.quantity} <span className="text-sm font-normal text-gray-500">ر.س</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-96 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">ملخص الطلب</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>المجموع الفرعي</span>
                <span className="font-bold text-gray-800">{subtotal} ر.س</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>الشحن</span>
                <span className={`font-bold ${shipping === 0 ? 'text-green-500' : 'text-gray-800'}`}>
                  {shipping === 0 ? 'مجاني' : `${shipping} ر.س`}
                </span>
              </div>
              {shipping > 0 && (
                <div className="text-xs text-blue-500 bg-blue-50 p-2 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-3 h-3" />
                  أضف {500 - subtotal} ر.س إضافية للحصول على شحن مجاني!
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-end mb-8 border-t pt-4">
              <span className="text-lg font-bold text-gray-800">الإجمالي</span>
              <span className="text-3xl font-black text-blue-600">{total} <span className="text-sm font-normal text-gray-500">ر.س</span></span>
            </div>
            
            <button 
              onClick={onCheckout}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-xl hover:scale-[1.02]"
            >
              إتمام الشراء
            </button>
            
            <button 
              onClick={() => window.location.hash = '#products'}
              className="w-full mt-4 text-gray-500 font-bold flex items-center justify-center gap-2 hover:text-gray-700"
            >
              <ArrowRight className="w-4 h-4" />
              مواصلة التسوق
            </button>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-3">
            <h4 className="font-bold text-blue-800 text-sm">طرق الدفع المدعومة</h4>
            <div className="flex gap-2">
              <div className="bg-white p-2 rounded border border-gray-100 flex-1 h-10 flex items-center justify-center text-[10px] text-gray-400 font-bold">VISA</div>
              <div className="bg-white p-2 rounded border border-gray-100 flex-1 h-10 flex items-center justify-center text-[10px] text-gray-400 font-bold">MADA</div>
              <div className="bg-white p-2 rounded border border-gray-100 flex-1 h-10 flex items-center justify-center text-[10px] text-gray-400 font-bold">APPLE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
