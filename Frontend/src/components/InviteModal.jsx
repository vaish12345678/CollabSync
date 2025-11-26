import React from "react";

const InviteModal = ({ link, onClose }) => {
  if (!link) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[360px] animate-fadeIn">
        
        <h2 className="text-xl font-semibold mb-4 text-center text-purple-700">
          Invite Link Generated 🎉
        </h2>

        <div className="mb-3">
          <input
            className="w-full border px-3 py-2 rounded outline-none text-gray-700"
            value={link}
            readOnly
          />
        </div>

        <button
          onClick={() => navigator.clipboard.writeText(link)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition"
        >
          Copy Link
        </button>

        <button
          className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded mt-3 transition"
          onClick={onClose}
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default InviteModal;
