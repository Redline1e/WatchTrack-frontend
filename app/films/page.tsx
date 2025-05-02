"use client";

import FilmCard from "@/components/FilmCard";
import { useFilms } from "@/hooks/useFilms";
import { Film } from "@/components/FilmCard";

export default function FilmsPage() {
  const { data: films, isLoading } = useFilms();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50">
        <p className="text-lg text-gray-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-indigo-600">Films</h1>
        </div>
        {films && films.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {films.map((f: Film) => (
              <FilmCard key={f.id} film={f} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No films found.</p>
        )}
      </div>
    </div>
  );
}
