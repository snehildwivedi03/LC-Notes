import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        NotesApp
      </h1>
      <div className="space-x-6">
        <Link
          to="/"
          className="text-gray-700 dark:text-gray-300 hover:underline"
        >
          Home
        </Link>
        {!isAuthenticated && (
          <>
            <Link
              to="/login"
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              Register
            </Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
