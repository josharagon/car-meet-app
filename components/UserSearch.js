import React, { useState } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import { Searchbar } from "react-native-paper";

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

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

export default UserSearch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#212121",
    height: "100%",
    alignItems: "center",
    display: "flex",
  },
  statusBar: {
    backgroundColor: "#212121",
  },
});
