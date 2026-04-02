import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import inviteRoutes from "./routes/inviteRoutes.js";

dotenv.config();
import chatRoutes from "./routes/chatRoutes.js";
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://collab-sync-mu.vercel.app/", 
    methods: ["GET", "POST"],
    credentials: true,
  }
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://collab-sync-mu.vercel.app/",
    
    credentials:true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/workspace", workspaceRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/invite", inviteRoutes);

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("joinWorkspace", (workspaceId) => {
    socket.join(workspaceId);
    console.log(`User ${socket.id} joined workspace ${workspaceId}`);
  });

  socket.on("noteChange", ({ workspaceId, noteId, content }) => {
  
    socket.to(workspaceId).emit("receiveNoteChange", { noteId, content });
  });

                
  socket.on("newNote", ({ workspaceId, note }) => {
    socket.to(workspaceId).emit("newNote", note);
  });

  // Listen for chat messages
  // In your server.js - IMPROVED chat handler
  socket.on("chatMessage", ({ workspaceId, user, message }) => {
  
  const chatData = { 
    user, 
    message, 
    createdAt: new Date().toISOString(),
    _id: Date.now().toString() 
  };
  
  io.to(workspaceId).emit("receiveChatMessage", chatData);
});

  socket.on("disconnect", () => {
    console.log("A user disconnected: " + socket.id);
  });
});


connectDB();
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server running"));

