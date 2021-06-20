import React from "react";
import { showLocation } from "react-native-map-link";
import { Marker } from "react-native-maps";

const MeetMarkers = () => {
  const onGoingMeets = [
    { name: "Meet1", lat: 39.96124, long: -104.99162 },
    { name: "Meet2", lat: 39.766121, long: -104.780296 },
    { name: "Meet3", lat: 39.76852, long: -104.8103 },
  ];

  const meetToMarkers = onGoingMeets.map((meet) => {
    return (
      <Marker
        coordinate={{
          latitude: meet.lat,
          longitude: meet.long,
        }}
        image={require("../assets/map-marker.png")}
        title={meet.name}
        description="Starts in 5 minutes."
        onPress={() =>
          showLocation({
            latitude: meet.lat,
            longitude: meet.long,
            title: meet.name, // optional
            googleForceLatLon: false, // optionally force GoogleMaps to use the latlon for the query instead of the title
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            naverCallerName: "com.example.myapp",
          })
        }
      >
        {/* <Callout tooltip>
      <View></View>
    </Callout> */}
      </Marker>
    );
  });

  return meetToMarkers;
};

export default MeetMarkers;
