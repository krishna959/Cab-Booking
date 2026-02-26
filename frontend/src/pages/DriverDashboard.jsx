import { useNavigate } from "react-router-dom";

function DriverDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-200 via-cyan-200 to-blue-200 p-8">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-emerald-900">
          Driver Dashboard
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

        {/* New Ride */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold text-emerald-700 mb-4">
            🚖 New Ride Requests
          </h2>
          <p className="text-gray-600 mb-4">
            Accept or reject incoming ride requests.
          </p>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
            View Requests
          </button>
        </div>

        {/* Earnings */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold text-amber-700 mb-4">
            💰 Earnings
          </h2>
          <p className="text-gray-600 mb-4">
            Track your daily and monthly earnings.
          </p>
          <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition">
            View Earnings
          </button>
        </div>

        {/* Availability */}
        <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">
            🟢 Availability
          </h2>
          <p className="text-gray-600 mb-4">
            Toggle your availability status.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Go Online
          </button>
        </div>

      </div>
    </div>
  );
}

export default DriverDashboard;