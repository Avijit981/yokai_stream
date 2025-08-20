import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, provider, db } from "../../firebase/config";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email Signup
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // Save user profile in Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        username,
        email,
        createdAt: new Date(),
      });

      console.log("User created:", userCred.user);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save to Firestore (if first time)
      await setDoc(
        doc(db, "users", user.uid),
        {
          username: user.displayName,
          email: user.email,
          createdAt: new Date(),
        },
        { merge: true }
      );

      console.log("Google user:", user);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-base-200 p-8 rounded-2xl shadow-lg space-y-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Username */}
        <div>
          <label className="label font-semibold">Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            className="input input-bordered w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="label font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label className="label font-semibold">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="input input-bordered w-full pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="checkbox"
              className="toggle absolute right-2 top-1/2 -translate-y-1/2"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="label font-semibold">Confirm Password</label>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="input input-bordered w-full pr-12"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="checkbox"
              className="toggle absolute right-2 top-1/2 -translate-y-1/2"
              checked={showConfirmPassword}
              onChange={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
        </div>

        {/* Terms */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="checkbox checkbox-sm" />
          <span>
            I agree to the{" "}
            <a href="#" className="text-pink-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-pink-500 hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="btn btn-primary w-full "
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-grow h-px bg-base-300"></div>
          <span className="text-sm text-gray-400">OR SIGN UP WITH</span>
          <div className="flex-grow h-px bg-base-300"></div>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignup}
          className="btn w-full bg-base-100 border border-base-300 hover:bg-base-300"
        >
          <FcGoogle className="mr-2 text-xl" /> Google
        </button>

        {/* Sign In link */}
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-pink-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
