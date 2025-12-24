
import React from 'react';
import { UserRole } from '../types';
import { User, ShieldCheck, Mail, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="max-w-md mx-auto py-20">
      <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 text-center space-y-8">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
          <User className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">مرحباً بك مجدداً</h1>
          <p className="text-gray-500">اختر نوع الحساب الذي تود الدخول به للتجربة</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => onLogin(UserRole.CUSTOMER)}
            className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-blue-50 hover:border-blue-500 hover:bg-blue-50 transition group text-right"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-gray-800">حساب عميل</p>
              <p className="text-xs text-gray-500">تصفح واشترِ المنتجات</p>
            </div>
          </button>

          <button 
            onClick={() => onLogin(UserRole.ADMIN)}
            className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-orange-50 hover:border-orange-500 hover:bg-orange-50 transition group text-right"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-gray-800">لوحة الإدارة</p>
              <p className="text-xs text-gray-500">إدارة المتجر والتقارير</p>
            </div>
          </button>
        </div>

        <div className="pt-6 border-t border-gray-50 text-gray-400 text-sm">
          * هذه نسخة تجريبية، لا يتطلب الأمر إدخال كلمات مرور حقيقية.
        </div>
      </div>
    </div>
  );
};

export default Login;
