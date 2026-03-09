import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

function MapClickHandler({ pickup, drop, setPickup, setDrop }) {
  useMapEvents({
    click(e) {
      if (!pickup) {
        setPickup(e.latlng);
      } else if (!drop) {
        setDrop(e.latlng);
      } else {
        setPickup(e.latlng);
        setDrop(null);
      }
    },
  });

  return null;
}

function RouteDrawer({ pickup, drop }) {
  const map = useMap();
  const [route, setRoute] = useState([]);

  useEffect(() => {
    if (!pickup || !drop) return;

    const fetchRoute = async () => {
      const url = `https://router.project-osrm.org/route/v1/driving/${pickup.lng},${pickup.lat};${drop.lng},${drop.lat}?overview=full&geometries=geojson`;

      const res = await fetch(url);
      const data = await res.json();

      const coords = data.routes[0].geometry.coordinates.map((c) => [
        c[1],
        c[0],
      ]);

      setRoute(coords);

      // Auto zoom to route
      map.fitBounds(coords);
    };

    fetchRoute();
  }, [pickup, drop, map]);

  if (!route.length) return null;

  return <Polyline positions={route} />;
}

function MapView({ setPickup, setDrop }) {
  const [pickup, setPickupLocal] = useState(null);
  const [drop, setDropLocal] = useState(null);

  const [pickupQuery, setPickupQuery] = useState("");
  const [dropQuery, setDropQuery] = useState("");

  const searchLocation = async (query, type) => {
    if (!query) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );

    const data = await res.json();

    if (!data.length) {
      alert("Location not found");
      return;
    }

    const lat = parseFloat(data[0].lat);
    const lng = parseFloat(data[0].lon);

    const coords = { lat, lng };

    if (type === "pickup") {
      setPickupLocal(coords);
      setPickup(coords);
    } else {
      setDropLocal(coords);
      setDrop(coords);
    }
  };

  return (
    <div>
      {/* Search Inputs */}
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search pickup"
          value={pickupQuery}
          onChange={(e) => setPickupQuery(e.target.value)}
        />

        <button onClick={() => searchLocation(pickupQuery, "pickup")}>
          Pickup
        </button>

        <input
          type="text"
          placeholder="Search drop"
          value={dropQuery}
          onChange={(e) => setDropQuery(e.target.value)}
        />

        <button onClick={() => searchLocation(dropQuery, "drop")}>
          Drop
        </button>
      </div>

      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={7}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Markers */}
        {pickup && <Marker position={[pickup.lat, pickup.lng]} />}
        {drop && <Marker position={[drop.lat, drop.lng]} />}

        {/* Click handler */}
        <MapClickHandler
          pickup={pickup}
          drop={drop}
          setPickup={(c) => {
            setPickupLocal(c);
            setPickup(c);
          }}
          setDrop={(c) => {
            setDropLocal(c);
            setDrop(c);
          }}
        />

        {/* Route line */}
        <RouteDrawer pickup={pickup} drop={drop} />
      </MapContainer>
    </div>
  );
}

export default MapView;