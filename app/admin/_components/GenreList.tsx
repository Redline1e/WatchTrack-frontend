"use client";

import React, { useState } from "react";
import { useGenres } from "@/hooks/useGenres";

export default function GenreList() {
  const { data: genres, isLoading, remove, update } = useGenres();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  if (isLoading) return <p>Loading genres…</p>;
  if (!genres?.length) return <p>There are no genres</p>;

  const startEdit = (id: number, currentName: string) => {
    setEditingId(id);
    setEditingName(currentName);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const saveEdit = (id: number) => {
    update.mutate(
      { id, name: editingName },
      {
        onSuccess: () => {
          cancelEdit();
        },
      }
    );
  };

  const handleDelete = (id: number, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you are about to delete genre "${name}"?`
    );
    if (confirmed) {
      remove.mutate(id);
    }
  };

  return (
    <ul className="space-y-2">
      {genres.map((g) => {
        const isEditing = g.id === editingId;
        return (
          <li
            key={g.id}
            className="flex justify-between items-center bg-white p-2 rounded shadow"
          >
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="border p-1 rounded"
                />
              ) : (
                <span>{g.name}</span>
              )}
            </div>

            <div className="flex space-x-1">
              {isEditing ? (
                <>
                  <button
                    onClick={() => saveEdit(g.id)}
                    disabled={update.isPending}
                    className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-2 py-1 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(g.id, g.name)}
                    className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(g.id, g.name)}
                    disabled={remove.isPending}
                    className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
