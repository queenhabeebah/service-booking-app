import React, { useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import { Link, useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import HeroText from "../components/HeroText";

const Home = () => {
  const [serviceList, setServiceList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

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

  const handleBookNow = (service) => {
    navigate(`/service-booking/${service.id}`, { state: { service } });
  };

  return (
    <>
      <section className="max-h-screen h-80 flex items-center justify-center text-white bg-gradient-to-br from-primary via-black to-secondary-dark p-10 rounded-xl shadow-xl">
        <div className="text-center">
          <HeroText />
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
          <h2 className="font-extrabold my-6 text-3xl md:text-4xl">
            Browse Services
          </h2>

          <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {serviceList.map((service) => (
              <div key={service.id}>
                <div
                  key={service.id}
                  className="relative bg-gradient-to-tr from-primary via-black to-secondary-dark text-white p-4 rounded-xl"
                >
                  <span className="absolute right-3 top-2 font-semibold bg-primary rounded-lg py-1 px-2">
                    ${service.price}
                  </span>
                  <div className="">
                    <h3 className="font-bold text-2xl mb-2 mt-6">
                      {service.service_name}
                    </h3>
                    <p className="my-3">{service.description}</p>
                    <span className="font-light text-gray-100 text-shadow-md flex gap-1 items-center">
                      <FaClock size={15} /> {service.duration} min.
                    </span>
                <button
                  onClick={() => handleBookNow(service)}
                  className="block text-primary-dark bg-secondary-light rounded-2xl text-center p-2 mt-2 font-bold w-full mx-auto"
                >
                  Book Now
                </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
