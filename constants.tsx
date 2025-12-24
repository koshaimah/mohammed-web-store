
import { Product, Category, UserRole, User, Order, OrderStatus } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'إلكترونيات', slug: 'electronics', image: 'https://picsum.photos/400/300?random=1' },
  { id: '2', name: 'أزياء', slug: 'fashion', image: 'https://picsum.photos/400/300?random=2' },
  { id: '3', name: 'منزل ومطبخ', slug: 'home', image: 'https://picsum.photos/400/300?random=3' },
  { id: '4', name: 'جمال وعناية', slug: 'beauty', image: 'https://picsum.photos/400/300?random=4' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'ساعة ذكية برو',
    description: 'ساعة ذكية متطورة مع تتبع للنشاط البدني ونبضات القلب.',
    price: 299,
    category: 'electronics',
    image: 'https://picsum.photos/500/500?random=10',
    stock: 15,
    rating: 4.5,
    isFeatured: true,
    reviews: [
      { id: 'r1', userId: 'u2', userName: 'أحمد علي', rating: 5, comment: 'منتج رائع جداً!', date: '2023-10-01' }
    ]
  },
  {
    id: 'p2',
    name: 'سماعات لاسلكية',
    description: 'سماعات عالية الجودة مع خاصية إلغاء الضجيج.',
    price: 150,
    category: 'electronics',
    image: 'https://picsum.photos/500/500?random=11',
    stock: 20,
    rating: 4.8,
    isFeatured: true,
    reviews: []
  },
  {
    id: 'p3',
    name: 'حقيبة ظهر جلدية',
    description: 'حقيبة ظهر أنيقة مصنوعة من الجلد الطبيعي.',
    price: 85,
    category: 'fashion',
    image: 'https://picsum.photos/500/500?random=12',
    stock: 10,
    rating: 4.2,
    reviews: []
  },
  {
    id: 'p4',
    name: 'خلاط فواكه كهربائي',
    description: 'خلاط قوي لتحضير العصائر الطازجة في ثوانٍ.',
    price: 120,
    category: 'home',
    image: 'https://picsum.photos/500/500?random=13',
    stock: 8,
    rating: 4.0,
    reviews: []
  }
];

export const MOCK_ADMIN: User = {
  id: 'u1',
  name: 'مدير النظام',
  email: 'admin@store.com',
  role: UserRole.ADMIN,
  avatar: 'https://picsum.photos/100/100?random=100'
};

export const MOCK_CUSTOMER: User = {
  id: 'u2',
  name: 'محمد خالد',
  email: 'customer@mail.com',
  role: UserRole.CUSTOMER,
  avatar: 'https://picsum.photos/100/100?random=101'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord1',
    userId: 'u2',
    items: [
      { productId: 'p1', name: 'ساعة ذكية برو', price: 299, quantity: 1, image: 'https://picsum.photos/500/500?random=10' }
    ],
    total: 299,
    status: OrderStatus.DELIVERED,
    date: '2023-09-15',
    shippingAddress: 'الرياض، المملكة العربية السعودية'
  },
  {
    id: 'ord2',
    userId: 'u2',
    items: [
      { productId: 'p3', name: 'حقيبة ظهر جلدية', price: 85, quantity: 2, image: 'https://picsum.photos/500/500?random=12' }
    ],
    total: 170,
    status: OrderStatus.PROCESSING,
    date: '2023-11-20',
    shippingAddress: 'جدة، المملكة العربية السعودية'
  }
];
