import express from "express";
import { createProject, getProjects, getProject,updateProject, deleteProject, addMember, getProjectMembers, removeMember} from "../controllers/projectController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProject);

router.get("/",authMiddleware,getProjects);

router.get("/:id",authMiddleware,getProject);

router.put("/:id",authMiddleware,updateProject);

router.delete("/:id",authMiddleware,deleteProject);

router.post("/:id/members", authMiddleware, addMember);

router.get("/:id/members", authMiddleware, getProjectMembers);

router.delete("/:id/members", authMiddleware, removeMember);

export default router;