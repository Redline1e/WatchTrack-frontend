"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface Genre {
  id: number;
  name: string;
}

interface Film {
  id: number;
  title: string;
  type: "MOVIE" | "SERIES" | "ANIME";
  genres: Genre[];
  releaseYear?: number;
  description?: string;
  photoUrl?: string;
}

export default function ContentSection() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formYear, setFormYear] = useState<number | "">("");
  const [formType, setFormType] = useState<"MOVIE" | "SERIES" | "ANIME">(
    "MOVIE"
  );
  const [formGenres, setFormGenres] = useState<number[]>([]);
  const [formPhoto, setFormPhoto] = useState<File | null>(null);

  useEffect(() => {
    Promise.all([api.get<Genre[]>("/genres"), api.get<Film[]>("/films")]).then(
      ([gRes, fRes]) => {
        setGenres(gRes.data);
        setFilms(fRes.data);
        setLoading(false);
      }
    );
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setFormTitle("");
    setFormDescription("");
    setFormYear("");
    setFormType("MOVIE");
    setFormGenres([]);
    setFormPhoto(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let filmId: number;

    if (editingId) {
      await api.patch(`/films/update/${editingId}`, {
        title: formTitle,
        description: formDescription,
        releaseYear: formYear || undefined,
        type: formType,
        genres: formGenres,
      });
      filmId = editingId;
    } else {
      const resp = await api.post<Film>("/films", {
        title: formTitle,
        description: formDescription,
        releaseYear: formYear || undefined,
        type: formType,
        genres: formGenres,
      });
      filmId = resp.data.id;
    }

    if (formPhoto) {
      const photoData = new FormData();
      photoData.append("photo", formPhoto);
      await api.post(`/films/${filmId}/photo`, photoData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    resetForm();
    const fRes = await api.get<Film[]>("/films");
    setFilms(fRes.data);
  };

  const startEdit = (f: Film) => {
    setEditingId(f.id);
    setFormTitle(f.title);
    setFormDescription(f.description || "");
    setFormYear(f.releaseYear ?? "");
    setFormType(f.type);
    setFormGenres(f.genres.map((g) => g.id));
    setFormPhoto(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete film?")) return;
    await api.delete(`/films/${id}`);
    setFilms((prev) => prev.filter((x) => x.id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-semibold">
          {editingId ? "Change film" : "Add new film"}
        </h2>
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows={3}
        />
        <input
          type="number"
          value={formYear}
          onChange={(e) => setFormYear(e.target.valueAsNumber || "")}
          placeholder="Release Year"
          className="w-full p-2 border rounded"
        />
        <select
          value={formType}
          onChange={(e) => setFormType(e.target.value as any)}
          className="w-full p-2 border rounded"
        >
          <option value="MOVIE">Movie</option>
          <option value="SERIES">Series</option>
          <option value="ANIME">Anime</option>
        </select>
        <select
          multiple
          value={formGenres.map(String)}
          onChange={(e) =>
            setFormGenres(Array.from(e.target.selectedOptions, (o) => +o.value))
          }
          className="w-full p-2 border rounded h-24"
        >
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormPhoto(e.target.files?.[0] ?? null)}
          className="w-full"
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editingId ? "Save" : "Create"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <table className="w-full table-auto border-collapse bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Year</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Genres</th>
            <th className="p-2 border">Photo</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {films.map((f) => (
            <tr key={f.id} className="hover:bg-gray-50">
              <td className="p-2 border">{f.id}</td>
              <td className="p-2 border">{f.title}</td>
              <td className="p-2 border">{f.releaseYear ?? "—"}</td>
              <td className="p-2 border">{f.type}</td>
              <td className="p-2 border">
                {f.genres.map((g) => g.name).join(", ")}
              </td>
              <td className="p-2 border">
                {f.photoUrl ? (
                  <img
                    src={f.photoUrl}
                    alt={f.title}
                    className="h-12 w-12 object-cover rounded"
                  />
                ) : (
                  "—"
                )}
              </td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => startEdit(f)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
