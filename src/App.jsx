import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import CreateService from "./pages/CreateService";
import ProviderDashboard from "./pages/ProviderDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import ServiceBooking from "./pages/ServiceBooking";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/create-service" element={<CreateService />} />
      <Route path="/service-booking/:id" element={<ServiceBooking />} />
    </Routes>
  );
};

export default App;
