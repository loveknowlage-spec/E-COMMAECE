
import React from 'react';
import { ArrowUpRight, Star, ShoppingBag, Plus, Sparkles, ArrowRight, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useStore } from '../components/StoreContext';
import { Category } from '../types';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { products } = useStore();
  const featuredProduct = products.find(p => p.featured) || products[0];

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="px-4 md:px-8 mt-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
          {/* Main Hero Card */}
          <div className="lg:col-span-12 bg-white rounded-[2.5rem] p-8 md:p-12 md:pl-20 relative overflow-hidden group shadow-sm border border-zinc-100 flex flex-col justify-center min-h-[500px]">
            
            {/* Background Accent */}
            <div className="absolute right-0 top-0 bottom-0 w-[65%] bg-[#F1F4F5] rounded-l-[10rem] md:rounded-l-[20rem] transition-transform group-hover:scale-105 duration-1000 origin-right"></div>
            
            <div className="relative z-10 max-w-lg">
              <div className="flex items-center gap-2 mb-8 animate-in slide-in-from-left duration-700">
                <div className="p-1.5 bg-zinc-100 rounded-full">
                  <Sparkles size={12} />
                </div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Music is Classic</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 mb-6 leading-[1] animate-in slide-in-from-left duration-700 delay-100">
                {featuredProduct.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-10 animate-in slide-in-from-left duration-700 delay-200">
                <div className="w-12 h-[2px] bg-zinc-200"></div>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[280px]">
                  Clear Sounds. Making your dream music come true stay with Sequoia Sounds!
                </p>
              </div>

              <button 
                onClick={() => onNavigate('shop')}
                className="group flex items-center gap-3 bg-[#A3E635] text-black px-8 py-4 rounded-full font-bold transition-all hover:bg-lime-500 active:scale-95 shadow-lg shadow-black/5"
              >
                View All Products
                <div className="bg-black p-2 rounded-full text-white transition-transform group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
              </button>
            </div>

            {/* Hero Image */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-3/5 h-[80%] pointer-events-none z-10">
               <img 
                src={featuredProduct.image} 
                alt={featuredProduct.name}
                className="w-full h-full object-contain scale-110 lg:scale-125 transition-transform duration-1000 group-hover:translate-x-4"
              />
            </div>

            {/* Social Links at Bottom Left */}
            <div className="absolute bottom-12 left-12 md:left-20 flex items-center gap-4 animate-in fade-in duration-1000">
               <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest">Follow us on:</span>
               <div className="flex items-center gap-3 text-zinc-400">
                  <a href="#" className="hover:text-black transition-colors"><Twitter size={14} /></a>
                  <a href="#" className="hover:text-black transition-colors"><TikTokIcon /></a>
                  <a href="#" className="hover:text-black transition-colors"><Instagram size={14} /></a>
                  <a href="#" className="hover:text-black transition-colors"><Linkedin size={14} /></a>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="px-4 md:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-4xl font-bold text-zinc-900 mb-2">Featured Products</h2>
              <p className="text-zinc-500 font-medium">Our most loved and premium items from the catalog.</p>
            </div>
            <button 
              onClick={() => onNavigate('shop')} 
              className="flex items-center gap-2 bg-[#F1F4F5] hover:bg-zinc-200 text-zinc-900 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all"
            >
              Shop All <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-zinc-100 group hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-full"
                onClick={() => onNavigate('product', product)}
              >
                <div className="relative mb-6 flex-grow aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#F8F9FA] flex items-center justify-center p-6">
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
                </div>

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
        </div>
      </section>
    </div>
  );
};

const TikTokIcon = () => <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.05.34-.05.68-.02 1.01.03.84.32 1.72.91 2.31.59.61 1.43.95 2.27.99 1.07.03 2.17-.41 2.87-1.23.63-.74.88-1.74.87-2.7V.02z"/></svg>;

export default Home;
