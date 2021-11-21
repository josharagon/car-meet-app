import React, { useState, useEffect } from "react";
import { Button, Text, Image, View, Platform } from "react-native";
import { Icon } from "react-native-elements";

const UploadedImage = ({ image, setImages, images, index }) => {
  return (
    <View
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: 200,
          height: 200,
          left: 0,
          top: 0,
        }}
      ></Image>
      <View style={{ position: "absolute", top: 5, right: 85 }}>
        <Icon
          name="close-circle-outline"
          type="ionicon"
          color="white"
          size={25}
          onPress={() => {
            console.log(index);
          }}
        />
      </View>
    </View>
  );
};

export default UploadedImage;
