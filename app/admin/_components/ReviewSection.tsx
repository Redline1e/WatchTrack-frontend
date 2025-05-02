"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Review {
  id: number;
  userId: number;
  filmId: number;
  comment: string | null;
  rating: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
  film: {
    id: number;
    title: string;
  };
}

export function useReviews(filmId?: number) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<Review[]>({
    queryKey: filmId ? ["reviews", filmId] : ["reviews", "all"],
    queryFn: filmId
      ? () =>
          api.get<Review[]>(`/reviews/film/${filmId}`).then((res) => res.data)
      : () => api.get<Review[]>(`/reviews`).then((res) => res.data),
    staleTime: 1000 * 60,
  });

  const updateMutation = useMutation<
    Review,
    Error,
    { id: number; comment: string | null; rating: number }
  >({
    mutationFn: ({ id, comment, rating }) =>
      api
        .put<Review>(`/reviews/${id}`, { comment, rating })
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", filmId] });
      if (!filmId) {
        queryClient.invalidateQueries({ queryKey: ["reviews", "all"] });
      }
    },
  });

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: (id) => api.delete(`/reviews/${id}`).then(() => {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", filmId] });
      if (!filmId) {
        queryClient.invalidateQueries({ queryKey: ["reviews", "all"] });
      }
    },
  });

  return {
    data: data || [],
    loading: isLoading,
    update: (id: number, comment: string | null, rating: number) =>
      updateMutation.mutateAsync({ id, comment, rating }),
    remove: (id: number) => deleteMutation.mutateAsync(id),
  };
}

export default function ReviewsSection({ filmId }: { filmId?: number }) {
  const { data, loading, update, remove } = useReviews(filmId);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editComment, setEditComment] = useState<string>("");
  const [editRating, setEditRating] = useState<number>(0);

  if (loading) return <p>Loading reviews…</p>;

  const startEdit = (r: Review) => {
    setEditingId(r.id);
    setEditComment(r.comment || "");
    setEditRating(r.rating);
  };

  const save = async () => {
    if (editingId !== null) {
      await update(editingId, editComment, editRating);
      setEditingId(null);
      setEditComment("");
      setEditRating(0);
    }
  };

  const handleDelete = (id: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (isConfirmed) {
      remove(id);
    }
  };

  return (
    <table className="w-full table-auto border-collapse bg-white rounded shadow">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">User</th>
          <th className="p-2 border">Film</th>
          <th className="p-2 border">Comment</th>
          <th className="p-2 border">Rating</th>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r) => (
          <tr key={r.id} className="hover:bg-gray-50">
            <td className="p-2 border">{r.id}</td>
            <td className="p-2 border">{`${r.user.name} (id:${r.user.id})`}</td>
            <td className="p-2 border">{`${r.film.title} (id:${r.film.id})`}</td>
            <td className="p-2 border">
              {editingId === r.id ? (
                <textarea
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  className="w-full p-1 border rounded"
                  rows={2}
                />
              ) : (
                r.comment || "There is no comment"
              )}
            </td>
            <td className="p-2 border">
              {editingId === r.id ? (
                <input
                  type="number"
                  value={editRating}
                  onChange={(e) => setEditRating(Number(e.target.value))}
                  className="w-full p-1 border rounded"
                  min={1}
                  max={10}
                />
              ) : (
                r.rating
              )}
            </td>
            <td className="p-2 border">
              {new Date(r.createdAt).toLocaleString()}
            </td>
            <td className="p-2 border space-x-2">
              {editingId === r.id ? (
                <>
                  <button
                    onClick={save}
                    className="px-2 py-1 bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-2 py-1 bg-gray-400 text-white rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(r)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Change
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
