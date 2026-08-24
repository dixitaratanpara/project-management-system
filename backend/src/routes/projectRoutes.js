import express from "express";
import { createProject, getProjects, getProject,updateProject, deleteProject, addMember, getProjectMembers, removeMember} from "../controllers/projectController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware,roleMiddleware("admin","manager"), createProject);

router.get("/",authMiddleware,getProjects);

router.get("/:id",authMiddleware,getProject);

router.put("/:id",authMiddleware, roleMiddleware("admin", "manager"),updateProject);

router.delete("/:id",authMiddleware, roleMiddleware("admin", "manager"),deleteProject);

router.post("/:id/members", authMiddleware, roleMiddleware("admin", "manager"), addMember);

router.get("/:id/members", authMiddleware,  getProjectMembers);

router.delete("/:id/members", authMiddleware, roleMiddleware("admin"), removeMember);

export default router;