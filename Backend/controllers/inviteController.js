

import Workspace from "../models/Workspace.js";
import User from "../models/User.js";
import Invite from "../models/Invite.js"
import jwt from "jsonwebtoken";

// Invite user to workspace
// Invite user to workspace
// export const inviteToWorkspace = async (req, res) => {
//   try {
//     const { workspaceId } = req.params;
//     const { email } = req.body;

//     const workspace = await Workspace.findById(workspaceId);
//     if (!workspace) return res.status(404).json({ message: "Workspace not found" });

//     const currentUserMember = workspace.members.find(
//       (memberId) => memberId.toString() === req.user.id
//     );
//     if (!currentUserMember)
//       return res.status(403).json({ message: "You are not a member of this workspace" });

//     const userToInvite = await User.findOne({ email });
//     if (!userToInvite) return res.status(404).json({ message: "User not found" });

//     const alreadyMember = workspace.members.find(
//       (memberId) => memberId.toString() === userToInvite._id.toString()
//     );
//     if (alreadyMember)
//       return res.status(400).json({ message: "User is already a member of this workspace" });

//     // Generate token FIRST
//     const inviteToken = jwt.sign(
//       {
//         workspaceId,
//         inviteeId: userToInvite._id,
//         inviterId: req.user.id,
//         email,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // THEN create invite
//     const inviteDoc = await Invite.create({
//       workspace: workspaceId,
//       email,
//       invitedBy: req.user.id,
//       token: inviteToken, // ✔ NO VALIDATION ERROR
//       expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     });

//     res.status(200).json({
//       success: true,
//       message: "Invite sent successfully!",
//       inviteToken,
//       inviteLink: `http://localhost:5173/accept-invite/${inviteToken}`,
//     });
    

//   } catch (error) {
//     console.error("Invite error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };
export const inviteToWorkspace = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { email } = req.body;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ message: "Workspace not found" });

    const currentUserMember = workspace.members.find(
      (memberId) => memberId.toString() === req.user.id
    );
    if (!currentUserMember)
      return res.status(403).json({ message: "You are not a member of this workspace" });

    const userToInvite = await User.findOne({ email });
    if (!userToInvite) return res.status(404).json({ message: "User not found" });

    const alreadyMember = workspace.members.find(
      (memberId) => memberId.toString() === userToInvite._id.toString()
    );
    if (alreadyMember)
      return res.status(400).json({ message: "User is already a member" });

    // ✔ 1. Create invite without token first
    const inviteDoc = await Invite.create({
      workspace: workspaceId,
      email,
      invitedBy: req.user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // ✔ 2. Create token including inviteId
    const inviteToken = jwt.sign(
      {
        workspaceId,
        inviteeId: userToInvite._id,
        inviterId: req.user.id,
        inviteId: inviteDoc._id,  // FIXED
        email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✔ 3. Save token inside Invite
    inviteDoc.token = inviteToken;
    await inviteDoc.save();

    res.status(200).json({
      success: true,
      message: "Invite sent successfully!",
      inviteToken,
      inviteLink: `http://localhost:5173/accept-invite/${inviteToken}`,
    });

  } catch (error) {
    console.error("Invite error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Accept invite
// Accept invite
// export const acceptInvite = async (req, res) => {
//   try {
//     const { token } = req.params;

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const { workspaceId, inviteeId, inviteId } = decoded;

//     // Find invite
//     const invite = await Invite.findById(inviteId);
//     if (!invite) return res.status(404).json({ error: "Invite not found" });

//     // Check if already used
//     if (invite.status === "accepted")
//       return res.status(400).json({ error: "Invite already used" });

//     // Find workspace
//     const workspace = await Workspace.findById(workspaceId);
//     if (!workspace) return res.status(404).json({ error: "Workspace not found" });

//     // Check if user is already a member
//     const isAlreadyMember = workspace.members.some(
//       (member) => member.toString() === inviteeId
//     );
//     if (isAlreadyMember)
//       return res.status(400).json({ error: "Already a member of this workspace" });

//     // Add member to workspace
//     workspace.members.push(inviteeId);
//     await workspace.save();

//     // Update invite status
//     invite.status = "accepted";
//     invite.usedAt = new Date();
//     await invite.save();

//     res.json({
//       message: "Successfully joined workspace",
//       workspace: {
//         id: workspace._id,
//         name: workspace.name,
//         role: "member",
//       },
//     });
//   } catch (error) {
//     console.error("Accept invite error:", error);

//     if (error.name === "JsonWebTokenError")
//       return res.status(400).json({ error: "Invalid token" });
//     if (error.name === "TokenExpiredError")
//       return res.status(400).json({ error: "Invite link expired" });

//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// Accept invite
// export const acceptInvite = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const { workspaceId, inviteeId, inviteId } = decoded;

//     const invite = await Invite.findById(inviteId);
//     if (!invite) return res.status(404).json({ error: "Invite not found" });

//     const workspace = await Workspace.findById(workspaceId);
//     if (!workspace) return res.status(404).json({ error: "Workspace not found" });

//     const isAlreadyMember = workspace.members.some(
//       (member) => member.toString() === inviteeId
//     );
//     if (isAlreadyMember) return res.status(400).json({ error: "Already a member" });

//     workspace.members.push(inviteeId);
//     await workspace.save();

//     invite.status = "accepted";
//     invite.usedAt = new Date();
//     await invite.save();

//     const userToken = jwt.sign({ id: inviteeId }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     // ✅ Set JWT as cookie
//     res.cookie("token", userToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.json({
//       message: "Successfully joined workspace",
//       workspace: { id: workspace._id, name: workspace.name, role: "member" },
//     });
//   } catch (error) {
//     console.error("Accept invite error:", error);
//     if (error.name === "JsonWebTokenError")
//       return res.status(400).json({ error: "Invalid token" });
//     if (error.name === "TokenExpiredError")
//       return res.status(400).json({ error: "Invite link expired" });
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


export const acceptInvite = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { workspaceId, inviteeId, inviteId } = decoded;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ error: "Workspace not found" });

    // Add member if not already
    const isAlreadyMember = workspace.members.some(
      (member) => member.toString() === inviteeId
    );
    if (!isAlreadyMember) {
      workspace.members.push(inviteeId);
      await workspace.save();
    }

    const invite = await Invite.findById(inviteId);
    if (invite && invite.status !== "accepted") {
      invite.status = "accepted";
      invite.usedAt = new Date();
      await invite.save();
    }

    // Auto-login: create JWT cookie
    const userToken = jwt.sign({ id: inviteeId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", userToken, {
      httpOnly: true,
      secure: false, // set true in production (HTTPS)
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Invite accepted and logged in",
      workspace: {
        id: workspace._id,
        name: workspace.name,
      },
    });
  } catch (error) {
    console.error("Accept invite error:", error);
    if (error.name === "JsonWebTokenError")
      return res.status(400).json({ error: "Invalid token" });
    if (error.name === "TokenExpiredError")
      return res.status(400).json({ error: "Invite link expired" });

    res.status(500).json({ error: "Internal server error" });
  }
};



export const getMyInvites = async (req, res) => {
  res.status(200).json({ invites: [] });
};