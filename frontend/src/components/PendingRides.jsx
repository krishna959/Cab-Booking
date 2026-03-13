import { useEffect, useState } from "react";
import {getPendingRides,getDriverHistory,acceptRide,completeRide}from "../api/rideService";

function PendingRides() {

  const [pendingRides, setPendingRides] = useState([]);
  const [acceptedRides, setAcceptedRides] = useState([]);

  const fetchRides = async () => {
    try {
      const pending = await getPendingRides();
      const accepted = await getDriverHistory();

      setPendingRides(pending.data);
      setAcceptedRides(accepted.data);
    } catch (err) {
      console.error("Failed to fetch rides:", err);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchRides();
    })();
  }, []);

  const handleAccept = async (id) => {
    await acceptRide(id);
    fetchRides();
  };

  const handleComplete = async (id) => {
    await completeRide(id);
    fetchRides();
  };

  return (
    <div className="bg-white/70 p-6 rounded-2xl shadow-lg">

      {/* Pending rides */}
      <h2 className="text-xl font-semibold mb-4 text-emerald-700">
        🚖 Pending Rides
      </h2>

      {pendingRides.length === 0 ? (
        <p className="text-gray-500">No pending rides</p>
      ) : (
        pendingRides.map((ride) => (
          <div
            key={ride.id}
            className="border-b py-3 flex justify-between items-center"
          >
            <span>
              {ride.pickup_location} → {ride.drop_location}
            </span>

            <button
              onClick={() => handleAccept(ride.id)}
              className="bg-emerald-600 text-white px-4 py-1 rounded-lg hover:bg-emerald-700"
            >
              Accept
            </button>
          </div>
        ))
      )}

      {/* Accepted rides */}

      <h2 className="text-xl font-semibold mt-8 mb-4 text-indigo-700">
        🚗 Accepted Ride
      </h2>

      {acceptedRides.length === 0 ? (
        <p className="text-gray-500">No active ride</p>
      ) : (
        acceptedRides.map((ride) => (
          <div key={ride.id} className="border-b py-4">

            <p className="font-medium">
              {ride.pickup_location} → {ride.drop_location}
            </p>

            {ride.user && (
              <div className="bg-gray-100 p-3 rounded-lg mt-2">
                <h4 className="font-semibold text-gray-700">
                  User Details
                </h4>
                <p>Name: {ride.user.name}</p>
                <p>Phone: {ride.user.phone}</p>
              </div>
            )}

            {ride.status === "accepted" && (
              <button
                onClick={() => handleComplete(ride.id)}
                className="bg-indigo-600 text-white px-4 py-1 rounded-lg mt-3 hover:bg-indigo-700"
              >
                Complete Ride
              </button>
            )}
          </div>
        ))
      )}

    </div>
  );
}

export default PendingRides;