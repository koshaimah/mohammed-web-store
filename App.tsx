
import React, { useState, useEffect, useCallback } from 'react';
import { User, UserRole, Product, Category, CartItem, Order, OrderStatus } from './types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, MOCK_ADMIN, MOCK_CUSTOMER, INITIAL_ORDERS } from './constants';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import { CheckCircle, X } from 'lucide-react';

const App: React.FC = () => {
  // Navigation State (Simple Hash Routing simulation)
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Authentication State
  const [user, setUser] = useState<User | null>(null);
  
  // Platform Data State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedProducts = localStorage.getItem('products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));

    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Toast auto-hide
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Actions
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        return prev.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: newQty } 
            : item
        );
      }
      return [...prev, { productId: product.id, quantity, product }];
    });
    
    setToast({ 
      message: `تم إضافة "${product.name}" إلى السلة بنجاح!`, 
      type: 'success' 
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return removeFromCart(productId);
    
    setCart(prev => prev.map(item => {
      if (item.productId === productId) {
        const newQty = Math.min(quantity, item.product.stock);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const placeOrder = (shippingAddress: string) => {
    if (!user) return;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      userId: user.id,
      items: cart.map(item => ({
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      })),
      total: cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0),
      status: OrderStatus.PENDING,
      date: new Date().toISOString().split('T')[0],
      shippingAddress
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setCurrentPage('profile');
    setToast({ message: 'تم إتمام الطلب بنجاح!', type: 'success' });
  };

  const navigateTo = (page: string, params?: any) => {
    if (page === 'product' && params?.id) setSelectedProductId(params.id);
    if (page === 'category' && params?.category) setSelectedCategory(params.category);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (role: UserRole) => {
    const mockUser = role === UserRole.ADMIN ? MOCK_ADMIN : MOCK_CUSTOMER;
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setCurrentPage('home');
    setToast({ message: `مرحباً بك، ${mockUser.name}`, type: 'info' });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentPage('home');
    setToast({ message: 'تم تسجيل الخروج', type: 'info' });
  };

  // Rendering logic
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home 
          products={products.filter(p => p.isFeatured)} 
          categories={categories}
          onProductClick={(id) => navigateTo('product', { id })}
          onCategoryClick={(cat) => navigateTo('category', { category: cat })}
        />;
      case 'category':
      case 'products':
        return <ProductList 
          products={selectedCategory ? products.filter(p => p.category === selectedCategory) : products}
          categories={categories}
          selectedCategory={selectedCategory}
          onProductClick={(id) => navigateTo('product', { id })}
          onCategoryChange={setSelectedCategory}
        />;
      case 'product':
        const prod = products.find(p => p.id === selectedProductId);
        return prod ? <ProductDetail product={prod} onAddToCart={addToCart} /> : <div>Product not found</div>;
      case 'cart':
        return <Cart 
          cart={cart} 
          onUpdateQuantity={updateCartQuantity} 
          onRemove={removeFromCart} 
          onCheckout={() => navigateTo('checkout')}
        />;
      case 'checkout':
        return <Checkout 
          cart={cart} 
          onPlaceOrder={placeOrder} 
          user={user}
          onLogin={() => navigateTo('login')}
        />;
      case 'profile':
        return user ? (
          <Profile 
            user={user} 
            orders={orders.filter(o => o.userId === user.id)} 
            onLogout={handleLogout} 
          />
        ) : <Login onLogin={handleLogin} />;
      case 'admin':
        return user?.role === UserRole.ADMIN ? (
          <AdminDashboard 
            products={products} 
            orders={orders} 
            categories={categories}
            setProducts={setProducts}
            setOrders={setOrders}
          />
        ) : <div>Access Denied</div>;
      case 'login':
        return <Login onLogin={handleLogin} />;
      default:
        return <Home products={products} categories={categories} onProductClick={(id) => navigateTo('product', { id })} onCategoryClick={(cat) => navigateTo('category', { category: cat })} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar 
        user={user} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onNavigate={navigateTo}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[100] animate-bounce-in">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
            toast.type === 'success' ? 'bg-green-600 border-green-500 text-white' : 'bg-blue-600 border-blue-500 text-white'
          }`}>
            <CheckCircle className="w-6 h-6" />
            <p className="font-bold">{toast.message}</p>
            <button onClick={() => setToast(null)} className="mr-4 hover:opacity-70">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">متجرنا</h3>
              <p className="text-gray-400">نحن نقدم أفضل المنتجات بأعلى جودة وأقل سعر في السوق.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigateTo('products')} className="text-gray-400 hover:text-white transition">جميع المنتجات</button></li>
                <li><button onClick={() => navigateTo('home')} className="text-gray-400 hover:text-white transition">الرئيسية</button></li>
                <li><button onClick={() => navigateTo('profile')} className="text-gray-400 hover:text-white transition">حسابي</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
              <p className="text-gray-400">info@storepro.com</p>
              <p className="text-gray-400">+966 500 000 000</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-gray-500">
            جميع الحقوق محفوظة &copy; 2024 متجر برو
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes bounce-in {
          0% { transform: translateY(100px) scale(0.9); opacity: 0; }
          70% { transform: translateY(-10px) scale(1.02); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
