import { Award, Feather, Leaf } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Crafted with the finest materials for long-lasting durability.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Feather,
    title: "Comfort First",
    description:
      "Designed for all-day wear without sacrificing style.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Leaf,
    title: "Sustainable",
    description:
      "Eco-conscious materials and responsible production.",
    color: "bg-green-100 text-green-600",
  },
];

export function BrandHighlight() {
  return (
    <section className="bg-white py-0 sm:py-0 lg:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left Content */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5">
              Why Choose <br />
              <span className="text-[#0f00ff]">KTM Wears</span>?
            </h2>

            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Thoughtfully designed apparel that balances comfort,
              durability, and modern style.
            </p>

            <button className="text-[#0f00ff] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
              Learn more <span>→</span>
            </button>
          </div>

          {/* MOBILE: Landscape rows */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:hidden">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5 hover:bg-white hover:shadow-md transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center flex-shrink-0`}
                >
                  <feature.icon size={22} />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* DESKTOP: Original grid cards */}
          <div className="hidden lg:grid lg:w-2/3 grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-gray-50 rounded-3xl p-8 flex flex-col items-center text-center hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}
                >
                  <feature.icon size={32} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>

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
