"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/ui/use-toast";

function AuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      try {
        login(token);

        toast({
          title: "Login Berhasil",
          description:
            "Selamat datang kembali! Anda akan diarahkan sebentar lagi.",
        });
      } catch (error) {
        console.error("Login callback error:", error);
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: "Terjadi kesalahan saat memproses data Anda.",
        });
        router.push("/auth/login");
      }
    } else {
      toast({
        variant: "destructive",
        title: "Login Gagal",
        description: "Token otentikasi tidak ditemukan di URL.",
      });
      router.push("/auth/login");
    }
  }, [searchParams, router, login, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Memproses otentikasi Anda...
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Mohon tunggu sebentar.
        </p>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <AuthCallback />
    </Suspense>
  );
}
