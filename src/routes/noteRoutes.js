import express from "express";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

import {
  authMiddleware,
} from "../middleware.js";

const router =
  express.Router();

router.get(
  "/",
  authMiddleware,
  getNotes
);

router.post(
  "/",
  authMiddleware,
  createNote
);

router.put(
  "/:id",
  authMiddleware,
  updateNote
);

router.delete(
  "/:id",
  authMiddleware,
  deleteNote
);

export default router;