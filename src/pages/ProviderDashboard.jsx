import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { supabase } from "../supabase-client";

const ProviderDashboard = () => {
  const [serviceList, setServiceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchServices = async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("provider_id");

    if (error) throw error;
    setServiceList(data || []);
    setIsLoading(false);

    setErrorMessage("Error fetching services", error.message);
    console.log("Error fetching services", error.message);
  };

  useEffect(() => {
    fetchServices;
  }, []);

  return (
    <div>
      <Header buttonLink="/create-service" buttonText="Create Service" />

        {isLoading ? (
          <p>Loading...</p>
        ) : errorMessage ? (
          <p>Error fetching services...</p>
          
        ): serviceList === 0 ? (
          <p>You do not have any bookings</p>

        ) : (
      <div className="min-h-screen p-4 bg-secondary-light">
        <h1>Your Bookings</h1>
        {serviceList.map((service) => (
          <div key={service._id}>
<h2>{service.service_name}</h2>
          </div>
        ))}

      </div>
        )}
    </div>
  );
};

export default ProviderDashboard;
