
import React from 'react';
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-20 pb-10 px-8 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#2D2D7B] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#2D2D7B]">DIPTO.</span>
          </div>
          <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
            Experience the future of commerce with DIPTO. Premium products, unparalleled service, and a seamless shopping experience.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-[#2D2D7B] hover:text-white transition-all"><Twitter size={16} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-[#2D2D7B] hover:text-white transition-all"><Instagram size={16} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-[#2D2D7B] hover:text-white transition-all"><Linkedin size={16} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-zinc-900 mb-6">Explore</h4>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-black transition-colors">Best Sellers</a></li>
            <li><a href="#" className="hover:text-black transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-zinc-900 mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-zinc-500">
            <li><a href="#" className="hover:text-black transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-zinc-900 mb-6">Join the Community</h4>
          <p className="text-zinc-500 text-sm mb-4">Follow us on our social platforms to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-zinc-400 text-xs">© 2024 DIPTO Commerce. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
