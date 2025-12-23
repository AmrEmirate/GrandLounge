import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Clock,
  Building,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  CalendarDays,
  Wallet,
  Eye,
  Check,
  X,
} from "lucide-react";
import { TenantTransaction } from "@/hooks/tenant/useTenantTransactions";
import { TransactionActionDialog } from "./TransactionActionDialog";

export const statusConfig = {
  MENUNGGU_PEMBAYARAN: {
    text: "Menunggu Pembayaran",
    variant: "secondary" as const,
    icon: Clock,
    color: "text-yellow-600",
  },
  MENUNGGU_KONFIRMASI: {
    text: "Menunggu Konfirmasi",
    variant: "default" as const,
    icon: Clock,
    color: "text-blue-600",
  },
  DIPROSES: {
    text: "Diproses",
    variant: "default" as const,
    icon: Building,
    color: "text-indigo-600",
  },
  SELESAI: {
    text: "Selesai",
    variant: "success" as const,
    icon: CheckCircle,
    color: "text-green-600",
  },
  DIBATALKAN: {
    text: "Dibatalkan",
    variant: "destructive" as const,
    icon: XCircle,
    color: "text-red-600",
  },
};

interface TransactionCardProps {
  trx: TenantTransaction;
  onViewProof: (url: string) => void;
  onAction: (invoiceNumber: string, isAccepted: boolean) => void;
}

export function TransactionCard({
  trx,
  onViewProof,
  onAction,
}: TransactionCardProps) {
  const statusInfo = statusConfig[trx.status] || {
    text: trx.status.replace(/_/g, " "),
    variant: "outline" as const,
    icon: AlertCircle,
    color: "text-gray-600",
  };
  const Icon = statusInfo.icon;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 relative h-48 md:h-auto flex-shrink-0">
          <Image
            src={trx.property?.mainImage || "/placeholder.jpg"}
            alt={trx.property?.name || "Property Image"}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <CardHeader className="flex-row items-start justify-between gap-4 pb-3">
            <div>
              <CardTitle className="text-lg mb-1">
                {trx.property.name}
              </CardTitle>
              <CardDescription className="font-bold">
                No. Pesanan:{" "}
                {trx.reservationId?.substring(0, 6).toUpperCase() ?? "N/A"}
              </CardDescription>
              <CardDescription>{trx.invoiceNumber}</CardDescription>
            </div>
            <Badge
              variant={statusInfo.variant}
              className="flex-shrink-0 whitespace-nowrap"
            >
              <Icon className={`h-3 w-3 mr-1.5 ${statusInfo.color}`} />
              {statusInfo.text}
            </Badge>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 px-6 pb-4">
            <Separator />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-sm">
              <div className="flex items-center gap-2 col-span-full">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-semibold">Nama Pemesan</p>
                  <p className="text-gray-600">
                    {trx.user?.fullName || "Tidak ada nama"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-semibold">Check-in</p>
                  <p className="text-gray-600">
                    {format(new Date(trx.checkIn), "d MMM yyyy", {
                      locale: id,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-semibold">Check-out</p>
                  <p className="text-gray-600">
                    {format(new Date(trx.checkOut), "d MMM yyyy", {
                      locale: id,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-semibold">Total Harga</p>
                  <p className="text-gray-600 font-medium">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(trx.totalPrice)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          {trx.status === "MENUNGGU_KONFIRMASI" && (
            <CardFooter className="bg-gray-50/50 px-6 py-3 flex justify-end items-center w-full gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  trx.paymentProof && onViewProof(trx.paymentProof)
                }
                disabled={!trx.paymentProof}
              >
                <Eye className="h-4 w-4 mr-2" /> Lihat Bukti
              </Button>
              <TransactionActionDialog
                label="Setuju"
                icon={<Check className="h-4 w-4 mr-2" />}
                isAccepted={true}
                variant="default"
                invoiceNumber={trx.invoiceNumber}
                onConfirm={() => onAction(trx.invoiceNumber, true)}
              />
              <TransactionActionDialog
                label="Tolak"
                icon={<X className="h-4 w-4 mr-2" />}
                isAccepted={false}
                variant="destructive"
                invoiceNumber={trx.invoiceNumber}
                onConfirm={() => onAction(trx.invoiceNumber, false)}
              />
            </CardFooter>
          )}
        </div>
      </div>
    </Card>
  );
}
