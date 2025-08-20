import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

function MnavBar() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/60 to-transparent">
      <div className="container mx-auto px-8 py-6 flex items-center justify-between">
        {/* Logo + Links */}
        <div className="flex items-center space-x-8">
          <Link to="/home" className="text-2xl font-bold text-white">
            YokaiStream
          </Link>
          <div className="hidden md:flex items-center space-x-6 text-white">
            <Link to="/watchlist" className="hover:text-purple-400 transition-colors">
              WatchList
            </Link>
            <Link to="/random" className="hover:text-purple-400 transition-colors">
              Random
            </Link>
            <Link to="/community" className="hover:text-purple-400 transition-colors">
              Community
            </Link>
            <Link to="/news" className="hover:text-purple-400 transition-colors">
              News
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
              EN
            </div>
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
              JP
            </div>
          </div>

          {/* Auth Buttons */}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MnavBar;
