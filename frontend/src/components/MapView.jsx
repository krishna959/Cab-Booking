import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

function SearchBox({ setPickup }) {
  const [query, setQuery] = useState("");
  const map = useMap();

  const handleSearch = async () => {
    if (!query) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );

    const data = await res.json();

    if (data.length === 0) {
      alert("Location not found");
      return;
    }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    map.setView([lat, lon], 13);

    setPickup({ lat, lng: lon });
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "6px", width: "200px" }}
      />

      <button onClick={handleSearch} style={{ marginLeft: "8px" }}>
        Search
      </button>
    </div>
  );
}

function MapView({ setPickup }) {
  const [pickup, setPickupLocal] = useState(null);

  return (
    <>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <SearchBox
          setPickup={(coords) => {
            setPickupLocal(coords);
            setPickup(coords);
          }}
        />

        {pickup && <Marker position={[pickup.lat, pickup.lng]} />}
      </MapContainer>
    </>
  );
}

export default MapView;