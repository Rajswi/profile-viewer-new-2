"use client";
import { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import Link from "next/link";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setProfiles(JSON.parse(localStorage.getItem("profiles")) || []);
  }, []);

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(search.toLowerCase()) ||
      profile.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`min-h-screen p-4 transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profile Viewer</h1>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          {/* Dark Mode Toggle Switch */}
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={darkMode} 
              onChange={() => setDarkMode(!darkMode)} 
            />
            <div className="w-12 h-6 bg-gray-300 rounded-full flex items-center px-1 transition-all duration-300 dark:bg-gray-600">
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all ${darkMode ? "translate-x-6 bg-gray-900" : "translate-x-0"}`}></div>
            </div>
            <span className="ml-2 text-sm">{darkMode ? "Dark Mode" : "Light Mode"}</span>
          </label>

          {/* Admin Button */}
          <Link href="/admin">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all">
              Go to Admin
            </button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search profiles..."
          className={`w-full p-3 border rounded-lg text-lg focus:ring-2 transition-all duration-300 shadow-md ${darkMode ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-400" : "bg-white border-gray-300 text-black focus:ring-blue-500"}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => <ProfileCard key={profile.id} profile={profile} />)
        ) : (
          <p className="text-center col-span-3 text-gray-500">No profiles found.</p>
        )}
      </div>
    </div>
  );
}
