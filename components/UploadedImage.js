import React, { useState, useEffect } from "react";
import { Button, Text, Image, View, Platform } from "react-native";
import { Icon } from "react-native-elements";

const UploadedImage = ({ image, setImages, images, index }) => {
  return (
    <View
      style={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        margin: 15,
      }}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: 200,
          height: 200,
        }}
      ></Image>
      <View style={{ position: "absolute", top: 5, right: 10 }}>
        <Icon
          name="close-circle-outline"
          type="ionicon"
          color="white"
          size={25}
          onPress={() => {
            setImages(images.filter((_, i) => i !== index));
          }}
        />
      </View>
    </View>
  );
};

export default UploadedImage;
