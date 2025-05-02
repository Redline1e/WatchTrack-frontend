"use client";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        {children}
      </div>
    </div>
  );
}
