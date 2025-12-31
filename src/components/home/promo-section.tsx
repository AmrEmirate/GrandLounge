"use client";

import {
  Building2,
  Hotel,
  Home,
  Palmtree,
  Percent,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const promoItems = [
  {
    id: 1,
    title: "Hotel",
    description: "Temukan hotel terbaik",
    icon: Hotel,
    href: "/properties?category=Hotel",
    bgColor: "bg-[#22C55E]",
  },
  {
    id: 2,
    title: "Villa",
    description: "Villa eksklusif",
    icon: Palmtree,
    href: "/properties?category=Villa",
    bgColor: "bg-[#3B82F6]",
  },
  {
    id: 3,
    title: "Apartment",
    description: "Apartemen modern",
    icon: Building2,
    href: "/properties?category=Apartment",
    bgColor: "bg-[#8B5CF6]",
  },
  {
    id: 4,
    title: "Homestay",
    description: "Pengalaman lokal",
    icon: Home,
    href: "/properties?category=Homestay",
    bgColor: "bg-[#F97316]",
  },
  {
    id: 5,
    title: "Promo",
    description: "Penawaran spesial",
    icon: Percent,
    href: "/properties?sort=price",
    bgColor: "bg-[#EF4444]",
  },
  {
    id: 6,
    title: "Rekomendasi",
    description: "Pilihan terbaik",
    icon: Sparkles,
    href: "/properties",
    bgColor: "bg-[#F59E0B]",
  },
];

export function PromoSection() {
  return (
    <section className="py-6 md:py-8 px-3 md:px-8 lg:px-16 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Horizontal scroll, Tablet/Desktop: Grid */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-3 px-3">
          <div className="flex gap-2 pb-2" style={{ width: "max-content" }}>
            {promoItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex-shrink-0"
              >
                <div
                  className={`${item.bgColor} rounded-xl p-3 text-white shadow-md hover:shadow-lg transition-all duration-300 w-24`}
                >
                  <div className="flex flex-col items-center text-center gap-1.5">
                    <div className="bg-white/20 rounded-full p-2 group-hover:scale-110 transition-transform">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-semibold text-xs">{item.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tablet/Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-6 gap-3 lg:gap-4">
          {promoItems.map((item) => (
            <Link key={item.id} href={item.href} className="group">
              <div
                className={`${item.bgColor} rounded-2xl p-4 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full`}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="bg-white/20 rounded-full p-2.5 group-hover:scale-110 transition-transform">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-white/80 hidden lg:block">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
