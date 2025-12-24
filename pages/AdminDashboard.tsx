
import React, { useState } from 'react';
import { Product, Order, OrderStatus, Category } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { 
  Plus, Edit, Trash2, TrendingUp, ShoppingBag, 
  Users, Package, CheckCircle, Clock, AlertCircle,
  Eye, Save, X
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  categories: Category[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ products, orders, categories, setProducts, setOrders }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders'>('stats');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Stats Logic
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === OrderStatus.PENDING).length;
  
  const chartData = orders.slice(-7).map(o => ({
    name: o.date,
    sales: o.total
  }));

  const deleteProduct = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const saveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    setProducts(prev => {
      const exists = prev.find(p => p.id === editingProduct.id);
      if (exists) {
        return prev.map(p => p.id === editingProduct.id ? editingProduct : p);
      }
      return [...prev, { ...editingProduct, id: `p${Date.now()}`, reviews: [], rating: 0 }];
    });
    setEditingProduct(null);
  };

  return (
    <div className="pb-20">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-black text-gray-900">لوحة تحكم المدير</h1>
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
          <button 
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition ${activeTab === 'stats' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-800'}`}
          >إحصائيات</button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition ${activeTab === 'products' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-800'}`}
          >المنتجات</button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-800'}`}
          >الطلبات</button>
        </div>
      </div>

      {activeTab === 'stats' && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<TrendingUp className="text-green-500" />} label="إجمالي المبيعات" value={`${totalRevenue} ر.س`} color="green" />
            <StatCard icon={<ShoppingBag className="text-blue-500" />} label="إجمالي الطلبات" value={orders.length} color="blue" />
            <StatCard icon={<Package className="text-orange-500" />} label="المنتجات" value={products.length} color="orange" />
            <StatCard icon={<Users className="text-purple-500" />} label="العملاء" value="1,240" color="purple" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6">نمو المبيعات (أحدث 7 أيام)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6">أهم التصنيفات مبيعاً</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'إلكترونيات', value: 4500 },
                    { name: 'أزياء', value: 3200 },
                    { name: 'منزل', value: 1800 },
                    { name: 'جمال', value: 2400 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">إدارة المنتجات</h2>
            <button 
              onClick={() => setEditingProduct({ id: '', name: '', description: '', price: 0, category: 'electronics', image: 'https://picsum.photos/500/500', stock: 0, rating: 0, reviews: [] })}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
              إضافة منتج جديد
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-600">المنتج</th>
                  <th className="px-6 py-4 font-bold text-gray-600">التصنيف</th>
                  <th className="px-6 py-4 font-bold text-gray-600">السعر</th>
                  <th className="px-6 py-4 font-bold text-gray-600">المخزون</th>
                  <th className="px-6 py-4 font-bold text-gray-600">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                        <span className="font-bold text-gray-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{product.price} ر.س</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${product.stock < 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {product.stock} قطع
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => setEditingProduct(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">إدارة الطلبات</h2>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-600">رقم الطلب</th>
                  <th className="px-6 py-4 font-bold text-gray-600">العميل</th>
                  <th className="px-6 py-4 font-bold text-gray-600">الإجمالي</th>
                  <th className="px-6 py-4 font-bold text-gray-600">الحالة</th>
                  <th className="px-6 py-4 font-bold text-gray-600">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 font-bold text-gray-800">#{order.id.slice(-6)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.shippingAddress}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">{order.total} ر.س</td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold p-1"
                      >
                        <option value={OrderStatus.PENDING}>انتظار</option>
                        <option value={OrderStatus.PROCESSING}>معالجة</option>
                        <option value={OrderStatus.SHIPPED}>تم الشحن</option>
                        <option value={OrderStatus.DELIVERED}>تم التوصيل</option>
                        <option value={OrderStatus.CANCELLED}>ملغي</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-blue-600 p-2"><Eye className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="bg-gray-50 px-8 py-4 flex justify-between items-center border-b border-gray-100">
              <h3 className="text-xl font-bold">{editingProduct.id ? 'تعديل منتج' : 'منتج جديد'}</h3>
              <button onClick={() => setEditingProduct(null)}><X className="w-6 h-6 text-gray-400 hover:text-gray-800" /></button>
            </div>
            <form onSubmit={saveProduct} className="p-8 grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">اسم المنتج</label>
                <input 
                  type="text" 
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">السعر (ر.س)</label>
                <input 
                  type="number" 
                  value={editingProduct.price}
                  onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">المخزون</label>
                <input 
                  type="number" 
                  value={editingProduct.stock}
                  onChange={e => setEditingProduct({...editingProduct, stock: Number(e.target.value)})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">التصنيف</label>
                <select 
                  value={editingProduct.category}
                  onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">رابط الصورة</label>
                <input 
                  type="text" 
                  value={editingProduct.image}
                  onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">الوصف</label>
                <textarea 
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  required
                />
              </div>
              <div className="col-span-2 flex gap-4 mt-4">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  حفظ التغييرات
                </button>
                <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-xl font-bold">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string | number, color: string }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
    <div className={`p-4 rounded-2xl bg-${color}-50`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-bold text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-black text-gray-900">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
