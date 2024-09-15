const ProgressBar = ({ estatus }) => {
  // Determine width and color based on the status
  const getProgressStyle = (estatus) => {
    switch (estatus.toLowerCase()) {
      case "no revisado":
        return { width: "25%", bgColor: "bg-red-500" }; // Red for No Revisado
      case "asignado":
        return { width: "65%", bgColor: "bg-orange-500" }; // Orange for Asignado
      case "cerrado":
        return { width: "100%", bgColor: "bg-green-500" }; // Green for Cerrado
      default:
        return { width: "0%", bgColor: "bg-gray-300" }; // Default if status is unknown
    }
  };

  const { width, bgColor } = getProgressStyle(estatus);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className={`${bgColor} h-2.5 rounded-full`} style={{ width }}></div>
    </div>
  );
};

export default ProgressBar;
