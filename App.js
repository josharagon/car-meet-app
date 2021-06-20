import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import MainMap from "./components/MainMap.js";
import UserSearch from "./components/UserSearch";
import UserProfile from "./components/UserProfile";
import Tabs from "./components/Tabs";

export default function App() {
  const [user, setUser] = useState({
    id: 69,
    name: "Josh",
    car: {
      year: 2018,
      make: "Ford",
      model: "Fiesta",
      trim: "ST",
      mods: {
        intake: { brand: "injen", model: "short ram", linK: null },
        intercooler: { brand: "whoosh", model: "v1", linK: null },
        turbo: { brand: "garrett", model: "2860r gen ii", linK: null },
      },
    },
    memberSince: new Date(),
  });

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
