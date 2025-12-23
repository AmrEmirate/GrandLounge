import * as z from "zod";
import { BedOption, RoomCategory } from "@/lib/types";

export const roomFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Room name must be at least 3 characters." }),
  category: z.nativeEnum(RoomCategory, {
    required_error: "Please select a room category.",
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  bedOption: z.nativeEnum(BedOption, {
    required_error: "Please select a bed option.",
  }),
  capacity: z.coerce
    .number()
    .min(1, { message: "Capacity must be at least 1." }),
  basePrice: z.coerce
    .number()
    .min(10000, { message: "Price must be at least 10,000." }),
});

export type RoomFormValues = z.infer<typeof roomFormSchema>;

export interface Room {
  id: string;
  name: string;
  category: RoomCategory;
  description: string;
  bedOption: BedOption;
  capacity: number;
  basePrice: number;
}
