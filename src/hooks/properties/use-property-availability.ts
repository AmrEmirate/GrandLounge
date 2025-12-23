import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { UseQueryResult } from "@tanstack/react-query";

interface AggregatedData {
  status: "FULLY_AVAILABLE" | "PARTIALLY_AVAILABLE" | "FULLY_BOOKED";
  availableCount: number;
  totalRooms: number;
}

type AvailabilityRecord = Record<string, AggregatedData>;

const fetchPropertyAvailability = async (
  propertyId: string,
  month: Date
): Promise<AvailabilityRecord> => {
  const startDate = format(startOfMonth(month), "yyyy-MM-dd");
  const endDate = format(endOfMonth(month), "yyyy-MM-dd");

  const { data } = await api.get(`/calendar-report/property/${propertyId}`, {
    params: { startDate, endDate },
  });
  return data.data || {};
};

export const usePropertyAvailability = (
  propertyId: string,
  month: Date
): UseQueryResult<AvailabilityRecord, Error> => {
  return useQuery({
    queryKey: ["propertyAvailability", propertyId, format(month, "yyyy-MM")],

    queryFn: () => fetchPropertyAvailability(propertyId, month),

    enabled: !!propertyId,

    placeholderData: (previousData) => previousData,
  });
};
