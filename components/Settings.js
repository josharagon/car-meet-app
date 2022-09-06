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
import { useNavigation } from "@react-navigation/native";

const Settings = ({}) => {
  const logOut = () => {
    firebase.auth().signOut();
  };
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <ScrollView style={styles.statusBar}>
      <SafeAreaView />
      <Icon
        name="arrow-left"
        type="material-community"
        size={30}
        style={styles.noMargin}
        color="white"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <SettingTab settingName={"Account"} />
      <SettingTab settingName={"Privacy"} />
      <SettingTab settingName={"Notifications"} />
      <SettingTab settingName={"About"} />
      <SettingTab settingName={"Help"} />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <Button color="#A84032" title="Log Out" onPress={logOut} />
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#212121",
    height: "100%",
    alignItems: "center",
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    position: "relative",
  },
  statusBar: {
    backgroundColor: "#212121",
  },
  displayFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  noMargin: {
    padding: 30,
    alignSelf: "flex-start",
  },
});
