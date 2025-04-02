import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px",
};

const Map = ({ location }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={10}
          options={{
            styles: [
              {
                elementType: "geometry",
                stylers: [{ color: "#1D1D1D" }],
              },
              {
                elementType: "labels.text.fill",
                stylers: [{ color: "#EAEAEA" }],
              },
              {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#1D1D1D" }],
              },
            ],
          }}
        >
          <Marker position={location} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
