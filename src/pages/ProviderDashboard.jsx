import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { supabase } from "../supabase-client";
import { useNavigate } from "react-router-dom";

const ProviderDashboard = () => {
  const navigate = useNavigate();

  const [serviceList, setServiceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      // Get the current logged-in provider
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) throw userError;

      const user = userData.user;
      if (!user) throw new Error("You must be signed in to view your services");

      // Fetch services for that provider
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("provider_id", user.id);

      if (error) throw error;
      setServiceList(data || []);
    } catch (error) {
      setErrorMessage("Error fetching services", error.message);
      console.log("Error fetching services", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAvailability = (service) => {
    navigate(`/availability/${service.id}`, {state: {service}})
  };

  return (
    <div>
      <Header buttonLink="/create-service" buttonText="Create Service" />

      {isLoading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p className="text-red-500">Error fetching services...</p>
      ) : serviceList === 0 ? (
        <p>You haven't created any services yet</p>
      ) : (
        <div className="min-h-screen pt-30 p-4 bg-secondary-light ">
          <h1 className="font-extrabold my-6 text-3xl md:text-4xl">
            Your Services
          </h1>
          <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {serviceList.map((service) => (
              <div
                key={service.id}
                className="bg-gradient-to-tr from-primary via-black to-secondary-dark text-white p-4 rounded-xl"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {service.service_name}
                </h2>
                <p className="mb-1">{service.description}</p>
                <p className="text-sm">Duration: {service.duration} mins</p>
                <p className="text-sm mb-3">Price: ${service.price}</p>
                <button onClick={() => handleAvailability(service)} className="bg-secondary text-black font-semibold px-3 py-1 rounded hover:bg-secondary-dark">
                  Set Availability
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;
