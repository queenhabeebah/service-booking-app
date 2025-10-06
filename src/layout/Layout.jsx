import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header buttonLink="/signup" buttonText="Get Started"/>
      <main className="min-h-screen p-4 bg-secondary-light">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
