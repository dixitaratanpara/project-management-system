import express from "express";
import { getMyNotification,markNotificationAsRead, markAllNotificationsAsRead } from "../controllers/notificationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getMyNotification);

router.put("/read-all", authMiddleware, markAllNotificationsAsRead);

router.put("/:id/read", authMiddleware, markNotificationAsRead);


export default router;