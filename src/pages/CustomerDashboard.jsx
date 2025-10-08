import React from "react";
import Header from "../components/Header";
import Home from "./Home";

const CustomerDashboard = () => {
  return (
    <div className="bg-secondary-light">
      <Header buttonLink="/customer-bookings" buttonText="My Bookings" />

      <div className="min-h-screen p-4 bg-secondary-light">
        <Home />
      </div>
    </div>
  );
};

export default CustomerDashboard;
