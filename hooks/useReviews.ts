import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useReviews(filmId: number) {
  return useQuery({
    queryKey: ["reviews", filmId],
    queryFn: () => api.get(`/reviews/film/${filmId}`).then((res) => res.data),
    enabled: !!filmId,
    staleTime: 1000 * 60,
  });
}
