"use client";

import { useState, useMemo } from "react";
import {
  useTenantTransactions,
  TenantTransaction,
  TransactionStatus,
  TransactionFiltersState,
} from "@/hooks/tenant/useTenantTransactions";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/lib/api";
import { toast } from "sonner";
import { isSameDay } from "date-fns";
import { TransactionFilters } from "./TransactionFilters";
import { useTenantTransactionAnalytics } from "@/hooks/tenant/useTenantTransactionAnalytics";
import { TransactionBusinessSnapshot } from "./TransactionBusinessSnapshot";
import { TransactionCard } from "./TransactionCard";
import { ProofOfPaymentDialog } from "./ProofOfPaymentDialog";

export const TransactionsContent = () => {
  const [filterInputs, setFilterInputs] = useState({
    searchQuery: "",
    checkInDate: undefined as Date | undefined,
  });
  const [activeFilters, setActiveFilters] = useState<TransactionFiltersState>({
    status: "Semua",
    searchQuery: "",
    checkInDate: undefined,
  });
  const {
    transactions: allTransactions,
    isLoading,
    refetch,
  } = useTenantTransactions(activeFilters.status);
  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter((trx) => {
      const query = activeFilters.searchQuery.toLowerCase();
      const matchesQuery =
        !query ||
        trx.user?.fullName?.toLowerCase().includes(query) ||
        trx.property?.name?.toLowerCase().includes(query) ||
        trx.reservationId?.toLowerCase().includes(query) ||
        trx.invoiceNumber?.toLowerCase().includes(query);
      const matchesDate =
        !activeFilters.checkInDate ||
        isSameDay(new Date(trx.checkIn), activeFilters.checkInDate);
      return matchesQuery && matchesDate;
    });
  }, [allTransactions, activeFilters]);

  const analyticsData = useTenantTransactionAnalytics(filteredTransactions);

  const handleAction = async (invoiceNumber: string, isAccepted: boolean) => {
    const action = isAccepted ? "menyetujui" : "menolak";
    const toastId = toast.loading(`Sedang ${action} pembayaran...`);
    try {
      await api.patch(`/payment-confirm/confirm/${invoiceNumber}`, {
        isAccepted,
      });
      toast.success(
        `Pembayaran berhasil ${isAccepted ? "disetujui" : "ditolak"}.`,
        { id: toastId }
      );
      refetch();
    } catch (error: any) {
      toast.error(`Gagal ${action} pembayaran`, {
        id: toastId,
        description: error.response?.data?.message || "Terjadi kesalahan.",
      });
    }
  };

  return (
    <>
      <TransactionBusinessSnapshot {...analyticsData} />
      <TransactionFilters
        searchQuery={filterInputs.searchQuery}
        setSearchQuery={(value) =>
          setFilterInputs((prev) => ({ ...prev, searchQuery: value }))
        }
        checkInDate={filterInputs.checkInDate}
        setCheckInDate={(date) =>
          setFilterInputs((prev) => ({ ...prev, checkInDate: date }))
        }
        onSearch={() =>
          setActiveFilters((prev) => ({ ...prev, ...filterInputs }))
        }
        onReset={() => {
          const resetState = { searchQuery: "", checkInDate: undefined };
          setFilterInputs(resetState);
          setActiveFilters((prev) => ({ ...prev, ...resetState }));
        }}
      />
      <Tabs
        value={activeFilters.status}
        onValueChange={(value) =>
          setActiveFilters((prev) => ({
            ...prev,
            status: value as TransactionStatus,
          }))
        }
      >
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 mb-4">
          <TabsTrigger value="Semua">Semua</TabsTrigger>
          <TabsTrigger value="MENUNGGU_PEMBAYARAN">Menunggu Bayar</TabsTrigger>
          <TabsTrigger value="MENUNGGU_KONFIRMASI">Konfirmasi</TabsTrigger>
          <TabsTrigger value="DIPROSES">Diproses</TabsTrigger>
          <TabsTrigger value="SELESAI">Selesai</TabsTrigger>
          <TabsTrigger value="DIBATALKAN">Dibatalkan</TabsTrigger>
        </TabsList>
      </Tabs>
      {isLoading ? (
        <div className="space-y-4 mt-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold">Tidak Ada Transaksi</h3>
          <p className="text-gray-500 mt-2">
            Coba ubah filter atau reset pencarian Anda.
          </p>
        </div>
      ) : (
        <div className="space-y-6 mt-6">
          {filteredTransactions.map((trx) => (
            <TransactionCard
              key={trx.id}
              trx={trx}
              onViewProof={setSelectedProof}
              onAction={handleAction}
            />
          ))}
        </div>
      )}
      <ProofOfPaymentDialog
        proofUrl={selectedProof}
        onClose={() => setSelectedProof(null)}
      />
    </>
  );
};
