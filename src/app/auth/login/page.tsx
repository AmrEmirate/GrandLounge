"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLogin } from "@/hooks/auth/use-login";
import { LoginForm } from "@/components/auth/LoginForm";

function LoginContent() {
  const searchParams = useSearchParams();
  const userType = searchParams.get("type") || "user";

  const loginProps = useLogin(userType);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-blue-200">
      <div className="max-w-md w-full space-y-8">
        <LoginForm userType={userType} {...loginProps} />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
