"use client";

import { PropertyCard } from "@/components/properties/property-card";
import Link from "next/link";
import { SearchQuery } from "./search-form";
import { useFeaturedProperties } from "@/hooks/properties/use-featured-properties";
import { ChevronRight } from "lucide-react";

interface FeaturedPropertiesProps {
  filter: SearchQuery | null;
  categoryFilter: string;
}

const LoadingState = () => (
  <>
    {/* Mobile: horizontal scroll skeleton */}
    <div className="md:hidden overflow-x-auto scrollbar-hide -mx-3 px-3">
      <div className="flex gap-4" style={{ width: "max-content" }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse w-72 flex-shrink-0">
            <div className="bg-gray-200 rounded-xl h-40 mb-3"></div>
            <div className="bg-gray-200 rounded h-4 w-3/4 mb-2"></div>
            <div className="bg-gray-200 rounded h-4 w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
    {/* Desktop: grid skeleton */}
    <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
          <div className="bg-gray-200 rounded h-4 w-3/4 mb-2"></div>
          <div className="bg-gray-200 rounded h-4 w-1/2"></div>
        </div>
      ))}
    </div>
  </>
);

const EmptyState = () => (
  <div className="text-center text-gray-600 py-12 md:py-16 bg-gray-50 rounded-2xl mx-3 md:mx-0">
    <p className="text-base md:text-lg">
      Tidak ada properti yang sesuai dengan kriteria Anda.
    </p>
    <Link
      href="/properties"
      className="text-blue-600 hover:underline mt-2 inline-block text-sm md:text-base"
    >
      Lihat semua properti →
    </Link>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="text-center text-red-600 py-12 md:py-16 bg-red-50 rounded-2xl mx-3 md:mx-0">
    <p className="text-base md:text-lg">{message}</p>
  </div>
);

export function FeaturedProperties({
  filter,
  categoryFilter,
}: FeaturedPropertiesProps) {
  const { properties, isLoading, error } = useFeaturedProperties(
    filter,
    categoryFilter
  );

  const renderContent = () => {
    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    if (properties.length === 0) return <EmptyState />;

    return (
      <>
        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-3 px-3">
          <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
            {properties.map((property) => (
              <div key={property.id} className="w-72 flex-shrink-0">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

        {/* Tablet/Desktop: Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="transform hover:-translate-y-2 transition-all duration-300"
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <section className="py-8 md:py-12 px-3 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
              {categoryFilter
                ? `${categoryFilter} Pilihan`
                : "Properti Pilihan"}
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Temukan pilihan akomodasi premium dari kami
            </p>
          </div>
          <Link
            href="/properties"
            className="hidden md:flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
          >
            Lihat Semua
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {renderContent()}

        <div className="text-center mt-6 md:mt-10 md:hidden">
          <Link
            href="/properties"
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Lihat Semua Properti
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
