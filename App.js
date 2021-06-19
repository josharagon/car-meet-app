import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MainMap from "./components/MainMap.js";
import UserSearch from "./components/UserSearch";
import UserProfile from "./components/UserProfile";

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

  const Tab = createBottomTabNavigator();

  return (
    // <NativeRouter>
    //   <View style={styles.container}>
    //     <Switch>
    //       <Route exact path="/" component={MainMap} />
    //       <Route exact path="search" component={UserSearch} />
    //       <Route exact path="profile" component={UserProfile} />
    //     </Switch>
    //   </View>
    // </NativeRouter>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={MainMap} />
        <Tab.Screen name="Search" component={UserSearch} />
        <Tab.Screen name="Profile" component={UserProfile} />
      </Tab.Navigator>
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
