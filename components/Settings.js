import React, { useState } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import { Searchbar } from "react-native-paper";

import writeUserData from "../database/firebase.js";

const Settings = () => {
  const [inputVal, setInputVal] = React.useState("");

  const onChangeSearch = (query) => setInputVal(query);

  return (
    <View>
      <Text>Welcome to the app!</Text>
    </View>
  );
};

export default Settings;
