import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-5 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#0f00ff] text-white px-2 py-1 rounded font-bold text-sm tracking-widest">
                KTM
              </div>
              <span className="font-bold text-xl tracking-wide uppercase">Wears</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Premium eyewear and fashion essentials designed for the modern lifestyle. Quality meets comfort in every piece.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0f00ff] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0f00ff] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0f00ff] transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Shop</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Eyewear Collection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Clothing Line</a></li>
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-6 text-sm text-gray-400">
              <li className="flex gap-3">
                <Mail size={18} className="shrink-0 text-[#0f00ff]" />
                <div>
                  <span className="block text-xs uppercase text-gray-500 mb-1">Email</span>
                  <a href="mailto:hello@ktmwears.com" className="hover:text-white">hello@ktmwears.com</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="shrink-0 text-[#0f00ff]" />
                <div>
                  <span className="block text-xs uppercase text-gray-500 mb-1">Phone / WhatsApp</span>
                  <a href="tel:+15551234567" className="hover:text-white">+1 (555) 123-4567</a>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin size={18} className="shrink-0 text-[#0f00ff]" />
                <div>
                  <span className="block text-xs uppercase text-gray-500 mb-1">Location</span>
                  <span>123 Fashion Ave, New York, NY</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 KTM Wears. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
