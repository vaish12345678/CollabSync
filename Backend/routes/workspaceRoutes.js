import express from "express";
import {
  createWorkspace,
  getMyWorkspaces,
  updateWorkspace,
  deleteWorkspace,
} from "../controllers/workspaceController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected (user must be logged in)
router.post("/create", authMiddleware, createWorkspace);
router.get("/my", authMiddleware, getMyWorkspaces);
router.put("/:id", authMiddleware, updateWorkspace);
router.delete("/:id", authMiddleware, deleteWorkspace);

export default router;
