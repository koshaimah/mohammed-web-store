
import React, { useState } from 'react';
import { CartItem, User } from '../types';
import { MapPin, CreditCard, ChevronLeft, Lock } from 'lucide-react';

interface CheckoutProps {
  cart: CartItem[];
  user: User | null;
  onPlaceOrder: (address: string) => void;
  onLogin: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, user, onPlaceOrder, onLogin }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1);

  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-8">
        <h2 className="text-3xl font-black">تحتاج لتسجيل الدخول أولاً</h2>
        <p className="text-gray-500">يجب عليك تسجيل الدخول لإتمام عملية الشراء ومتابعة طلباتك.</p>
        <button onClick={onLogin} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">تسجيل الدخول</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-10">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
        <div className="h-0.5 bg-gray-200 flex-grow"></div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
        <div className="h-0.5 bg-gray-200 flex-grow"></div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {step === 1 && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-blue-600" />
                عنوان الشحن
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">العنوان بالتفصيل</label>
                  <input 
                    type="text" 
                    value={address} 
                    onChange={e => setAddress(e.target.value)}
                    placeholder="اسم الشارع، رقم المبنى، الحي" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">المدينة</label>
                  <input 
                    type="text" 
                    value={city} 
                    onChange={e => setCity(e.target.value)}
                    placeholder="مثال: الرياض" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رقم الجوال</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)}
                    placeholder="05xxxxxxxx" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none text-right"
                  />
                </div>
              </div>
              <button 
                onClick={() => setStep(2)}
                disabled={!address || !city || !phone}
                className="w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                المتابعة للدفع
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-blue-600" />
                طريقة الدفع
              </h2>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 border border-blue-200 bg-blue-50 rounded-2xl cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-blue-600" />
                  <div className="flex-grow">
                    <p className="font-bold text-gray-800">الدفع عند الاستلام</p>
                    <p className="text-xs text-blue-600">ادفع نقداً عند استلام طلبك</p>
                  </div>
                </label>
                <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-2xl cursor-not-allowed opacity-50">
                  <input type="radio" name="payment" disabled className="w-5 h-5" />
                  <div className="flex-grow">
                    <p className="font-bold text-gray-800">بطاقة مدى / ائتمانية (قريباً)</p>
                    <p className="text-xs text-gray-400">نظام الدفع الإلكتروني قيد التطوير</p>
                  </div>
                </label>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-500 py-4 rounded-xl font-bold">رجوع</button>
                <button onClick={() => setStep(3)} className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold">مراجعة الطلب</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">تأكيد الطلب</h2>
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <h4 className="font-bold text-gray-800 mb-2">عنوان الشحن:</h4>
                  <p className="text-gray-600">{address}, {city}</p>
                  <p className="text-gray-600">جوال: {phone}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <h4 className="font-bold text-gray-800 mb-2">طريقة الدفع:</h4>
                  <p className="text-gray-600">الدفع عند الاستلام</p>
                </div>
              </div>
              <button 
                onClick={() => onPlaceOrder(`${address}, ${city}`)}
                className="w-full mt-10 bg-green-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-green-700 transition shadow-xl"
              >
                تأكيد وإتمام الطلب
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">عناصر الطلب</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.productId} className="flex gap-4 items-center">
                  <img src={item.product.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{item.product.name}</p>
                    <p className="text-xs text-gray-500">{item.quantity} × {item.product.price} ر.س</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">الإجمالي</span>
                <span className="font-black text-blue-600">{total} ر.س</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <Lock className="w-4 h-4" />
            <span>اتصال آمن ومحمي 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
