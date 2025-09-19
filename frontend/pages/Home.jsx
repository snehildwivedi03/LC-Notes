// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-all duration-500">
      <div className="text-center px-6">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
          Welcome to{" "}
          <span className="text-blue-600 dark:text-blue-400">LC Notes</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Keep your thoughts safe and organized with our secure notes app.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
