
import React, { useState, useEffect, useRef } from 'react';
import { StoreProvider, useStore } from './components/StoreContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import { ShoppingBag, X, Trash2, ArrowRight, Star, Package, Zap, Plus, Minus, Truck, Info, MessageSquare, User, ChevronRight, ChevronLeft, Lock, Mail, CheckCircle, Upload, Camera } from 'lucide-react';

const MainApp: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [loginMode, setLoginMode] = useState<'login' | 'register'>('login');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, removeFromCart, updateCartQuantity, login, register, currentUser, addToCart, addReview } = useStore();
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  
  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('');
  const [regPhoto, setRegPhoto] = useState<string | null>(null);
  
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = (page: string, params?: any) => {
    setActivePage(page);
    if (page === 'login') {
      setLoginMode('login');
      setAuthError('');
    }
    if (page === 'product') {
      setSelectedProduct(params);
      setItemQuantity(1);
      setCurrentGalleryIndex(0);
    } else if (page === 'shop') {
      if (params?.search !== undefined) {
        setSearchQuery(params.search);
      } else {
        setSearchQuery('');
      }
    }
    window.scrollTo(0, 0);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setAuthError('');
    try {
      await login(loginEmail, loginPassword);
      // Wait for auth listener in StoreContext to trigger
      setTimeout(() => {
        const isAdmin = loginEmail === 'diptoislam2006@gmail.com';
        navigate(isAdmin ? 'admin' : 'home');
        setIsAuthLoading(false);
      }, 500);
    } catch (err: any) {
      setIsAuthLoading(false);
      setAuthError('Password or Email Incorrect');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regPasswordConfirm) {
      setAuthError('Passwords do not match');
      return;
    }
    setIsAuthLoading(true);
    setAuthError('');
    try {
      await register(regEmail, regPassword, regName, regPhoto || undefined);
      navigate('home');
      setIsAuthLoading(false);
    } catch (err: any) {
      setIsAuthLoading(false);
      if (err.code === 'auth/email-already-in-use') {
        setAuthError('User already exists. Sign in?');
      } else {
        setAuthError(err.message || 'Registration failed');
      }
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setRegPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckoutNavigation = () => {
    setShowCartDrawer(false);
    navigate('checkout');
  };

  const productGallery = selectedProduct?.images && selectedProduct.images.length > 0 
    ? selectedProduct.images 
    : [selectedProduct?.image];

  return (
    <div className={`min-h-screen flex flex-col relative overflow-x-hidden ${activePage === 'admin' ? 'bg-[#0B0D11]' : 'bg-[#F8F9FA]'}`}>
      {activePage !== 'admin' && <Header onNavigate={navigate} activePage={activePage} />}
      
      <main className="flex-grow">
        {activePage === 'home' && <Home onNavigate={navigate} />}
        {activePage === 'shop' && <Shop onNavigate={navigate} initialSearch={searchQuery} />}
        {activePage === 'admin' && (
          currentUser?.role === 'admin' ? (
            <AdminDashboard onNavigate={navigate} />
          ) : (
            <Home onNavigate={navigate} />
          )
        )}
        {activePage === 'checkout' && <Checkout onNavigate={navigate} />}
        
        {activePage === 'login' && (
          <div className="flex items-center justify-center py-20 px-4">
            <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl border border-zinc-100 animate-in zoom-in duration-500">
               <div className="text-center mb-10">
                 <h2 className="text-3xl font-black tracking-tight text-[#2D2D7B] mb-2">DIPTO.</h2>
                 <p className="text-zinc-500 text-sm font-medium">
                   {loginMode === 'login' ? 'Log in to manage your world' : 'Create an account to start shopping'}
                 </p>
               </div>
               
               {loginMode === 'login' ? (
                 <form onSubmit={handleLogin} className="space-y-6">
                    {authError && (
                      <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border border-red-100">
                         <X size={14} /> {authError}
                      </div>
                    )}

                    <div>
                       <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                       <div className="relative">
                          <input 
                            type="email" 
                            required
                            value={loginEmail}
                            onChange={e => setLoginEmail(e.target.value)}
                            className="w-full bg-[#F1F4F5] border-none rounded-2xl px-12 py-4 focus:ring-2 focus:ring-[#2D2D7B] outline-none text-black font-medium" 
                            placeholder="email@example.com" 
                          />
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                       </div>
                    </div>

                    <div>
                       <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                       <div className="relative">
                          <input 
                            type="password" 
                            required
                            value={loginPassword}
                            onChange={e => setLoginPassword(e.target.value)}
                            className="w-full bg-[#F1F4F5] border-none rounded-2xl px-12 py-4 focus:ring-2 focus:ring-[#2D2D7B] outline-none text-black font-medium" 
                            placeholder="••••••••" 
                          />
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                       </div>
                    </div>

                    <div className="flex items-center justify-between text-xs px-1">
                      <label className="flex items-center gap-2 font-medium text-zinc-400 cursor-pointer">
                        <input type="checkbox" className="rounded-md border-zinc-200" /> Remember me
                      </label>
                      <a href="#" className="text-[#2D2D7B] font-bold hover:underline">Forgot?</a>
                    </div>

                    <button 
                      type="submit"
                      disabled={isAuthLoading}
                      className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isAuthLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <>Sign In <ArrowRight size={18} /></>}
                    </button>

                    <p className="text-center text-xs text-zinc-400 font-medium pt-4">
                      Don't have an account? <button type="button" onClick={() => {setLoginMode('register'); setAuthError('');}} className="text-[#2D2D7B] font-black hover:underline">Register</button>
                    </p>
                 </form>
               ) : (
                 <form onSubmit={handleRegister} className="space-y-5">
                    {authError && (
                      <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border border-red-100">
                         <X size={14} /> {authError}
                      </div>
                    )}

                    <div className="flex flex-col items-center mb-6">
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-20 h-20 bg-zinc-100 rounded-full border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#2D2D7B] transition-all relative group overflow-hidden"
                      >
                        {regPhoto ? (
                          <img src={regPhoto} className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Camera size={20} className="text-zinc-400" />
                            <span className="text-[8px] font-black text-zinc-400 uppercase mt-1">Photo</span>
                          </>
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Upload size={16} className="text-white" />
                        </div>
                      </div>
                      <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
                    </div>

                    <div>
                       <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                       <div className="relative">
                          <input 
                            type="text" 
                            required
                            value={regName}
                            onChange={e => setRegName(e.target.value)}
                            className="w-full bg-[#F1F4F5] border-none rounded-2xl px-12 py-4 focus:ring-2 focus:ring-[#2D2D7B] outline-none text-black font-medium" 
                            placeholder="Your Name" 
                          />
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                       </div>
                    </div>

                    <div>
                       <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                       <div className="relative">
                          <input 
                            type="email" 
                            required
                            value={regEmail}
                            onChange={e => setRegEmail(e.target.value)}
                            className="w-full bg-[#F1F4F5] border-none rounded-2xl px-12 py-4 focus:ring-2 focus:ring-[#2D2D7B] outline-none text-black font-medium" 
                            placeholder="email@example.com" 
                          />
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                         <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                         <div className="relative">
                            <input 
                              type="password" 
                              required
                              value={regPassword}
                              onChange={e => setRegPassword(e.target.value)}
                              className="w-full bg-[#F1F4F5] border-none rounded-2xl px-12 py-4 focus:ring-2 focus:ring-[#2D2D7B] outline-none text-black font-medium" 
                              placeholder="••••••••" 
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                         </div>
                      </div>
                      <div>
                         <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">Confirm</label>
                         <div className="relative">
                            <input 
                              type="password" 
                              required
                              value={regPasswordConfirm}
                              onChange={e => setRegPasswordConfirm(e.target.value)}
                              className="w-full bg-[#F1F4F5] border-none rounded-2xl px-12 py-4 focus:ring-2 focus:ring-[#2D2D7B] outline-none text-black font-medium" 
                              placeholder="••••••••" 
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                         </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isAuthLoading}
                      className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                    >
                      {isAuthLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <>Create Account <ArrowRight size={18} /></>}
                    </button>

                    <p className="text-center text-xs text-zinc-400 font-medium pt-4">
                      Already have an account? <button type="button" onClick={() => {setLoginMode('login'); setAuthError('');}} className="text-[#2D2D7B] font-black hover:underline">Sign In</button>
                    </p>
                 </form>
               )}
            </div>
          </div>
        )}

        {activePage === 'cart' && (
          <div className="max-w-3xl mx-auto px-4 py-16">
             <h2 className="text-4xl font-bold mb-10">Your Cart</h2>
             {cart.length > 0 ? (
               <div className="space-y-6">
                 <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-zinc-100">
                   {cart.map(item => (
                     <div key={item.id} className="flex items-center gap-6 py-6 border-b border-zinc-100 last:border-0">
                        <img src={item.image} className="w-24 h-24 object-cover rounded-2xl border border-zinc-50" />
                        <div className="flex-grow">
                           <h4 className="font-bold text-lg">{item.name}</h4>
                           <p className="text-sm text-zinc-400 mb-2">{item.category}</p>
                           <div className="flex items-center gap-3">
                              <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors"><Minus size={14}/></button>
                              <span className="font-bold">{item.quantity}</span>
                              <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors"><Plus size={14}/></button>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="font-bold text-xl">${(item.price * item.quantity).toFixed(2)}</p>
                           <button onClick={() => removeFromCart(item.id)} className="text-zinc-400 hover:text-red-500 mt-2"><Trash2 size={16} /></button>
                        </div>
                     </div>
                   ))}
                 </div>
                 <div className="bg-zinc-900 rounded-[2rem] p-10 text-white">
                    <div className="flex justify-between items-center mb-6">
                       <span className="opacity-70">Subtotal</span>
                       <span className="text-2xl font-bold">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10">
                       <span className="opacity-70">Shipping</span>
                       <span className="font-bold">Calculated at checkout</span>
                    </div>
                    <button 
                      onClick={handleCheckoutNavigation}
                      className="w-full bg-[#2D2D7B] text-white py-5 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#1e1e55] transition-all text-lg"
                    >
                      Proceed to Checkout <ArrowRight size={20} />
                    </button>
                 </div>
               </div>
             ) : (
               <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-zinc-200">
                  <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag size={32} className="text-zinc-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Cart is empty</h3>
                  <p className="text-zinc-500 mb-8">You haven't added any premium tech to your collection yet.</p>
                  <button onClick={() => navigate('shop')} className="bg-black text-white px-8 py-3 rounded-full font-bold">Start Shopping</button>
               </div>
             )}
          </div>
        )}

        {activePage === 'product' && selectedProduct && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 animate-in fade-in duration-700">
            <div className="bg-white rounded-[3rem] border border-zinc-100 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[70vh] mb-12">
              <div className="lg:col-span-7 bg-[#FAFBFC] p-8 md:p-12 flex flex-col border-r border-zinc-50 relative">
                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-300 uppercase tracking-widest mb-16">
                  <span className="cursor-pointer hover:text-zinc-500" onClick={() => navigate('shop')}>Shop</span>
                  <span>/</span>
                  <span className="text-zinc-400">{selectedProduct.category}</span>
                </div>
                <div className="flex-grow flex items-center justify-center mb-12 group relative">
                   {productGallery.length > 1 && (
                     <>
                      <button 
                        onClick={() => setCurrentGalleryIndex((currentGalleryIndex - 1 + productGallery.length) % productGallery.length)}
                        className="absolute left-0 z-10 p-4 bg-white/80 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={() => setCurrentGalleryIndex((currentGalleryIndex + 1) % productGallery.length)}
                        className="absolute right-0 z-10 p-4 bg-white/80 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight size={20} />
                      </button>
                     </>
                   )}
                  <div className="w-full max-w-lg aspect-square flex items-center justify-center">
                    <img key={currentGalleryIndex} src={productGallery[currentGalleryIndex]} className="w-full h-full object-contain animate-in fade-in zoom-in duration-500" alt={selectedProduct.name} />
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  {productGallery.map((img: string, idx: number) => (
                    <div key={idx} onClick={() => setCurrentGalleryIndex(idx)} className={`w-16 h-16 rounded-xl border-2 p-1 bg-white cursor-pointer overflow-hidden transition-all ${currentGalleryIndex === idx ? 'border-black' : 'border-transparent opacity-50'}`}>
                      <img src={img} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 p-8 md:p-16 flex flex-col justify-center bg-white relative">
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold">{selectedProduct.rating}</span>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">• {selectedProduct.category.toUpperCase()}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 leading-[1.1]">{selectedProduct.name}</h1>
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-3xl font-bold text-zinc-900">${selectedProduct.price.toFixed(2)}</span>
                    {selectedProduct.oldPrice && <span className="text-xl text-zinc-200 line-through font-medium">${selectedProduct.oldPrice.toFixed(2)}</span>}
                  </div>
                  <div className="w-8 h-[2px] bg-zinc-100 mb-6"></div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-10 max-w-md">{selectedProduct.description}</p>
                </div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="flex items-center bg-[#F1F4F5] rounded-xl px-4 py-3">
                    <button onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))} className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-black"><Minus size={16} /></button>
                    <span className="w-10 text-center font-bold text-sm text-black">{itemQuantity}</span>
                    <button onClick={() => setItemQuantity(itemQuantity + 1)} className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-black"><Plus size={16} /></button>
                  </div>
                  <button onClick={() => { for(let i=0; i<itemQuantity; i++) addToCart(selectedProduct); setShowCartDrawer(true); }} className="flex-grow bg-[#111111] text-white py-4 px-8 rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10">
                    <ShoppingBag size={18} /> Add to Bag
                  </button>
                </div>
                <button onClick={() => { for(let i=0; i<itemQuantity; i++) addToCart(selectedProduct); navigate('checkout'); }} className="w-full bg-[#4F46E5] text-white py-4 rounded-xl font-bold hover:bg-[#4338CA] transition-all flex items-center justify-center gap-2 mb-10">Buy Now</button>
                <div className="grid grid-cols-2 gap-4 mb-12">
                  {(selectedProduct.specs || [{ label: 'STATUS', value: 'In Stock' }, { label: 'DELIVERY', value: 'Express' }]).map((spec: any, idx: number) => (
                    <div key={idx} className="bg-[#F8FAFB] p-4 rounded-xl">
                      <p className="text-[9px] font-bold text-zinc-300 uppercase tracking-widest mb-1">{spec.label}</p>
                      <p className="text-xs font-bold text-zinc-600">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 mb-12 shadow-sm border border-zinc-100">
               <h3 className="text-2xl font-bold text-zinc-900 mb-8 border-b border-zinc-100 pb-4">Product details of {selectedProduct.name}</h3>
               <ul className="space-y-3">
                 {(selectedProduct.highlights || ["Premium build quality", "Intuitive user interface", "Long-lasting performance", "Official brand warranty", "Styling & slim fit"]).map((highlight: string, i: number) => (
                   <li key={i} className="flex items-start gap-2 text-sm text-zinc-600"><span className="text-black font-bold">•</span>{highlight}</li>
                 ))}
               </ul>
            </div>
          </div>
        )}
      </main>

      {activePage !== 'admin' && <Footer />}

      {showCartDrawer && (
        <div className="fixed inset-0 z-[100] flex justify-end">
           <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCartDrawer(false)}></div>
           <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col p-8">
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-2xl font-bold">Cart Items</h3>
                 <button onClick={() => setShowCartDrawer(false)} className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center"><X /></button>
              </div>
              <div className="flex-grow overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {cart.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex gap-4 p-2 hover:bg-zinc-50 rounded-2xl transition-colors">
                     <img src={item.image} className="w-20 h-20 rounded-2xl object-cover border border-zinc-100" />
                     <div className="flex-grow py-1">
                        <h5 className="font-bold text-sm leading-tight text-zinc-800">{item.name}</h5>
                        <p className="text-xs text-zinc-400 mb-2 mt-1">{item.quantity} x ${item.price}</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-[10px] text-red-400 font-bold uppercase tracking-wider hover:text-red-600 transition-colors">Remove</button>
                     </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-8 border-t border-zinc-100">
                 <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-zinc-300 uppercase tracking-widest text-[10px]">Subtotal</span>
                    <span className="text-2xl font-bold text-zinc-900">${cartTotal.toFixed(2)}</span>
                 </div>
                 <button onClick={handleCheckoutNavigation} className="w-full bg-[#111111] text-white py-4 rounded-xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10">Checkout <ArrowRight size={18} /></button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <StoreProvider>
    <MainApp />
  </StoreProvider>
);

export default App;
