import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase-client";
import { FaUser, FaLock, FaEye } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const [pswdVisibility, setPswdVisibilty] = useState("")
  const [confirmPswdVisibility, setConfirmPswdVisibilty] = useState("")

  const handlePswdVisibility = () =>{
    setPswdVisibilty(!pswdVisibility)
    
  }
  const handleConfirmPswdVisibility = () =>{
    
    setConfirmPswdVisibilty(!confirmPswdVisibility)
  }

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if password and confirm password are the same

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Create the user in Supabase Auth

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    // Store additional info in custom users table
    if (user) {
      const { error: insertError } = await supabase.from("profile").insert([
        {
          id: user.id,
          name,
          role,
          email,
        },
      ]);

      if (data.user) {
        const { data: profile } = await supabase
          .from("profile")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (profile?.role === "provider") {
          navigate("/provider-dashboard");
        } else {
          navigate("/customer-dashboard");
        }
      }

      if (insertError) {
        alert(insertError.message);
      } else {
        alert("Sign-up successful! Check your email for a confirmation link.");
        console.log("User signed in with role:", role);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary-dark via-secondary to-secondary-dark p-10 min-h-screen">
      <div className="text-primary-light bg-secondary-light rounded-2xl w-[70%] mx-auto text-center p-6 lg:w-[50%]">
        <h1 className="text-3xl font-bold mb-3">Create Account</h1>
        <p className="mb-5">
          Join our platform to start booking or providing services
        </p>
        <form
          onSubmit={handleSignup}
          autoComplete="off"
          className="p-2 text-left "
        >
          <span className="font-bold block">Full Name</span>
          <div className="flex items-center rounded-xl border border-secondary-dark p-2 mb-2 w-full">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full names"
              className="block outline-none flex-1"
              required
            />
          </div>

          <span className="font-bold block">Email</span>
          <div className="flex items-center rounded-xl border border-secondary-dark p-2 mb-2 w-full">
            <MdEmail className="text-gray-500 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              className="outline-none bg-transparent"
              required
            />
          </div>

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
          <div className="flex items-center rounded-xl border border-secondary-dark p-2 mb-2 w-full">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type={pswdVisibility ? "text" :"password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              className="bg-transparent outline-none flex-1"
              required
            />
            <FaEye onClick={handlePswdVisibility} className={pswdVisibility ? "text-secondary-dark" : "text-black"}/>
          </div>

          <span className="font-bold block">Confirm Password</span>
          <div className="flex items-center rounded-xl border border-secondary-dark p-2 mb-2 w-full">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type={confirmPswdVisibility ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Enter password"
              className="bg-transparent outline-none flex-1"
              required
            />
            <FaEye onClick={handleConfirmPswdVisibility} className={confirmPswdVisibility ? "text-secondary-dark" : "text-black"}/>
          </div>
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
