const vehicles = [
  { type: "BIKE", label: "Bike" },
  { type: "AUTO", label: "Auto" },
  { type: "TAXI", label: "Taxi" },
  { type: "SEDAN", label: "Sedan" },
  { type: "SUV", label: "SUV" },
];

function VehicleSelector({ selected, onSelect }) {
  return (
    <div className="flex justify-around p-4">
      {vehicles.map((v) => (
        <button
          key={v.type}
          className={`p-2 border ${
            selected === v.type ? "bg-black text-white" : ""
          }`}
          onClick={() => onSelect(v.type)}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}

export default VehicleSelector;
