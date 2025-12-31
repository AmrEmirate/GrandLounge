"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarIcon, MapPin, Users, Search } from "lucide-react";
import { DestinationSelect } from "./destination-select";
import { DatePicker } from "./date-picker";
import { GuestSelect } from "./guest-select";
import { useSearchForm, SearchFormState } from "@/hooks/ui/use-search-form";
import type React from "react";

export type { SearchFormState as SearchQuery };

interface SearchFormProps {
  onSearch: (query: SearchFormState | null) => void;
}

const SearchField: React.FC<{
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ label, icon, children, className = "" }) => (
  <div className={className}>
    <Label className="text-xs font-medium text-white/80 mb-1 block flex items-center gap-1">
      {icon} {label}
    </Label>
    {children}
  </div>
);

export function SearchForm({ onSearch }: SearchFormProps) {
  const { formState, setFieldValue, handleSearch, handleReset } =
    useSearchForm(onSearch);
  const { destination, checkIn, checkOut, guests } = formState;

  return (
    <div className="w-full max-w-5xl mx-auto px-3 md:px-4">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-xl md:rounded-2xl p-3 md:p-5">
        {/* Mobile: Stack vertically, Desktop: Grid */}
        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-[1.5fr_2fr_1fr_auto] md:gap-4 md:items-end">
          <SearchField
            label="Destinasi"
            icon={<MapPin className="h-3 w-3 md:h-3.5 md:w-3.5" />}
          >
            <DestinationSelect
              value={destination}
              onChange={(val) => setFieldValue("destination", val)}
              className="bg-white/90 hover:bg-white text-gray-800 font-semibold border-none rounded-lg h-10 md:h-11 text-sm"
            />
          </SearchField>

          <div>
            <Label className="text-xs font-medium text-white/80 mb-1 block flex items-center gap-1">
              <CalendarIcon className="h-3 w-3 md:h-3.5 md:w-3.5" /> Tanggal
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <DatePicker
                selected={checkIn}
                onSelect={(date) => setFieldValue("checkIn", date)}
                placeholder="Check-in"
                disabled={(date) => date < new Date()}
                className="bg-white/90 hover:bg-white text-gray-800 border-none rounded-lg h-10 md:h-11 text-sm"
              />
              <DatePicker
                selected={checkOut}
                onSelect={(date) => setFieldValue("checkOut", date)}
                placeholder="Check-out"
                disabled={(date) => date < (checkIn || new Date())}
                className="bg-white/90 hover:bg-white text-gray-800 border-none rounded-lg h-10 md:h-11 text-sm"
              />
            </div>
          </div>

          <SearchField
            label="Tamu"
            icon={<Users className="h-3 w-3 md:h-3.5 md:w-3.5" />}
          >
            <GuestSelect
              value={guests}
              onChange={(val) => setFieldValue("guests", val)}
              className="bg-white/90 hover:bg-white text-gray-800 font-semibold border-none rounded-lg h-10 md:h-11 text-sm"
            />
          </SearchField>

          {/* Mobile: Full width button row */}
          <div className="flex gap-2 mt-1 md:mt-0">
            <Button
              onClick={handleSearch}
              size="lg"
              className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 font-bold px-4 md:px-6 h-10 md:h-11 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm md:text-base"
            >
              <Search className="h-4 w-4 mr-1 md:mr-2" />
              Cari
            </Button>
            <Button
              onClick={handleReset}
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 h-10 md:h-11 rounded-lg px-4 text-sm md:text-base"
              aria-label="Reset form"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
