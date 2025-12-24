
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { ShoppingCart, User as UserIcon, LogIn, LayoutDashboard, Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  cartCount: number;
  onNavigate: (page: string, params?: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, cartCount, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <span className="text-2xl font-bold text-blue-600">متجر</span>
            <span className="text-2xl font-bold text-gray-800">برو</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse flex-grow justify-center">
            <button onClick={() => onNavigate('home')} className="text-gray-600 hover:text-blue-600 font-medium">الرئيسية</button>
            <button onClick={() => onNavigate('products')} className="text-gray-600 hover:text-blue-600 font-medium">المنتجات</button>
            {user?.role === UserRole.ADMIN && (
              <button onClick={() => onNavigate('admin')} className="text-blue-600 hover:text-blue-700 font-bold flex items-center">
                <LayoutDashboard className="w-5 h-5 ml-1" />
                لوحة التحكم
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative group hidden sm:block">
              <input 
                type="text" 
                placeholder="ابحث..." 
                className="bg-gray-100 border-none rounded-full py-2 px-4 pr-10 focus:ring-2 focus:ring-blue-500 w-48 transition-all duration-300 focus:w-64"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 w-4 h-4" />
            </div>

            <button 
              onClick={() => onNavigate('cart')} 
              className="relative p-2 text-gray-600 hover:text-blue-600 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <button 
                onClick={() => onNavigate('profile')} 
                className="flex items-center space-x-2 space-x-reverse bg-gray-50 border border-gray-200 py-1 px-3 rounded-full hover:bg-gray-100 transition"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                  {user.avatar ? <img src={user.avatar} alt={user.name} /> : <UserIcon className="w-5 h-5 text-blue-600" />}
                </div>
                <span className="hidden lg:block text-sm font-semibold">{user.name}</span>
              </button>
            ) : (
              <button 
                onClick={() => onNavigate('login')} 
                className="flex items-center space-x-2 space-x-reverse bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                <LogIn className="w-5 h-5" />
                <span className="hidden sm:block">دخول</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col space-y-4">
          <button onClick={() => { onNavigate('home'); setIsOpen(false); }} className="text-right text-gray-600 font-medium py-2">الرئيسية</button>
          <button onClick={() => { onNavigate('products'); setIsOpen(false); }} className="text-right text-gray-600 font-medium py-2">المنتجات</button>
          {user?.role === UserRole.ADMIN && (
            <button onClick={() => { onNavigate('admin'); setIsOpen(false); }} className="text-right text-blue-600 font-bold py-2">لوحة التحكم</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
