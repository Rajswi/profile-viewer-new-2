import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const ProfileCard = ({ profile }) => {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useGoogleMap, setUseGoogleMap] = useState(false);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${profile.address}`
        );
        if (response.data.length > 0) {
          setPosition([response.data[0].lat, response.data[0].lon]);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
      setLoading(false);
    };
    fetchCoordinates();
  }, [profile.address]);

  return (
    <div className="border rounded-xl p-4 shadow-lg bg-gray-100 dark:bg-gray-800 dark:text-white w-full">
      <img src={profile.image || "/default-avatar.png"} alt={profile.name} className="w-full h-40 object-cover rounded-md"/>
      <h2 className="text-xl font-bold mt-2">{profile.name}</h2>
      <p className="text-sm">{profile.description}</p>

      <button onClick={() => setUseGoogleMap(!useGoogleMap)} className="bg-blue-500 text-white px-3 py-1 rounded-lg mt-2">
        {useGoogleMap ? "Switch to OpenStreetMap" : "Switch to Google Maps"}
      </button>

      {loading ? <p className="text-blue-500 mt-2">Loading location...</p> :
        position ? <MapContainer center={position} zoom={13} className="h-40 w-full mt-2 rounded-md">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          <Marker position={position}><Popup>{profile.address}</Popup></Marker>
        </MapContainer> : <p className="text-red-500 mt-2">Location not found.</p>
      }
    </div>
  );
};

export default ProfileCard;
