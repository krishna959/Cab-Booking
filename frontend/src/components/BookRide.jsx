import { useState } from "react";
import { createRide } from "../services/rideService";

function BookRide() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createRide({
        pickup_location: pickup,
        drop_location: drop,
      });

      alert("Ride booked successfully!");
      setPickup("");
      setDrop("");
    } catch {
      alert("Error booking ride");
    }
  };

  return (
    <div className="bg-white/70 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">
        🚕 Book a Ride
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="w-full p-2 rounded-lg border"
          required
        />

        <input
          type="text"
          placeholder="Drop Location"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
          className="w-full p-2 rounded-lg border"
          required
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Book Ride
        </button>
      </form>
    </div>
  );
}

export default BookRide;