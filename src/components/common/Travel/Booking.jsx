import React, { useState } from "react";

const Booking = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking submitted!");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Confirm Your Booking</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-card shadow rounded-2xl p-6 space-y-4"
      >
        <Input label="Full Name" />
        <Input label="Email" type="email" />
        <Input label="Phone Number" />

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;

const Input = ({ label, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      required
      className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
);
