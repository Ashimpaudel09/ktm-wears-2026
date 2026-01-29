import { Truck, RefreshCcw, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description:
      "Enjoy free worldwide shipping and returns, with customs and duties taxes included.",
  },
  {
    icon: RefreshCcw,
    title: "Free Returns",
    description:
      "Free returns within 15 days, please make sure the items are in undamaged condition.",
  },
  {
    icon: Headphones,
    title: "Support Online",
    description:
      "We support customers 24/7, send questions we will solve for you immediately.",
  },
];

export function Benefits() {
  return (
    <section className="bg-white border-t border-gray-100 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MOBILE: Landscape rows */}
        <div className="flex flex-col gap-4 md:hidden">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5"
            >
              <div className="text-gray-900 flex-shrink-0">
                <benefit.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>

              <div className="text-left">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP: Original grid */}
        <div className="hidden md:grid grid-cols-3 gap-0 divide-x divide-gray-100">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center px-8 py-0"
            >
              <div className="mb-4 text-gray-900">
                <benefit.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>

              <p className="text-[15px] text-gray-500 leading-relaxed max-w-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
