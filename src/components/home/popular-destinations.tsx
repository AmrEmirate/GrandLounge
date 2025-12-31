"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import apiHelper from "@/lib/apiHelper";

interface City {
  id: string;
  name: string;
  provinsi: string;
  latitude: number;
  longitude: number;
}

const cityImages: { [key: string]: string } = {
  Jakarta:
    "https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=800&q=80",
  Bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
  Yogyakarta:
    "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=800&q=80",
  Bandung:
    "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=800&q=80",
  Surabaya:
    "https://images.unsplash.com/photo-1586016413664-864c0dd76f53?w=800&q=80",
  Malang:
    "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80",
  Semarang:
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80",
  Medan:
    "https://images.unsplash.com/photo-1595531173667-c527f1dc7f6d?w=800&q=80",
  Makassar:
    "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&q=80",
  Palembang:
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80",
};

const defaultImage =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80";

export function PopularDestinations() {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await apiHelper.get("/cities");
        setCities(response.data.data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  if (isLoading) {
    return (
      <section className="py-8 md:py-12 px-3 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <div className="h-7 md:h-8 bg-gray-200 rounded w-40 md:w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-56 md:w-64 animate-pulse"></div>
          </div>
          {/* Mobile: Horizontal scroll skeleton */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-3 px-3">
            <div className="flex gap-3" style={{ width: "max-content" }}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-36 aspect-[3/4] bg-gray-200 rounded-xl animate-pulse flex-shrink-0"
                ></div>
              ))}
            </div>
          </div>
          {/* Desktop: Grid skeleton */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/5] bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (cities.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12 px-3 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
              Destinasi Populer
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Jelajahi kota-kota favorit di Indonesia
            </p>
          </div>
          <Link
            href="/properties"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm hidden md:block"
          >
            Lihat Semua →
          </Link>
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-3 px-3">
          <div className="flex gap-3 pb-2" style={{ width: "max-content" }}>
            {cities.map((city) => (
              <Link
                key={city.id}
                href={`/properties?city=${city.name}`}
                className="group relative w-36 aspect-[3/4] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0"
              >
                <img
                  src={cityImages[city.name] || defaultImage}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <div className="flex items-center gap-1 mb-0.5">
                    <MapPin className="h-3 w-3" />
                    <h3 className="font-bold text-sm">{city.name}</h3>
                  </div>
                  <p className="text-xs text-white/80 truncate">
                    {city.provinsi}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tablet/Desktop: Grid */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/properties?city=${city.name}`}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={cityImages[city.name] || defaultImage}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-1 mb-1">
                  <MapPin className="h-3 w-3" />
                  <h3 className="font-bold text-lg">{city.name}</h3>
                </div>
                <p className="text-sm text-white/80">{city.provinsi}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: Show all link */}
        <div className="md:hidden mt-4 text-center">
          <Link
            href="/properties"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Lihat Semua Destinasi →
          </Link>
        </div>
      </div>
    </section>
  );
}
