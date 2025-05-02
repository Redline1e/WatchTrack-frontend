// app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import {
  User,
  LogOut,
  Trash2,
  Calendar,
  Heart,
  BookCheck,
  Save,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Profile {
  id: number;
  email: string;
  name: string | null;
  createdAt: string;
  totalWatched: number;
  favoriteGenres: string[];
}

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.sub as number;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const userId = getUserId();
    if (!userId) {
      router.replace("/auth/login");
      return;
    }
    api
      .get<Profile>(`/users/${userId}`)
      .then((res) => {
        setProfile(res.data);
        setName(res.data.name ?? "");
        setEmail(res.data.email);
      })
      .catch(() => {
        localStorage.removeItem("token");
        router.replace("/auth/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setError(null);
    try {
      await api.patch(`/users/${profile.id}`, { name, email });
      setProfile({ ...profile, name, email });
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating profile");
    }
  };

  const handleDelete = async () => {
    if (!profile) return;
    if (!confirm("Are you sure you want to delete your account?")) return;
    try {
      await api.delete(`/users/${profile.id}`);
      localStorage.removeItem("token");
      router.replace("/auth/register");
    } catch {
      alert("Failed to delete account");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/auth/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6 text-center text-red-600">Failed to load profile</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="max-w-lg w-full mx-auto p-6 space-y-8 bg-white rounded-2xl shadow-lg mt-24 mb-14">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <User className="h-10 w-10 text-indigo-600" />
          <h2 className="text-3xl font-bold">My Profile</h2>
        </div>

        {/* Edit Form */}
        {error && <div className="text-red-600">{error}</div>}
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
          >
            <Save className="h-5 w-5" /> Save Changes
          </button>
        </form>

        {/* Stats */}
        <div className="border-t pt-6 space-y-4 text-gray-700">
          <h3 className="text-xl font-semibold">Statistics</h3>
          <p className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            Member since: {new Date(profile.createdAt).toLocaleDateString()}
          </p>
          <p className="flex items-center gap-2">
            <BookCheck className="h-5 w-5 text-green-500" />
            Total watched: {profile.totalWatched}
          </p>
          <p className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Favorite genres: {profile.favoriteGenres.join(", ") || "—"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            <Trash2 className="h-5 w-5" /> Delete Account
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
