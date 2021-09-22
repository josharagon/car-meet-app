import React, { Fragment, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Searchbar } from "react-native-paper";
import firebase from "firebase";
import { Icon } from "react-native-elements";

const SettingTab = ({ settingName }) => {
  return (
    <View style={styles.tab}>
      <Text style={{ color: "white" }}>{settingName}</Text>
      <Icon name="arrow-right" color="white" size={30} />
    </View>
  );
};

export default SettingTab;

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "#303030",
    height: 30,
    display: "flex",
    flexDirection: "row",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 4,
    margin: 4,
  },
});
