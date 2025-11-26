import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { 
  inviteToWorkspace, 
  acceptInvite, 
  getMyInvites 
} from "../controllers/inviteController.js";

const router = express.Router();

// All routes are protected
router.post("/workspace/:workspaceId/invite", authMiddleware, inviteToWorkspace);
router.post("/accept/:token",acceptInvite);
router.get("/my-invites", authMiddleware, getMyInvites);

export default router;