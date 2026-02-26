import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MapView from "./components/MapView";
import UserDashboard from "./pages/UserDashboard";
import DriverDashboard from "./pages/DriverDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register"element={<Register/>} />
        <Route path="/map" element={<MapView />} />
        <Route path="/user-dashboard" element={<UserDashboard/>} />
        <Route path="/driver-dashboard" element={<DriverDashboard/>} />    
      </Routes>
    </Router>
  );
}

export default App;