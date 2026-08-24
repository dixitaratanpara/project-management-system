import express from "express";
import { createComment, getTaskComments,  updateComment, deleteComment } from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createComment);

router.get("/:taskId", authMiddleware, getTaskComments);

router.put("/:id", authMiddleware , updateComment);

router.delete("/:id", authMiddleware, deleteComment);

export default router;