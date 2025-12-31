"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/hero-section";
import { SearchQuery } from "@/components/home/search-form";
import { PromoSection } from "@/components/home/promo-section";
import { PopularDestinations } from "@/components/home/popular-destinations";
import { FeaturedProperties } from "@/components/home/featured-properties";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

const SplitScreenMap = dynamic(
  () => import("@/components/home/split-screen-map"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[50vh] w-full bg-gray-200 animate-pulse flex items-center justify-center mx-auto max-w-7xl rounded-xl my-12">
        <p className="text-gray-500">Memuat peta...</p>
      </div>
    ),
  }
);

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState<SearchQuery | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero with integrated search */}
      <HeroSection onSearch={setSearchQuery} />

      {/* Promo/Category quick links */}
      <PromoSection />

      {/* Popular destinations */}
      <PopularDestinations />

      {/* Featured properties */}
      <FeaturedProperties filter={searchQuery} categoryFilter="" />

      {/* Map section */}
      <SplitScreenMap />

      {/* Floating contact button */}
      <Link href="/contact" passHref>
        <Button
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl z-50"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ width: isHovered ? "150px" : "56px", height: "56px" }}
        >
          {isHovered ? (
            <span className="font-medium">Hubungi Kami</span>
          ) : (
            <MessageSquare className="h-6 w-6" />
          )}
        </Button>
      </Link>

      <Footer />
    </div>
  );
}
