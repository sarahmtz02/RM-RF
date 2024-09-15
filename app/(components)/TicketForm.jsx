"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = () => {
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const startingTicketData = {
    id: 1,
    description: "",
    estatus: "NO REVISADO",
    valor: true,
    sector_de_fuga: 5,
  };

  const [formData, setFormData] = useState(startingTicketData);

  return (
    <div className="flex justify-center">
      <form>
        <h3>Update Your Ticket</h3>
        <label>ID</label>
        <label>Description</label>
        <input
          id="description"
          name="description"
          type="text"
          onChange={handleChange}
          required={false}
          value={formData.description}
        />
      </form>
    </div>
  );
};

export default editTicketForm;
