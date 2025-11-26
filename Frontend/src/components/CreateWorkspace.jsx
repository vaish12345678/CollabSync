import { useState } from "react";
import axios from "../api/axios.js";

export default function CreateWorkspaceModal({ onClose }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/workspace/create", { name });
      onClose(); // close modal & refresh
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error creating workspace");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-purple-600">Create Workspace</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Workspace Name"
            className="w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg hover:scale-105 transform transition"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
