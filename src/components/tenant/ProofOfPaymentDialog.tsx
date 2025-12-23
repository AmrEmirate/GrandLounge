import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProofOfPaymentDialogProps {
  proofUrl: string | null;
  onClose: () => void;
}

export function ProofOfPaymentDialog({
  proofUrl,
  onClose,
}: ProofOfPaymentDialogProps) {
  return (
    <Dialog open={!!proofUrl} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bukti Pembayaran</DialogTitle>
        </DialogHeader>
        {proofUrl && (
          <Image
            src={proofUrl}
            alt="Bukti Pembayaran"
            width={600}
            height={800}
            className="rounded-md w-full h-auto"
          />
        )}
        <DialogClose asChild>
          <Button type="button" variant="secondary" className="mt-4 w-full">
            Tutup
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
