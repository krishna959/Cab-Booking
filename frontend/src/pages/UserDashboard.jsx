import { useState, useEffect } from "react";
import BookRide from "../components/BookRide";
import UserRideHistory from "../components/UserRideHistory";
import { getUserHistory, getRideDetails } from "../api/rideService";

function UserDashboard() {
  const [activeTab, setActiveTab] = useState("book");
  const [ride, setRide] = useState(null);

  useEffect(() => {

  const fetchRideDetails = async () => {

    try {

      const history = await getUserHistory();

      if (history.data.length === 0) {
        setRide(null);
        return;
      }

      // Find active ride first
      let activeRide =
        history.data.find((r) => r.status === "accepted") ||
        history.data.find((r) => r.status === "pending") ||
        history.data[0];

      const response = await getRideDetails(activeRide.id);

      setRide(response.data);

    } catch (err) {
      console.error("Failed to fetch ride details:", err);
    }

  };

  fetchRideDetails();
  const interval = setInterval(fetchRideDetails, 5000);

  return () => clearInterval(interval);

}, []);
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        🚖 User Dashboard
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("book")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "book"
              ? "bg-indigo-600 text-white"
              : "bg-white border"
          }`}
        >
          Book Ride
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "history"
              ? "bg-indigo-600 text-white"
              : "bg-white border"
          }`}
        >
          Ride History
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        {activeTab === "book" && <BookRide />}
        {activeTab === "history" && <UserRideHistory />}
      </div>

      {ride && (
        <div style={{ marginTop: "20px" }}>
          <h3>Ride Status: {ride.status}</h3>

          {ride.status === "accepted" && ride.driver && (
            <div>
              <h4>Driver Assigned</h4>
              <p>Name: {ride.driver.name}</p>
              <p>Phone: {ride.driver.phone}</p>
              <p>Vehicle Number: {ride.driver.vehicle_number}</p>
              <p>Vehicle Type: {ride.driver.vehicle_type}</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default UserDashboard;