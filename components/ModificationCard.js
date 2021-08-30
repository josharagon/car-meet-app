import React, { useState, Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";

const ModificationCard = ({ type, name }) => {
  let itemUrl = `../assets/${type}.png`;
  const allParts = {
    Turbo: { url: require("../assets/turbo.png") },
    Intake: { url: require("../assets/intake.png") },
    Exhaust: { url: require("../assets/exhaust.png") },
    Tires: { url: require("../assets/tires.png") },
    Wheels: { url: require("../assets/wheels.png") },
    InterCooler: { url: require("../assets/intercooler.png") },
    Suspension: { url: require("../assets/suspension.png") },
  };

  return (
    <View
      style={{
        width: 105,
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
      <Image source={allParts[type].url} style={{ width: 60, height: 60 }} />
      <Text style={{ color: "white", textAlign: "center" }}>{`${name}`}</Text>
      <Text style={{ color: "white", textAlign: "center" }}>{`${type}`}</Text>
    </View>
  );
};

export default ModificationCard;
