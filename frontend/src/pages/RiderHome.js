
import { useState } from "react";
import Header from "../Booking/Header";
import LocationSearch from "../Booking/LocationSearch";
import VehicleSelector from "../Booking/VehicleSelector";
import { createRide } from "../services/rideServices";

function RiderHome() {
  const [locations, setLocations] = useState({});
  const [vehicle, setVehicle] = useState(null);

  async function bookRide() {
    await createRide({
      pickup: locations.pickup,
      drop: locations.drop,
      vehicle_type: vehicle,
    });
  }

  return (
    <>
      <Header />
      <LocationSearch
        onChange={(type, value) =>
          setLocations((p) => ({ ...p, [type]: value }))
        }
      />
      <VehicleSelector selected={vehicle} onSelect={setVehicle} />

      <div className="p-4">
        <button
          onClick={bookRide}
          className="w-full bg-green-600 text-white p-3"
        >
          Book Ride
        </button>
      </div>
    </>
  );
}

export default RiderHome;
