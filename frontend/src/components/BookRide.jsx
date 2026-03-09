import { useState } from "react";
import { createRide } from "../api/rideService";
import MapView from "./MapView";

function BookRide() {
  const [mode, setMode] = useState("manual");

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let pickupLocation = "";
    let dropLocation = "";

    if (mode === "manual") {
      if (!pickup || !drop) {
        alert("Enter pickup and drop location");
        return;
      }
      pickupLocation = pickup;
      dropLocation = drop;
    } else {
      if (!pickupCoords || !dropCoords) {
        alert("Select pickup and drop on map");
        return;
      }
      pickupLocation = `${pickupCoords.lat}, ${pickupCoords.lng}`;
      dropLocation = `${dropCoords.lat}, ${dropCoords.lng}`;
    }

    try {
      await createRide({
        pickup_location: pickupLocation,
        drop_location: dropLocation,
      });

      alert("Ride booked successfully!");

      setPickup("");
      setDrop("");
      setPickupCoords(null);
      setDropCoords(null);

    } catch {
      alert("Error booking ride");
    }
  };

  return (
    <div className="bg-white/70 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">
        🚕 Book Ride
      </h2>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setMode("manual")}
          className={`px-4 py-2 rounded-lg ${
            mode === "manual"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Manual
        </button>

        <button
          onClick={() => setMode("map")}
          className={`px-4 py-2 rounded-lg ${
            mode === "map"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Map
        </button>
      </div>

      {/* Manual Mode */}
      {mode === "manual" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Pickup Location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full p-2 rounded-lg border"
          />

          <input
            type="text"
            placeholder="Drop Location"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            className="w-full p-2 rounded-lg border"
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Book Ride
          </button>
        </form>
      )}

      {/* Map Mode */}
      {mode === "map" && (
        <>
          <MapView
            setPickup={setPickupCoords}
            setDrop={setDropCoords}
          />

          <button
            onClick={handleSubmit}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Confirm Ride
          </button>
        </>
      )}
    </div>
  );
}

export default BookRide;