import { useNavigate } from "react-router-dom";
import BookRide from "../components/BookRide";
import UserRideHistory from "../components/UserRideHistory";

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

      <div className="grid md:grid-cols-2 gap-6">
        <BookRide />
        <UserRideHistory />
      </div>

    </div>
  );
}

export default UserDashboard;