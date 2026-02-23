import { useState } from "react";
import { signup } from "../api/authapi";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    year: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.role) {
      alert("Please select role");
      return;
    }

    try {
      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,      // ✅ USER SELECTED
        year: form.role === "ROLE_STUDENT" ? form.year : null,
      });

      alert("Signup successful! Please login.");
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Signup failed");
    }
  };
return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
    
    <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-8">

      <h2 className="text-2xl font-semibold text-center text-white">
        Create Account
      </h2>

      <p className="text-center text-slate-400 text-sm mt-1 mb-6">
        Register to access assignments & submissions
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm text-slate-400 mb-1">
            Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-slate-800 text-white
            border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-slate-800 text-white
            border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-slate-800 text-white
            border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">
            Role
          </label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-slate-800 text-white
            border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">Select Role</option>
            <option value="ROLE_STUDENT">Student</option>
            <option value="ROLE_TEACHER">Teacher</option>
          </select>
        </div>

        {form.role === "ROLE_STUDENT" && (
          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Year
            </label>
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-slate-800 text-white
              border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Select Year</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Final Year</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-4 py-2.5 rounded-md bg-indigo-600
          hover:bg-indigo-500 transition font-medium text-white"
        >
          Sign Up
        </button>

      </form>
    </div>
  </div>
);
}