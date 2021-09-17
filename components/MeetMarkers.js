import React from "react";
import { showLocation } from "react-native-map-link";
import { Marker } from "react-native-maps";
import { onGoingMeets } from "../onGoingMeets";

const MeetMarkers = () => {
  const meetToMarkers = onGoingMeets.map((meet) => {
    return (
      <Marker
        key={meet.name}
        coordinate={{
          latitude: meet.coordinate.latitude,
          longitude: meet.coordinate.longitude,
        }}
        image={require("../assets/images/map-marker.png")}
        title={meet.name}
        description="Starts in 5 minutes."
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
