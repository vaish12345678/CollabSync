import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
        <h1 className="text-3xl font-bold tracking-wide">CollabSync</h1>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-indigo-600 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition"
          >
            Register
          </Link>
        </div>
      </nav>
  );
}
