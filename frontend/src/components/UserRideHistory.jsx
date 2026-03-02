import { useEffect, useState } from "react";
import { getUserHistory } from "../services/rideService";

function UserRideHistory() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      const response = await getUserHistory();
      setRides(response.data);
    };

    fetchRides();
  }, []);

  return (
    <div className="bg-white/70 p-6 rounded-2xl shadow-lg mt-6">
      <h2 className="text-xl font-semibold mb-4 text-emerald-700">
        📜 Ride History
      </h2>

      {rides.length === 0 ? (
        <p>No rides yet</p>
      ) : (
        rides.map((ride) => (
          <div
            key={ride.id}
            className="border-b py-2 flex justify-between"
          >
            <span>
              {ride.pickup_location} → {ride.drop_location}
            </span>
            <span className="font-semibold">{ride.status}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default UserRideHistory;