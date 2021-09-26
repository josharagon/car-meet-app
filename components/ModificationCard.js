import React, { useState, Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";

const ModificationCard = ({ type, name }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  let itemUrl = `../assets/images/${type}.png`;
  const allParts = {
    Turbo: { url: require("../assets/images/turbo.png") },
    SuperCharger: { url: require("../assets/images/supercharger.png") },
    Intake: { url: require("../assets/images/intake.png") },
    Exhaust: { url: require("../assets/images/exhaust.png") },
    Tires: { url: require("../assets/images/tires.png") },
    Wheels: { url: require("../assets/images/wheels.png") },
    Intercooler: { url: require("../assets/images/intercooler.png") },
    Suspension: { url: require("../assets/images/suspension.png") },
    Downpipe: { url: require("../assets/images/downpipe.png") },
    BigWang: { url: require("../assets/images/bigwang.png") },
    Manifold: { url: require("../assets/images/manifold.png") },
    NOS: { url: require("../assets/images/nos.png") },
    OilCooler: { url: require("../assets/images/oilcooler.png") },
    Pistons: { url: require("../assets/images/pistons.png") },
    Radiator: { url: require("../assets/images/radiator.png") },
    Transmission: { url: require("../assets/images/transmission.png") },
    Clutch: { url: require("../assets/images/clutch.png") },
    FuelSystem: { url: require("../assets/images/fuelsystem.png") },
    ShortShifter: { url: require("../assets/images/shortshifter.png") },
    Camshaft: { url: require("../assets/images/camshaft.png") },
    Rods: { url: require("../assets/images/rods.png") },
    BrakeKit: { url: require("../assets/images/brakekit.png") },
  };

  return (
    <View
      style={{
        width: windowWidth / 3.57142857143,
        height: windowWidth / 2.86,
        padding: 10,
        backgroundColor: "#2A2A2A",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 2,
        boxShadow: "0px 1px 5px 0px #676767",
      }}
    >
      {/* width 6.25 height 11.1166666667 */}
      <Image
        source={allParts[type].url}
        style={{
          width: windowWidth / 6.25,
          height: windowHeight / 11.1166666667,
          resizeMode: "contain",
        }}
      />
      <Text style={{ color: "white", textAlign: "center" }}>{`${name}`}</Text>
      <Text
        style={{ color: "white", textAlign: "center", fontSize: 8 }}
      >{`${type.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}`}</Text>
    </View>
  );
};

export default ModificationCard;
