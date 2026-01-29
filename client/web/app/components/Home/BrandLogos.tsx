import { motion } from "motion/react";
import imgSsEntryPassword1 from "../assets/asos.png";
import imgSsEntryPassword2 from "../assets/celine.png";
import imgSsEntryPassword3 from "../assets/nike.png";
import imgSsEntryPassword4 from "../assets/miu.png";
import imgSsEntryPassword5 from "../assets/drapa.png";
import imgSsEntryPassword6 from "../assets/burberry.png";

const logos = [
  imgSsEntryPassword1,
  imgSsEntryPassword2,
  imgSsEntryPassword3,
  imgSsEntryPassword4,
  imgSsEntryPassword5,
  imgSsEntryPassword6,
];

export function BrandLogos() {
  // duplicate logos more on mobile to fill space
  const mobileLogos = [...logos, ...logos, ...logos];
  const desktopLogos = [...logos, ...logos];

  return (
    <section className="py-0 border-b border-gray-100 bg-white overflow-hidden relative">
      <div className="w-full overflow-hidden">
        
        {/* MOBILE */}
        <motion.div
          className="flex gap-4 sm:gap-6 md:gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          whileHover={{ x: "0%" }}
        >
          {mobileLogos.map((logo, i) => (
            <div
              key={i}
              className="h-8 sm:h-10 md:h-14 flex-shrink-0 flex items-center justify-center opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500"
            >
              <img
                src={logo}
                alt={`Brand partner ${i + 1}`}
                className="max-h-full w-[80px] sm:w-[100px] md:w-[120px] object-contain"
              />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
