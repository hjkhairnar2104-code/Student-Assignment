import { useState } from "react";
import { login } from "../api/authapi";
import { Link } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({ email, password });
      console.log("LOGIN RESPONSE:", res);

      if (!res.success) {
        setError(res.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("userId", res.userId);

      if (res.role === "ROLE_TEACHER") {
        window.location.href = "/teacher";
      } else if (res.role === "ROLE_STUDENT") {
        window.location.href = "/student";
      } else {
        alert("Role not assigned. Contact admin.");
      }

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black px-4">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25),transparent_60%)]"></div>

      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-md rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"
      >
        <div className="rounded-2xl bg-[#0b0b18]/90 backdrop-blur-xl p-8 shadow-2xl">

          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Welcome Back
          </h2>

          <p className="text-center text-gray-400 mt-2 mb-8">
            Login to manage assignments & submissions
          </p>

          <div className="mb-4">
            <label className="text-sm text-gray-300">Email Address</label>
            <input
              type="email"
              className="mt-2 w-full rounded-lg bg-[#141428] text-white px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="teacher@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="mt-2 w-full rounded-lg bg-[#141428] text-white px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-lg font-semibold text-white
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            Login
          </button>

          <p className="text-center mt-4 text-sm text-gray-300">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400 font-semibold hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </form>
    </div>
  );
}