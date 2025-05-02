import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Review {
  id: number;
  rating: number;
  comment?: string;
  userId: number;
}

export function useReviews<T = Review>(filmId: number): UseQueryResult<T[]> {
  return useQuery<T[]>({
    queryKey: ["reviews", filmId],
    queryFn: () =>
      api.get<T[]>(`/reviews/film/${filmId}`).then((res) => res.data),
    enabled: !!filmId,
    staleTime: 1000 * 60,
  });
}
