import React, { useState, useEffect } from "react";
import MapPicker from "react-google-map-picker";

// Default zoom level and location in case service location is not available
const DefaultLocation = { lat: 10, lng: 106 };
const DefaultZoom = 10;

export const Map = ({ service }) => {
    // Set initial location based on service.location.coordinates or use DefaultLocation
    const [defaultLocation, setDefaultLocation] = useState(
        service && service.location && service.location.coordinates
            ? { lat: service.location.coordinates[0], lng: service.location.coordinates[1] }
            : DefaultLocation
    );

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);

    // Handle location changes from the map picker
    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
    }

    // Handle zoom changes from the map picker
    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    // Reset location to the default if needed
    function handleResetLocation() {
        setDefaultLocation({ ...DefaultLocation });
        setZoom(DefaultZoom);
    }

    // Update the location if service data is changed (useEffect for data changes)
    useEffect(() => {
        if (service && service.location && service.location.coordinates) {
            setDefaultLocation({
                lat: service.location.coordinates[0],
                lng: service.location.coordinates[1],
            });
            setLocation({
                lat: service.location.coordinates[0],
                lng: service.location.coordinates[1],
            });
        }
    }, [service]);

    return (
        <>
            {/* Button to reset location */}
            {/* <button onClick={handleResetLocation}>Reset Location</button> */}

            {/* Hidden inputs for location data */}
            <input type="text" value={location.lat} disabled hidden />
            <input type="text" value={location.lng} disabled hidden />
            <input type="text" value={zoom} disabled hidden />

            {/* Map Picker Component */}
            <MapPicker
                defaultLocation={defaultLocation}
                zoom={zoom}
                style={{ height: "50vh" }}
                onChangeLocation={handleChangeLocation}
                onChangeZoom={handleChangeZoom}
                apiKey="AIzaSyBrCu57oEymo7VK-gTCouW3cdIGyv3Mmt4"
            />
        </>
    );
};
