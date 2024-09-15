"use client";

import { useState, useEffect } from "react";
import TicketCard from "../(components)/TicketCard";
import { obtenerDatosAPI } from "../client/apiServices"; // Import the API function

// Llamamos a la función para obtener los datos

const Tickets = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const datos = await obtenerDatosAPI();
      setData(datos);

      console.log("funcion", datos);
    };

    fetchData();
  }, []);

  return (
    <div className="p-5">
      <div className="lg:grid grid-cols-2 xl:grid-cols-2">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((ticket) => (
            <TicketCard
              key={ticket.id}
              id={ticket.id}
              valor={ticket.valor}
              sector={ticket.sector_de_fuga}
              estatus={ticket.estatus}
            />
          ))
        ) : (
          <p>No tickets available.</p> // Mensaje si no hay tickets
        )}
      </div>
    </div>
  );
};

export default Tickets;
