"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
      return;
    }
    try {
      const { role } = JSON.parse(atob(token.split(".")[1]));
      if (role !== "ADMIN") {
        router.replace("/films");
        return;
      }
      setChecking(false);
    } catch {
      router.replace("/auth/login");
    }
  }, [router]);

  if (checking) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 container mx-auto p-6">{children}</main>
      <Footer />
    </>
  );
}
