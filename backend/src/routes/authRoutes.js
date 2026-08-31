import express from "express";
import { registerUser, loginUser, getProfile, forgotPassword, resetPassword } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router= express.Router();

router.post("/register", registerUser);

router.post("/login",loginUser);

router.get("/profile", authMiddleware, getProfile);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword);

export default router;