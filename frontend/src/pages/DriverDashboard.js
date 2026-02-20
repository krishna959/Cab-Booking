import { useEffect, useRef, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;
const WS_URL = process.env.REACT_APP_WS_URL || "ws://localhost:8000";

function DriverDashboard() {
  const [available, setAvailable] = useState(false);
  const [message, setMessage] = useState("");
  const wsRef = useRef(null);

  // DRIVER AVAILABILITY
  async function updateAvailability(status) {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login as driver");
      return;
    }

    const res = await fetch(`${API_URL}/drivers/availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ is_available: status }),
    });

    const data = await res.json();

    if (res.ok) {
      setAvailable(data.available);
      setMessage(data.available ? "You are ONLINE" : "You are OFFLINE");

      // connect / disconnect websocket
      if (data.available) {
        connectWebSocket();
      } else {
        disconnectWebSocket();
      }
    } else {
      setMessage(data.detail || "Error updating status");
    }
  }

  // WEBSOCKET LOGIC
  function connectWebSocket() {
    const rideId = localStorage.getItem("activeRideId");
    if (!rideId) return;

    wsRef.current = new WebSocket(`${WS_URL}/ws/ride/${rideId}`);

    wsRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    wsRef.current.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket disconnected");
    };
  }

  function disconnectWebSocket() {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }

  // SEND LIVE LOCATION
  useEffect(() => {
    if (!available || !wsRef.current) return;

    let lat = 12.9716;
    let lng = 77.5946;

    const interval = setInterval(() => {
      lat += 0.0001;
      lng += 0.0001;

      if (wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            latitude: lat,
            longitude: lng,
          })
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [available]);

  return (
    <div className="flex justify-center mt-10">
      <div className="w-96 p-6 shadow">
        <h2 className="text-xl font-bold mb-4">
          Driver Dashboard
        </h2>

        <p className="mb-4">
          Status:{" "}
          <strong>
            {available ? "ONLINE" : "OFFLINE"}
          </strong>
        </p>

        <button
          onClick={() => updateAvailability(!available)}
          className={`w-full p-2 text-white ${
            available ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {available ? "Go Offline" : "Go Online"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default DriverDashboard;
