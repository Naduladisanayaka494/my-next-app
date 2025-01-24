"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import libraryImg from "../public/library.jpg";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid login credentials");
      }

      const data = await response.json();

      localStorage.setItem("token", data.jwt);
      
      localStorage.setItem("role", data.userRole);

      switch (data.userRole) {
        case "Admin":
          router.push("/admin-dashboard");
          break;
        case "User":
          router.push("/user-dashboard");
          break;
        default:
          throw new Error("Unknown role");
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 bg-gradient-to-r from-green-400 to-blue-600 flex flex-col justify-center items-center text-white p-6 md:p-12">
        <Image
          src={libraryImg}
          alt="Book"
          className="w-2/3 md:w-1/2 h-auto"
          layout="intrinsic"
        />
        <h1 className="text-2xl md:text-4xl font-bold mt-6 text-center">
          Welcome to BookWorld
        </h1>
        <p className="mt-2 text-sm md:text-lg text-center">
          Discover, Learn, and Grow
        </p>
      </div>

      <div className="md:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-6 md:p-12">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-md">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
            Login
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
