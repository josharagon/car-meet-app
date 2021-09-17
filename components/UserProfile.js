import React, { useState, Fragment } from "react";
import GallerySwiper from "react-native-gallery-swiper";

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
import firebase from "firebase";

const UserProfile = () => {
  const logOut = () => {
    firebase.auth().signOut();
  };
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
        <GallerySwiper
          enableScale={false}
          style={{ width: 400, height: 200, marginTop: 25 }}
          images={[
            // Version *1.1.0 update (or greater versions):
            // Can be used with different image object fieldnames.
            // Ex. source, source.uri, uri, URI, url, URL

            {
              source: require("../assets/images/fist.png"),
              dimensions: { width: 1080, height: 1920 },
            },
            {
              uri: "https://uploads.tapatalk-cdn.com/20160625/513a7cd3e4ec0accc1e50fb88d6afa56.jpg",
              dimensions: { width: 1080, height: 1920 },
            },
            {
              uri: "https://www.fiestast.org/attachments/img_2081-2-jpg.8151/",
              dimensions: { width: 1080, height: 1920 },
            },
            {
              uri: "https://uploads.tapatalk-cdn.com/20161122/cced47cce4e881ef4f5cfe8b10416722.jpg",
              dimensions: { width: 1080, height: 1920 },
            },
            {
              url: "https://i.pinimg.com/originals/2f/2f/79/2f2f796cf2d528bc5841e04e5cb58be4.jpg",
              dimensions: { width: 1080, height: 1920 },
            },
            {
              uri: "https://i.redd.it/htzdmgavntm51.jpg",
              dimensions: { width: 1080, height: 1920 },
            },
          ]}
        />
        {/* <Image
          source={require("../assets/images/fist.png")}
          style={{ width: 300, height: 165, marginTop: 25 }}
        /> */}
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
            <ModificationCard type="Suspension" name="BC Coilovers" />
            <ModificationCard type="Wheels" name="Fifteen 52 Integrales" />
            <ModificationCard type="Tires" name="Pilot Sport Cup 2s" />
            <ModificationCard type="Intercooler" name="Whoosh V3" />
            <ModificationCard type="Downpipe" name="Whoosh V1" />
          </ScrollView>
        </View>
        <Button title="sign out" onPress={() => logOut()} />
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
