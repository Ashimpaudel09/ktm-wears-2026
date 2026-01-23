
import { Truck, RefreshCcw, Headphones } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Enjoy free worldwide shipping and returns, with customs and duties taxes included."
  },
  {
    icon: RefreshCcw,
    title: "Free Returns",
    description: "Free returns within 15 days, please make sure the items are in undamaged condition."
  },
  {
    icon: Headphones,
    title: "Support Online",
    description: "We support customers 24/7, send questions we will solve for you immediately."
  }
];

export function Benefits() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center px-4 py-8 md:py-0">
              <div className="mb-4 text-gray-900">
                <benefit.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
