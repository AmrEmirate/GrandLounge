"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/ui/use-toast";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import apiHelper from "@/lib/apiHelper";
import Image from "next/image";
import React from "react";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

const profileFormSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Nama lengkap minimal 3 karakter." })
    .max(50, { message: "Nama lengkap maksimal 50 karakter." }),
  profilePicture: z
    .any()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      `Ukuran file maksimal adalah 1MB.`
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Hanya format .jpg, .jpeg, .png dan .gif yang diterima."
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { user, setUser } = useAuth();
  const { toast } = useToast();

  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      profilePicture: null,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({ fullName: user.fullName });
    }
  }, [user, form.reset]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      form.setValue("profilePicture", null);
      if (preview) {
        URL.revokeObjectURL(preview);
        setPreview(null);
      }
      return;
    }

    form.setValue("profilePicture", file, { shouldValidate: true });

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(URL.createObjectURL(file));
  };

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("fullName", data.fullName);

    if (data.profilePicture && data.profilePicture.size > 0) {
      formData.append("profilePicture", data.profilePicture);
    }

    try {
      const response = await apiHelper.patch("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedProfile = response.data.data;

      setUser((currentUser) => {
        if (!currentUser) return null;
        return { ...currentUser, ...updatedProfile };
      });

      toast({ title: "Sukses", description: "Profil Anda telah diperbarui." });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Gagal",
        description:
          error.response?.data?.message ||
          "Tidak dapat memperbarui profil Anda.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (!user) {
    return <p>Memuat...</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Nama lengkap Anda" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profilePicture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto Profil</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                  onChange={handleFileChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4">
          <FormLabel>Preview</FormLabel>
          <div className="mt-2">
            <Image
              src={preview || user.profilePicture || "/placeholder-user.jpg"}
              alt="Preview foto profil"
              width={100}
              height={100}
              className="rounded-full w-[100px] h-[100px] object-cover border"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </Form>
  );
}
