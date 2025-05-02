"use client";
import { FC } from "react";

interface GenreFilterProps {
  genres: { id: number; name: string }[];
  selected?: number;
  onChange: (genreId?: number) => void;
}

const GenreFilter: FC<GenreFilterProps> = ({ genres, selected, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => onChange(undefined)}
        className={`px-3 py-1 rounded-full border ${
          selected == null ? "bg-blue-500 text-white" : "bg-gray-100"
        }`}
      >
        All
      </button>
      {genres.map((g) => (
        <button
          key={g.id}
          onClick={() => onChange(g.id)}
          className={`px-3 py-1 rounded-full border ${
            selected === g.id ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
