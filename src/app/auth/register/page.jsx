"use client";
import { useState } from "react";
import { auth, firestore } from "../../../config/firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const initialValue = {
  userName: "",
  email: "",
  password: "",
};
export default function Register() {
  const [state, setState] = useState(initialValue);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    if (state.password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
    } else {
      setErrorMessage("");
      const { email, password, userName } = state;
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
         await createUserProfile(user, userName);
          await createCart(user.uid); 
          router.push("/"); 
        })
        .catch((error) => {
          setErrorMessage("SomeThing is Wrong");
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  const createUserProfile = async (user) => {
    const { userName } = state;
    const { email, uid } = user;
    const userData = {
      uid,
      userName,
      email,
      status: "active",
      dateCreated: new Date().toDateString(),
    };
    try {
      await setDoc(doc(firestore, "users", uid), userData);
    } catch (error) {
      console.log("error", error);
    }
  };
  const createCart = async (userId) => {
    const cartData = {
      userId,
      products: [],
      orders:[],
      status: "open",
      createdAt: serverTimestamp(),
    };
    try {
      await setDoc(doc(firestore, "carts", userId), cartData);
    } catch (error) {
      console.error("Error creating cart:", error);
    }
  };
  return (
    <>
      <div className="bg-primary-gradient bg-cover bg-center bg-no-repeat h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-3xl shadow-lg w-[350px] sm:w-[400px]">
          <h1 className="text-3xl font-bold text-white mb-4">Register</h1>
          <span className="text-lg text-white mb-8">Create your account</span>
          <input
            type="text"
            placeholder="Username"
            name="userName"
            value={state.userName}
            onChange={handleChange}
            className="bg-white bg-opacity-20 backdrop-blur-sm text-white placeholder-white p-3 text-lg rounded-[100px] w-full mb-4 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
            className="bg-white bg-opacity-20 backdrop-blur-sm text-white placeholder-white p-3 text-lg rounded-[100px] w-full mb-4 border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={state.password}
              name="password"
              onChange={handleChange}
              className="bg-white bg-opacity-20 backdrop-blur-sm text-white placeholder-white p-3 text-lg rounded-[100px] w-full border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-4 text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative w-full mb-6">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white bg-opacity-20 backdrop-blur-sm text-white placeholder-white p-3 text-lg rounded-[100px] w-full border border-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-5 top-4 text-white"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <button
            onClick={handleRegister}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-[100px] w-full text-lg font-semibold shadow-md transition-transform transform hover:scale-105 mb-4"
          >
            REGISTER
          </button>
          <span className="text-sm text-white mt-4">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-400 underline">
              Sign in
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
