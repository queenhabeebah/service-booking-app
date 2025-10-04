import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const Signin = () => {
  return (
    <div className="bg-gradient-to-br from-primary-dark via-secondary to-secondary-dark p-10 min-h-screen">
      <div className="text-primary-light bg-secondary-light rounded-2xl w-[70%] mx-auto text-center p-6 lg:w-[50%]">
        <h1 className="text-3xl font-bold mb-3">Welcome Back</h1>
        <p className="mb-5">Sign in to your account to continue</p>
        <form action="" className="p-2 text-left ">
          <span className="font-bold block">Email</span>
          <input
            type="email"
            placeholder={"Enter your email address"}
            className="block p-2 border border-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary mb-2 rounded w-full"
          />

          <span className="font-bold block">Password</span>
          <input
            type="password"
            className="block p-2 border border-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary mb-2 rounded w-full"
          />

          <button
            type="submit"
            className="block mt-4 p-2 border-white mb-2 rounded w-full bg-primary text-secondary font-bold"
          >
            Sign In
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="hover:underline text-gold-gradient
          "
          >
            Sign up Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
