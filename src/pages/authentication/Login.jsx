import React, { useState } from "react";
import { auth, provider, db } from "../../firebase/config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { ToggleLeft, ToggleRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const saveUser = async (user) => {
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous",
        photoURL: user.photoURL || "",
        createdAt: new Date(),
      },
      { merge: true }
    );
  };

  const handleEmailLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await saveUser(result.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      await saveUser(result.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-3xl font-outfit font-bold">Login</legend>

        {error && <p className="text-error mb-2">{error}</p>}

        {/* Email */}
        <label className="label">Email</label>
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password + Toggle */}
        <label className="label mt-2">Password</label>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            className="input input-bordered w-full pr-10"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center text-primary transition"
          >
            {showPassword ? (
              <ToggleRight className="w-5 h-5" />
            ) : (
              <ToggleLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Email login */}
        <button
          onClick={handleEmailLogin}
          className="btn btn-neutral mt-4 w-full"
        >
          Login
        </button>

        {/* Google login */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-primary mt-2 w-full"
        >
          Continue with Google
        </button>

        <p className="mt-4 text-sm">
          New here?{" "}
          <Link to="/signup" className="link link-primary">
            Register
          </Link>
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
