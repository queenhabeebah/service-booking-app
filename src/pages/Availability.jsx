import React, { useState } from "react";
import { supabase } from "../supabase-client";
import { useLocation } from "react-router-dom";

const Availability = () => {
  const location = useLocation();
  const service = location.state?.service;

  const [availableDate, setAvailableDate] = useState("");
  const [availableStartTime, setAvailableStartTime] = useState("");
  const [availableEndTime, setAvailableEndTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [message, setMessage] = useState("");

  const handleAvailability = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { userData, userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const user = userData.user;
      if (!user) {
        alert("You must be logged in as a provider to create availability");
      }

      const { data, error } = await supabase
        .from("availability")
        .insert([
          {
            service_id: service.id,
            provider_id: user.id,
            available_date: availableDate,
            start_time: availableStartTime,
            end_time: availableEndTime,
            is_booked: isBooked,
          },
        ])
        .select()
        .single();
      if (error) throw error;
      alert("Availability updated:" + data);
    } catch (error) {
      alert("Error updating availability" + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleAvailability} className="md:w-1/2">
        <label className="block mb-1 font-semibold">Select Date</label>
        <input
          type="date"
          value={availableDate}
          onChange={(event) => setAvailableDate(event.target.value)}
          required
          className="border rounded p-2 w-full"
        />
        {availableDate && (
          <>
            <label className="block mb-1 font-semibold">
              Select Start Time
            </label>
            <input
              type="time"
              value={availableStartTime}
              onChange={(event) => setAvailableStartTime(event.target.value)}
              required
              className="border rounded p-2 w-full mb-4 focus:ring-2 focus:ring-primary"
            />
            <label className="block mb-1 font-semibold">
              Select End Time
            </label>
            <input
              type="time"
              value={availableEndTime}
              onChange={(event) => setAvailableEndTime(event.target.value)}
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
  );
};

export default Availability;
