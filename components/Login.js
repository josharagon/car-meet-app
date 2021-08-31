import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import firebase from "../database/firebase";
import { useNavigation } from "@react-navigation/native";

const Login = ({ loggedIn, setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userLogin = () => {
    if (email === "" && password === "") {
      Alert.alert("Enter details to signin!");
    } else {
      console.log(loggedIn);
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
          console.log("User logged-in successfully!");
          setIsLoading(false);
          setEmail("");
          setPassword("");
        })
        .catch((error) => setError(error.message));
    }
  };

  const { navigation } = useNavigation();

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
        placeholder="Email"
        value={email}
        onChangeText={(input) => setEmail(input)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={(input) => setPassword(input)}
        maxLength={15}
        secureTextEntry={true}
      />
      <Button color="#3740FE" title="Signin" onPress={() => userLogin()} />

      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate("Register")}
      >
        Don't have account? Click here to signup
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
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
