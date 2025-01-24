"use client";

import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 bg-blue-600 text-white">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
      <div className="p-6">
        <p>Welcome to the Admin Dashboard! Manage your app here.</p>
        {/* Add dashboard features like user management, reports, etc. */}
      </div>
    </div>
  );
};

export default AdminDashboard;
