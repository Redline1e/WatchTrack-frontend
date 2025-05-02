"use client";

import React from "react";
import { useWatchlist } from "@/hooks/useWatchlist";
import FilmCard, { Film } from "@/components/FilmCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WatchStatus } from "@/types/watch-status";

export default function WatchlistPage() {
  const { data: items, isLoading, error, add, updateStatus } = useWatchlist();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

        {isLoading && <p className="text-gray-500">Loading watchlist...</p>}
        {error && (
          <p className="text-red-500">
            Error loading watchlist: {error.message}
          </p>
        )}

        {!isLoading && !error && items?.length === 0 && (
          <p className="text-gray-600">Your watchlist is empty.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items?.map((item) => (
            <div key={item.id} className="relative">
              <span
                className={
                  `absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ` +
                  (item.status === WatchStatus.PLANNED
                    ? "bg-blue-200 text-blue-800"
                    : item.status === WatchStatus.WATCHING
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-200 text-green-800")
                }
              >
                {item.status.replace("_", " ")}
              </span>
              <FilmCard film={item.film as Film} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
