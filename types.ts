
export enum Category {
  ELECTRONICS = 'Electronics',
  WEARABLES = 'Wearables',
  AUDIO = 'Audio',
  ACCESSORIES = 'Accessories',
  FASHION = 'Fashion'
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Feature {
  title: string;
  description: string;
  image: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  isModerated?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  highlights?: string[];
  price: number;
  oldPrice?: number;
  category: Category;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  reviewList?: Review[];
  stock: number;
  featured?: boolean;
  colors?: string[];
  specs?: ProductSpec[];
  features?: Feature[];
  sku?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'returned' | 'cancelled';
  date: string;
  customerName: string;
  customerEmail: string;
  paymentMethod: 'stripe' | 'razorpay' | 'cod';
  trackingNumber?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'manager' | 'support';
  avatar?: string;
  phone?: string;
  address?: string;
  joinedDate: string;
  isBlocked?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minSpend: number;
  expiryDate: string;
  usageCount: number;
  isActive: boolean;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  isActive: boolean;
}

export interface TrafficData {
  source: string;
  visitors: number;
  conversion: number;
}

// Added missing StockLog interface to resolve import error in StoreContext.tsx
export interface StockLog {
  id: string;
  productId: string;
  productName: string;
  change: number;
  type: 'order' | 'restock' | 'manual';
  date: string;
}

// Added missing SiteSettings interface to resolve import error in StoreContext.tsx
export interface SiteSettings {
  storeName: string;
  currency: string;
  freeShippingThreshold: number;
  taxRate: number;
  maintenanceMode: boolean;
}
