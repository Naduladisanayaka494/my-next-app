"use client";

import React from "react";
import { useRouter } from "next/navigation";

const AdminDashboard: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className = "bg-gradient-to-r from-green-400 to-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </nav>


      <div className="p-6">
        <p>Welcome to the Admin Dashboard! Manage your app here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
