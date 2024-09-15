const StatusDisplay = ({ estatus }) => {
  // Define a color based on the status
  const getStatusColor = (estatus) => {
    switch (estatus.toLowerCase()) {
      case "asignado":
        return "bg-orange-300 text-orange-800";
      case "no revisado":
        return "bg-red-300 text-red-800";
      case "cerrado":
        return "bg-green-300 text-green-800";
      default:
        return "bg-gray-300 text-gray-800"; // Fallback for any unknown status
    }
  };

  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
        estatus
      )}`}
    >
      {estatus.toUpperCase()}
    </span>
  );
};

export default StatusDisplay;
