"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface GuestSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function GuestSelect({ value, onChange, className }: GuestSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder="Pilih tamu" />
      </SelectTrigger>
      <SelectContent>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
          <SelectItem key={num} value={num.toString()}>
            {num} {num === 1 ? "Tamu" : "Tamu"}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
