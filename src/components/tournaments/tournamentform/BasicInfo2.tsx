import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Fix leaflet's default icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

function LocationMarker({ position, onPositionChange }) {
  useMapEvents({
    click(e) {
      onPositionChange([e.latlng.lat, e.latlng.lng]);
    },
  });

  if (!position) return null;

  return <Marker position={position} />;
}

export default function SimpleMap({ formData, onLocationSelect }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [markerPos, setMarkerPos] = useState([
    formData.locationCoords[0],
    formData.locationCoords[1],
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  // When formData.locationCoords changes externally, update markerPos
  useEffect(() => {
    if (
      Array.isArray(formData.locationCoords) &&
      formData.locationCoords.length === 2 &&
      (formData.locationCoords[0] !== markerPos[0] ||
        formData.locationCoords[1] !== markerPos[1])
    ) {
      setMarkerPos(formData.locationCoords);
    }
  }, [formData.locationCoords]);

  // Fetch autocomplete suggestions
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&addressdetails=1&limit=5`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle input change for search box
  const onChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    fetchSuggestions(val);
    setShowSuggestions(true);
  };

  // Handle suggestion selection
  const onSuggestionClick = (suggestion) => {
    const lat = parseFloat(suggestion.lat);
    const lon = parseFloat(suggestion.lon);
    setMarkerPos([lat, lon]);
    onLocationSelect([lat, lon]); // Notify parent
    setSearchQuery(suggestion.display_name);
    setShowSuggestions(false);
  };

  // Handle marker movement (e.g., user clicking on map)
  const onMarkerMove = (coords) => {
    setMarkerPos(coords);
    onLocationSelect(coords); // Notify parent
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Safe center fallback for map
  const safeCenter = Array.isArray(markerPos) ? markerPos : [20, 78]; // Default to somewhere in India

  return (
    <div
      style={{
        border: "2px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      ref={containerRef}
    >
      <div
        style={{
          padding: "10px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #eee",
          position: "relative",
        }}
      >
        <input
          type="text"
          placeholder="Search for a location..."
          value={searchQuery}
          onChange={onChange}
          onFocus={() => searchQuery && setShowSuggestions(true)}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "4px 0",
              position: "absolute",
              top: "42px",
              left: 0,
              right: 0,
              maxHeight: "150px",
              overflowY: "auto",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              zIndex: 1000,
              borderRadius: "0 0 8px 8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
            }}
          >
            {suggestions.map((item) => (
              <li
                key={item.place_id}
                onClick={() => onSuggestionClick(item)}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
              >
                {item.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <MapContainer
        center={safeCenter}
        zoom={8}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: "300px", width: "100%" }}
        key={safeCenter.join(",")}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker position={markerPos} onPositionChange={onMarkerMove} />
      </MapContainer>
    </div>
  );
}
