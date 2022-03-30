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

import { firebaseConfig } from "./database/firebase.js";
import { getStorage } from "firebase/storage";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import WelcomeNewUser from "./components/WelcomeNewUser.js";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// const database =  getDatabase();

// console.log(database);

db.collection("users")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      console.log(doc.data());
    });
  });

export default function App() {
  const Stack = createNativeStackNavigator();

  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountType, setAccountType] = useState(false);
  const [currentDriver, setCurrentDriver] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setLoggedIn(true);
        accountSetUp(user);
      } else {
        setLoggedIn(false);
        setCurrentUser(null);
      }
    });
  }, []);

  const accountSetUp = (user) => {
    return firebase
      .database()
      .ref(`/users/${user.uid}`)
      .once("value")
      .then((snapshot) => {
        if (snapshot.child("tutorialCompleted").exists()) {
          setAccountType(true);
          return setCurrentDriver(snapshot.val());
        }
      });
  };

  const getUserData = (uid) => {
    firebase
      .database()
      .ref("users/" + uid)
      .once("value", (snap) => {
        console.log(snap.val());
      });
  };
  // const auth = getAuth();
  // const user = auth.currentUser;

  // console.log(firebase.default.auth().currentUser.displayName);

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
            <Stack.Screen name="Tabs" component={Tabs} />

            <Stack.Screen name="Login">
              {(props) => (
                <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      )}

      {loggedIn && !accountType && (
        <WelcomeNewUser
          name={currentUser.displayName}
          setAccountType={setAccountType}
        />
      )}

      {loggedIn && accountType && (
        <NavigationContainer>
          <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="#212121"
            translucent={true}
          />
          <Tabs currentDriver={currentDriver} />
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
