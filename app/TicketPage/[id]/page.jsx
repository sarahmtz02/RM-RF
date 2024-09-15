"use client"; // Ensure this component runs on the client

import { useEffect, useState } from "react";
import { obtenerDatosAPI } from "../../client/apiServices"; // Import your data fetching function

const TicketDetails = ({ params }) => {
  const { id } = params; // Get the ticket ID from the params

  const [ticket, setTicket] = useState(null);
  const [description, setDescription] = useState(""); // State for description
  const [status, setStatus] = useState(""); // State for status

  useEffect(() => {
    const fetchTicket = async () => {
      const tickets = await obtenerDatosAPI(); // Fetch all tickets
      const ticket = tickets.find((t) => t.id === parseInt(id)); // Find the ticket with the matching ID
      setTicket(ticket); // Set the state with the fetched ticket
      setDescription(ticket ? ticket.description || "" : ""); // Initialize description
      setStatus(ticket ? ticket.estatus : "NO REVISADO"); // Initialize status
    };

    if (id) {
      fetchTicket();
    }
  }, [id]);

  const handleSave = () => {
    // Save or update the ticket data here
    const updatedTicket = { ...ticket, description, estatus: status };
    console.log("Updated Ticket:", updatedTicket);
    // You can implement an API call to save changes here
  };

  if (!ticket) {
    return <div>Loading...</div>; // Display a loading state while fetching
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 text-default-text">
        Ticket Details for ID: {ticket.id}
      </h1>

      <div className="flex mt-5 mb-5 text-default-text">
        <p>
          <strong>Valor:</strong> {ticket.valor ? "Yes" : "No"}
        </p>
      </div>
      <div className="flex mt-5 mb-5 text-default-text">
        <p>
          <strong>Sector de Fuga:</strong> {ticket.sector_de_fuga}
        </p>
      </div>

      {/* Description input */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description:
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter ticket description"
        />
      </div>

      {/* Status dropdown */}
      <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status:
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="NO REVISADO">No Revisado</option>
          <option value="ASIGNADO">Asignado</option>
          <option value="CERRADO">Cerrado</option>
        </select>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        className="bg-nav hover:bg-blue-accent-hover text-white font-bold py-2 px-4 rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default TicketDetails;
