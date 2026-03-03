import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

function ClickHandler({ setPickup, setDrop }) {
  const [pickup, setPickupLocal] = useState(null);
  const [drop, setDropLocal] = useState(null);

  useMapEvents({
    click(e) {
      if (!pickup) {
        setPickupLocal(e.latlng);
        setPickup(e.latlng);
        console.log("Pickup:", e.latlng);
      } else {
        setDropLocal(e.latlng);
        setDrop(e.latlng);
        console.log("Drop:", e.latlng);
      }
    },
  });

  return (
    <>
      {pickup && <Marker position={pickup} />}
      {drop && <Marker position={drop} />}
    </>
  );
}

function MapView({ setPickup, setDrop }) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler setPickup={setPickup} setDrop={setDrop} />
    </MapContainer>
  );
}

export default MapView;