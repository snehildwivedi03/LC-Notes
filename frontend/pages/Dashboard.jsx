import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchNotes = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/api/notes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [isAuthenticated, navigate]);

  const handleAddNote = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API}/api/notes`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([res.data, ...notes]);
      setShowModal(false);
      setTitle("");
      setDescription("");
      toast.success("Note added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add note");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API}/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note");
    } finally {
      setLoading(false);
    }
  };

  const handleEditNote = (note) => {
    setEditMode(true);
    setCurrentNoteId(note._id);
    setTitle(note.title);
    setDescription(note.description);
    setShowModal(true);
  };

  const handleUpdateNote = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API}/api/notes/${currentNoteId}`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(
        notes.map((note) => (note._id === currentNoteId ? res.data : note))
      );
      setShowModal(false);
      setEditMode(false);
      setCurrentNoteId(null);
      setTitle("");
      setDescription("");
      toast.success("Note updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Loader loading={loading} />
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Dashboard
      </h1>

      {user && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 dark:bg-gray-800 transition">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
            Welcome, {user.name} 👋
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          <button
            onClick={() => {
              logout();
              navigate("/");
              toast.info("Logged out successfully!");
            }}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Your Notes
        </h2>
        <button
          onClick={() => {
            setEditMode(false);
            setTitle("");
            setDescription("");
            setShowModal(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          + Add New Note
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {note.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {note.description}
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => handleEditNote(note)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteNote(note._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-96 transition-colors">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              {editMode ? "Edit Note" : "Add Note"}
            </h2>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-3 p-2 border rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full mb-3 p-2 border rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={editMode ? handleUpdateNote : handleAddNote}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
              >
                {editMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
