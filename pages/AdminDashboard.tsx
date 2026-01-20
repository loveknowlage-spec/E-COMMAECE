
import React, { useState, useRef, useMemo } from 'react';
import { 
  LayoutDashboard, Box, ShoppingCart, Users, Package, CreditCard, 
  Truck, Megaphone, FileText, MessageSquare, BarChart3, Settings, 
  Plus, Edit2, Trash2, Zap, Search, Bell, Sun, Flag, LogOut, 
  XCircle, Save, Upload, ArrowUp, ArrowDown, CheckCircle2, 
  MoreVertical, Calendar, Download, Trash, Check, Filter,
  TrendingUp, Activity, AlertTriangle, ExternalLink, RefreshCcw,
  // Added missing Minus icon import
  Minus,
  // Added missing Shield icon import
  Shield
} from 'lucide-react';
import { useStore } from '../components/StoreContext';
import { Product, Category, Order, User, Coupon, Banner } from '../types';
import { geminiService } from '../services/geminiService';

const AdminDashboard: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { 
    products, orders, users, coupons, banners, 
    addProduct, updateProduct, deleteProduct, 
    updateOrderStatus, addCoupon, deleteCoupon, 
    moderateReview, logout 
  } = useStore();

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', price: 0, category: Category.ELECTRONICS, stock: 0, description: '', image: '', features: []
  });

  // Business Analytics
  const stats = useMemo(() => {
    const revenue = orders.reduce((acc, o) => acc + o.total, 0);
    const avgOrderValue = orders.length > 0 ? revenue / orders.length : 0;
    const lowStockCount = products.filter(p => p.stock < 10).length;
    return { 
      revenue: revenue || 0, 
      orders: orders.length || 0, 
      avgOrderValue: avgOrderValue || 0.0, 
      lowStockCount: lowStockCount || 2 
    };
  }, [orders, products]);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', icon: <Box size={20} /> },
    { name: 'Orders', icon: <ShoppingCart size={20} /> },
    { name: 'Customers', icon: <Users size={20} /> },
    { name: 'Inventory', icon: <Package size={20} /> },
    { name: 'Marketing', icon: <Megaphone size={20} /> },
    { name: 'CMS', icon: <FileText size={20} /> },
    { name: 'Reviews', icon: <MessageSquare size={20} /> },
    { name: 'Reports', icon: <BarChart3 size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (formData.name && formData.price) {
      setIsSaving(true);
      setTimeout(() => {
        addProduct({
          id: Math.random().toString(36).substr(2, 9),
          name: formData.name!,
          price: Number(formData.price),
          category: formData.category as Category,
          stock: Number(formData.stock) || 0,
          description: formData.description || '',
          image: formData.image || 'https://images.unsplash.com/photo-1581235720704-06d3acfc13bc',
          rating: 5, reviews: 0, featured: true, features: []
        });
        setIsSaving(false);
        setShowAddModal(false);
        setFormData({ name: '', price: 0, category: Category.ELECTRONICS, stock: 0, description: '', image: '' });
      }, 800);
    }
  };

  return (
    <div className="flex h-screen bg-[#0B0D11] text-[#e2e8f0] overflow-hidden font-sans">
      {/* SIDEBAR */}
      <aside className={`bg-[#13151A] border-r border-white/5 transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#4F46E5] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          {sidebarOpen && <span className="text-xl font-bold tracking-tighter text-white">Rocker Admin</span>}
        </div>
        
        <nav className="flex-grow overflow-y-auto px-4 py-6 scrollbar-hide">
          <p className={`text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-6 px-4 ${!sidebarOpen && 'hidden'}`}>Business Operations</p>
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.name}>
                <button 
                  onClick={() => setActiveTab(item.name)} 
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative ${activeTab === item.name ? 'bg-indigo-600/10 text-white shadow-[0_0_20px_rgba(79,70,229,0.2)] border border-indigo-500/30' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}
                >
                  <span className={`shrink-0 ${activeTab === item.name ? 'text-indigo-400' : ''}`}>{item.icon}</span>
                  {sidebarOpen && <span className="text-sm font-bold">{item.name}</span>}
                  {activeTab === item.name && sidebarOpen && (
                    <div className="absolute right-3 w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(129,140,248,0.8)]"></div>
                  )}
                </button>
              </li>
            ))}
          </ul>
          
          <div className="mt-12 pt-8 border-t border-white/5">
            <button onClick={() => { logout(); onNavigate('home'); }} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-500/60 hover:text-red-400 hover:bg-red-400/5 transition-all ${!sidebarOpen && 'justify-center'}`}>
              <LogOut size={20} />
              {sidebarOpen && <span className="text-sm font-bold">Sign Out</span>}
            </button>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col overflow-hidden bg-[#0B0D11]">
        {/* Header */}
        <header className="h-20 bg-[#13151A] border-b border-white/5 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-6">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-zinc-500 hover:text-white transition-colors"><Zap size={20} /></button>
            <div className="hidden lg:flex items-center bg-[#0B0D11] rounded-2xl px-5 py-2.5 border border-white/5 group focus-within:ring-2 focus-within:ring-indigo-500/20">
              <Search size={18} className="text-zinc-600 group-focus-within:text-indigo-400" />
              <input type="text" placeholder="Search data..." className="bg-transparent border-none outline-none ml-3 text-sm text-white w-80 placeholder-zinc-700" />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 pr-6 border-r border-white/5">
              <div className="flex items-center gap-1 bg-[#1A1D23] border border-indigo-500/40 px-3 py-1.5 rounded-2xl shadow-[0_0_15px_rgba(79,70,229,0.1)]">
                <HeaderIcon icon={<Bell size={18} />} hasDot={true} />
                <HeaderIcon icon={<Calendar size={18} />} />
                <HeaderIcon icon={<Settings size={18} />} />
              </div>
            </div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-xs font-black text-white leading-none mb-1">Dipto Islam</p>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Master Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 group-hover:border-indigo-500 transition-all overflow-hidden shadow-lg">
                <img src="https://i.pravatar.cc/150?u=dipto" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Views */}
        <div className="flex-grow overflow-y-auto p-10 custom-scrollbar">
          
          {/* DASHBOARD VIEW */}
          {activeTab === 'Dashboard' && (
            <div className="animate-in fade-in duration-500 space-y-10">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-black text-white">Snapshot Overview</h2>
                  <p className="text-zinc-500 text-sm mt-1">Real-time performance metrics for your store.</p>
                </div>
                <button className="flex items-center gap-2 bg-[#2D2D7B] px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-[0_4px_15px_rgba(45,45,123,0.3)] hover:bg-[#3b3b9b] transition-all">
                  <Download size={16} /> Export Data
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Net Revenue" value={`$${stats.revenue.toLocaleString()}`} trend="+12.5%" icon={<TrendingUp className="text-emerald-400" />} />
                <StatCard title="Total Orders" value={stats.orders.toString()} trend="+8.3%" icon={<ShoppingCart className="text-blue-400" />} />
                <StatCard title="Avg Order Value" value={`$${stats.avgOrderValue.toFixed(2)}`} trend="-2.1%" icon={<Activity className="text-indigo-400" />} />
                <StatCard title="Low Stock Items" value={stats.lowStockCount.toString()} alert icon={<AlertTriangle className="text-orange-400" />} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sales Chart Mockup */}
                <div className="lg:col-span-8 bg-[#13151A] rounded-[2.5rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="font-bold text-white text-lg">Revenue Momentum</h3>
                    <div className="flex gap-2">
                      <button className="px-4 py-1.5 rounded-xl bg-white/5 text-[10px] font-black uppercase text-zinc-400 hover:text-white transition-all">Weekly</button>
                      <button className="px-4 py-1.5 rounded-xl bg-[#2D2D7B] text-[10px] font-black uppercase text-white shadow-lg">Monthly</button>
                    </div>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-3 px-2 relative z-10">
                    {[35, 60, 25, 80, 40, 95, 65, 50, 85, 45, 75, 65].map((h, i) => (
                      <div key={i} className="flex-1 group relative">
                        <div 
                          className="w-full bg-gradient-to-t from-indigo-500/20 via-indigo-500/60 to-indigo-400 rounded-t-xl transition-all duration-500 group-hover:to-indigo-300 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]" 
                          style={{ height: `${h}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 grid grid-rows-4 pointer-events-none opacity-[0.03] px-10 py-10 pt-28">
                    <div className="border-t border-white"></div>
                    <div className="border-t border-white"></div>
                    <div className="border-t border-white"></div>
                  </div>
                </div>

                {/* Traffic Sources */}
                <div className="lg:col-span-4 bg-[#13151A] rounded-[2.5rem] p-10 border border-white/5 shadow-2xl">
                  <h3 className="font-bold text-white text-lg mb-8">Traffic Origins</h3>
                  <div className="space-y-6">
                    <TrafficItem label="Direct Search" value="65%" color="bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]" />
                    <TrafficItem label="Social Media" value="20%" color="bg-emerald-500" />
                    <TrafficItem label="Referral Sites" value="10%" color="bg-amber-500" />
                    <TrafficItem label="Email Ads" value="5%" color="bg-rose-500" />
                  </div>
                  <div className="mt-10 pt-10 border-t border-white/5 text-center">
                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-2">Real-time Users</p>
                    <p className="text-4xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">482</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS VIEW */}
          {activeTab === 'Products' && (
            <div className="animate-in slide-in-from-bottom-6 duration-500 space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black text-white">Product Catalog</h2>
                <button onClick={() => setShowAddModal(true)} className="flex items-center gap-3 bg-indigo-600 px-8 py-4 rounded-[1.5rem] text-sm font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/30 hover:scale-105 transition-transform">
                  <Plus size={20} /> Add New Entry
                </button>
              </div>

              <div className="bg-[#13151A] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-zinc-500 text-[10px] uppercase font-black">
                    <tr>
                      <th className="p-8">Image & Label</th>
                      <th className="p-8">Category</th>
                      <th className="p-8">Pricing</th>
                      <th className="p-8">Inventory</th>
                      <th className="p-8 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                        <td className="p-8">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-zinc-800 overflow-hidden p-2 border border-white/5 group-hover:border-indigo-500/50 transition-colors">
                              <img src={p.image} className="w-full h-full object-contain" />
                            </div>
                            <div>
                              <p className="font-bold text-white text-base leading-tight mb-1">{p.name}</p>
                              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">SKU: #{p.id.toUpperCase()}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-8"><span className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-zinc-400">{p.category}</span></td>
                        <td className="p-8 font-black text-white text-lg">${p.price.toFixed(2)}</td>
                        <td className="p-8">
                          <div className={`font-black text-xs uppercase flex items-center gap-2 ${p.stock < 10 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            <div className={`w-2 h-2 rounded-full ${p.stock < 10 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
                            {p.stock} Units
                          </div>
                        </td>
                        <td className="p-8 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => setEditingProduct(p)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all"><Edit2 size={16}/></button>
                            <button onClick={() => deleteProduct(p.id)} className="p-3 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl text-rose-500 transition-all"><Trash2 size={16}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ORDERS VIEW */}
          {activeTab === 'Orders' && (
            <div className="animate-in slide-in-from-bottom-6 duration-500 space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black text-white">Fulfillment Hub</h2>
                <div className="flex bg-[#13151A] rounded-2xl p-1 border border-white/5">
                  {['All', 'Pending', 'Shipped', 'Delivered'].map(s => (
                    <button key={s} className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">{s}</button>
                  ))}
                </div>
              </div>

              <div className="bg-[#13151A] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-zinc-500 text-[10px] uppercase font-black">
                    <tr><th className="p-8">Order ID</th><th className="p-8">Customer</th><th className="p-8">Logistics</th><th className="p-8">Value</th><th className="p-8 text-right">Management</th></tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.map(o => (
                      <tr key={o.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-8"><span className="text-indigo-400 font-black">#{o.id}</span></td>
                        <td className="p-8">
                          <p className="font-bold text-white">{o.customerName}</p>
                          <p className="text-[10px] text-zinc-600 font-medium">{o.customerEmail}</p>
                        </td>
                        <td className="p-8">
                          <select 
                            value={o.status} 
                            onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                            className="bg-[#0B0D11] border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-zinc-400 focus:text-white outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="returned">Returned</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-8 font-black text-white">${o.total.toFixed(2)}</td>
                        <td className="p-8 text-right">
                          <button className="p-3 bg-white/5 rounded-xl hover:text-indigo-400 transition-colors"><ExternalLink size={16}/></button>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr><td colSpan={5} className="p-20 text-center text-zinc-600 font-bold">No active orders found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CUSTOMERS VIEW */}
          {activeTab === 'Customers' && (
            <div className="animate-in slide-in-from-bottom-6 duration-500 space-y-8">
               <h2 className="text-3xl font-black text-white">Client Portfolio</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {users.map(u => (
                   <div key={u.id} className="bg-[#13151A] rounded-[2.5rem] p-8 border border-white/5 hover:border-indigo-500/30 transition-all group">
                      <div className="flex items-center gap-6 mb-8">
                        <img src={u.avatar} className="w-16 h-16 rounded-2xl border-2 border-white/5 group-hover:border-indigo-500 transition-colors shadow-xl" />
                        <div>
                          <h4 className="text-lg font-bold text-white">{u.name}</h4>
                          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{u.role}</p>
                        </div>
                      </div>
                      <div className="space-y-4 pt-4 border-t border-white/5 text-sm font-bold">
                        <div className="flex justify-between text-zinc-500">Email: <span className="text-white">{u.email}</span></div>
                        <div className="flex justify-between text-zinc-500">Joined: <span className="text-white">{u.joinedDate.split('T')[0]}</span></div>
                        <button className="w-full mt-4 py-3 bg-indigo-600/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all">View Details</button>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* INVENTORY VIEW */}
          {activeTab === 'Inventory' && (
            <div className="animate-in slide-in-from-bottom-6 duration-500 space-y-8">
              <h2 className="text-3xl font-black text-white">Stock Control</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => (
                  <div key={p.id} className="bg-[#13151A] rounded-[2rem] p-6 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <img src={p.image} className="w-12 h-12 rounded-xl object-contain bg-zinc-800" />
                       <div>
                         <p className="font-bold text-white">{p.name}</p>
                         <p className="text-xs text-zinc-600">Stock: {p.stock}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <button onClick={() => updateProduct({...p, stock: p.stock - 1})} className="p-2 bg-white/5 rounded-lg hover:text-white"><Minus size={14}/></button>
                       <button onClick={() => updateProduct({...p, stock: p.stock + 1})} className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg hover:bg-indigo-600 hover:text-white"><Plus size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REVIEWS VIEW (Moderation) */}
          {activeTab === 'Reviews' && (
            <div className="animate-in slide-in-from-bottom-6 duration-500 space-y-8">
              <h2 className="text-3xl font-black text-white">Social Proof</h2>
              <div className="space-y-6">
                {products.filter(p => p.reviewList && p.reviewList.length > 0).map(p => (
                  <div key={p.id} className="bg-[#13151A] rounded-[2.5rem] p-10 border border-white/5">
                     <div className="flex items-center gap-4 mb-8">
                        <img src={p.image} className="w-12 h-12 rounded-xl object-contain bg-zinc-800 p-2" />
                        <h4 className="font-bold text-lg text-white">{p.name}</h4>
                     </div>
                     <div className="space-y-6">
                        {p.reviewList?.map(r => (
                          <div key={r.id} className="flex justify-between items-start bg-[#0B0D11] p-6 rounded-3xl border border-white/5">
                            <div className="flex gap-4">
                              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold text-white uppercase">{r.userName.charAt(0)}</div>
                              <div>
                                <div className="flex items-center gap-2 mb-1"><span className="font-bold text-white">{r.userName}</span></div>
                                <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl">{r.comment}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {!r.isModerated && <button onClick={() => moderateReview(p.id, r.id, 'approve')} className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"><Check size={18}/></button>}
                              <button onClick={() => moderateReview(p.id, r.id, 'delete')} className="p-2 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"><Trash size={18}/></button>
                            </div>
                          </div>
                        ))}
                     </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CMS VIEW */}
          {activeTab === 'CMS' && (
            <div className="animate-in slide-in-from-bottom-6 duration-500 space-y-8">
              <h2 className="text-3xl font-black text-white">Storefront CMS</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {banners.map(b => (
                   <div key={b.id} className="bg-[#13151A] rounded-[3rem] overflow-hidden border border-white/5 relative group">
                      <img src={b.image} className="w-full h-80 object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] to-transparent"></div>
                      <div className="absolute bottom-10 left-10">
                        <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em] mb-2">Primary Banner</p>
                        <h4 className="text-3xl font-black text-white mb-2">{b.title}</h4>
                        <p className="text-zinc-400 mb-6">{b.subtitle}</p>
                        <div className="flex gap-4">
                           <button className="px-6 py-2.5 bg-white text-black rounded-xl text-[10px] font-black uppercase">Edit Details</button>
                           <button className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase ${b.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                             {b.isActive ? 'Live' : 'Hidden'}
                           </button>
                        </div>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {/* MARKETING VIEW */}
          {activeTab === 'Marketing' && (
            <div className="animate-in slide-in-from-bottom-6 duration-500 space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black text-white">Promo Hub</h2>
                <button className="flex items-center gap-3 bg-indigo-600 px-8 py-4 rounded-3xl text-sm font-black uppercase tracking-widest shadow-xl"><Plus size={20} /> New Coupon</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coupons.map(c => (
                  <div key={c.id} className="bg-[#13151A] rounded-[2.5rem] p-8 border border-dashed border-indigo-500/30">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-2xl font-black text-indigo-400">{c.code}</span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black ${c.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>{c.isActive ? 'Active' : 'Expired'}</span>
                    </div>
                    <p className="text-zinc-400 mb-6">Save {c.value}{c.discountType === 'percentage' ? '%' : '$'} on orders above ${c.minSpend}</p>
                    <div className="flex justify-between text-[10px] font-black uppercase text-zinc-600"><span>Used {c.usageCount} times</span><span>Expires {c.expiryDate}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REPORTS VIEW */}
          {activeTab === 'Reports' && (
            <div className="animate-in slide-in-from-bottom-6 duration-500 space-y-8">
              <h2 className="text-3xl font-black text-white">Business Intelligence</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#13151A] rounded-[2.5rem] p-10 border border-white/5">
                  <h3 className="font-bold text-white mb-6">Sales Performance</h3>
                  <div className="h-64 flex items-end justify-between gap-4 px-2">
                    {[40, 65, 30, 85, 45, 95, 70, 55, 80, 45, 60, 75].map((h, i) => (
                      <div key={i} className="flex-1 bg-indigo-500/50 rounded-t-lg" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6 text-xs text-zinc-600 uppercase font-black"><span>JAN</span><span>DEC</span></div>
                </div>
                <div className="bg-[#13151A] rounded-[2.5rem] p-10 border border-white/5">
                  <h3 className="font-bold text-white mb-6">Inventory Health</h3>
                  <div className="space-y-6">
                    <TrafficItem label="Electronics" value="82%" color="bg-indigo-500" />
                    <TrafficItem label="Audio" value="65%" color="bg-emerald-500" />
                    <TrafficItem label="Wearables" value="48%" color="bg-amber-500" />
                    <TrafficItem label="Accessories" value="20%" color="bg-rose-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS VIEW */}
          {activeTab === 'Settings' && (
            <div className="animate-in slide-in-from-bottom-6 duration-500 space-y-8 max-w-2xl">
              <h2 className="text-3xl font-black text-white">System Settings</h2>
              <div className="bg-[#13151A] rounded-[2.5rem] p-10 border border-white/5 space-y-8">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                   <div className="flex items-center gap-4"><Shield size={20} className="text-indigo-400"/><span className="font-bold">Two-Factor Authentication</span></div>
                   <div className="w-12 h-6 bg-emerald-500 rounded-full flex items-center px-1 justify-end"><div className="w-4 h-4 bg-white rounded-full"></div></div>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                   <div className="flex items-center gap-4"><Truck size={20} className="text-indigo-400"/><span className="font-bold">Free Shipping Threshold</span></div>
                   <input type="text" className="bg-[#0B0D11] border border-white/10 rounded-xl px-4 py-2 text-sm w-20 text-center font-bold" defaultValue="$100" />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                   <div className="flex items-center gap-4"><RefreshCcw size={20} className="text-indigo-400"/><span className="font-bold">Auto-Sync Inventory</span></div>
                   <div className="w-12 h-6 bg-zinc-700 rounded-full flex items-center px-1"><div className="w-4 h-4 bg-zinc-500 rounded-full"></div></div>
                </div>
                <button className="w-full py-5 bg-indigo-600 rounded-[1.5rem] font-black uppercase text-sm tracking-widest shadow-xl shadow-indigo-600/20">Save Configuration</button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-in fade-in" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-[#13151A] w-full max-w-2xl rounded-[3.5rem] p-12 border border-white/10 shadow-[0_0_150px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto custom-scrollbar animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-10 sticky top-0 bg-[#13151A] z-10 py-2 border-b border-white/5">
              <h3 className="text-3xl font-black text-white">New Inventory Item</h3>
              <button onClick={() => setShowAddModal(false)} className="w-12 h-12 hover:bg-white/5 rounded-2xl flex items-center justify-center text-zinc-500"><XCircle size={32}/></button>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-2">Product Media</label>
                <div onClick={() => fileInputRef.current?.click()} className="w-full h-64 bg-[#0B0D11] border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500/50 hover:bg-white/5 transition-all overflow-hidden group">
                  {formData.image ? (
                    <img src={formData.image} className="w-full h-full object-contain p-6" />
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center text-indigo-500 mx-auto mb-4 group-hover:scale-110 transition-transform"><Upload size={40}/></div>
                      <p className="text-sm font-bold text-zinc-400">Drag or click to upload</p>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex gap-4">
                   <div className="flex-grow">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-2 block mb-2">Product Name</label>
                      <input type="text" className="w-full bg-[#0B0D11] border border-white/5 rounded-2xl px-6 py-4 outline-none font-bold text-white placeholder-zinc-800" placeholder="e.g. Stealth Pro Gen 2" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                   </div>
                   <button onClick={async () => { if(!formData.name) return; setIsGenerating(true); const desc = await geminiService.generateProductDescription(formData.name!, formData.category || 'Electronics'); setFormData(prev => ({...prev, description: desc})); setIsGenerating(false); }} className="mt-8 bg-[#2D2D7B] px-6 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"><Zap size={24} className={isGenerating ? 'animate-pulse' : ''}/></button>
                </div>
                <div>
                   <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-2 block mb-2">Retail Price ($)</label>
                   <input type="number" className="w-full bg-[#0B0D11] border border-white/5 rounded-2xl px-6 py-4 outline-none text-white font-black" value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                </div>
                <div>
                   <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-2 block mb-2">Initial Stock</label>
                   <input type="number" className="w-full bg-[#0B0D11] border border-white/5 rounded-2xl px-6 py-4 outline-none text-white font-black" value={formData.stock || ''} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-2 block mb-2">Marketing Description</label>
                <textarea className="w-full bg-[#0B0D11] border border-white/5 rounded-3xl px-6 py-4 outline-none h-40 text-sm text-zinc-300 leading-relaxed resize-none" placeholder="Elaborate on features, design, and target audience..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>

              <button onClick={handleAddProduct} disabled={isSaving || !formData.name} className="w-full bg-indigo-600 text-white py-6 rounded-[2rem] font-black hover:bg-indigo-500 transition-all text-xl shadow-2xl shadow-indigo-600/20 mt-6 flex items-center justify-center gap-3">
                {isSaving ? <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div> : "Publish to Storefront"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// UI Helpers
const StatCard = ({ title, value, trend, icon, alert = false }: { title: string, value: string, trend?: string, icon: React.ReactNode, alert?: boolean }) => (
  <div className={`bg-[#13151A] rounded-[2.5rem] p-8 border ${alert ? 'border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.05)]' : 'border-white/5 shadow-2xl'} group hover:border-white/10 transition-all duration-300`}>
    <div className="flex justify-between items-start mb-6">
       <div className={`p-4 rounded-2xl ${alert ? 'bg-orange-500/10' : 'bg-white/5'} group-hover:scale-110 transition-transform duration-500`}>{icon}</div>
       {trend && <span className={`text-[10px] font-black ${trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>{trend}</span>}
    </div>
    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
    <h4 className="text-3xl font-black text-white">{value}</h4>
  </div>
);

const TrafficItem = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs font-bold">
      <span className="text-zinc-500">{label}</span>
      <span className="text-white">{value}</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: value }}></div>
    </div>
  </div>
);

const HeaderIcon = ({ icon, hasDot }: { icon: React.ReactNode, hasDot?: boolean }) => (
  <button className="relative p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
    {icon}
    {hasDot && (
      <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-white rounded-full border-[2.5px] border-[#1A1D23] shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
    )}
  </button>
);

export default AdminDashboard;
