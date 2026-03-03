import { useEffect, useState } from "react";
import { getPendingRides, acceptRide } from "../api/rideService";

function PendingRides() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      const response = await getPendingRides();
      setRides(response.data);
    };
    fetchRides();
  }, []);

  const fetchRides = async () => {
    const response = await getPendingRides();
    setRides(response.data);
  };

  const handleAccept = async (id) => {
    await acceptRide(id);
    fetchRides();
  };

  return (
    <div className="bg-white/70 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-emerald-700">
        🚖 Pending Rides
      </h2>

      {rides.length === 0 ? (
        <p>No pending rides</p>
      ) : (
        rides.map((ride) => (
          <div key={ride.id} className="border-b py-2 flex justify-between">
            <span>
              {ride.pickup_location} → {ride.drop_location}
            </span>

            <button
              onClick={() => handleAccept(ride.id)}
              className="bg-emerald-600 text-white px-3 py-1 rounded-lg"
            >
              Accept
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default PendingRides;