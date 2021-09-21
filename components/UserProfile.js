import React, { useState, Fragment } from "react";
import GallerySwiper from "react-native-gallery-swiper";
import { Icon } from "react-native-elements";

import {
  StyleSheet,
  RefreshControl,
  Text,
  View,
  Button,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import ModificationCard from "./ModificationCard";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

const UserProfile = () => {
  const [currentCar, setCurrentCar] = useState(cars[0]);
  const [loaded, setLoaded] = useState(false);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const { navigation } = useNavigation();

  const logOut = () => {
    firebase.auth().signOut();
  };

  return (
    <ScrollView style={styles.statusBar} scrollEnabled={false}>
      <View style={styles.container}>
        <SafeAreaView style={styles.statusBar} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 25,
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 18,
            }}
          >
            @st.joshy's Garage
          </Text>
          <Image
            source={require("../assets/images/verified.png")}
            style={{ height: 20, width: 20, position: "absolute", left: 160 }}
          />
          {/* <Image
            source={require("../assets/images/settings.png")}
            style={{ width: 25, height: 25 }}
          /> */}
          <Icon
            name="cog-outline"
            type="material-community"
            size={25}
            color="white"
            onPress={() => navigation.navigate("Welcome")}
          />
        </View>
        {cars.indexOf(currentCar) !== 0 && (
          <View style={{ position: "absolute", top: "50%", left: 1 }}>
            <Icon
              name="arrow-left"
              size={40}
              color="white"
              onPress={() => {
                setCurrentCar(cars[cars.indexOf(currentCar) - 1]);
                setLoaded(true);
                currentImages = cars[0].images;
                setTimeout(() => {
                  setLoaded(false);
                }, 1);
              }}
            />
          </View>
        )}
        {cars.indexOf(currentCar) < cars.length - 1 && (
          <View style={{ position: "absolute", top: "50%", right: 1 }}>
            <Icon
              name="arrow-right"
              size={40}
              color="white"
              onPress={() => {
                setCurrentCar(cars[cars.indexOf(currentCar) + 1]);
                setLoaded(true);
                currentImages = cars[1].images;
                setTimeout(() => {
                  setLoaded(false);
                }, 1);
              }}
            />
          </View>
        )}
        {loaded === false && (
          <GallerySwiper
            enableScale={false}
            style={{ width: 400, height: 200, marginTop: 25 }}
            images={currentCar.images}
          />
        )}
        {loaded === true && (
          <ActivityIndicator
            size="large"
            color="white"
            style={{ width: 400, height: 200, marginTop: 25 }}
          />
        )}

        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: windowHeight / 40,
            marginTop: windowHeight / 60,
          }}
        >
          {currentCar.color}
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: windowHeight / 40,
          }}
        >
          {`${currentCar.year} ${currentCar.make} ${currentCar.model} ${currentCar.trim}`}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "87.09%",
            marginTop: windowHeight / 40,
          }}
        >
          <Text
            style={{
              textAlign: "left",
              color: "white",
              fontSize: windowHeight / 50,
            }}
          >
            Power
          </Text>
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
                padding: windowHeight / 60,
                borderRadius: 13,
                fontSize: windowHeight / 50,
              }}
            >
              {`${currentCar.power.hp} HP`}
            </Text>
            <Text
              style={{
                color: "white",
                backgroundColor: "#2A2A2A",
                padding: windowHeight / 60,
                borderRadius: 13,
                fontSize: windowHeight / 50,
              }}
            >
              {`${currentCar.power.ft_lb} FT-LB`}
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
          <Text
            style={{
              textAlign: "left",
              color: "white",
              fontSize: windowHeight / 50,
              marginTop: windowHeight / 40,
            }}
          >
            Modifications
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            {currentCar.modifications.map((modification) => {
              return (
                <ModificationCard
                  type={modification.type}
                  name={modification.name}
                  key={modification.name}
                />
              );
            })}
          </ScrollView>
        </View>
        {/* <Button title="sign out" onPress={() => logOut()} /> */}
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

const cars = [
  {
    make: "Ford",
    model: "Fiesta",
    year: "2018",
    color: "Platinum White",
    trim: "ST",
    power: { hp: "300", ft_lb: "300" },
    images: [
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
    ],
    modifications: [
      { type: "Downpipe", name: "Whoosh V1" },
      { type: "Turbo", name: "Garrett 2860R Gen ii" },
      { type: "Exhaust", name: "MBRP Cat-Back" },
      { type: "Intake", name: "2JR Cowl" },
      { type: "Suspension", name: "BC Coilovers" },
      { type: "Wheels", name: "Fifteen 52 Integrales" },
      { type: "Tires", name: "Pilot Sport Cup 2s" },
      { type: "Intercooler", name: "Whoosh V3" },
    ],
  },
  {
    make: "Toyota",
    model: "Supra",
    year: "2020",
    color: "Nitro Yellow",
    trim: "Premium",
    power: { hp: "800", ft_lb: "725" },
    images: [
      {
        uri: "https://www.motortrend.com/uploads/sites/5/2020/04/2020-Toyota-GR-Supra-27.jpg?fit=around%7C960:600",
        dimensions: { width: 1080, height: 1920 },
      },
      {
        uri: "https://www.motortrend.com/uploads/sites/5/2020/04/2020-Toyota-GR-Supra-4.jpg?fit=around%7C960:600",
        dimensions: { width: 1080, height: 1920 },
      },
      {
        uri: "https://www.motortrend.com/uploads/sites/5/2020/05/2021-Toyota-Supra-4-Cylinder-1.jpg?fit=around%7C960:600",
        dimensions: { width: 1080, height: 1920 },
      },
      {
        uri: "https://www.motortrend.com/uploads/sites/5/2020/05/2021-Toyota-Supra-4-Cylinder-10.jpg?fit=around%7C960:600",
        dimensions: { width: 1080, height: 1920 },
      },
    ],
    modifications: [
      { type: "Downpipe", name: "Akrapovic" },
      { type: "Turbo", name: "Pure 800" },
      { type: "Exhaust", name: "HKS Dual" },
      { type: "Intake", name: "Injen" },
      { type: "Suspension", name: "BC Coilovers" },
      { type: "Wheels", name: "Ray's TE37" },
      { type: "Tires", name: "Pilot Sport Cup 2s" },
    ],
  },
];
