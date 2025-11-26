import Note from "../models/Note.js";

// CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const { title, content, workspaceId } = req.body;

    const note = await Note.create({
      title,
      content,
      workspace: workspaceId,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: "Note created", note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL NOTES OF A WORKSPACE
export const getNotes = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const notes = await Note.find({ workspace: workspaceId });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE NOTE
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note updated", note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE NOTE
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    await Note.findByIdAndDelete(id);

    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
