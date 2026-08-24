import express from "express";
import { createTask, getTasks, getTask, updateTask, deleteTask } from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("admin", "manager"), createTask);

router.get("/", authMiddleware, getTasks);

router.get("/:id", authMiddleware, getTask);

router.put("/:id",authMiddleware, roleMiddleware("admin", "manager"),updateTask);

router.delete("/:id",authMiddleware, roleMiddleware("admin"),deleteTask);

export default router;