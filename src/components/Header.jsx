import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ buttonText, buttonLink, profilePage }) => {
  return (
    <header className="fixed z-1000 h-23 min-w-full container p-6 shadow-xl bg-primary-dark text-secondary">
      <nav className="flex items-center justify-between">
        <Link to="/" className="font-extrabold tracking-tight">EasyBook</Link>
        <div className="flex items-center gap-6">
          <Link
            to={buttonLink}
            className="bg-secondary hover:bg-secondary-dark text-black rounded-xl py-2 px-3 font-bold"
          >
            {buttonText}
          </Link>
          <Link to={profilePage}>
          <FaUser size={30} className="text-primary bg-secondary-dark p-1 h-10 w-10 rounded-[50%]"/>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
