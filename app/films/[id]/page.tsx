"use client";

import { useParams } from "next/navigation";
import { useFilm } from "@/hooks/useFilms";
import { useReviews } from "@/hooks/useReviews";
import ReviewForm from "@/components/ReviewForm";
import WatchButton from "@/components/WatchButton";
import { Calendar, Star, MessageCircle } from "lucide-react";

export default function FilmDetailPage() {
  const { id } = useParams();
  const filmId = Number(id);

  const { data: film, isLoading: filmLoading } = useFilm(filmId);
  const { data: reviews, isLoading: reviewsLoading } = useReviews(filmId);

  if (filmLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50">
        <p className="text-lg text-gray-500">Loading film…</p>
      </div>
    );
  }
  if (!film) {
    return (
      <div className="text-center py-16 bg-gray-50">
        <p className="text-lg text-red-500">Film not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 w-full sm:w-2/3 md:w-1/3 lg:w-1/4 max-w-xs">
          <div className="relative pb-[150%] rounded-lg overflow-hidden shadow-md">
            {film.photoUrl ? (
              <img
                src={film.photoUrl}
                alt={film.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200" />
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold text-indigo-700">{film.title}</h1>
          {film.description && (
            <p className="text-gray-700 leading-relaxed">{film.description}</p>
          )}

          <div className="flex flex-wrap gap-6 text-gray-600">
            <span className="flex items-center gap-1">
              <Calendar className="h-5 w-5" /> {film.releaseYear || "N/A"}
            </span>
            <span className="flex items-center gap-1">
              Genres: {film.genres.map((g) => g.name).join(", ") || "N/A"}
            </span>
          </div>

          <WatchButton filmId={filmId} />
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
            <MessageCircle className="h-6 w-6" /> Add a Comment
          </h2>
          <ReviewForm filmId={filmId} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-5">
            Comments
          </h2>
          {reviewsLoading ? (
            <p className="text-gray-500">Loading comments…</p>
          ) : reviews && reviews.length > 0 ? (
            <ul className="space-y-4">
              {reviews.map((rev: any) => (
                <li
                  key={rev.id}
                  className="p-4 bg-white rounded-lg shadow-sm border"
                >
                  <p className="flex items-center font-medium text-indigo-600">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />{" "}
                    {rev.rating} / 10
                  </p>
                  {rev.comment && (
                    <div className="mt-2 flex flex-wrap items-start gap-1 text-gray-700 min-w-0 overflow-hidden">
                      <span className="break-words">{rev.comment}</span>
                    </div>
                  )}

                  <p className="mt-2 text-xs text-gray-500">
                    by User #{rev.userId}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No comments yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
