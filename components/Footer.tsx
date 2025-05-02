"use client";

import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 border-t border-gray-700 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-1">
          <Heart className="h-5 w-5 text-red-500" />
          <span>Built with passion</span>
        </div>
        <div className="text-sm">© {new Date().getFullYear()} WatchTracker</div>
      </div>
    </footer>
  );
}
