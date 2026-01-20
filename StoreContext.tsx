
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, User, Review, Coupon, Banner, Category, StockLog, SiteSettings } from '../types';
import { INITIAL_PRODUCTS } from '../constants';
import { auth } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  currentUser: User | null;
  coupons: Coupon[];
  banners: Banner[];
  users: User[];
  stockLogs: StockLog[];
  settings: SiteSettings;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addReview: (productId: string, review: Review) => void;
  moderateReview: (productId: string, reviewId: string, action: 'approve' | 'delete') => void;
  placeOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;
  addBanner: (banner: Banner) => void;
  updateBanner: (banner: Banner) => void;
  deleteBanner: (id: string) => void;
  updateUserStatus: (userId: string, isBlocked: boolean) => void;
  updateSettings: (settings: SiteSettings) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, photoBase64?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nitec_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nitec_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nitec_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('nitec_coupons');
    return saved ? JSON.parse(saved) : [
      { id: '1', code: 'WELCOME20', discountType: 'percentage', value: 20, minSpend: 100, expiryDate: '2025-12-31', usageCount: 15, isActive: true }
    ];
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('nitec_banners');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Summer Collection', subtitle: 'Up to 50% Off', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8', link: '/shop', isActive: true }
    ];
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('nitec_users');
    return saved ? JSON.parse(saved) : [
      { id: 'admin_1', name: 'Dipto Islam', email: 'diptoislam2006@gmail.com', role: 'admin', avatar: 'https://i.pravatar.cc/150?u=dipto', joinedDate: '2023-01-01', isBlocked: false }
    ];
  });

  const [stockLogs, setStockLogs] = useState<StockLog[]>(() => {
    const saved = localStorage.getItem('nitec_stock_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('nitec_settings');
    return saved ? JSON.parse(saved) : {
      storeName: 'DIPTO.',
      currency: 'USD',
      freeShippingThreshold: 100,
      taxRate: 8,
      maintenanceMode: false
    };
  });

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const isAdmin = firebaseUser.email === 'diptoislam2006@gmail.com';
        const mappedUser: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          email: firebaseUser.email || '',
          role: isAdmin ? 'admin' : 'user',
          avatar: firebaseUser.photoURL || `https://i.pravatar.cc/150?u=${firebaseUser.email}`,
          joinedDate: firebaseUser.metadata.creationTime || new Date().toISOString()
        };
        setCurrentUser(mappedUser);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('nitec_products', JSON.stringify(products));
    localStorage.setItem('nitec_cart', JSON.stringify(cart));
    localStorage.setItem('nitec_orders', JSON.stringify(orders));
    localStorage.setItem('nitec_coupons', JSON.stringify(coupons));
    localStorage.setItem('nitec_banners', JSON.stringify(banners));
    localStorage.setItem('nitec_users', JSON.stringify(users));
    localStorage.setItem('nitec_stock_logs', JSON.stringify(stockLogs));
    localStorage.setItem('nitec_settings', JSON.stringify(settings));
  }, [products, cart, orders, coupons, banners, users, stockLogs, settings]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item));
  };

  const clearCart = () => setCart([]);

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
    setStockLogs(prev => [{
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      productName: product.name,
      change: product.stock,
      type: 'restock',
      date: new Date().toISOString()
    }, ...prev]);
  };

  const updateProduct = (product: Product) => {
    const oldProduct = products.find(p => p.id === product.id);
    if (oldProduct && oldProduct.stock !== product.stock) {
      setStockLogs(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        productName: product.name,
        change: product.stock - oldProduct.stock,
        type: 'manual',
        date: new Date().toISOString()
      }, ...prev]);
    }
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (productId: string) => setProducts(prev => prev.filter(p => p.id !== productId));

  const addReview = (productId: string, review: Review) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newList = p.reviewList ? [review, ...p.reviewList] : [review];
        return { ...p, reviewList: newList, reviews: newList.length };
      }
      return p;
    }));
  };

  const moderateReview = (productId: string, reviewId: string, action: 'approve' | 'delete') => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId && p.reviewList) {
        if (action === 'delete') {
          return { ...p, reviewList: p.reviewList.filter(r => r.id !== reviewId), reviews: p.reviews - 1 };
        }
        return { ...p, reviewList: p.reviewList.map(r => r.id === reviewId ? { ...r, isModerated: true } : r) };
      }
      return p;
    }));
  };

  const placeOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    order.items.forEach(item => {
      setStockLogs(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        productId: item.id,
        productName: item.name,
        change: -item.quantity,
        type: 'order',
        date: new Date().toISOString()
      }, ...prev]);
    });
    setProducts(prev => prev.map(p => {
      const cartItem = order.items.find(ci => ci.id === p.id);
      if (cartItem) return { ...p, stock: p.stock - cartItem.quantity };
      return p;
    }));
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const addCoupon = (coupon: Coupon) => setCoupons(prev => [coupon, ...prev]);
  const deleteCoupon = (id: string) => setCoupons(prev => prev.filter(c => c.id !== id));
  
  const addBanner = (banner: Banner) => setBanners(prev => [banner, ...prev]);
  const updateBanner = (banner: Banner) => setBanners(prev => prev.map(b => b.id === banner.id ? banner : b));
  const deleteBanner = (id: string) => setBanners(prev => prev.filter(b => b.id !== id));

  const updateUserStatus = (userId: string, isBlocked: boolean) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, isBlocked } : u));
  };

  const updateSettings = (newSettings: SiteSettings) => setSettings(newSettings);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, name: string, photoBase64?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name,
      photoURL: photoBase64 || `https://i.pravatar.cc/150?u=${email}`
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <StoreContext.Provider value={{
      products, cart, orders, currentUser, coupons, banners, users, stockLogs, settings,
      addToCart, removeFromCart, updateCartQuantity, clearCart,
      addProduct, updateProduct, deleteProduct, addReview, moderateReview,
      placeOrder, updateOrderStatus, addCoupon, deleteCoupon, addBanner, updateBanner, deleteBanner,
      updateUserStatus, updateSettings, login, register, logout
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
