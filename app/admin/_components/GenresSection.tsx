"use client";

import GenreForm from "./GenreForm";
import GenreList from "./GenreList";

export default function GenresSection() {
  return (
    <div className="space-y-4">
      <GenreForm />
      <GenreList />
    </div>
  );
}
