import Note from "../models/Note.js";

// Create Note
export const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const note = await Note.create({
      user: req.user._id,
      title,
      description,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error("Create Note Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (error) {
    console.error("Get Notes Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    note.title = title || note.title;
    note.description = description || note.description;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    console.error("Update Note Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Debug logs
    console.log("Delete Note ID:", id);
    console.log("Logged-in user ID:", req.user._id);

    const note = await Note.findById(id);
    if (!note) {
      console.log("Note not found");
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      console.log("User not authorized to delete this note");
      return res.status(403).json({ message: "Not authorized" });
    }

    await Note.deleteOne({ _id: id }); // safer than note.remove()
    console.log("Note deleted successfully");
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete Note Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
