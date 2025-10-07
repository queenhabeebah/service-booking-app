import React, { useState } from "react";
import { supabase } from "../supabase-client";
import { data } from "react-router-dom";

const CreateService = () => {
  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [serviceDuration, setServiceDuration] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Get current logged in provider
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) throw userError;

      const user = userData.user;

      if (!user)
        throw new Error(
          "You must be signed in as a provider to create a service"
        );

        // Insert service
      const { data, error } = await supabase
        .from("services")
        .insert([
          {
            provider_id: user.id, // Link the seervice to provider
            service_name: serviceName,
            description: serviceDesc,
            duration: serviceDuration,
            price: servicePrice,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setMessage("Service created successfully")

      console.log("New service:", data);

      // Reset form
      setServiceName("");
      setServiceDesc("");
      setServiceDuration("");
      setServicePrice("");
    } catch (error) {
      console.error("Error creating service:", error.message);
    }

  };

  return (
    <div className="bg-gradient-to-br from-primary-dark via-secondary to-secondary-dark p-10 min-h-screen">
      <div className="text-primary-light bg-secondary-light rounded-2xl w-[70%] mx-auto text-center p-6 lg:w-[50%]">
        <h1 className="text-3xl font-bold mb-3">Create A Service</h1>

        <form onSubmit={handleSubmit} className="p-2 text-left ">
          <span className="font-bold block">Service</span>
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder={"What service are you providing?"}
            className="block p-2 border border-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary mb-2 rounded w-full"
          />
          <span className="font-bold block">Description</span>
          <textarea
            type="text"
            value={serviceDesc}
            onChange={(e) => setServiceDesc(e.target.value)}
            placeholder={"Describe your service..."}
            className="block p-2 border border-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary mb-2 rounded w-full"
          />

          <span className="font-bold block">Duration</span>
          <input
            type="text"
            value={serviceDuration}
            onChange={(e) => setServiceDuration(e.target.value)}
            placeholder="Duration in minutes"
            className="block p-2 border border-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary mb-2 rounded w-full"
          />
          <span className="font-bold block">Price</span>
          <input
            type="number"
            value={servicePrice}
            onChange={(e) => setServicePrice(e.target.value)}
            placeholder="Price in USD"
            className="block p-2 border border-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary mb-2 rounded w-full"
          />

          <button
            type="submit"
            className="block mt-4 p-2 border-white mb-2 rounded w-full bg-primary text-secondary font-bold"
          >
            Create Service
          </button>
        </form>
        {message && <p className="mt-3 font-semibold">{message}</p>}
      </div>
    </div>
  );
};

export default CreateService;
