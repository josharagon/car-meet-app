import React from "react";
import { showLocation } from "react-native-map-link";
import { Marker } from "react-native-maps";
import { onGoingMeets } from "../onGoingMeets";

const MeetMarkers = () => {
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
