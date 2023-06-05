import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

function MapComponent({ addresses, divIndex, trigger }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (trigger) {
      console.log(addresses, "add");
      console.log(divIndex, "div");
      markedIcon(divIndex);
    }
  }, [trigger]);

  function markedIcon(locIndex) {
    if (locIndex === divIndex) {
      console.log(locIndex, "loc");
      return {
        anchor: new window.google.maps.Point(15, 15), // adjust the anchor position to center the div on the marker's position
        scaledSize: new window.google.maps.Size(40, 40), // adjust the size of the div
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="14" fill="black"/>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="16" fill="white">${
            locIndex + 1
          }</text>
        </svg>
      `),
      };
    } else {
      return {
        anchor: new window.google.maps.Point(15, 15), // adjust the anchor position to center the div on the marker's position
        scaledSize: new window.google.maps.Size(40, 40), // adjust the size of the div
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="14" fill="white"/>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="16" fill="black">${
            locIndex + 1
          }</text>
        </svg>
      `),
      };
    }
  }

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        if (addresses.length !== 0) {
          const geocoder = new window.google.maps.Geocoder();
          const locationsPromise = addresses.map(async (addr) => {
            const locationPromise = new Promise((resolve) => {
              geocoder.geocode({ address: addr }, (results, status) => {
                if (status === "OK") {
                  resolve(results[0].geometry.location.toJSON());
                } else {
                  resolve(null);
                }
              });
            });
            return await locationPromise;
          });
          const res = await Promise.all(locationsPromise);
          setLocations(res.filter((loc) => loc !== null));
        }
      } catch (error) {
        console.log(error);
        // retry after a delay if window.google.maps is not yet defined
        setTimeout(fetchLocations, 1000);
      }
    };
    fetchLocations();
  }, [addresses]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAsiD6ilVa5vsp1b7wfXCsT6Ks4C7PcBDc">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: 33.6844, lng: 73.0479 }}
        zoom={10}
      >
        {locations.map((location, index) => (
          <Marker key={index} position={location} icon={markedIcon(index)} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
