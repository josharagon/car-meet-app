import "react-native-gesture-handler";
import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as firebase from "firebase";
import "firebase/firestore";

import MainMap from "./components/MainMap.js";
import UserSearch from "./components/UserSearch";
import UserProfile from "./components/UserProfile";
import Tabs from "./components/Tabs";
import Register from "./components/Register.js";
import Landing from "./components/Landing.js";
import Login from "./components/Login.js";

const firebaseConfig = {
  apiKey: "AIzaSyDhuYwu_RThc6vfOMsBDRZjEv8uvXQxwbk",
  authDomain: "carmeets-317400.firebaseapp.com",
  projectId: "carmeets-317400",
  storageBucket: "carmeets-317400.appspot.com",
  messagingSenderId: "619142821412",
  appId: "1:619142821412:web:b9c9a888c6e75d1a2b0ab1",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const Stack = createNativeStackNavigator();

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Fragment>
      {loggedIn === false && (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
      {loggedIn && (
        <NavigationContainer>
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="#212121"
            translucent={true}
          />
          <Tabs />
          <SafeAreaView style={{ backgroundColor: "#212121" }} />
        </NavigationContainer>
      )}
    </Fragment>
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
