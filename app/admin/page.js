"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Admin() {
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({ name: "", image: "", description: "", address: "" });
  const [editingProfile, setEditingProfile] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
    setProfiles(savedProfiles);
  }, []);

  useEffect(() => {
    if (profiles.length > 0) {
      localStorage.setItem("profiles", JSON.stringify(profiles));
    }
  }, [profiles]);

  const handleChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const addOrUpdateProfile = () => {
    if (!newProfile.address) {
      alert("Please enter an address.");
      return;
    }

    let updatedProfiles;
    if (editingProfile) {
      updatedProfiles = profiles.map((profile) =>
        profile.id === editingProfile.id ? { ...newProfile, id: profile.id } : profile
      );
      setEditingProfile(null);
    } else {
      updatedProfiles = [...profiles, { id: Date.now(), ...newProfile }];
    }

    setProfiles(updatedProfiles);
    setNewProfile({ name: "", image: "", description: "", address: "" });
  };

  const editProfile = (profile) => {
    setNewProfile(profile);
    setEditingProfile(profile);
  };

  const deleteProfile = (id) => {
    const updatedProfiles = profiles.filter((profile) => profile.id !== id);
    setProfiles(updatedProfiles);
  };

  return (
    <div className={`min-h-screen p-4 transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>

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

          {/* Home Button */}
          <Link href="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all">
              Home
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className={`shadow-lg rounded-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className="text-2xl font-semibold mb-4">{editingProfile ? "Edit Profile" : "Add Profile"}</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newProfile.name}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 transition-all shadow-sm ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400" : "bg-white border-gray-300 text-black focus:ring-blue-500"}`}
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newProfile.image}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 transition-all shadow-sm ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400" : "bg-white border-gray-300 text-black focus:ring-blue-500"}`}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newProfile.description}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 transition-all shadow-sm ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400" : "bg-white border-gray-300 text-black focus:ring-blue-500"}`}
            ></textarea>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={newProfile.address}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 transition-all shadow-sm ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400" : "bg-white border-gray-300 text-black focus:ring-blue-500"}`}
            />

            <button
              onClick={addOrUpdateProfile}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition transform hover:scale-105"
            >
              {editingProfile ? "Update Profile" : "Add Profile"}
            </button>
          </div>
        </div>

        {/* Profiles Section */}
        <div className={`shadow-lg rounded-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className="text-2xl font-semibold mb-4">Manage Profiles</h2>
          <div className="space-y-4">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex items-center justify-between border-b py-3 px-4 rounded-lg shadow-sm ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"}`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={profile.image || "/default-avatar.png"}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{profile.name}</p>
                      <p className="text-gray-400 text-sm">{profile.address}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => editProfile(profile)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition">Edit</button>
                    <button onClick={() => deleteProfile(profile.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">Delete</button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-400">No profiles found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
