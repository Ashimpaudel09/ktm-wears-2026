
import { Award, Feather, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Crafted with the finest materials to ensure durability and style that lasts.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Feather,
    title: "Comfort First",
    description: "Designed for all-day wear without compromising on the fashionable look.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Leaf,
    title: "Sustainable",
    description: "Committed to responsible fashion with eco-friendly packaging and materials.",
    color: "bg-green-100 text-green-600"
  }
];

export function BrandHighlight() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="lg:w-1/3 sticky top-24">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Why Choose <br />
              <span className="text-[#0f00ff]">KTM Wears</span>?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We believe that style shouldn't come at the expense of comfort or quality. Our mission is to provide you with essentials that elevate your everyday look.
            </p>
            <button className="text-[#0f00ff] font-semibold flex items-center gap-2 hover:gap-4 transition-all">
              Learn more about us
              <span className="text-xl">→</span>
            </button>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center text-center hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
