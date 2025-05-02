"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Film, List, User, Clapperboard } from "lucide-react";
type RoleType = "USER" | "ADMIN" | null;

export default function Header() {
  const router = useRouter();
  const [role, setRole] = useState<RoleType>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/auth/login");
      } else {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setRole(payload.role as RoleType);
        } catch {
          setRole("USER");
        }
      }
    }
  }, [router]);

  if (role === null) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50">
        <p className="text-lg text-gray-500">Loading…</p>
      </div>
    );
  }

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/films" className="flex items-center space-x-2">
          <Clapperboard className="h-8 w-8 text-indigo-400" />
          <span className="text-3xl font-semibold">WatchTracker</span>
        </Link>
        <nav className="flex items-center space-x-8">
          <Link
            href="/films"
            className="flex items-center space-x-1 text-gray-300 hover:text-indigo-400 transition-colors"
          >
            <Film className="h-5 w-5" />
            <span>Films</span>
          </Link>
          <Link
            href="/watchlist"
            className="flex items-center space-x-1 text-gray-300 hover:text-indigo-400 transition-colors"
          >
            <List className="h-5 w-5" />
            <span>Watchlist</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center space-x-1 text-gray-300 hover:text-indigo-400 transition-colors"
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
          {role === "ADMIN" && (
            <button
              onClick={() => router.push("/admin")}
              className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300"
            >
              <Star className="h-5 w-5 text-white" />
              Admin Panel
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
