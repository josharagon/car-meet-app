// import React, { Component } from "react";
// import { View, Button, TextInput, SafeAreaView } from "react-native";

// import firebase from "firebase";

// export default class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//       email: "",
//     };
//     this.onSignUp = this.onSignUp.bind(this);
//   }

//   onSignUp() {
//     const { email, password, username } = this.state;
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   render() {
//     return (
//       <View style={{ backgroundColor: "#212121" }}>
//         <SafeAreaView />
//         <TextInput
//           style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
//           onChangeText={(username) => this.setState({ username })}
//           value={this.state.username}
//           placeholder="Username"
//         />
//         <TextInput
//           style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
//           onChangeText={(password) => this.setState({ password })}
//           value={this.state.password}
//           placeholder="Password"
//         />
//         <TextInput
//           style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
//           onChangeText={(email) => this.setState({ email })}
//           value={this.state.email}
//           placeholder="Email"
//         />
//         <Button
//           onPress={() => this.props.navigation.navigate("Home")}
//           title="Register"
//         />
//       </View>
//     );
//   }
// }

import React, { Component } from "react";
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
import firebase from "../database/firebase";

import Login from "./Login";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signup!");
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          res.user.updateProfile({
            displayName: this.state.displayName,
          });
          console.log("User registered successfully!");
          this.setState({
            isLoading: false,
            displayName: "",
            email: "",
            password: "",
          });
          this.props.navigation.navigate("Login");
        })
        .catch((error) => this.setState({ errorMessage: error.message }));
    }
  };

  render() {
    const { navigation } = this.props;

    if (this.state.isLoading) {
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
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, "displayName")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, "email")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, "password")}
          maxLength={15}
          secureTextEntry={true}
        />
        <Button
          color="#3740FE"
          title="Signup"
          onPress={() => this.registerUser()}
        />

        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("Login")}
        >
          Already Registered? Click here to login
        </Text>
      </View>
    );
  }
}

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
