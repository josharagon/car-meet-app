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
