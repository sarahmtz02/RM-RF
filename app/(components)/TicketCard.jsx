import DeleteBlock from "./DeleteBlock";
import PriorityDisplay from "./PriorityDisplay";
import ProgressBar from "./ProgressBar";
import StatusDisplay from "./StatusDisplay";

// Actualizamos el componente para aceptar props
const TicketCard = ({ id, valor, sector, estatus }) => {
  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
      <div className="flex mb-3">
        <PriorityDisplay priority={valor} />{" "}
        {/* Usamos valor para el componente Priority */}
        <div className="ml-auto">
          <DeleteBlock />
        </div>
      </div>
      <h4>Ticket ID: {id}</h4> {/* Mostramos el ID del ticket */}
      <hr className="h-px border-0 bg-page mb-2" />
      <p className="whitespace-pre-wrap">
        Sector de Fuga: {sector} {/* Mostramos el sector */}
      </p>
      <p className="whitespace-pre-wrap">
        Estatus: {estatus} {/* Mostramos el estatus */}
      </p>
      <div className="flex-grow"></div>
      <div className="flex mt-2">
        <div className="flex flex-col">
          <p className="text-xs my-1">08/31/23 10:40PM</p>
          <ProgressBar estatus={estatus} />
        </div>
        <div className="ml-auto flex items-end">
          <StatusDisplay estatus={estatus} />{" "}
          {/* Usamos estatus para el StatusDisplay */}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
