
import React, { useState, useMemo, useEffect } from 'react';
import { Filter, Search, ShoppingBag, Star, LayoutGrid, List, Sparkles } from 'lucide-react';
import { useStore } from '../components/StoreContext';
import { Category, Product } from '../types';

interface ShopProps {
  onNavigate: (page: string, params?: any) => void;
  initialSearch?: string;
}

const Shop: React.FC<ShopProps> = ({ onNavigate, initialSearch = '' }) => {
  const { products, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-high': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
      default: result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-zinc-900 mb-2">Our Collection</h1>
          <p className="text-zinc-500">Discover precision and premium technology.</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="px-8 py-3 rounded-full bg-black text-white text-sm font-bold shadow-lg shadow-black/10 hover:scale-105 transition-transform">Browse All</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-3 space-y-8">
          <div>
            <h3 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
              <Filter size={18} /> Categories
            </h3>
            <div className="space-y-2">
              {['All', ...Object.values(Category)].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-medium ${selectedCategory === cat ? 'bg-black text-white' : 'bg-white text-zinc-500 hover:bg-zinc-50'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#A3E635] rounded-3xl p-6 text-black relative overflow-hidden">
             <div className="relative z-10">
                <h4 className="font-bold text-lg mb-2">Limited Offer</h4>
                <p className="text-sm font-medium opacity-80 mb-4">Get 20% off on all accessories.</p>
                <button className="bg-black text-white text-xs px-4 py-2 rounded-full font-bold">Claim Now</button>
             </div>
             <Sparkles size={100} className="absolute -right-8 -bottom-8 text-black/10 rotate-12" />
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-9">
          <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-zinc-100">
            <span className="text-sm text-zinc-500 font-medium">{filteredProducts.length} Products found</span>
            <div className="flex items-center gap-4">
               <select 
                className="bg-transparent border-none text-sm font-bold focus:ring-0 outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
               >
                 <option value="featured">Featured First</option>
                 <option value="price-low">Price: Low to High</option>
                 <option value="price-high">Price: High to Low</option>
                 <option value="rating">Best Rated</option>
               </select>
               <div className="h-6 w-[1px] bg-zinc-200"></div>
               <div className="flex items-center gap-2">
                 <button className="p-2 bg-zinc-100 rounded-lg"><LayoutGrid size={16} /></button>
                 <button className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-lg"><List size={16} /></button>
               </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-zinc-100 group hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col"
                  onClick={() => onNavigate('product', product)}
                >
                  {/* Product Image Area */}
                  <div className="relative mb-6 flex-grow aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#F8F9FA] flex items-center justify-center p-6">
                    {/* Badge */}
                    {product.oldPrice ? (
                      <div className="absolute top-4 left-4 bg-[#5A7D8C] text-white text-[9px] font-bold px-3 py-1 rounded-md uppercase tracking-wider z-10">Sale</div>
                    ) : (
                      <div className="absolute top-4 left-4 bg-black text-white text-[9px] font-bold px-3 py-1 rounded-md uppercase tracking-wider z-10">New</div>
                    )}

                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                    />
                    
                    {/* Subtle Cart Button Overlay */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="absolute bottom-4 right-4 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#A3E635] hover:text-black shadow-lg"
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>

                  {/* Product Info - Centered */}
                  <div className="px-4 pb-4 text-center">
                    <span className="block text-[10px] font-bold text-[#AAB8BC] uppercase tracking-[0.2em] mb-2">
                      {product.category}
                    </span>
                    <h4 className="font-bold text-zinc-900 mb-2 line-clamp-1">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-base font-bold text-zinc-900">${product.price.toFixed(2)}</span>
                      {product.oldPrice && (
                        <span className="text-xs text-zinc-300 line-through font-medium">${product.oldPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] p-20 text-center border border-dashed border-zinc-200">
               <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Search size={32} className="text-zinc-300" />
               </div>
               <h3 className="text-xl font-bold mb-2">No products found</h3>
               <p className="text-zinc-500 mb-8">Try adjusting your filters or search terms.</p>
               <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="bg-black text-white px-8 py-3 rounded-full font-bold">Reset Filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
