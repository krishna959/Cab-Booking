import { useState } from "react";
import BookRide from "../components/BookRide";
import UserRideHistory from "../components/UserRideHistory";

function UserDashboard() {
  const [activeTab, setActiveTab] = useState("book");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        🚖 User Dashboard
      </h1>

      {/* Navigation Tabs */}
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

      {/* Content */}
      <div className="bg-white p-6 rounded-xl shadow">
        {activeTab === "book" && <BookRide />}
        {activeTab === "history" && <UserRideHistory />}
      </div>

    </div>
  );
}

export default UserDashboard;