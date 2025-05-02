"use client";
import { FC, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Star, Loader2 } from "lucide-react";

interface ReviewFormProps {
  filmId: number;
}

const MAX_COMMENT_LENGTH = 300;

const ReviewForm: FC<ReviewFormProps> = ({ filmId }) => {
  const qc = useQueryClient();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const mutation = useMutation({
    mutationFn: () => api.post("/reviews", { filmId, rating, comment }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["reviews", filmId] });
      setComment("");
      setRating(5);
    },
  });

  const isFormValid = comment.trim().length > 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isFormValid) return;
        mutation.mutate();
      }}
      className="mb-6 space-y-4 bg-white p-4 rounded-lg shadow"
    >
      <div>
        <span className="font-medium text-gray-700">Rating:</span>
        <div className="flex items-center mt-1 gap-1">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
            <Star
              key={value}
              className={
                `h-6 w-6 cursor-pointer transition-colors ` +
                (value <= rating ? "text-yellow-400" : "text-gray-300")
              }
              onClick={() => setRating(value)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block">
          <span className="font-medium text-gray-700">Comment:</span>
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => {
              if (e.target.value.length <= MAX_COMMENT_LENGTH) {
                setComment(e.target.value);
              }
            }}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write your review..."
          />
        </label>
        <div className="text-sm text-gray-500 mt-1">
          {comment.length}/{MAX_COMMENT_LENGTH}
        </div>
      </div>

      <button
        type="submit"
        disabled={mutation.isPending || !isFormValid}
        className={`flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </button>

      {mutation.isError && (
        <p className="text-sm text-red-500 mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
};

export default ReviewForm;
