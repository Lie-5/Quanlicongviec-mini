"use client";

import Link from "next/link";
import { useStore } from "../store/useStore";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { language, user } = useStore();
  const { user: authUser } = useAuth();

  const currentUser = user || authUser;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Left side - empty for now */}
      <div className="flex-1"></div>

      {/* Right side - Avatar and Website Introduction button */}
      <div className="flex items-center gap-4">
        {/* Website Introduction Button */}
        <Link
          href="/"
          className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold rounded-xl border border-purple-200 transition-all duration-200 hover:scale-105"
        >
          {language === "vi" ? "Giới thiệu Website" : "Website Introduction"}
        </Link>

        {/* Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
          </span>
        </div>
      </div>
    </header>
  );
}
