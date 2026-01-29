import React from "react";
import { motion } from "motion/react";
import { Instagram } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
];

const MarqueeContent = () =>
  [...images, ...images, ...images].map((img, index) => (
    <div
      key={index}
      className="
        relative
        w-[220px] h-[220px]
        sm:w-[260px] sm:h-[260px]
        lg:w-[300px] lg:h-[300px]
        rounded-2xl overflow-hidden shrink-0 group cursor-pointer
      "
    >
      <img src={img} alt="Instagram post" className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
        <div className="bg-white p-2 sm:p-3 rounded-full text-black">
          <Instagram size={20} className="sm:w-6 sm:h-6" />
        </div>
      </div>
    </div>
  ));

export function SocialMedia() {
  return (
    <section className="bg-white overflow-hidden py-0 sm:py-0 lg:py-0">
      {/* Heading */}
      <div className="text-center mb-10 sm:mb-14 px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
          Follow Us on Our{" "}
          <span className="text-[#0f00ff]">Social media</span> Handle
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Inspire and let yourself be inspired, from one unique fashion to another.
        </p>
      </div>

      {/* MOBILE – faster marquee */}
      <div className="block sm:hidden">
        <motion.div
          className="flex gap-4 flex-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 12, // 🔥 faster for mobile
          }}
        >
          <MarqueeContent />
        </motion.div>
      </div>

      {/* DESKTOP – original speed */}
      <div className="hidden sm:block">
        <motion.div
          className="flex gap-6 flex-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20, // unchanged desktop speed
          }}
        >
          <MarqueeContent />
        </motion.div>
      </div>
    </section>
  );
}
