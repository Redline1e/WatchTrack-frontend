"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ContentSection from "./_components/ContentSection";
import GenresSection from "./_components/GenresSection";
import ReviewsSection from "./_components/ReviewSection";
import UsersSection from "./_components/UsersSection";

export default function AdminPage() {
  const router = useRouter();
  const [section, setSection] = useState<
    "content" | "genres" | "reviews" | "users"
  >("content");

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (!token) router.replace("/auth/login");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex flex-1 container mx-auto p-6">
        <nav className="w-1/5 bg-white rounded-lg shadow p-4 space-y-2">
          <button
            onClick={() => setSection("content")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
          >
            Films
          </button>
          <button
            onClick={() => setSection("genres")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
          >
            Genres
          </button>
          <button
            onClick={() => setSection("reviews")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
          >
            Comments
          </button>
          <button
            onClick={() => setSection("users")}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
          >
            Users
          </button>
        </nav>
        <div className="flex-1 bg-white rounded-lg shadow p-6 overflow-auto">
          {section === "content" && <ContentSection />}
          {section === "genres" && <GenresSection />}
          {section === "reviews" && <ReviewsSection />}
          {section === "users" && <UsersSection />}
        </div>
      </div>
    </div>
  );
}