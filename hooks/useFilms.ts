import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Film } from "@/types/film";


export function useFilms() {
  return useQuery<Film[]>({
    queryKey: ["films"],
    queryFn: async () => {
      const response = await api.get<Film[]>("/films");
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useFilm(id: number) {
  return useQuery<Film>({
    queryKey: ["film", id],
    queryFn: async () => {
      const response = await api.get<Film>(`/films/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
