import { useNavigate } from "react-router-dom";
import PendingRides from "../components/PendingRides";

function DriverDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-200 via-cyan-200 to-blue-200 p-8">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-emerald-900">
          Driver Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Logout
        </button>
      </div>

      <PendingRides />

    </div>
  );
}

export default DriverDashboard;