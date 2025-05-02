import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Genre {
  id: number;
  name: string;
}

export function useGenres() {
  const qc = useQueryClient();

  const query = useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: () => api.get<Genre[]>("/genres").then((r) => r.data),
  });

  const create = useMutation({
    mutationFn: (name: string) => api.post("/genres", { name }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["genres"] }),
  });

  const remove = useMutation({
    mutationFn: (id: number) => api.delete(`/genres/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["genres"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      api.patch(`/genres/${id}`, { name }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["genres"] }),
  });

  return { ...query, create, remove, update };
}
