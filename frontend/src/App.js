import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequestRide from "./pages/RequestRide";
import DriverDashboard from "./pages/DriverDashboard";
import RiderHome from "./pages/RiderHome";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/rider-home" element={<RiderHome />} />
      <Route path="/request-ride" element={<RequestRide />} />
      <Route path="/driver" element={<DriverDashboard />} />

      <Route path="/" element={<h1 className="p-6">Home</h1>} />
      
    </Routes>
  );
}

export default App;
