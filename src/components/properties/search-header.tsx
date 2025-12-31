"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PropertySort } from "./property-sort";
import { PropertyFilters } from "./property-filters";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

interface SearchHeaderProps {
  propertiesCount: number;
}

export function SearchHeader({ propertiesCount }: SearchHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  const destination =
    searchParams.get("destination") || searchParams.get("city");
  const category = searchParams.get("category");

  const updateQueryParams = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!value) {
      current.delete(key);
    } else {
      current.set(key, value);
    }

    current.set("page", "1");

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`/properties${query}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateQueryParams("q", searchTerm);
  };

  // Build title based on filters
  const buildTitle = () => {
    if (destination && category) {
      return `${category} di ${destination}`;
    } else if (destination) {
      return `Properti di ${destination}`;
    } else if (category) {
      return `Semua ${category}`;
    }
    return "Semua Properti";
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Header Text */}
        <div className="text-white mb-4 md:mb-6">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm mb-1 md:mb-2">
            <MapPin className="h-3 w-3 md:h-4 md:w-4" />
            <span>Temukan akomodasi terbaik</span>
          </div>
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-1">
            {buildTitle()}
          </h1>
          <p className="text-blue-100 text-sm md:text-base">
            {propertiesCount} properti ditemukan
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-3">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari nama properti..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 md:h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
              />
            </form>

            {/* Filter & Sort Buttons */}
            <div className="flex gap-2">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="md:hidden h-10 flex-1 sm:flex-none border-gray-200"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[85vw] max-w-sm overflow-y-auto"
                >
                  <SheetHeader>
                    <SheetTitle>Filter Properti</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <PropertyFilters />
                  </div>
                </SheetContent>
              </Sheet>

              <PropertySort />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
