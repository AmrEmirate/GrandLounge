"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { PropertyCard } from "./property-card";
import { Button } from "@/components/ui/button";
import type { Property } from "@/lib/types";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import Link from "next/link";

interface PropertiesGridProps {
  properties: Property[];
  currentPage: number;
  totalPages: number;
}

export function PropertiesGrid({
  properties,
  currentPage,
  totalPages,
}: PropertiesGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("page", String(newPage));
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`/properties${query}`);
  };

  if (properties.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center py-12 md:py-16">
        <div className="text-center max-w-md px-4">
          <div className="bg-gray-100 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4 md:mb-6">
            <SearchX className="h-8 w-8 md:h-10 md:w-10 text-gray-400" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
            Tidak Ada Properti
          </h3>
          <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">
            Coba sesuaikan kriteria pencarian atau filter Anda.
          </p>
          <Link href="/properties">
            <Button className="bg-blue-600 hover:bg-blue-700 text-sm">
              Lihat Semua Properti
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate visible page numbers for mobile vs desktop
  const getVisiblePages = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const maxVisible = isMobile ? 3 : 5;

    let pages: number[] = [];

    if (totalPages <= maxVisible) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage <= Math.ceil(maxVisible / 2)) {
      pages = Array.from({ length: maxVisible }, (_, i) => i + 1);
    } else if (currentPage >= totalPages - Math.floor(maxVisible / 2)) {
      pages = Array.from(
        { length: maxVisible },
        (_, i) => totalPages - maxVisible + 1 + i
      );
    } else {
      const offset = Math.floor(maxVisible / 2);
      pages = Array.from(
        { length: maxVisible },
        (_, i) => currentPage - offset + i
      );
    }

    return pages;
  };

  return (
    <div className="flex-1">
      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8">
        {properties.map((property) => (
          <div
            key={property.id}
            className="transform hover:-translate-y-1 transition-all duration-300"
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 md:gap-2 flex-wrap">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="h-9 md:h-10 px-2 md:px-3"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Sebelumnya</span>
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {/* First page + ellipsis on mobile */}
            {currentPage > 2 && totalPages > 3 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(1)}
                  className="h-9 md:h-10 w-9 md:w-10 hidden sm:flex"
                >
                  1
                </Button>
                {currentPage > 3 && (
                  <span className="px-2 text-gray-400 hidden sm:inline">
                    ...
                  </span>
                )}
              </>
            )}

            {/* Visible page numbers */}
            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              // On mobile, show fewer pages
              const isMobileHidden = i > 2 && totalPages > 3;

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className={`h-9 md:h-10 w-9 md:w-10 ${
                    currentPage === pageNum
                      ? "bg-blue-600 hover:bg-blue-700"
                      : ""
                  } ${isMobileHidden ? "hidden sm:flex" : ""}`}
                >
                  {pageNum}
                </Button>
              );
            })}

            {/* Last page + ellipsis */}
            {currentPage < totalPages - 2 && totalPages > 5 && (
              <>
                <span className="px-2 text-gray-400 hidden sm:inline">...</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(totalPages)}
                  className="h-9 md:h-10 w-9 md:w-10 hidden sm:flex"
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="h-9 md:h-10 px-2 md:px-3"
          >
            <span className="hidden sm:inline mr-1">Selanjutnya</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Mobile page indicator */}
      {totalPages > 1 && (
        <p className="text-center text-xs text-gray-500 mt-3 sm:hidden">
          Halaman {currentPage} dari {totalPages}
        </p>
      )}
    </div>
  );
}
