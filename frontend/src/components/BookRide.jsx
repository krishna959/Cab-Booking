import { useState } from "react";
import { createRide } from "../api/rideService";
import MapView from "./MapView";

function BookRide() {

  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);

  const [selectedCar, setSelectedCar] = useState(null);
  const [distance, setDistance] = useState(0);

  const carTypes = [
    { type: "BIKE", price: 5 },
    { type: "SEDAN", price: 10 },
    { type: "SUV", price: 15 },
    { type: "PRIME", price: 20 },
  ];

  // Haversine distance calculation
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(2);
  };

  const updateDistance = (pickup, drop) => {
    if (pickup && drop) {
      const dist = calculateDistance(
        pickup.lat,
        pickup.lng,
        drop.lat,
        drop.lng
      );
      setDistance(dist);
    }
  };

  const handleSubmit = async () => {

    if (!pickupCoords || !dropCoords) {
      alert("Select pickup and drop location");
      return;
    }

    if (!selectedCar) {
      alert("Select a vehicle type");
      return;
    }

    try {
      await createRide({
        pickup_location: `${pickupCoords.lat}, ${pickupCoords.lng}`,
        drop_location: `${dropCoords.lat}, ${dropCoords.lng}`,
        vehicle_type: selectedCar,
        distance: distance
      });

      alert("Ride booked successfully!");

      setPickupCoords(null);
      setDropCoords(null);
      setSelectedCar(null);
      setDistance(0);

    } catch {
      alert("Error booking ride");
    }
  };

  return (
    <div className="bg-white/70 p-6 rounded-2xl shadow-lg">

      <h2 className="text-xl font-semibold mb-4 text-indigo-700">
        🚕 Book Ride
      </h2>

      <MapView
        setPickup={(coords) => {
          setPickupCoords(coords);
          updateDistance(coords, dropCoords);
        }}
        setDrop={(coords) => {
          setDropCoords(coords);
          updateDistance(pickupCoords, coords);
        }}
      />

      {/* Distance */}
      {distance > 0 && (
        <p className="mt-4 text-lg font-medium">
          Distance: {distance} km
        </p>
      )}

      {/* Car Selection */}
      {distance > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4">

          {carTypes.map((car) => {

            const fare = (distance * car.price).toFixed(0);

            return (
              <div
                key={car.type}
                onClick={() => setSelectedCar(car.type)}
                className={`p-4 rounded-xl cursor-pointer border
                ${
                  selectedCar === car.type
                    ? "border-indigo-600 bg-indigo-100"
                    : "border-gray-300"
                }`}
              >
                <h3 className="font-semibold">{car.type}</h3>
                <p>₹{fare}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirm button */}

      {selectedCar && (
        <button
          onClick={handleSubmit}
          className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Confirm Ride
        </button>
      )}

    </div>
  );
}

export default BookRide;