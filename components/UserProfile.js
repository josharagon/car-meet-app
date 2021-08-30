import React, { useState, Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import ModificationCard from "./ModificationCard";

const UserProfile = () => {
  return (
    <ScrollView style={styles.statusBar}>
      <View style={styles.container}>
        <SafeAreaView style={styles.statusBar} />
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 18,
            marginTop: 25,
          }}
        >
          @st.joshy
        </Text>
        <Image
          source={require("../assets/fist.png")}
          style={{ width: 300, height: 165, marginTop: 25 }}
        />
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 18,
            marginTop: 5,
          }}
        >
          Platinum White
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 18,
          }}
        >
          2018 Ford Fiesta ST
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "87.09%",
            marginTop: 20,
          }}
        >
          <Text style={{ textAlign: "left", color: "white" }}>Power</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Text
              style={{
                color: "white",
                backgroundColor: "#2A2A2A",
                padding: 8,
                borderRadius: 10,
              }}
            >
              300 WHP
            </Text>
            <Text
              style={{
                color: "white",
                backgroundColor: "#2A2A2A",
                padding: 8,
                borderRadius: 10,
              }}
            >
              300 FT-LB
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "87.09%",
            marginTop: 20,
          }}
        >
          <Text style={{ textAlign: "left", color: "white" }}>
            Modifications
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            <ModificationCard type="Turbo" name="Garrett 2860R Gen ii" />
            <ModificationCard type="Exhaust" name="MBRP Cat-Back" />
            <ModificationCard type="Intake" name="2JR Cowl" />
            <ModificationCard type="Suspension" name="2JR Cowl" />
            <ModificationCard type="Wheels" name="Fifteen 52 Integrales" />
            <ModificationCard type="Tires" name="Pilot Sport Cup 2s" />
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfile;

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
