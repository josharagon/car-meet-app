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

const Settings = ({ userName }) => {
  const [page, setPage] = useState(0);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <Fragment>
      {page === 0 && (
        <View>
          <Text>Welcome to Meets {userName}</Text>
        </View>
      )}
      {page === 1 && <View>2</View>}
      {page === 2 && <View>3</View>}
      {page === 3 && <View>4</View>}
      {page === 4 && <View>5</View>}
    </Fragment>
  );
};

export default Settings;
