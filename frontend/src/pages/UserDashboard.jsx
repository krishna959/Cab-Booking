import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-indigo-900">
          User Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Book Ride */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4">
            🚕 Book a Ride
          </h2>
          <p className="text-gray-600 mb-4">
            Request a cab instantly and travel comfortably.
          </p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            Book Now
          </button>
        </div>

        {/* Ride History */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold text-emerald-700 mb-4">
            📜 Ride History
          </h2>
          <p className="text-gray-600 mb-4">
            View your previous rides and payments.
          </p>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
            View History
          </button>
        </div>

        {/* Profile */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold text-cyan-700 mb-4">
            👤 Profile
          </h2>
          <p className="text-gray-600 mb-4">
            Manage your account details.
          </p>
          <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition">
            Manage Profile
          </button>
        </div>

      </div>
    </div>
  );
}

export default UserDashboard;