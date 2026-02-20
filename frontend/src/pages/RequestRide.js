import { useState } from "react";
import { requestRide } from "../api";

function RequestRide() {
  const [pickupLat, setPickupLat] = useState("");
  const [pickupLng, setPickupLng] = useState("");
  const [dropLat, setDropLat] = useState("");
  const [dropLng, setDropLng] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      pickup_lat: parseFloat(pickupLat),
      pickup_lng: parseFloat(pickupLng),
      drop_lat: parseFloat(dropLat),
      drop_lng: parseFloat(dropLng),
    };

    const res = await requestRide(data);
    setResult(res);
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="w-96 p-6 shadow">
        <h2 className="text-xl font-bold mb-4">Request a Ride</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            step="any"
            placeholder="Pickup Latitude"
            className="w-full border p-2 mb-3"
            value={pickupLat}
            onChange={(e) => setPickupLat(e.target.value)}
            required
          />

          <input
            type="number"
            step="any"
            placeholder="Pickup Longitude"
            className="w-full border p-2 mb-3"
            value={pickupLng}
            onChange={(e) => setPickupLng(e.target.value)}
            required
          />

          <input
            type="number"
            step="any"
            placeholder="Drop Latitude"
            className="w-full border p-2 mb-3"
            value={dropLat}
            onChange={(e) => setDropLat(e.target.value)}
            required
          />

          <input
            type="number"
            step="any"
            placeholder="Drop Longitude"
            className="w-full border p-2 mb-3"
            value={dropLng}
            onChange={(e) => setDropLng(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 text-white p-2">
            Request Ride
          </button>
        </form>

        {result && (
          <div className="mt-4 p-3 border">
            <p><strong>Ride ID:</strong> {result.id}</p>
            <p><strong>Status:</strong> {result.status}</p>
            <p><strong>Price:</strong> ₹{result.price}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestRide;
