"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { RoomFormValues, roomFormSchema, Room } from "./room-form-schema";
import { RoomFormFields } from "./RoomFormFields";

interface RoomFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingRoom: Room | null;
  onSave: (data: RoomFormValues, editingId: string | null) => void;
}

export function RoomFormDialog({
  isOpen,
  onClose,
  editingRoom,
  onSave,
}: RoomFormDialogProps) {
  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: "",
      description: "",
      capacity: 1,
      basePrice: 10000,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (editingRoom) {
        form.reset(editingRoom);
      } else {
        form.reset({
          name: "",
          category: undefined,
          description: "",
          bedOption: undefined,
          capacity: 1,
          basePrice: 10000,
        });
      }
    }
  }, [isOpen, editingRoom, form]);

  const handleSubmit = (data: RoomFormValues) => {
    onSave(data, editingRoom?.id || null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {editingRoom ? "Edit Room" : "Add New Room"}
              </DialogTitle>
              <DialogDescription>
                Fill in the details for the room below.
              </DialogDescription>
            </DialogHeader>
            <RoomFormFields form={form} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
