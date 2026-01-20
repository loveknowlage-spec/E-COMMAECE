import { 
  getFirestore as De, 
  getAuth as Pe, 
  default as o, 
  onAuthStateChanged as Ee, 
  jsx as e, 
  signOut as Ie, 
  signInWithEmailAndPassword as Oe, 
  updateProfile as Le, 
  signInWithEmailAndPassword as Be, 
  Search as de, 
  ShoppingBag as le, 
  LogOut as Ne, 
  User as ve, 
  X as ie, 
  Menu as Re, 
  Twitter as we, 
  Instagram as ye, 
  Linkedin as ke, 
  jsxs as ze, 
  ArrowRight as Me, 
  Star as ee, 
  Filter as Te, 
  ChevronRight as $e, 
  Trash2 as qe, 
  ChevronLeft as _e, 
  Plus as he, 
  Minus as ue, 
  Heart as Ue, 
  Clock as Je, 
  MapPin as pe, 
  ShieldCheck as Ve, 
  Package as Ge, 
  CheckCircle2 as ge, 
  AlertCircle as He, 
  Settings as Qe, 
  PlusCircle as se, 
  TrendingUp as We, 
  DollarSign as Se, 
  Users as Ye, 
  Eye as ce, 
  Ban as Ke, 
  Edit as Xe, 
  Lock as Ze, 
  FileText as es, 
  Tag as ss, 
  Image as ts, 
  Layers as Ce, 
  Save as as, 
  CreditCard as is, 
  Truck as rs, 
  RefreshCcw as ls, 
  Mail as ns, 
  Smartphone as os, 
  Facebook as cs, 
  Github as ds, 
  Globe as xs, 
  MoreHorizontal as ms, 
  Download as hs, 
  Upload as us, 
  react as re, 
  Share2 as ps, 
  ExternalLink as be, 
  Copy as gs, 
  Check as bs, 
  Info as fs, 
  Send as js, 
  Bell as Ns, 
  Search as vs 
} from "./vendor-BbLJbUaF.js";

(function() {
  const d = document.createElement("link").relList;
  if (d && d.supports && d.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) x(i);
  new MutationObserver(i => {
    for (const u of i)
      if (u.type === "childList")
        for (const j of u.addedNodes) j.tagName === "LINK" && j.rel === "modulepreload" && x(j)
  }).observe(document, {
    childList: !0,
    subtree: !0
  });

  function n(i) {
    const u = {};
    return i.integrity && (u.integrity = i.integrity), i.referrerPolicy && (u.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? u.credentials = "include" : i.crossOrigin === "anonymous" ? u.credentials = "omit" : u.credentials = "same-origin", u
  }

  function x(i) {
    if (i.ep) return;
    i.ep = !0;
    const u = n(i);
    fetch(i.href, u)
  }
})();

var E = (l => (l.ELECTRONICS = "Electronics", l.WEARABLES = "Wearables", l.AUDIO = "Audio", l.ACCESSORIES = "Accessories", l.FASHION = "Fashion", l))(E || {});
const ws = [{
  id: "1",
  name: "Zenith Noise Cancelling Headphones",
  description: "Experience pure sound with our flagship noise-cancelling wireless headphones. 40 hours of battery life and studio-quality audio.",
  highlights: ["Industry-leading noise cancellation", "High-resolution Audio compatible", "40-hour battery life with quick charging", "Multipoint connection for two devices", "Speak-to-chat technology", "Crystal clear call quality with 5 mics"],
  price: 299.99,
  oldPrice: 349.99,
  category: E.AUDIO,
  image: "https://images.unsplash.com/photo-1628202926206-c63a34b1618f?auto=format&fit=crop&w=1200&q=80",
  images: ["https://images.unsplash.com/photo-1628202926206-c63a34b1618f?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80"],
  rating: 4.8,
  reviews: 124,
  reviewList: [{
    id: "r1",
    userName: "Alex Johnson",
    rating: 5,
    comment: "Best headphones I have ever owned. The noise cancellation is magical.",
    date: "2024-03-15",
    verified: !0
  }, {
    id: "r2",
    userName: "Sarah M.",
    rating: 4,
    comment: "Sound quality is amazing. A bit heavy for long sessions but still great.",
    date: "2024-03-10",
    verified: !0
  }],
  stock: 45,
  featured: !0,
  specs: [{
    label: "BATTERY",
    value: "40 hrs"
  }, {
    label: "DRIVER",
    value: "40mm"
  }, {
    label: "BLUETOOTH",
    value: "5.2"
  }],
  features: [{
    title: "Adaptive Sound Control",
    description: "Automatically adjusts ambient sound settings based on your location and behavior for the ideal listening experience.",
    image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=800&q=80"
  }, {
    title: "Dual Sensor Noise Tech",
    description: "Dual microphones on each earcup capture ambient noise and pass the data to the HD Noise Cancelling Processor QN1.",
    image: "https://images.unsplash.com/photo-1583394838336-31e690733f11?auto=format&fit=crop&w=800&q=80"
  }, {
    title: "Foldable Refined Design",
    description: "Crafted from lightweight materials with a sophisticated matte finish, designed to be your constant travel companion.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
  }]
}, {
  id: "2",
  name: "New Gen X-Bud Pro",
  description: "Compact true wireless earbuds with immersive spatial audio and 30-hour battery life.",
  highlights: ["Spatial audio with dynamic head tracking", "Sweat and water resistant (IPX4)", "Up to 6 hours of listening time", "MagSafe Charging Case", "Automatic switching between devices", "Always-on Siri"],
  price: 149,
  category: E.AUDIO,
  image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
  images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1588423019284-47a4f8992e52?auto=format&fit=crop&w=800&q=80"],
  rating: 4.6,
  reviews: 89,
  reviewList: [{
    id: "r3",
    userName: "Mike T.",
    rating: 5,
    comment: "Very comfortable and the spatial audio is a game changer.",
    date: "2024-03-01",
    verified: !0
  }],
  stock: 120,
  featured: !0,
  specs: [{
    label: "BATTERY",
    value: "30 hrs"
  }, {
    label: "WATERPROOF",
    value: "IPX7"
  }],
  features: [{
    title: "Precision Mesh",
    description: "An inset microphone in each earbud is covered by a special acoustic mesh that reduces wind noise during calls.",
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=800&q=80"
  }, {
    title: "Ergonomic Sculpting",
    description: "Thousands of ear shapes were scanned to create a shape that stays secure and comfortable all day.",
    image: "https://images.unsplash.com/photo-1598331668826-20cecc596b86?auto=format&fit=crop&w=800&q=80"
  }]
}, {
  id: "3",
  name: "Light Grey Surface Headphone",
  description: "Minimalist over-ear headphones with touch controls and crystal clear voice pickup.",
  highlights: ["Intuitive touch controls", "Crisp high-fidelity audio", "Adjustable noise cancellation", "Lightweight ergonomic design", "Quick charging capability", "Voice assistant integrated"],
  price: 220.5,
  oldPrice: 250,
  category: E.AUDIO,
  image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
  images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=800&q=80"],
  rating: 4.9,
  reviews: 210,
  reviewList: [],
  stock: 15,
  featured: !0,
  features: [{
    title: "Seamless Integration",
    description: "Designed to disappear into your workflow. Light as air and as clear as crystal.",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80"
  }]
}, {
  id: "4",
  name: "Ultima Vision Pro VR",
  description: "The next dimension of spatial computing. High-resolution displays with intuitive gesture tracking.",
  highlights: ["Dual micro-OLED 4K displays", "Revolutionary eye tracking technology", "Spatial Audio System built-in", "External battery with 2 hours use", "M2 and R1 custom Apple silicon", "Light Seal for personalized fit"],
  price: 3499,
  category: E.ELECTRONICS,
  image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80",
  images: ["https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1626387346567-58d2b83b3855?auto=format&fit=crop&w=800&q=80"],
  rating: 5,
  reviews: 12,
  reviewList: [],
  stock: 5,
  features: [{
    title: "Optical Sensors",
    description: "An array of advanced cameras and sensors work together to let you see the world clearly and navigate with your eyes.",
    image: "https://images.unsplash.com/photo-1592477906563-5c51b3d8bb5b?auto=format&fit=crop&w=800&q=80"
  }, {
    title: "Fluid Immersion",
    description: "High-resolution micro-OLED displays deliver more pixels than a 4K TV for each eye, for jaw-dropping clarity.",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=800&q=80"
  }]
}, {
  id: "5",
  name: "Nitec Smart Band Z",
  description: "Keep track of your health with 24/7 heart rate monitoring and sleep analysis.",
  highlights: ["AMOLED Color touch screen", "14-day battery life", "30+ fitness modes", "SpO2 blood oxygen tracking", "Swim-proof up to 50m", "Stress and sleep tracking"],
  price: 49.99,
  category: E.WEARABLES,
  image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80",
  rating: 4.2,
  reviews: 560,
  reviewList: [],
  stock: 200,
  features: [{
    title: "Optical Bio-Sensor",
    description: "Equipped with a high-precision biosensing lens for 24-hour health monitoring.",
    image: "https://images.unsplash.com/photo-1557167668-6eb029f7e60d?auto=format&fit=crop&w=800&q=80"
  }]
}, {
  id: "6",
  name: "Leather Tech Sleeve",
  description: "Genuine leather sleeve for your premium devices, featuring a soft microfiber lining.",
  highlights: ["Premium full-grain leather", "Microfiber anti-scratch lining", "Slim-fit design", "Hand-stitched detailing", "Secure magnetic closure", "Elegant professional aesthetic"],
  price: 79,
  category: E.ACCESSORIES,
  image: "https://images.unsplash.com/photo-1581235720704-06d3acfc13bc?auto=format&fit=crop&w=800&q=80",
  rating: 4.7,
  reviews: 45,
  reviewList: [],
  stock: 50,
  features: [{
    title: "Master Craftsmanship",
    description: "Each sleeve is hand-finished to ensure every stitch is perfect and the leather is flawless.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
  }]
}];

const ys = {
  apiKey: "AIzaSyCjkjcMRbJNRzphIndaI6JG1n2PeMeNB7o",
  authDomain: "e-commerce-7fc12.firebaseapp.com",
  projectId: "e-commerce-7fc12",
  storageBucket: "e-commerce-7fc12.firebasestorage.app",
  messagingSenderId: "892880257830",
  appId: "1:892880257830:web:9d84b6f3100012543bf7e7",
  measurementId: "G-67SPRD15VW"
};

const ks_initialized = De(ys);
const te = Pe(ks_initialized);
const Fe = o.createContext(void 0);

const zs = ({ children: l }) => {
  const [d, n] = o.useState(() => {
    const t = localStorage.getItem("nitec_products");
    return t ? JSON.parse(t) : ws
  });
  const [x, i] = o.useState(() => {
    const t = localStorage.getItem("nitec_cart");
    return t ? JSON.parse(t) : []
  });
  const [u, j] = o.useState(() => {
    const t = localStorage.getItem("nitec_orders");
    return t ? JSON.parse(t) : []
  });
  const [S, y] = o.useState(null);
  const [C, k] = o.useState(() => {
    const t = localStorage.getItem("nitec_coupons");
    return t ? JSON.parse(t) : [{
      id: "1",
      code: "WELCOME20",
      discountType: "percentage",
      value: 20,
      minSpend: 100,
      expiryDate: "2025-12-31",
      usageCount: 15,
      isActive: !0
    }]
  });
  const [c, f] = o.useState(() => {
    const t = localStorage.getItem("nitec_banners");
    return t ? JSON.parse(t) : [{
      id: "1",
      title: "Summer Collection",
      subtitle: "Up to 50% Off",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      link: "/shop",
      isActive: !0
    }]
  });
  const [p, N] = o.useState(() => {
    const t = localStorage.getItem("nitec_users");
    return t ? JSON.parse(t) : [{
      id: "admin_1",
      name: "Dipto Islam",
      email: "diptoislam2006@gmail.com",
      role: "admin",
      avatar: "https://i.pravatar.cc/150?u=dipto",
      joinedDate: "2023-01-01",
      isBlocked: !1
    }]
  });
  const [V, A] = o.useState(() => {
    const t = localStorage.getItem("nitec_stock_logs");
    return t ? JSON.parse(t) : []
  });
  const [P, $] = o.useState(() => {
    const t = localStorage.getItem("nitec_settings");
    return t ? JSON.parse(t) : {
      storeName: "DIPTO.",
      currency: "USD",
      freeShippingThreshold: 100,
      taxRate: 8,
      maintenanceMode: !1
    }
  });

  o.useEffect(() => {
    const t = Ee(te, a => {
      var m;
      if (a) {
        const h = a.email === "diptoislam2006@gmail.com",
          z = {
            id: a.uid,
            name: a.displayName || ((m = a.email) == null ? void 0 : m.split("@")[0]) || "User",
            email: a.email || "",
            role: h ? "admin" : "user",
            avatar: a.photoURL || `https://i.pravatar.cc/150?u=${a.email}`,
            joinedDate: a.metadata.creationTime || new Date().toISOString()
          };
        y(z)
      } else y(null)
    });
    return () => t()
  }, []);

  o.useEffect(() => {
    localStorage.setItem("nitec_products", JSON.stringify(d));
    localStorage.setItem("nitec_cart", JSON.stringify(x));
    localStorage.setItem("nitec_orders", JSON.stringify(u));
    localStorage.setItem("nitec_coupons", JSON.stringify(C));
    localStorage.setItem("nitec_banners", JSON.stringify(c));
    localStorage.setItem("nitec_users", JSON.stringify(p));
    localStorage.setItem("nitec_stock_logs", JSON.stringify(V));
    localStorage.setItem("nitec_settings", JSON.stringify(P))
  }, [d, x, u, C, c, p, V, P]);

  const O = t => {
    i(a => a.find(h => h.id === t.id) ? a.map(h => h.id === t.id ? { ...h, quantity: h.quantity + 1 } : h) : [...a, { ...t, quantity: 1 }])
  };
  const K = t => { i(a => a.filter(m => m.id !== t)) };
  const X = (t, a) => { i(m => m.map(h => h.id === t ? { ...h, quantity: Math.max(1, a) } : h)) };
  const q = () => i([]);
  const G = t => {
    n(a => [t, ...a]);
    A(a => [{ id: Math.random().toString(36).substr(2, 9), productId: t.id, productName: t.name, change: t.stock, type: "restock", date: new Date().toISOString() }, ...a])
  };
  const _ = t => {
    const a = d.find(m => m.id === t.id);
    a && a.stock !== t.stock && A(m => [{ id: Math.random().toString(36).substr(2, 9), productId: t.id, productName: t.name, change: t.stock - a.stock, type: "manual", date: new Date().toISOString() }, ...m]);
    n(m => m.map(h => h.id === t.id ? t : h))
  };
  const H = t => n(a => a.filter(m => m.id !== t));
  const L = (t, a) => {
    n(m => m.map(h => {
      if (h.id === t) {
        const z = h.reviewList ? [a, ...h.reviewList] : [a];
        return { ...h, reviewList: z, reviews: z.length }
      }
      return h
    }))
  };
  const g = (t, a, m) => {
    n(h => h.map(z => z.id === t && z.reviewList ? m === "delete" ? { ...z, reviewList: z.reviewList.filter(M => M.id !== a), reviews: z.reviews - 1 } : { ...z, reviewList: z.reviewList.map(M => M.id === a ? { ...M, isModerated: !0 } : M) } : z))
  };
  const D = t => {
    j(a => [t, ...a]);
    t.items.forEach(a => {
      A(m => [{ id: Math.random().toString(36).substr(2, 9), productId: a.id, productName: a.name, change: -a.quantity, type: "order", date: new Date().toISOString() }, ...m])
    });
    n(a => a.map(m => {
      const h = t.items.find(z => z.id === m.id);
      return h ? { ...m, stock: m.stock - h.quantity } : m
    }));
    q()
  };
  const B = (t, a) => { j(m => m.map(h => h.id === t ? { ...h, status: a } : h)) };
  const U = t => k(a => [t, ...a]);
  const Z = t => k(a => a.filter(m => m.id !== t));
  const R = t => f(a => [t, ...a]);
  const s = t => f(a => a.map(m => m.id === t.id ? t : m));
  const v = t => f(a => a.filter(m => m.id !== t));
  const w = (t, a) => { N(m => m.map(h => h.id === t ? { ...h, isBlocked: a } : h)) };
  const F = t => $(t);
  const I = async (t, a) => { await Be(te, t, a) };
  const J = async (t, a, m, h) => {
    const z = await Oe(te, t, a);
    await Le(z.user, { displayName: m, photoURL: h || `https://i.pravatar.cc/150?u=${t}` })
  };
  const Q = async () => { await Ie(te) };

  return e.jsx(Fe.Provider, {
    value: {
      products: d, cart: x, orders: u, currentUser: S, coupons: C, banners: c, users: p, stockLogs: V, settings: P,
      addToCart: O, removeFromCart: K, updateCartQuantity: X, clearCart: q, addProduct: G, updateProduct: _,
      deleteProduct: H, addReview: L, moderateReview: g, placeOrder: D, updateOrderStatus: B, addCoupon: U,
      deleteCoupon: Z, addBanner: R, updateBanner: s, deleteBanner: v, updateUserStatus: w, updateSettings: F,
      login: I, register: J, logout: Q
    },
    children: l
  })
};
