import React, { Fragment, useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { Searchbar } from "react-native-paper";
import firebase from "firebase";
import { Icon } from "react-native-elements";
import SettingTab from "./SettingTab";
import { Input } from "react-native-elements/dist/input/Input";

const WelcomeNewUser = ({ userName }) => {
  const [page, setPage] = useState(0);
  const [input, setInput] = useState("");

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#202020",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SafeAreaView />
      {page === 0 && (
        <Animated.Text
          style={{
            color: "#ffffff",
            fontSize: 66,
            lineHeight: 80,
            opacity: fadeAnim,
          }}
        >
          Welcome to {"\n"} Meets {"\n"} {userName}!
        </Animated.Text>
      )}
      {page === 1 && (
        <Animated.View
          style={{
            color: "#ffffff",
            fontSize: 66,
            lineHeight: 80,
            opacity: fadeAnim,
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 38,
              marginBottom: 10,
            }}
          >
            choose your username:
          </Text>
          <Input
            placeholderTextColor="#7d7d7d"
            color="#ffffff"
            value={input}
            placeholder="@wrxjr"
            onChangeText={(text) => setInput(text.replace(/\s/g, ""))}
          />
        </Animated.View>
      )}
      {page === 2 && (
        <Animated.Text
          style={{
            color: "#ffffff",
            fontSize: 66,
            lineHeight: 80,
            opacity: fadeAnim,
          }}
        >
          3
        </Animated.Text>
      )}
      {page === 3 && (
        <Animated.Text
          style={{
            color: "#ffffff",
            fontSize: 66,
            lineHeight: 80,
            opacity: fadeAnim,
          }}
        >
          6
        </Animated.Text>
      )}
      {page === 4 && (
        <Animated.Text
          style={{
            color: "#ffffff",
            fontSize: 66,
            lineHeight: 80,
            opacity: fadeAnim,
          }}
        >
          5
        </Animated.Text>
      )}
      <Button
        title="Next"
        onPress={() => {
          fadeOut();
          setTimeout(() => {
            setPage(page + 1);
            fadeIn();
          }, 1000);
        }}
      />
    </View>
  );
};

export default WelcomeNewUser;
