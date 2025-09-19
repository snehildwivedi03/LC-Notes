import React, { useState } from "react";

const NoteCard = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  const handleSave = () => {
    onUpdate(note._id, { title, description });
    setIsEditing(false);
  };

  return (
    <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition">
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {note.title}
      </h3>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300">{note.description}</p>

      {/* Actions */}
      <div className="flex space-x-3 mt-4">
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
        >
          🗑 Delete
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="backdrop-blur-md bg-white/80 dark:bg-gray-900/90 p-6 rounded-2xl shadow-2xl w-96 border border-gray-300 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Edit Note
            </h2>

            {/* Title input */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-3 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
            />

            {/* Description input */}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400"
            />

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteCard;
