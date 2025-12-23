import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface TransactionActionDialogProps {
  label: string;
  icon: React.ReactNode;
  isAccepted: boolean;
  variant: "default" | "destructive" | "outline";
  invoiceNumber: string;
  onConfirm: () => void;
}

export function TransactionActionDialog({
  label,
  icon,
  isAccepted,
  variant,
  onConfirm,
}: TransactionActionDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant={variant}
          className={isAccepted ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {icon} {label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi {label}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Yakin ingin <strong>{label.toLowerCase()}</strong> pembayaran ini?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onConfirm}
            className={
              isAccepted
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }
          >
            Ya, {label}
          </AlertDialogAction>
          <AlertDialogCancel>Tutup</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
