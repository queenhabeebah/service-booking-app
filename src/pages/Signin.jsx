import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { supabase } from "../supabase-client";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visibility, setVisibilty] = useState(null);

  const navigate = useNavigate();

  const handleVisibility = () => {
    setVisibilty(!visibility);
  };

  const handleSignin = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    }

    const user = data.user;

    if (user) {
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
  };

  return (
    <div className="bg-gradient-to-br from-primary-dark via-secondary to-secondary-dark p-10 min-h-screen">
      <div className="text-primary-light bg-secondary-light rounded-2xl w-[70%] mx-auto text-center p-6 lg:w-[50%]">
        <h1 className="text-3xl font-bold mb-3">Welcome Back</h1>
        <p className="mb-5">Sign in to your account to continue</p>
        <form action="" onSubmit={handleSignin} className="p-2 text-left ">
          <span className="font-bold block">Email</span>
          <div className="flex items-center rounded-xl border border-secondary-dark p-2 mb-2 w-full">
            <MdEmail className="text-gray-500 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              className=" flex-1 outline-none bg-transparent"
              required
            />
          </div>

          <span className="font-bold block">Password</span>
          <div className="flex items-center rounded-xl border border-secondary-dark p-2 mb-2 w-full">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type={visibility ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              className="bg-transparent outline-none flex-1"
              required
            />
            <FaEye
              onClick={handleVisibility}
              className={visibility ? "text-secondary-dark" : "text-black"}
            />
          </div>

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
