import React, { useState, useEffect } from "react";
import { Button, Text, Image, View, Platform, Dimensions } from "react-native";

const AddImageContainer = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  return (
    <View
      style={{
        height: 300,
        width: windowWidth - 150,
        alignItems: "center",
        borderColor: "black",
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 4,
        borderColor: "white",
        justifyContent: "center",
        backgroundColor: "grey",
        borderStyle: "solid",
      }}
    >
      <Text style={{ color: "#fff", marginBottom: 5 }}>
        {" "}
        Add up to 10 photos
      </Text>
      <Text style={{ color: "#fff", fontSize: "10%" }}>
        tip: double tap to remove photos
      </Text>
    </View>
  );
};

export default AddImageContainer;
