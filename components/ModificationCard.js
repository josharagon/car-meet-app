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
    Intake: { url: require("../assets/images/intake.png") },
    Exhaust: { url: require("../assets/images/exhaust.png") },
    Tires: { url: require("../assets/images/tires.png") },
    Wheels: { url: require("../assets/images/wheels.png") },
    Intercooler: { url: require("../assets/images/intercooler.png") },
    Suspension: { url: require("../assets/images/suspension.png") },
    Downpipe: { url: require("../assets/images/downpipe.png") },
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
      <Text style={{ color: "white", textAlign: "center" }}>{`${type}`}</Text>
    </View>
  );
};

export default ModificationCard;
