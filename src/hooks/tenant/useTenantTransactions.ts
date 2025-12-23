"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";
import { toast } from "sonner";

export type TransactionStatus =
  | "MENUNGGU_PEMBAYARAN"
  | "MENUNGGU_KONFIRMASI"
  | "DIPROSES"
  | "SELESAI"
  | "DIBATALKAN"
  | "Semua";

export interface TenantTransaction {
  id: string;
  invoiceNumber: string;
  reservationId: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  paymentProof: string | null;
  status: Exclude<TransactionStatus, "Semua">;
  user: {
    fullName: string;
    profilePicture: string;
  } | null;
  property: {
    id: string;
    name: string;
    mainImage: string | null;
  };
  createdAt: string;
}

export interface TransactionFiltersState {
  status: TransactionStatus;
  searchQuery: string;
  checkInDate?: Date;
}

export const useTenantTransactions = (status: TransactionStatus) => {
  const [transactions, setTransactions] = useState<TenantTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();

      if (status && status !== "Semua") {
        params.append("status", status);
      }

      const url = `/orders/tenant-transactions?${params.toString()}`;

      const response = await api.get(url);
      setTransactions(response.data.data ?? []);
    } catch (error) {
      toast.error("Gagal memuat data transaksi.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    isLoading,
    refetch: fetchTransactions,
  };
};
