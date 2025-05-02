import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { WatchStatus } from "@/types/watch-status";

export interface WatchItem {
  id: number;
  status: WatchStatus;
  film: { id: number; title: string; genres: { id: number; name: string }[] };
}

export function useWatchlist() {
  const qc = useQueryClient();

  const query = useQuery<WatchItem[]>({
    queryKey: ["watchlist"],
    queryFn: () => api.get<WatchItem[]>("/watch-items").then((r) => r.data),
    staleTime: 1000 * 60,
  });

  const add = useMutation({
    mutationFn: (filmId: number) =>
      api.post("/watch-items", { filmId, status: WatchStatus.PLANNED }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["watchlist"] }),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: number; status: WatchStatus }) =>
      api.patch(`/watch-items/${id}`, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["watchlist"] }),
  });

  return { ...query, add, updateStatus };
}
