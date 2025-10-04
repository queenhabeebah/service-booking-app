import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase-client";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { name, role },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Sign-up successful! Check your email for a confirmation link.");
      console.log("User signed in with role:", role);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary-dark via-secondary to-secondary-dark p-10 min-h-screen">
      <div className="text-primary-light bg-secondary-light rounded-2xl w-[70%] mx-auto text-center p-6 lg:w-[50%]">
        <h1 className="text-3xl font-bold mb-3">Create Account</h1>
        <p className="mb-5">
          Join our platform to start booking or providing services
        </p>
        <form onSubmit={handleSignup} className="p-2 text-left ">
          <span className="font-bold block">Full Name</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your full names"
            className="block p-2 border border-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary mb-2 rounded w-full"
            required
          />
          <span className="font-bold block">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            className="block p-2 border border-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary mb-2 rounded w-full"
            required
          />
          <span className="font-bold block">I want to:</span>
          <div>
            <label>
              <input
                type="radio"
                name="role"
                value="customer"
                checked={role === "customer"}
                onChange={(event) => setRole(event.target.value)}
                required
              />
              Book Services (Customer)
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="role"
                value="provider"
                checked={role === "provider"}
                onChange={(event) => setRole(event.target.value)}
                required
              />
              Provide Services (Service provider)
            </label>
          </div>
          <span className="font-bold block">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            className="block p-2 border border-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary mb-2 rounded w-full"
            required
          />
          <span className="font-bold block">Confirm Password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="block p-2 border border-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary mb-2 rounded w-full"
            required
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
