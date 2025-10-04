import React, { useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";

const Home = () => {
  const [serviceList, setServiceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("services").select("*");

      if (error) throw error;

      setServiceList(data || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error.message);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <section className="max-h-screen h-80 flex items-center justify-center text-white bg-gradient-to-br from-primary via-black to-secondary-dark p-10 rounded-xl shadow-xl">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Luxury Service Booking
          </h1>

          <p className="text-2xl text-gray-100">
            Book trusted services with ease
          </p>
        </div>
      </section>
      {isLoading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : serviceList.length === 0 ? (
        <p className="text-primary">No services available.</p>
      ) : (
        <section className="mt-4 p-2">

          <h2 className="font-extrabold my-6 text-3xl md:text-4xl">Browse Services</h2>

          <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {serviceList.map((service, id) => (
            <div
            key={service.id}
            className="relative bg-gradient-to-tr from-primary via-black to-secondary-dark text-white p-4 rounded-xl"
            >
              <span className="absolute right-3 top-2 font-semibold">${service.price}</span>
              <h3 className="font-bold text-2xl mb-2">{service.service_name}</h3>
              <p className="my-3">{service.description}</p>
              <span className="font-light text-gray-100 text-shadow-md flex gap-1 items-center"> <FaClock size={15} /> {service.duration} min.</span>
              <Link
                to="/service-detail"
                className="block text-primary-dark bg-secondary-light rounded-2xl text-center p-2 mt-2 font-bold w-2/3 mx-auto"
                >
                Book Now
              </Link>
            </div>
          ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
