import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import mapDarkTheme from "../map styles/mapDarkTheme";
import { showLocation } from "react-native-map-link";
import MeetMarkers from "./MeetMarkers";

const MainMap = () => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        lightModeAllowed={false}
        customMapStyle={mapDarkTheme}
        showsUserLocation
        followsUserLocation
        region={{
          latitude: 39.973851,
          longitude: -104.86436,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MeetMarkers />
      </MapView>
    </View>
  );
};

export default MainMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

console.log();
