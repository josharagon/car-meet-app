import React, { useState } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import { Searchbar } from "react-native-paper";

import writeUserData from "../database/firebase.js";

const Welcome = () => {
  const [inputVal, setInputVal] = React.useState("");

  const onChangeSearch = (query) => setInputVal(query);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.statusBar} />
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </View>
  );
};
