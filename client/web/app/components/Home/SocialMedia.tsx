import React from 'react';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

const images = [
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80", 
];

export function SocialMedia() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Follow Us on Our <span className="text-[#0f00ff]">Social media</span> Handle
        </h2>
        <p className="text-gray-600 text-lg">
          Inspire and let yourself be inspired, from one unique fashion to another.
        </p>
      </div>

      <div className="relative w-full">
        {/* Marquee Container */}
        <div className="flex gap-6 w-full">
           <motion.div 
             className="flex gap-6 flex-nowrap"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ 
               repeat: Infinity, 
               ease: "linear", 
               duration: 20 
             }}
           >
             {[...images, ...images, ...images].map((img, index) => (
               <div key={index} className="relative w-[300px] h-[300px] rounded-2xl overflow-hidden shrink-0 group cursor-pointer">
                 <img src={img} alt="Instagram post" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                   <div className="bg-white p-3 rounded-full text-black">
                     <Instagram size={24} />
                   </div>
                 </div>
               </div>
             ))}
           </motion.div>
        </div>
      </div>
    </section>
  );
}
