import React, { Fragment, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { Searchbar } from "react-native-paper";
import firebase from "firebase";
import { Icon } from "react-native-elements";
import SettingTab from "./SettingTab";

const Settings = ({ navigation }) => {
  const logOut = () => {
    firebase.auth().signOut();
  };

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return <View></View>;
};

export default Settings;
