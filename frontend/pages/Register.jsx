import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            Create an Account
          </h2>
          {error && (
            <p className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
            />
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 chars)"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:text-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
