import { useState } from "react";
import { supabase } from "../supabase-client";
import { useLocation, useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import Header from "../components/Header";

const ServiceBooking = () => {
  const location = useLocation();
  const service = location.state?.service;

  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) throw userError;

      const user = userData.user;

      if (!user) {
        alert("You must sign up or sign in to book a service");
        navigate("/signin");
      }

      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            customer_id: user.id,
            service_id: service.id,
            booking_date: bookDate,
            booking_time: bookTime,
            status: "pending",
          },
        ])
        .select()
        .single();

      if (error) throw error;
      console.log("Booking successful:", data);

      setMessage("🎉 You have successfully booked this service");
      setBookDate("");
      setBookTime("");
    } catch (error) {
      alert("Error:" + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-light ">
      <Header
        buttonText={"Manage Your Bookings"}
        buttonLink={"/customer-dashboard"}
      />
      <h1 className="font-bold p-4 text-3xl">Book {service?.service_name}</h1>
      <div className="px-4 max-w-4/5 mx-auto md:flex md:justify-between md:items-center md:gap-5 md:max-w-full">
        <div className="relative bg-gradient-to-tr from-primary via-black to-secondary-dark text-white p-4 rounded-xl my-6 md:w-1/2 md:mr-4">
          <span className="absolute right-3 top-2 font-semibold bg-primary rounded-lg py-1 px-2">
            ${service?.price}
          </span>

          <h3 className="font-bold text-2xl mb-2 mt-6">
            {service?.service_name}
          </h3>
          <p className="my-3">{service?.description}</p>
          <span className="font-light text-gray-100 text-shadow-md flex gap-1 items-center">
            <FaClock size={15} /> {service?.duration} min.
          </span>
        </div>

        <form onSubmit={handleBooking} className="md:w-1/2">
          <label className="block mb-1">Select Date</label>
          <input
            type="date"
            value={bookDate}
            onChange={(event) => setBookDate(event.target.value)}
            required
            className="border rounded p-2 w-full"
          />
{bookDate && (
    <>
    <label className="block mb-1">Select Time</label>
          <input
            type="time"
            value={bookTime}
            onChange={(event) => setBookTime(event.target.value)}
            required
            className="border rounded p-2 w-full mb-4 focus:ring-2 focus:ring-primary"
            />
            </>
        )}

          <button
            type="submit"
            className="bg-primary text-white text-xl w-full mx-auto font-semibold p-2 my-3 rounded-xl hover:bg-secondary-dark"
          >
            Confirm Booking
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default ServiceBooking;
