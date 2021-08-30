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

const MediaPreview = ({ mediaSource }) => {
  let Image_Http_URL = {
    uri: mediaSource,
  };
  return (
    <View
      style={{
        width: 98,
        height: 98,
        backgroundColor: "#2A2A2A",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        margin: 3,
        boxShadow: "0px 1px 5px 0px #676767",
      }}
    >
      <Image
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
        }}
        source={Image_Http_URL}
      />
    </View>
  );
};

export default MediaPreview;
