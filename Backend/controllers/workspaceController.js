import Workspace from "../models/Workspace.js";

// CREATE WORKSPACE
export const createWorkspace = async (req, res) => {
  try {
    const { name } = req.body;

    const workspace = await Workspace.create({
      name,
      createdBy: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json({
      message: "Workspace created",
      workspace,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL WORKSPACES OF LOGGED-IN USER
export const getMyWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      members: req.user.id,
    });

    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE WORKSPACE NAME
export const updateWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const workspace = await Workspace.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!workspace) return res.status(404).json({ message: "Not found" });

    res.status(200).json({
      message: "Workspace updated",
      workspace,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE WORKSPACE
export const deleteWorkspace = async (req, res) => {
  try {
    const { id } = req.params;

    await Workspace.findByIdAndDelete(id);

    res.status(200).json({ message: "Workspace deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
