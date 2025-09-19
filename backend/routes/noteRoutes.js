import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Notes CRUD routes
router.post("/", createNote); // Create a new note
router.get("/", getNotes); // Get all notes for logged-in user
router.put("/:id", updateNote); // Update note by ID
router.delete("/:id", deleteNote); // Delete note by ID

export default router;
