

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
//  import axios from "../api/axios.js";

// const AcceptInvite = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [status, setStatus] = useState("loading");

//   useEffect(() => {
//     const acceptInvite = async () => {
//       try {
//         const res = await axios.post(`/invite/accept/${token}`);
//         console.log("Invite accepted:", res.data);

//         setStatus("success");

//         // Redirect to the workspace
//         setTimeout(() => {
//           navigate(`/workspace/${res.data.workspace.id}`);
//         }, 1500);

//       } catch (error) {
//         console.error("Accept invite error:", error);
//         setStatus("failed");
//       }
//     };

//     acceptInvite();
//   }, [token, navigate]);

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center">
//       {status === "loading" && <h1>⏳ Accepting Invite...</h1>}
//       {status === "success" && <h1>✅ Invite Accepted! Redirecting...</h1>}
//       {status === "failed" && (
//         <h1>❌ Invite Failed<br/>Failed to accept invite</h1>
//       )}
//     </div>
//   );
// };

// export default AcceptInvite;


// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../api/axios.js";

// const AcceptInvite = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [status, setStatus] = useState("loading");

//   useEffect(() => {
//     const acceptInvite = async () => {
//       try {
//         const res = await axios.post(`/invite/accept/${token}`);

//         console.log("Invite accepted:", res.data);

//         // 🔥 SAVE TOKEN → Auto login!
//         localStorage.setItem("token", res.data.token);

//         setStatus("success");

//         // Redirect to the workspace
//         setTimeout(() => {
//           navigate(`/workspace/${res.data.workspace.id}`);
//         }, 1500);

//       } catch (error) {
//         console.error("Accept invite error:", error);
//         setStatus("failed");
//       }
//     };

//     acceptInvite();
//   }, [token, navigate]);

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center">
//       {status === "loading" && <h1>⏳ Accepting Invite...</h1>}
//       {status === "success" && <h1>✅ Invite Accepted! Redirecting...</h1>}
//       {status === "failed" && (
//         <h1>❌ Invite Failed<br/>Failed to accept invite</h1>
//       )}
//     </div>
//   );
// };

// export default AcceptInvite;

// import { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../api/axios";

// export default function AcceptInvite() {
//   const { token } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const acceptInvite = async () => {
//       try {
//         // Send token to backend
//         await axios.post(`/invite/accept/${encodeURIComponent(token)}`);

//         // Cookie with JWT is automatically set by backend

//         // Redirect to workspace
//         navigate(`/workspace/${token}`); // or workspaceId if backend returns it
//       } catch (err) {
//         console.error("Failed to accept invite:", err);
//         alert(err.response?.data?.error || "Failed to accept invite");
//       }
//     };

//     acceptInvite();
//   }, [token, navigate]);

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <p className="text-lg text-gray-700">Joining workspace...</p>
//     </div>
//   );
// }


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
      // ✅ After success, redirect to workspace
      navigate(`/workspace/${res.data.workspace.id}`);
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
