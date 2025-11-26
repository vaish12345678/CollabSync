// import express from "express";
// import { authMiddleware } from "../middleware/authMiddleware.js";
// import { sendMessage, getChatMessages } from "../controllers/chatController.js";

// const router = express.Router();

// // All routes protected
// router.post("/send", authMiddleware, sendMessage);
// router.get("/:workspaceId", authMiddleware, getChatMessages);

// export default router;
// routes/chatRoutes.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { sendMessage, getChatMessages } from "../controllers/chatController.js";

const router = express.Router();

// All routes protected
router.post("/send", authMiddleware, sendMessage);
router.get("/workspace/:workspaceId", authMiddleware, getChatMessages); // ✅ Fixed route

export default router;