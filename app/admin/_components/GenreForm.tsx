'use client';

import { useState } from 'react';
import { useGenres } from '@/hooks/useGenres';

export default function GenreForm() {
  const [name, setName] = useState('');
  const { create, isLoading } = useGenres();

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await create.mutateAsync(name.trim());
    setName('');
  };

  return (
    <form onSubmit={handle} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="New genre"
        value={name}
        onChange={e => setName(e.target.value)}
        className="flex-1 p-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        {isLoading ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
