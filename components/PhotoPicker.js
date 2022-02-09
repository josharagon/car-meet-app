import React, { useState, useEffect } from "react";
import { Button, Text, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "react-native-elements";
import AddImageContainer from "./AddImageContainer";
import UploadedImage from "./UploadedImage";
import { ScrollView } from "react-native-gesture-handler";

export default function SimpleImagePicker() {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const returnImageGallery = () => {
    if (images.length > 0) {
      console.log(images);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImages((images) => [...images, result.uri]);
      setImage(null);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Icon
        name="add-a-photo"
        type="material"
        color="white"
        size={18}
        onPress={pickImage}
      />
      {images.length === 0 && <AddImageContainer />}

      <ScrollView
        horizontal={true}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        {images.length > 0 &&
          images.map((image, index) => (
            <UploadedImage
              image={image}
              images={images}
              setImages={setImages}
              index={index}
              key={index}
            />
          ))}
      </ScrollView>
    </View>
  );
}
