export interface Film {
  id: number;
  title: string;
  description?: string;
  releaseYear?: number;
  ratingAvg: number;
  genres: { id: number; name: string }[];
  photoUrl?: string;
  type: string;
}
