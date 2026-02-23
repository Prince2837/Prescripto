import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { AdminContext } from "./AdminContext";
import { DoctorContext } from "./DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();
  const { backendUrl, setAdminToken } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
    if (state === "Admin") {
  const res = await fetch(`${backendUrl}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  // ✅ Ensure both the response is OK and token exists
  if (!res.ok || !data.token) {
    throw new Error(data.message || "Admin login failed");
  }

  // Clear doctor token
  localStorage.removeItem("dToken");
  setDToken("");

  const token = data.token;
  setAdminToken(token);
  localStorage.setItem("adminToken", token);
  login();
  navigate("/admin-dashboard");
}

       else {
        // Doctor login with error handling
        try {
          const response = await axios.post(`${backendUrl}/api/doctor/login`, {
            email,
            password,
          });

          const data = response.data;

          if (!data.success) {
            throw new Error(data.message || "Doctor login failed");
          }

          // Clear admin token on doctor login
          localStorage.removeItem("adminToken");
          setAdminToken("");

          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          navigate("/doctor-dashboard");
        } catch (err) {
          const msg = err.response?.data?.message || "Invalid doctor credentials";
          setError(msg);
          toast.error(msg);
        }
      }
    } catch (err) {
      const msg = err.message || "Something went wrong";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
            {state} Login
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Sign in to access the dashboard
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1]"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#6366f1] text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition duration-200"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            {state === "Admin" ? (
              <p>
                Doctor Login?{" "}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setState("Doctor")}
                >
                  Click here
                </span>
              </p>
            ) : (
              <p>
                Admin Login?{" "}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setState("Admin")}
                >
                  Click here
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
