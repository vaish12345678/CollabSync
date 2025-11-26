// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import axios from "../api/axios.js";
// import InviteModal from "./InviteModal.jsx";
// const socket = io("http://localhost:5000", { withCredentials: true });

// export default function Workspace() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [notes, setNotes] = useState([]);
//   const [selectedNote, setSelectedNote] = useState(null);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
  

//   // Invite states
//   const [showInviteModal, setShowInviteModal] = useState(false);
//   const [inviteEmail, setInviteEmail] = useState("");
//   const [inviteLink, setInviteLink] = useState("");
//   const [inviteLoading, setInviteLoading] = useState(false);
//   const [showLinkModal, setShowLinkModal] = useState(false);
//   // Fetch workspace data
//   useEffect(() => {
    
// const fetchNotes = async () => {
//   try {
//     const res = await axios.get(`/notes/workspace/${id}`);
//     setNotes(res.data);
//     if (res.data.length > 0) setSelectedNote(res.data[0]);
//   } catch (err) {
//     console.error("Error fetching notes:", err);
//   }
// };

//     const fetchChatMessages = async () => {
//       try {
//         const res = await axios.get(`/chat/workspace/${id}`);
//         setChatMessages(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchNotes();
//     fetchChatMessages();

//     // Socket events
//     socket.emit("joinWorkspace", id);

//     socket.on("receiveNoteChange", ({ noteId, content }) => {
//       setNotes(prev => prev.map(note => 
//         note._id === noteId ? { ...note, content } : note
//       ));
//       if (selectedNote && selectedNote._id === noteId) {
//         setSelectedNote(prev => ({ ...prev, content }));
//       }
//     });

//     socket.on("newNote", (newNote) => {
//       setNotes(prev => [newNote, ...prev]);
//     });

//     socket.on("receiveChatMessage", (chatData) => {
//       setChatMessages((prev) => [...prev, chatData]);
//     });

//     return () => {
//       socket.off("receiveNoteChange");
//       socket.off("newNote");
//       socket.off("receiveChatMessage");
//     };
//   }, [id]);

//   // Create new note
//   const createNewNote = async () => {
//     try {
//       const res = await axios.post('/notes/create', {
//         title: 'New Note',
//         content: '',
//         workspaceId: id
//       });
//       setNotes(prev => [res.data.note, ...prev]);
//       setSelectedNote(res.data.note);
      
//       socket.emit("newNote", { 
//         workspaceId: id, 
//         note: res.data.note 
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };
// const sendInvite = async () => {
//   try {
//     const { data } = await API.post(
//       `/invite/workspace/${id}/invite`,
//       { email }
//     );

//     setInviteLink(data.inviteLink);  // store link
//     setShowModal(true);              // open modal

//   } catch (err) {
//     console.error("❌ Invite failed:", err);
//   }
// };
//   // Update note content
//  const handleNoteChange = async (content) => {
//   if (!selectedNote) return;

//   // 1️⃣ Update local state immediately
//   setSelectedNote(prev => ({ ...prev, content }));
//   setNotes(prev => prev.map(note =>
//     note._id === selectedNote._id ? { ...note, content } : note
//   ));

//   try {
//     // 2️⃣ Save change to backend
//     await axios.put(`/notes/${selectedNote._id}`, {
//       title: selectedNote.title,
//       content: content
//     });

//     // 3️⃣ Emit socket event for other users
//     socket.emit("noteChange", {
//       workspaceId: id,
//       noteId: selectedNote._id,
//       content
//     });

//   } catch (err) {
//     console.error("Error updating note:", err);
//   }
// };


//   const handleTitleChange = async (title) => {
//   if (!selectedNote) return;

//   // 1️⃣ Update local state immediately
//   setSelectedNote(prev => ({ ...prev, title }));
//   setNotes(prev => prev.map(note =>
//     note._id === selectedNote._id ? { ...note, title } : note
//   ));

//   try {
//     // 2️⃣ Save title change to backend
//     await axios.put(`/notes/${selectedNote._id}`, {
//       title,
//       content: selectedNote.content
//     });

//     // 3️⃣ Emit socket event for title update
//     socket.emit("noteChange", {
//       workspaceId: id,
//       noteId: selectedNote._id,
//       content: selectedNote.content // emit full note
//     });

//   } catch (err) {
//     console.error("Error updating title:", err);
//   }
// };


//   // Send chat message
//   // Send chat message
// const sendMessage = async () => {
//   if (!newMessage.trim()) return;

//   try {
//     // send to backend (DB)
//     const res = await axios.post('/chat/send', {
//       workspaceId: id,
//       message: newMessage
//     });

//     // emit socket event
//     socket.emit("chatMessage", {
//       workspaceId: id,
//       user: res.data.user,
//       message: res.data.message,
//       _id: res.data._id,
//       createdAt: res.data.createdAt
//     });

//     // only clear input, do NOT update chatMessages here
//     setNewMessage("");

//   } catch (err) {
//     console.error('Error sending message:', err);
//   }
// };

//   // REAL INVITE FUNCTION - Calls the backend
//  const inviteCollaborator = async () => {
//     if (!inviteEmail.trim()) {
//       alert("Enter an email");
//       return;
//     }

//     setInviteLoading(true);

//     try {
//       // const res = await axios.post(`/invite/workspace/${id}/invite`, {
//       //   email: inviteEmail,
//       // });
//       const res = await axios.post(
//   `/invite/workspace/${id}/invite`,
//   { email: inviteEmail },
//   { headers: { 'Content-Type': 'application/json' } }
// );


//       setInviteLink(res.data.inviteLink);
//       setShowInviteModal(false);
//       setShowLinkModal(true);

//       setInviteEmail("");
//     } catch (err) {
//       console.error("Invite failed:", err);
//       alert("Failed to send invite");
//     } finally {
//       setInviteLoading(false);
//     }
//   };


//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Notes Sidebar */}
//      {showLinkModal && (
//         <InviteModal
//           link={inviteLink}
//           onClose={() => setShowLinkModal(false)}
//         />
//       )}

//       <div className="w-80 bg-white border-r border-gray-200 shadow-sm flex flex-col">
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">Notes</h2>
//               <p className="text-sm text-gray-500 mt-1">{notes.length} notes</p>
//             </div>
//             <div className="flex gap-2">
//               {/* Invite Button */}
//               <button 
//                 onClick={() => setShowInviteModal(true)}
//                 className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition-all duration-200 flex items-center gap-1 shadow-md"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
//                 </svg>
//                 Invite
//               </button>
              
//               {/* New Note Button */}
//               <button 
//                 onClick={createNewNote}
//                 className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-md flex items-center gap-2"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//                 New
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Notes List */}
//         <div className="flex-1 overflow-y-auto p-4">
//           {notes.map(note => (
//             <div 
//               key={note._id}
//               onClick={() => setSelectedNote(note)}
//               className={`p-4 mb-3 rounded-xl cursor-pointer transition-all duration-200 border ${
//                 selectedNote?._id === note._id 
//                   ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 shadow-sm' 
//                   : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200'
//               }`}
//             >
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="font-semibold text-gray-800 truncate flex-1">
//                   {note.title || 'Untitled Note'}
//                 </h3>
//                 {selectedNote?._id === note._id && (
//                   <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                 )}
//               </div>
              
//               <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
//                 {note.content || 'Empty note...'}
//               </p>
              
//               <div className="flex justify-between items-center text-xs text-gray-500">
//                 <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
//                 <span className="bg-gray-100 px-2 py-1 rounded-full">
//                   {note.content?.length || 0} chars
//                 </span>
//               </div>
//             </div>
//           ))}
          
//           {notes.length === 0 && (
//             <div className="text-center py-12">
//               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <p className="text-gray-500 mb-2">No notes yet</p>
//               <button 
//                 onClick={createNewNote}
//                 className="text-purple-600 hover:text-purple-700 font-medium"
//               >
//                 Create your first note
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Note Editor */}
//       <div className="flex-1 flex flex-col">
//         {selectedNote ? (
//           <>
//             <div className="bg-white border-b border-gray-200 p-6">
//               <input
//                 value={selectedNote.title}
//                 onChange={(e) => handleTitleChange(e.target.value)}
//                 className="text-3xl font-bold bg-transparent outline-none w-full text-gray-800 placeholder-gray-400 mb-2"
//                 placeholder="Note title..."
//               />
//               <div className="text-sm text-gray-500">
//                 Last edited {new Date(selectedNote.updatedAt).toLocaleDateString()}
//               </div>
//             </div>
            
//             <div className="flex-1 p-6">
//               <textarea
//                 value={selectedNote.content}
//                 onChange={(e) => handleNoteChange(e.target.value)}
//                 className="w-full h-full p-6 bg-white border border-gray-200 rounded-xl outline-none resize-none text-gray-700 leading-relaxed placeholder-gray-400 shadow-sm"
//                 placeholder="Start writing your note..."
//               />
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
//             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
//               <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-medium mb-2">Select a note</h3>
//             <p className="text-gray-500 mb-6">Choose a note from the sidebar or create a new one</p>
//             <button 
//               onClick={createNewNote}
//               className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-200"
//             >
//               Create New Note
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Chat Sidebar */}
//       <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
//         <div className="p-6 border-b border-gray-100">
//           <h2 className="text-xl font-bold text-gray-800">Team Chat</h2>
//           <p className="text-sm text-gray-500 mt-1">Collaborate with your team</p>
//         </div>
        
//         <div className="flex-1 overflow-y-auto p-4">
//           {chatMessages.map((msg, idx) => {
//             const userName = msg.user?.name || 
//                             msg.user?.email?.split('@')[0] || 
//                             (typeof msg.user === 'string' ? msg.user : 'Unknown User');
            
//             const messageContent = msg.message || msg.content;
//             const timestamp = msg.createdAt || msg.timestamp;
            
//             return (
//               <div key={msg._id || idx} className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
//                 <div className="flex justify-between items-start mb-2">
//                   <span className="font-semibold text-purple-600">
//                     {userName}
//                   </span> 
//                   <span className="text-xs text-gray-500">
//                     {timestamp ? new Date(timestamp).toLocaleTimeString() : 'Just now'}
//                   </span>
//                 </div>
//                 <div className="text-gray-700">
//                   {messageContent}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
        
//         <div className="p-4 border-t border-gray-100">
//           <div className="flex gap-2">
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//               className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
//               placeholder="Type a message..."
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-md"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Invite Modal */}
//        {showInviteModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
//             <h3 className="text-lg font-bold mb-3">Invite to Workspace</h3>

//             <input
//               type="email"
//               value={inviteEmail}
//               onChange={e => setInviteEmail(e.target.value)}
//               placeholder="Enter email"
//               className="w-full border p-3 rounded-lg mb-4"
//             />

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowInviteModal(false)}
//                 className="text-gray-600 px-4 py-2"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={inviteCollaborator}
//                 disabled={inviteLoading}
//                 className="bg-green-500 text-white px-4 py-2 rounded-lg"
//               >
//                 {inviteLoading ? "Sending..." : "Send Invite"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "../api/axios.js";
import InviteModal from "./InviteModal.jsx";

const socket = io("http://localhost:5000", { withCredentials: true });

export default function Workspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Invite states
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  // Fetch workspace data
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`/notes/workspace/${id}`);
        setNotes(res.data);
        if (res.data.length > 0) setSelectedNote(res.data[0]);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };

    const fetchChatMessages = async () => {
      try {
        const res = await axios.get(`/chat/workspace/${id}`);
        setChatMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotes();
    fetchChatMessages();

    // Socket events
    socket.emit("joinWorkspace", id);

    // Listen for note updates
    socket.on("receiveNoteChange", ({ noteId, content, title }) => {
      setNotes(prev =>
        prev.map(note =>
          note._id === noteId ? { ...note, content, title: title || note.title } : note
        )
      );

      if (selectedNote && selectedNote._id === noteId) {
        setSelectedNote(prev => ({ ...prev, content, title: title || prev.title }));
      }
    });

    // Listen for new notes
    socket.on("newNote", (newNote) => {
      setNotes(prev => [newNote, ...prev]);
      if (!selectedNote) setSelectedNote(newNote);
    });

    // Listen for chat messages
    socket.on("receiveChatMessage", (chatData) => {
      setChatMessages(prev => [...prev, chatData]);
    });

    return () => {
      socket.off("receiveNoteChange");
      socket.off("newNote");
      socket.off("receiveChatMessage");
    };
  }, [id, selectedNote]);

  // Create new note
  const createNewNote = async () => {
    try {
      const res = await axios.post('/notes/create', {
        title: 'New Note',
        content: '',
        workspaceId: id
      });
      setNotes(prev => [res.data.note, ...prev]);
      setSelectedNote(res.data.note);

      socket.emit("newNote", { workspaceId: id, note: res.data.note });
    } catch (err) {
      console.error(err);
    }
  };

  // Update note content
  const handleNoteChange = async (content) => {
    if (!selectedNote) return;

    setSelectedNote(prev => ({ ...prev, content }));
    setNotes(prev =>
      prev.map(note =>
        note._id === selectedNote._id ? { ...note, content } : note
      )
    );

    try {
      await axios.put(`/notes/${selectedNote._id}`, {
        title: selectedNote.title,
        content
      });

      socket.emit("noteChange", {
        workspaceId: id,
        noteId: selectedNote._id,
        content,
        title: selectedNote.title
      });
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  // Update note title
  const handleTitleChange = async (title) => {
    if (!selectedNote) return;

    setSelectedNote(prev => ({ ...prev, title }));
    setNotes(prev =>
      prev.map(note =>
        note._id === selectedNote._id ? { ...note, title } : note
      )
    );

    try {
      await axios.put(`/notes/${selectedNote._id}`, {
        title,
        content: selectedNote.content
      });

      socket.emit("noteChange", {
        workspaceId: id,
        noteId: selectedNote._id,
        content: selectedNote.content,
        title
      });
    } catch (err) {
      console.error("Error updating title:", err);
    }
  };

  // Send chat message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post('/chat/send', {
        workspaceId: id,
        message: newMessage
      });

      socket.emit("chatMessage", {
        workspaceId: id,
        user: res.data.user,
        message: res.data.message,
        _id: res.data._id,
        createdAt: res.data.createdAt
      });

      setNewMessage("");
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  // Invite collaborator
  const inviteCollaborator = async () => {
    if (!inviteEmail.trim()) {
      alert("Enter an email");
      return;
    }

    setInviteLoading(true);

    try {
      const res = await axios.post(
        `/invite/workspace/${id}/invite`,
        { email: inviteEmail },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setInviteLink(res.data.inviteLink);
      setShowInviteModal(false);
      setShowLinkModal(true);
      setInviteEmail("");
    } catch (err) {
      console.error("Invite failed:", err);
      alert("Failed to send invite");
    } finally {
      setInviteLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Invite Modal */}
      {showLinkModal && (
        <InviteModal link={inviteLink} onClose={() => setShowLinkModal(false)} />
      )}

      {/* Notes Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 shadow-sm flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Notes</h2>
              <p className="text-sm text-gray-500 mt-1">{notes.length} notes</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInviteModal(true)}
                className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition-all duration-200 flex items-center gap-1 shadow-md"
              >
                Invite
              </button>
              <button
                onClick={createNewNote}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-md flex items-center gap-2"
              >
                New
              </button>
            </div>
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-4">
          {notes.map(note => (
            <div
              key={note._id}
              onClick={() => setSelectedNote(note)}
              className={`p-4 mb-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                selectedNote?._id === note._id
                  ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 shadow-sm'
                  : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 truncate flex-1">
                  {note.title || 'Untitled Note'}
                </h3>
                {selectedNote?._id === note._id && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                )}
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                {note.content || 'Empty note...'}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full">
                  {note.content?.length || 0} chars
                </span>
              </div>
            </div>
          ))}
          {notes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-2">No notes yet</p>
              <button onClick={createNewNote} className="text-purple-600 hover:text-purple-700 font-medium">
                Create your first note
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            <div className="bg-white border-b border-gray-200 p-6">
              <input
                value={selectedNote.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="text-3xl font-bold bg-transparent outline-none w-full text-gray-800 placeholder-gray-400 mb-2"
                placeholder="Note title..."
              />
              <div className="text-sm text-gray-500">
                Last edited {new Date(selectedNote.updatedAt).toLocaleDateString()}
              </div>
            </div>

            <div className="flex-1 p-6">
              <textarea
                value={selectedNote.content}
                onChange={(e) => handleNoteChange(e.target.value)}
                className="w-full h-full p-6 bg-white border border-gray-200 rounded-xl outline-none resize-none text-gray-700 leading-relaxed placeholder-gray-400 shadow-sm"
                placeholder="Start writing your note..."
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8">
            <h3 className="text-xl font-medium mb-2">Select a note</h3>
            <p className="text-gray-500 mb-6">Choose a note from the sidebar or create a new one</p>
            <button
              onClick={createNewNote}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-200"
            >
              Create New Note
            </button>
          </div>
        )}
      </div>

      {/* Chat Sidebar */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Team Chat</h2>
          <p className="text-sm text-gray-500 mt-1">Collaborate with your team</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {chatMessages.map((msg, idx) => {
            const userName = msg.user?.name ||
                             msg.user?.email?.split('@')[0] ||
                             (typeof msg.user === 'string' ? msg.user : 'Unknown User');
            const messageContent = msg.message || msg.content;
            const timestamp = msg.createdAt || msg.timestamp;

            return (
              <div key={msg._id || idx} className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-purple-600">{userName}</span>
                  <span className="text-xs text-gray-500">
                    {timestamp ? new Date(timestamp).toLocaleTimeString() : 'Just now'}
                  </span>
                </div>
                <div className="text-gray-700">{messageContent}</div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h3 className="text-lg font-bold mb-3">Invite to Workspace</h3>
            <input
              type="email"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full border p-3 rounded-lg mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-600 px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={inviteCollaborator}
                disabled={inviteLoading}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                {inviteLoading ? "Sending..." : "Send Invite"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
