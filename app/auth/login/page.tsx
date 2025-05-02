"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { api } from "@/lib/api";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      router.replace("/films");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      router.replace("/films");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(
          (err as AxiosError<{ message: string }>).response!.data.message
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid credentials");
      }
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Log In
      </h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-black max-w-md mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-200"
          required
        />

        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-200 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
        >
          Log In
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Don’t have an account?{" "}
        <a href="/auth/register" className="text-indigo-600 hover:underline">
          Sign Up
        </a>
      </p>
    </>
  );
}
