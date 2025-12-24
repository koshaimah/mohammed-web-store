
import React from 'react';
import { User, Order, OrderStatus } from '../types';
import { Package, LogOut, Settings, Clock, CheckCircle2, XCircle, Truck } from 'lucide-react';

interface ProfileProps {
  user: User;
  orders: Order[];
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, orders, onLogout }) => {
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case OrderStatus.SHIPPED: return <Truck className="w-5 h-5 text-blue-500" />;
      case OrderStatus.CANCELLED: return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-orange-500" />;
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return 'تم التوصيل';
      case OrderStatus.SHIPPED: return 'في الطريق';
      case OrderStatus.CANCELLED: return 'ملغي';
      case OrderStatus.PROCESSING: return 'قيد المعالجة';
      default: return 'انتظار الموافقة';
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row gap-12">
        {/* User Sidebar */}
        <aside className="md:w-80 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-50">
              <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt={user.name} />
            </div>
            <h2 className="text-xl font-black text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500 mb-6">{user.email}</p>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition font-bold text-gray-700">
                <span>إعدادات الحساب</span>
                <Settings className="w-4 h-4" />
              </button>
              <button 
                onClick={onLogout}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 transition font-bold text-red-600"
              >
                <span>تسجيل الخروج</span>
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl space-y-4">
            <h3 className="text-xl font-bold">نادي متجر برو</h3>
            <p className="text-sm text-blue-100">أنت حالياً في المستوى الفضي. تسوق بـ 500 ر.س أخرى للوصول للمستوى الذهبي.</p>
            <div className="w-full bg-blue-400 h-2 rounded-full overflow-hidden">
              <div className="bg-white h-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </aside>

        {/* Orders Section */}
        <div className="flex-grow">
          <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-600" />
            تاريخ طلباتي
          </h2>
          
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
                  <div className="p-6 bg-gray-50 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex gap-8">
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">رقم الطلب</p>
                        <p className="text-sm font-bold text-gray-800">#{order.id.slice(-8)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">التاريخ</p>
                        <p className="text-sm font-bold text-gray-800">{order.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">الإجمالي</p>
                        <p className="text-sm font-black text-blue-600">{order.total} ر.س</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200">
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-bold text-gray-700">{getStatusText(order.status)}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-gray-100">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button className="text-blue-600 text-sm font-bold hover:underline">عرض تفاصيل الطلب</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-3xl">
              <p className="text-gray-400 text-lg">لم تقم بإجراء أي طلبات حتى الآن.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
