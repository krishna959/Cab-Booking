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
    <div className="min-h-screen bg-[#102C26]">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-white">
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