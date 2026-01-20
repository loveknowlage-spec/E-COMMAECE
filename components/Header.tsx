
import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, User, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useStore } from './StoreContext';

interface HeaderProps {
  onNavigate: (page: string, params?: any) => void;
  activePage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, activePage }) => {
  const { cart, currentUser, logout } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onNavigate('shop', { search: searchVal });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4 md:px-8">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <span className="text-2xl font-black tracking-tighter text-[#2D2D7B]">DIPTO.</span>
        </div>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-grow max-w-xl mx-8 items-center bg-[#F1F4F5] rounded-xl px-4 py-2 group focus-within:ring-2 focus-within:ring-black/5">
          <Search size={16} className="text-zinc-400 group-focus-within:text-black" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 outline-none text-black placeholder-zinc-400"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('cart')}
            className="p-3 bg-[#F1F4F5] hover:bg-zinc-200 rounded-xl text-zinc-600 transition-colors relative"
          >
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2D2D7B] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
          
          {currentUser ? (
            <div className="flex items-center gap-3 bg-[#F1F4F5] pl-1 pr-4 py-1 rounded-2xl border border-zinc-100">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-xl object-cover border border-white" />
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-zinc-900 leading-tight truncate max-w-[80px]">{currentUser.name}</p>
                <p className="text-[10px] text-zinc-400 font-medium">{currentUser.role === 'admin' ? 'ADMIN' : 'DIPTOPLUS'}</p>
              </div>
              <button onClick={logout} className="ml-2 text-zinc-400 hover:text-red-500">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-[#F1F4F5] pl-1 pr-4 py-1 rounded-2xl border border-zinc-100">
              <div className="w-10 h-10 rounded-xl bg-zinc-200 flex items-center justify-center text-zinc-400">
                <User size={20} />
              </div>
              <div className="text-left">
                <button onClick={() => onNavigate('login')} className="text-xs font-bold text-zinc-900 hover:underline">Guest User</button>
                <p className="text-[10px] text-zinc-400 font-medium">SIGN IN</p>
              </div>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-zinc-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 glass rounded-3xl p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="text-left py-2 font-medium border-b border-zinc-100">Home</button>
          <button onClick={() => { onNavigate('shop'); setMobileMenuOpen(false); }} className="text-left py-2 font-medium border-b border-zinc-100">Shop</button>
          {currentUser?.role === 'admin' && (
            <button onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }} className="text-left py-2 font-medium border-b border-zinc-100">Admin Panel</button>
          )}
          <button onClick={() => { onNavigate('cart'); setMobileMenuOpen(false); }} className="text-left py-2 font-medium">My Cart ({cart.length})</button>
        </div>
      )}
    </header>
  );
};

export default Header;
