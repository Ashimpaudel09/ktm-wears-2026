
import imgSsEntryPassword1 from '../assets/asos.png';
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
  return (
    <section className="py-12 border-b border-gray-100 bg-white overflow-hidden">
      <style>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="relative flex">
        {/* Render the logos twice for seamless infinite scroll */}
        {[...Array(2)].map((_, setIndex) => (
          <div 
            key={setIndex}
            className="flex items-center gap-12 md:gap-16 px-8 animate-scroll"
          >
            {logos.map((logo, index) => (
              <div 
                key={`${setIndex}-${index}`} 
                className="h-8 md:h-12 flex-shrink-0 flex items-center justify-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              >
                <img 
                  src={logo} 
                  alt={`Brand partner ${index + 1}`} 
                  className="max-h-full w-[120px] object-contain mix-blend-multiply"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}