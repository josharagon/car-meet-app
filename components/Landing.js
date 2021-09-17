import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Register from "./Register";
import Login from "./Login";

const Landing = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/images/carmeet3.jpg")}
      resizeMode="cover"
      resizeMethod="auto"
      style={{
        height: "100%",
        width: "100%",
        flex: 1,
      }}
    >
      <View style={styles.child}>
        <SafeAreaView style={{ backgroundColor: "#212121" }} />
        <Image
          source={require("../assets/images/meets.png")}
          style={{
            width: 350,
            resizeMode: "contain",
          }}
        />
        <Button
          title="Register"
          color="white"
          onPress={() => navigation.navigate(Register)}
        ></Button>
        <Button
          title="Login"
          color="white"
          onPress={() => navigation.navigate(Login)}
        ></Button>
      </View>
    </ImageBackground>
  );
};

export default Landing;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  child: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
