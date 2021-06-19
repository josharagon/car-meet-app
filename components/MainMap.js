import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { MapKit, Marker, Callout } from "react-native-maps";

const MainMap = () => {
  return (
    <View style={styles.container}>
      <MapView
        provider={MapKit}
        style={styles.map}
        // showsUserLocation={true}
        // followsUserLocation={true}
        region={{
          latitude: 39.973851,
          longitude: -104.86436,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 39.973851,
            longitude: -104.86436,
          }}
          image={require("../assets/map-marker.png")}
          title="Test Location"
          description="test desc"
        >
          {/* <Callout tooltip>
            <View></View>
          </Callout> */}
        </Marker>
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
