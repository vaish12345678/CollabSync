
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios.js";
import { useState } from "react";

export default function AcceptInvite() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAcceptInvite = async () => {
    setLoading(true);
    try {
      const res = await API.post(`/invite/accept/${token}`);
      //  After success, redirect to workspace
           navigate(`/workspace/${res.data.workspaceId}`);
    } catch (err) {
      console.error("Failed to accept invite:", err);
      alert(err.response?.data?.error || "Invite failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Accept Workspace Invite</h1>
      <button
        onClick={handleAcceptInvite}
        className="bg-green-500 text-white px-6 py-3 rounded-lg"
        disabled={loading}
      >
        {loading ? "Accepting..." : "Accept Invite"}
      </button>
    </div>
  );
}
