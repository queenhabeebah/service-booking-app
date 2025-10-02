import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="bg-gradient-to-br from-primary-dark via-secondary to-secondary-dark p-10 min-h-screen">
      <div className="text-primary-light bg-secondary-light rounded-2xl w-[70%] mx-auto text-center p-6 md:w-[50%]">
        <h1 className="text-3xl font-bold mb-3">Create Account</h1>
        <p className="mb-5">
          Join our platform to start booking or providing services
        </p>
        <form action="" className="p-4 text-left ">
          <span className="font-bold block">Full Name</span>
          <input
            type="text"
            placeholder="Enter your full names"
            className="block p-2 border border-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary mb-2 rounded w-full"
          />
          <span className="font-bold block">Email</span>
          <input
            type="email"
            placeholder="Enter your email address"
            className="block p-2 border border-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary mb-2 rounded w-full"
          />
          <span className="font-bold block">I want to:</span>
          <div>
            <input type="radio" name="role" id="customer" /> Book Services
            (Customer)
          </div>
          <div>
            <input type="radio" name="role" id="service-provider" /> Provide
            Services (Service provider)
          </div>
          <span>Password</span>
          <input
            type="password"
            className="block p-2 border border-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary mb-2 rounded w-full"
          />
          <span>Confirm Password</span>
          <input
            type="password"
            className="block p-2 border border-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary mb-2 rounded w-full"
          />
          <button
            type="submit"
            className="block mt-4 p-2 border-white mb-2 rounded w-full bg-primary text-secondary font-bold"
          >
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link
            to="/signin"
            className="hover:underline text-gold-gradient
          "
          >
            Sign in Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
