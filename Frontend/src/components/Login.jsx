
import { useState } from "react";
import axios from "../api/axios.js";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/login", { email, password });
      alert("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left side gradient */}
      <div className="w-1/2 bg-gradient-to-tr from-purple-500 to-indigo-600 flex flex-col justify-center items-center text-white p-12">
        <h1 className="text-5xl font-extrabold mb-4">Welcome Back!</h1>
        <p className="text-lg">Sign in to access your CollabSync workspaces.</p>
      </div>

      {/* Right side form */}
      <div className="w-1/2 flex justify-center items-center bg-gray-50 p-12">
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
          
          {/* Floating circle decorations */}
          <div className="absolute top-[-60px] left-[-60px] w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-[-60px] right-[-60px] w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          
          <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Login</h2>
          
          <div className="relative mb-6">
            <input
              type="email"
              required
              className="peer w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2 placeholder-transparent"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base">
              Email
            </label>
          </div>

          <div className="relative mb-6">
            <input
              type="password"
              required
              className="peer w-full border-b-2 border-gray-300 focus:border-purple-500 outline-none py-2 placeholder-transparent"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base">
              Password
            </label>
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg hover:scale-105 transform transition-all duration-300">
            Sign In
          </button>

          <p className="mt-6 text-center text-gray-500 text-sm">
            Don't have an account? <a href="/register" className="text-purple-500 font-semibold">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
