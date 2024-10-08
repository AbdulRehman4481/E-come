"use client";
import { showToast } from "@/(components)/toast/Toast";
import { auth } from "../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const initialValue = {
  email: "",
  password: "",
};

export default function Login() {
  const [state, setState] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = state;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/"); // Successful login, navigate to home
      })
      .catch((error) => {
        console.log(error);
        showToast("Invalid Email or Password", "error");
      })
      .finally(() => {
        setLoading(false); // Ensure loading is stopped after the request completes
      });
  };

  return (
    <div className="bg-primary-gradient bg-cover bg-center bg-no-repeat h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-3xl shadow-lg w-[350px] sm:w-[400px]">
        <h1 className="text-3xl font-bold text-white mb-4">Login</h1>
        <span className="text-lg text-white mb-8">
          Welcome back! Please sign in.
        </span>
        <form onSubmit={handleLogin} className="w-full">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
            className="bg-white bg-opacity-20 backdrop-blur-sm text-white placeholder-white p-3 text-lg rounded-[100px] w-full mb-4 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={state.password}
            onChange={handleChange}
            className="bg-white bg-opacity-20 backdrop-blur-sm text-white placeholder-white p-3 text-lg rounded-[100px] w-full mb-6 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-[100px] w-full text-lg font-semibold shadow-md transition-transform transform hover:scale-105 mb-4"
          >
            {loading ? "Loading..." : "LOGIN"}
          </button>
        </form>
        <span className="text-sm text-white mt-4">
          Don&apos;t have an account?{" "}
          <a href="/auth/register" className="text-blue-400 underline">
            Sign up
          </a>
        </span>
      </div>
    </div>
  );
}
