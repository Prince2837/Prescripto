import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendurl, token, setToken } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const toggleState = () => {
    setState(state === "Sign Up" ? "Login" : "Sign Up");
    setName("");
    setEmail("");
    setPassword("");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendurl}/api/users/register`, {
          name,
          email,
          password
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendurl}/api/users/login`, {
          email,
          password
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <p className="text-2xl font-semibold mb-2">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="text-gray-500 mb-6">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book appointment
        </p>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {state === "Sign Up" && (
            <div>
              <p className="text-sm mb-1">Full Name</p>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          )}

          <div>
            <p className="text-sm mb-1">Email</p>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <p className="text-sm mb-1">Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white rounded py-2 hover:bg-indigo-600 transition"
          >
            {state === "Sign Up" ? "Create account" : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={toggleState}
            className="text-indigo-500 hover:underline cursor-pointer"
          >
            {state === "Sign Up" ? "Login here" : "Sign up here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;