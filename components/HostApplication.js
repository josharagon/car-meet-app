import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";

import Login from "./Login";

const Register = () => {
  var provider = new firebase.auth.GoogleAuthProvider();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerHost = () => {
    if (email === "" && password === "") {
      Alert.alert("Enter details to signup!");
    } else {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user.updateProfile({
            displayName: displayName,
            meetHost: true,
          });
          firebase
            .database()
            .ref("users/" + res.user.uid)
            .set({
              hostAccount: true,
              meetName: displayName,
            });
          console.log("User registered successfully!");
          setIsLoading(false);
          setDisplayName("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => setError(error.message));
    }
  };

  const navigation = useNavigation();

  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Meet Name"
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
        placeholderTextColor="white"
        color="white"
      />
      <TextInput
        autoCapitalize="none"
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="white"
        color="white"
      />
      <TextInput
        autoCapitalize="none"
        style={styles.inputStyle}
        placeholder="Password"
        placeholderTextColor="white"
        color="white"
        value={password}
        onChangeText={(text) => setPassword(text)}
        minLength={6}
        maxLength={15}
        secureTextEntry={true}
      />
      <Button color="#3740FE" title="Sign up" onPress={() => registerHost()} />

      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate("Login")}
      >
        Already Registered? Click here to login
      </Text>

      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate("Register")}
      >
        Back to user sign up
      </Text>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#202020",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#fff",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#3740FE",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
