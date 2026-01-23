import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import svgPaths from "../../../imports/svg-qlugq798q6";
import imgContainer from "../assets/boysmodel.png";
import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="relative w-full pt-2 bg-white overflow-hidden pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-black"></span>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-900">New Collection 2026</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6"
            >
              Wear Your <br />
              <span className="text-[#0f00ff] italic">Attitude.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8 max-w-md leading-relaxed"
            >
              Curated fashion eyewear and streetwear for the modern individual. Designed in Kathmandu, worn globally.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10"
            >
              <button className="flex items-center justify-center gap-2 bg-[#0f00ff] text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 font-medium text-lg">
                Shop Collection
                <ArrowRight size={20} />
              </button>
              <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 px-8 py-4 rounded-2xl hover:bg-gray-50 transition-colors font-medium text-lg">
                <MessageCircle size={20} />
                Inquire on WhatsApp
              </button>
            </motion.div>
            
          </div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-3/5  lg:h-[800px]">
              <img 
                src={imgContainer} 
                alt="Models wearing KTM Wears collection" 
                className="w-full h-full object-fill"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Floating Elements (Decorations) */}
             <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-50 rounded-full -z-10 blur-2xl opacity-50"></div>
             <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-50 rounded-full -z-10 blur-3xl opacity-50"></div>
          </motion.div>

        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-[#25d366] text-white p-4 rounded-full shadow-lg hover:bg-[#128c7e] transition-transform hover:scale-110 flex items-center justify-center w-14 h-14">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-7 h-7">
              <path d={svgPaths.p256fbe20} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
           </svg>
        </button>
      </div>
    </section>
  );
}
