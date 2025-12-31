"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PropertySort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = `${searchParams.get("sortBy") || "name"}-${
    searchParams.get("order") || "asc"
  }`;

  const handleSortChange = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    const [sortBy, order] = value.split("-");

    if (sortBy && order) {
      current.set("sortBy", sortBy);
      current.set("order", order);
    } else {
      current.delete("sortBy");
      current.delete("order");
    }

    current.set("page", "1");

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`/properties${query}`);
  };

  const getSortLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      "name-asc": "A-Z",
      "name-desc": "Z-A",
      "price-asc": "Termurah",
      "price-desc": "Termahal",
    };
    return labels[value] || "Urutkan";
  };

  const getFullSortLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      "name-asc": "Nama (A-Z)",
      "name-desc": "Nama (Z-A)",
      "price-asc": "Harga Terendah",
      "price-desc": "Harga Tertinggi",
    };
    return labels[value] || "Urutkan";
  };

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[110px] sm:w-[160px] md:w-[180px] h-10 md:h-11 border-gray-200 text-sm">
        <ArrowUpDown className="h-4 w-4 mr-1 md:mr-2 text-gray-500 flex-shrink-0" />
        <span className="truncate sm:hidden">{getSortLabel(currentSort)}</span>
        <span className="truncate hidden sm:inline">
          {getFullSortLabel(currentSort)}
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name-asc">Nama (A-Z)</SelectItem>
        <SelectItem value="name-desc">Nama (Z-A)</SelectItem>
        <SelectItem value="price-asc">Harga Terendah</SelectItem>
        <SelectItem value="price-desc">Harga Tertinggi</SelectItem>
      </SelectContent>
    </Select>
  );
}
