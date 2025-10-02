import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen p-4 bg-secondary text-black">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
