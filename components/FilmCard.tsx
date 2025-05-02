"use client";

import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";
import { Star, Calendar, Tag } from "lucide-react";

export interface Genre {
  id: number;
  name: string;
}

export interface Film {
  id: number;
  title: string;
  releaseYear?: number | null;
  genres: Genre[];
  ratingAvg: number;
  photoUrl?: string | null;
}

interface FilmCardProps {
  film: Film;
}

const FilmCard: FC<FilmCardProps> = ({ film }) => {
  return (
    <Link
      href={`/films/${film.id}`}
      className="block bg-gray-800 text-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {film.photoUrl ? (
        <div className="w-full aspect-[11/9] relative">
          <Image
            src={film.photoUrl}
            alt={film.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full aspect-[16/9] bg-gray-700 flex items-center justify-center">
          <Tag className="h-6 w-6 text-gray-400" />
        </div>
      )}

      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold">{film.title}</h3>

        {film.releaseYear && (
          <p className="flex items-center text-sm text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            {film.releaseYear}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {film.genres.map((g) => (
            <span
              key={g.id}
              className="flex items-center text-xs px-2 py-1 bg-gray-700 rounded-full"
            >
              <Tag className="h-3 w-3 mr-1" />
              {g.name}
            </span>
          ))}
        </div>

        <p className="flex items-center font-medium">
          <Star className="h-4 w-4 mr-1 text-yellow-400" />
          {film.ratingAvg.toFixed(1)} / 10
        </p>
      </div>
    </Link>
  );
};

export default FilmCard;
