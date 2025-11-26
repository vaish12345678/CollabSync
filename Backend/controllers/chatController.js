import Chat from "../models/Chat.js";
import User from "../models/User.js"
// Send a chat message
// In chatController.js - ENSURE PROPER POPULATION
// Example in chatController.js
export const sendMessage = async (req, res) => {
  const { workspaceId, message } = req.body;
  const userId = req.user.id; // assuming you have auth middleware
  const user = await User.findById(userId);

  const newMessage = await Chat.create({
    workspace: workspaceId,
    user: userId,
    message
  });

  // Populate user info
  const populatedMessage = await newMessage.populate("user", "name email");

  res.status(200).json(populatedMessage);
};


export const getChatMessages = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const chats = await Chat.find({ workspace: workspaceId })
      .populate("user", "name email")
      .sort({ createdAt: 1 }); // Sort by creation time

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};