import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import CreateWorkspaceModal from "./CreateWorkspace";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [workspaces, setWorkspaces] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchWorkspaces = async () => {
    try {
      const res = await axios.get("/workspace/my");
      setWorkspaces(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching workspaces");
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-12 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-purple-600">My Workspaces</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-lg font-semibold"
        >
          + Create Workspace
        </button>
      </div>

      {/* Workspace Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {workspaces.length === 0 ? (
          <p className="text-gray-500 col-span-3">No workspaces yet.</p>
        ) : (
          workspaces.map((ws) => (
            <div
              key={ws._id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-bold mb-2 text-purple-600">{ws.name}</h2>
              <p className="text-gray-500 mb-4">{ws.members.length} member(s)</p>
              <button
                onClick={() => navigate(`/workspace/${ws._id}`)}
                className="px-4 py-2 bg-gradient-to-r from-purple-400 to-indigo-400 text-white rounded-lg font-semibold hover:scale-105 transform transition"
              >
                Open Workspace
              </button>
            </div>
          ))
        )}
      </div>

      {/* Create Workspace Modal */}
      {showModal && (
        <CreateWorkspaceModal
          onClose={() => {
            setShowModal(false);
            fetchWorkspaces();
          }}
        />
      )}
    </div>
  );
}
